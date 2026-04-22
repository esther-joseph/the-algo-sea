/**
 * Vercel Serverless Function — POST /api/evaluate
 * Asks Claude to evaluate Python code against test cases.
 *
 * Body:     { leet, title, fullDesc, code, testCases }
 * Response: { results, allPassed, feedback } | { error }
 */
const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-20250514';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });

  const { leet, title, fullDesc, code, testCases } = req.body ?? {};
  if (!leet || !code || !Array.isArray(testCases))
    return res.status(400).json({ error: 'leet, code, testCases required' });

  const casesText = testCases.map((tc, i) => `Case ${i + 1}: ${tc.inputStr} → Expected: ${tc.expected}`).join('\n');

  const prompt = `Evaluate Python code for LeetCode #${leet}: "${title}"\nProblem: ${fullDesc}\n\nCode:\n\`\`\`python\n${code}\n\`\`\`\n\nTest cases:\n${casesText}\n\nTrace through each case. Return ONLY raw JSON:\n{"results":[{"case":1,"passed":true,"got":"[1,2]","expected":"[1,2]"}],"allPassed":false,"feedback":"25 word coaching tip."}`;

  try {
    const r = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: MODEL, max_tokens: 1000, messages: [{ role: 'user', content: prompt }] }),
    });
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: data?.error?.message ?? 'API error' });
    const raw = (data.content?.[0]?.text ?? '{}').replace(/```json|```/g, '').trim();
    return res.status(200).json(JSON.parse(raw));
  } catch (err) {
    console.error('[evaluate]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

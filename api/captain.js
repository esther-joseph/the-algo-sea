/**
 * Vercel Serverless Function — POST /api/captain
 * Proxies Captain Algo chat to Anthropic so the API key stays server-side.
 *
 * Body:     { messages: Message[], systemPrompt: string }
 * Response: { text: string } | { error: string }
 */
const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-20250514';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });

  const { messages, systemPrompt } = req.body ?? {};
  if (!Array.isArray(messages) || !systemPrompt)
    return res.status(400).json({ error: 'messages and systemPrompt required' });

  try {
    const r = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: MODEL, max_tokens: 1000, system: systemPrompt, messages }),
    });
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: data?.error?.message ?? 'API error' });
    return res.status(200).json({ text: data.content?.[0]?.text ?? '' });
  } catch (err) {
    console.error('[captain]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

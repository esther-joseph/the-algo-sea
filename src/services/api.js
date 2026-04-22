/** Client-side API service — all calls proxied through Vercel serverless functions. */

async function post(path, body) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? `HTTP ${res.status}`);
  }
  return res.json();
}

export const chatWithCaptain = (payload) => post('/api/captain', payload);
export const evaluateCode    = (payload) => post('/api/evaluate', payload);

export const CAPTAIN_SYSTEM = `You are Captain Algo — a legendary navigator of the Algorithmic Seas who teaches coding interview patterns. Your teaching blends NeetCode's intuition-first approach, ByteByteGo's memorable visual frameworks, and principles from "Beyond Cracking the Coding Interview" (communication, interview presence, negotiation). Use maritime metaphors naturally. Be direct, warm, and pedagogically sharp. Max 220 words unless a deep-dive is requested. Prose only — no bullet lists.`;
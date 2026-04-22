import { useState, useEffect, useRef, useCallback } from 'react';
import { chatWithCaptain, CAPTAIN_SYSTEM } from '../../services/api';

const SUGGESTIONS = [
  'Which pattern should I learn first?',
  'Two Pointers vs Sliding Window?',
  'How do I pick the right pattern?',
  'FAANG interview tips',
  'How to communicate while coding',
];

/** Renders the message bubbles and typing indicator. */
function MessageList({ messages, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="chat-messages">
      {messages.length === 0 && (
        <div className="captain-intro">
          <div className="captain-avatar">🧭</div>
          <div className="captain-intro-title">Captain Algo</div>
          <div className="captain-intro-sub">
            A seasoned navigator of the Algorithmic Seas. Ask me anything — patterns,
            problem-solving strategy, or how to ace the interview.
          </div>
        </div>
      )}

      {messages.map((m, i) => (
        <div key={i} className={`message message-${m.role === 'user' ? 'user' : 'captain'}`}>
          <div className="message-header">
            {m.role === 'user' ? 'You' : '⚓ Captain Algo'}
          </div>
          <div style={{ whiteSpace: 'pre-wrap' }}>{m.content}</div>
        </div>
      ))}

      {loading && (
        <div className="typing-indicator" aria-label="Captain is typing">
          <div className="typing-dot" />
          <div className="typing-dot" />
          <div className="typing-dot" />
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}

export default function CaptainView() {
  const [messages, setMessages] = useState([]);
  const [input,    setInput]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  // Consume any seed message planted by askCaptainAbout()
  useEffect(() => {
    const seed = sessionStorage.getItem('captainSeed');
    if (seed) {
      sessionStorage.removeItem('captainSeed');
      sendMessage(seed);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = useCallback(async (text) => {
    const trimmed = (text ?? input).trim();
    if (!trimmed || loading) return;

    setInput('');
    setShowSuggestions(false);

    const userMsg   = { role: 'user',      content: trimmed };
    const nextMsgs  = [...messages, userMsg];
    setMessages(nextMsgs);
    setLoading(true);

    try {
      const { text: reply } = await chatWithCaptain({
        messages:     nextMsgs.map(({ role, content }) => ({ role, content })),
        systemPrompt: CAPTAIN_SYSTEM,
      });
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'The signal was swallowed by the storm. Check your connection and try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      <MessageList messages={messages} loading={loading} />

      {showSuggestions && (
        <div className="suggestion-chips">
          {SUGGESTIONS.map((s) => (
            <button key={s} className="chip" onClick={() => sendMessage(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="chat-input-area">
        <textarea
          className="chat-input"
          placeholder="Ask the Captain…"
          value={input}
          rows={1}
          onChange={(e) => {
            setInput(e.target.value);
            // Auto-resize: reset then expand
            e.target.style.height = 'auto';
            e.target.style.height = Math.min(e.target.scrollHeight, 90) + 'px';
          }}
          onKeyDown={handleKeyDown}
          aria-label="Message Captain Algo"
        />
        <button
          className="chat-send"
          onClick={() => sendMessage()}
          disabled={loading || !input.trim()}
          aria-label="Send message"
        >
          ↑
        </button>
      </div>
    </>
  );
}

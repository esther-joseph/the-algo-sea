import { useState, useMemo } from 'react';
import { prepareCodeBlock } from '../../utils/syntaxHighlight';

/**
 * Maritime-themed code block with line numbers, waterline header, and copy button.
 * Accepts raw Python source and highlights it client-side.
 */
export default function CodeBlock({ code, lang = 'Python' }) {
  const [copied, setCopied] = useState(false);
  const { highlighted, lineNums, raw } = useMemo(() => prepareCodeBlock(code), [code]);

  function handleCopy() {
    navigator.clipboard.writeText(raw).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  return (
    <div className="code-block">
      <div className="code-header">
        <span className="code-lang">
          <span className="code-lang-dot" />
          {lang}
        </span>
        <button
          className={`code-copy ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
        >
          {copied ? '✓ Copied' : '⎘ Copy'}
        </button>
      </div>
      <div className="code-body">
        <div className="line-nums" aria-hidden="true">{lineNums}</div>
        <pre
          className="code-pre"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </div>
    </div>
  );
}

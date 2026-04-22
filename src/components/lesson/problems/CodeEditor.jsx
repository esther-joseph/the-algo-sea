import { useRef } from 'react';

/**
 * Lightweight code editor textarea.
 * Intercepts Tab key to insert 4 spaces instead of moving focus.
 */
export default function CodeEditor({ id, defaultValue, value, onChange }) {
  const ref = useRef(null);

  function handleKeyDown(e) {
    if (e.key !== 'Tab') return;
    e.preventDefault();
    const ta = e.target;
    const s = ta.selectionStart, en = ta.selectionEnd;
    const next = ta.value.substring(0, s) + '    ' + ta.value.substring(en);
    // Synthetic change event so React state stays in sync
    const nativeInputSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
    nativeInputSetter.call(ta, next);
    ta.dispatchEvent(new Event('input', { bubbles: true }));
    ta.selectionStart = ta.selectionEnd = s + 4;
  }

  return (
    <div className="prob-editor-wrap">
      <div className="prob-editor-header">
        <span className="prob-editor-lang">
          <span className="code-lang-dot" />
          Python
        </span>
        <button
          className="code-copy"
          onClick={() => navigator.clipboard.writeText(ref.current?.value ?? '')}
          aria-label="Copy editor code"
        >
          ⎘ Copy
        </button>
      </div>
      <textarea
        id={id}
        ref={ref}
        className="prob-editor-textarea"
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="off"
        aria-label="Python code editor"
      />
    </div>
  );
}

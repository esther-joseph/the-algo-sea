import { useState } from 'react';
import { PROBLEM_DETAILS } from '../../../data/problems';
import { evaluateCode }    from '../../../services/api';
import Badge               from '../../ui/Badge';
import ProblemTimer        from './ProblemTimer';
import CodeEditor          from './CodeEditor';
import TestResults         from './TestResults';

/**
 * Expandable accordion for a single LeetCode problem.
 * Contains the full problem statement, a live timer, a code editor,
 * visible test cases, and an AI-powered code evaluator.
 */
export default function ProblemAccordion({ problem }) {
  const { leet, title, difficulty, desc } = problem;
  const det = PROBLEM_DETAILS[leet] ?? {};
  const recMin = det.timeRec ?? (difficulty === 'easy' ? 15 : difficulty === 'medium' ? 25 : 40);

  const [open,        setOpen]       = useState(false);
  const [code,        setCode]       = useState(det.starterCode ?? '# Write your solution here\ndef solve():\n    pass');
  const [results,     setResults]    = useState(null);
  const [feedback,    setFeedback]   = useState('');
  const [caseStatus,  setCaseStatus] = useState({});
  const [evaluating,  setEvaluating] = useState(false);
  const [runError,    setRunError]   = useState('');

  async function handleRun() {
    if (!code.trim() || code.trim() === (det.starterCode ?? '').trim()) {
      setRunError('Write your solution first, navigator.');
      return;
    }
    setEvaluating(true);
    setResults(null);
    setFeedback('');
    setRunError('');

    try {
      const ev = await evaluateCode({
        leet, title,
        fullDesc:  det.fullDesc ?? desc,
        code,
        testCases: det.testCases ?? [],
      });

      // Update per-case dot indicators
      const statusMap = {};
      (ev.results ?? []).forEach((r) => { statusMap[r.case - 1] = r.passed; });
      setCaseStatus(statusMap);
      setResults(ev.results ?? []);
      setFeedback(ev.feedback ?? '');

    } catch {
      setRunError('Signal lost in the storm — check your connection and try again.');
    } finally {
      setEvaluating(false);
    }
  }

  return (
    <div className="prob-accordion">
      {/* ── Header (always visible) ── */}
      <div
        className="prob-header"
        onClick={() => setOpen((o) => !o)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className={`prob-chevron ${open ? 'open' : ''}`}>▶</span>
        <div className="prob-header-info">
          <span className="prob-header-title">LC {leet}: {title}</span>
          <div className="prob-header-meta">
            <Badge difficulty={difficulty} />
          </div>
        </div>
        <span className="prob-time-pill">⏱ {recMin}m</span>
      </div>

      {/* ── Body (expanded) ── */}
      {open && (
        <div className="prob-body open">
          {/* Problem description */}
          <p className="prob-full-desc">{det.fullDesc ?? desc}</p>

          {/* Examples */}
          {(det.examples ?? []).map((ex, i) => (
            <div key={i} className="prob-example">
              <div className="prob-example-label">Example {i + 1}</div>
              <div className="prob-example-row">Input: <b>{ex.input}</b></div>
              <div className="prob-example-row">Output: <b>{ex.output}</b></div>
              {ex.exp && <div className="prob-example-exp">↳ {ex.exp}</div>}
            </div>
          ))}

          {/* Timer */}
          <ProblemTimer recMinutes={recMin} />

          {/* Code editor */}
          <CodeEditor
            id={`editor-${leet}`}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          {/* Test cases */}
          {(det.testCases ?? []).length > 0 && (
            <>
              <div className="prob-cases-label">Test Cases</div>
              {(det.testCases ?? []).map((tc, i) => (
                <div key={i} className="prob-case">
                  <span className="prob-case-num">Case {i + 1}</span>
                  <span className="prob-case-io">{tc.inputStr}</span>
                  <span
                    className="prob-case-result"
                    style={{
                      color: caseStatus[i] === true  ? 'var(--green)' :
                             caseStatus[i] === false ? 'var(--red)'   : undefined,
                    }}
                  >
                    {caseStatus[i] === true ? '✓' : caseStatus[i] === false ? '✗' : '·'}
                  </span>
                </div>
              ))}
            </>
          )}

          {/* Run button */}
          <button
            className="prob-run-btn"
            onClick={handleRun}
            disabled={evaluating}
          >
            {evaluating
              ? <><span className="spin">⟳</span>&nbsp; Evaluating…</>
              : '▶  Run & Evaluate'}
          </button>

          {runError && (
            <div className="prob-result-feedback" style={{ marginTop: 10 }}>
              {runError}
            </div>
          )}

          <TestResults results={results} feedback={feedback} />
        </div>
      )}
    </div>
  );
}

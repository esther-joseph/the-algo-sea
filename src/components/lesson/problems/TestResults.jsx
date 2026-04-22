/**
 * Renders evaluation results from the /api/evaluate serverless function.
 * Each row shows pass/fail, the got/expected values, and a coaching note.
 */
export default function TestResults({ results, feedback }) {
  if (!results?.length) return null;

  return (
    <div className="prob-results">
      {results.map((r) => (
        <div key={r.case} className={`prob-result-row ${r.passed ? 'pass' : 'fail'}`}>
          <span className="prob-result-icon">{r.passed ? '✓' : '✗'}</span>
          <span className="prob-result-text">
            Case {r.case}:{' '}
            {r.passed
              ? 'Passed'
              : <>Got <b>{r.got}</b> · Expected <b>{r.expected}</b></>}
          </span>
        </div>
      ))}
      {feedback && (
        <div className="prob-result-feedback">🧭 {feedback}</div>
      )}
    </div>
  );
}

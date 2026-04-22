const DIFF_CLASS = { easy: 'diff-easy', medium: 'diff-medium', hard: 'diff-hard' };

export default function Badge({ difficulty }) {
  return (
    <span className={`difficulty-badge ${DIFF_CLASS[difficulty] ?? ''}`}>
      {difficulty}
    </span>
  );
}

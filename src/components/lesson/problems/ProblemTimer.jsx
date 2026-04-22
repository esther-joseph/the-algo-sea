import { useTimer } from '../../../hooks/useTimer';

export default function ProblemTimer({ recMinutes }) {
  const { running, display, colorClass, toggle, reset } = useTimer(recMinutes);

  return (
    <div className="prob-timer-row">
      <span className="prob-timer-label">⏱ Recommended: {recMinutes} min</span>
      <span className={`prob-timer-display ${colorClass}`}>{display}</span>
      <button
        className={`prob-timer-btn ${running ? 'running' : ''}`}
        onClick={toggle}
      >
        {running ? 'PAUSE' : 'START'}
      </button>
      <button className="prob-timer-btn" onClick={reset} aria-label="Reset timer">
        ↺
      </button>
    </div>
  );
}

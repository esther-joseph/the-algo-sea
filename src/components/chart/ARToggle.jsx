import { useAR } from '../../hooks/useAR';

const LABELS = {
  off:   'AR MODE — Tap to overlay on real world',
  on:    'AR ACTIVE — Camera overlay enabled',
  error: 'Camera unavailable — tap to disable',
};

export default function ARToggle() {
  const { arState, toggle } = useAR();
  return (
    <div className="ar-strip">
      <span className="ar-strip-icon">📷</span>
      <span className={`ar-strip-label ${arState === 'on' ? 'active' : arState === 'error' ? 'error' : ''}`}>
        {LABELS[arState]}
      </span>
      <div
        className={`ar-toggle ${arState === 'on' ? 'on' : arState === 'error' ? 'error' : ''}`}
        onClick={toggle}
        role="switch"
        aria-checked={arState === 'on'}
        aria-label="Toggle AR camera mode"
      >
        <div className="ar-thumb" />
      </div>
    </div>
  );
}

import { useApp } from '../../context/AppContext';

/**
 * A single pattern card in the sea chart grid.
 * Clicking opens the full lesson view for that pattern.
 */
export default function PatternCard({ pattern }) {
  const { openPattern } = useApp();
  const { icon, formalName, name, tagline, timeComplexity, spaceComplexity, color } = pattern;

  return (
    <div
      className="pattern-card"
      style={{ '--card-color': color }}
      onClick={() => openPattern(pattern)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && openPattern(pattern)}
      aria-label={`Open ${formalName} lesson`}
    >
      {/* Corner HUD brackets */}
      <div className="corner-bracket corner-tl" aria-hidden="true" />
      <div className="corner-bracket corner-br" aria-hidden="true" />

      <span className="pattern-card-icon">{icon}</span>
      <div className="pattern-card-formal">{formalName}</div>
      <div className="pattern-card-name">{name}</div>
      <div className="pattern-card-tag">{tagline}</div>

      <div className="pattern-card-complexity">
        <span className="badge badge-time">{timeComplexity}</span>
        <span className="badge badge-space">{spaceComplexity}</span>
      </div>
    </div>
  );
}

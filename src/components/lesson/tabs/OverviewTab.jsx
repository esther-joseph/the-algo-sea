import { useApp } from '../../../context/AppContext';
import SectionLabel from '../../ui/SectionLabel';

export default function OverviewTab({ pattern }) {
  const { askCaptainAbout } = useApp();
  const { metaphor, whenToUse, timeComplexity, spaceComplexity, formalName } = pattern;

  return (
    <>
      <div className="lesson-section">
        <SectionLabel>⚓ The Nautical Metaphor</SectionLabel>
        <div className="metaphor-box">{metaphor}</div>
      </div>

      <div className="lesson-section">
        <SectionLabel>🚩 When to Deploy</SectionLabel>
        <div className="signal-words">
          {whenToUse.map((w) => (
            <div key={w} className="signal-word">{w}</div>
          ))}
        </div>
      </div>

      <div className="lesson-section">
        <SectionLabel>⚡ Complexity</SectionLabel>
        <div className="complexity-row">
          <div className="complexity-item">
            <div className="complexity-label">Time</div>
            <div className="complexity-value" style={{ fontSize: 13 }}>{timeComplexity}</div>
          </div>
          <div className="complexity-item">
            <div className="complexity-label">Space</div>
            <div className="complexity-value" style={{ fontSize: 13, color: 'var(--amber)' }}>{spaceComplexity}</div>
          </div>
        </div>
      </div>

      <div className="lesson-section">
        <button className="ask-captain-btn" onClick={() => askCaptainAbout(formalName)}>
          🧭 Ask Captain Algo to teach {formalName}
        </button>
      </div>
    </>
  );
}

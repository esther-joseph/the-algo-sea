import SectionLabel from '../../ui/SectionLabel';

export default function InsightsTab({ pattern }) {
  return (
    <div className="lesson-section">
      <SectionLabel>💡 Navigator&#39;s Insights</SectionLabel>
      {pattern.insights.map((ins, i) => (
        <div key={i} className="insight-item">
          <span className="insight-icon">{ins.icon}</span>
          <span>{ins.text}</span>
        </div>
      ))}
    </div>
  );
}

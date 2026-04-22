import { PATTERNS } from '../../data/patterns';
import PatternCard from './PatternCard';
import ARToggle    from './ARToggle';

export default function ChartView() {
  return (
    <div style={{ padding: '12px 14px 16px' }}>
      <ARToggle />
      <div className="chart-title">Select Your Pattern</div>
      <div className="patterns-grid">
        {PATTERNS.map((p) => (
          <PatternCard key={p.id} pattern={p} />
        ))}
      </div>
    </div>
  );
}

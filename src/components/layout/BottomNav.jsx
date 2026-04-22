import { useApp } from '../../context/AppContext';

const NAV_ITEMS = [
  { id: 'chart',   icon: '🗺️',  label: 'Chart'   },
  { id: 'lesson',  icon: '📖',  label: 'Lesson'  },
  { id: 'captain', icon: '🧭',  label: 'Captain' },
];

export default function BottomNav() {
  const { view, navigateTo, pattern } = useApp();

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {NAV_ITEMS.map(({ id, icon, label }) => {
        // Hide the lesson tab until a pattern has been opened
        if (id === 'lesson' && !pattern) return null;
        return (
          <button
            key={id}
            className={`nav-btn ${view === id ? 'active' : ''}`}
            onClick={() => navigateTo(id)}
            aria-current={view === id ? 'page' : undefined}
          >
            <span className="nav-btn-icon">{icon}</span>
            <span className="nav-btn-label">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

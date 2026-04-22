import { useApp }       from '../../context/AppContext';
import OverviewTab     from './tabs/OverviewTab';
import TemplateTab     from './tabs/TemplateTab';
import ProblemsTab     from './tabs/ProblemsTab';
import InsightsTab     from './tabs/InsightsTab';

const TABS = [
  { id: 'overview',  label: 'Overview'  },
  { id: 'template',  label: 'Template'  },
  { id: 'problems',  label: 'Problems'  },
  { id: 'insights',  label: 'Insights'  },
];

export default function LessonView() {
  const { pattern, tab, switchTab, navigateTo } = useApp();
  if (!pattern) return null;

  const tabContent = {
    overview: <OverviewTab  pattern={pattern} />,
    template: <TemplateTab  pattern={pattern} />,
    problems: <ProblemsTab  pattern={pattern} />,
    insights: <InsightsTab  pattern={pattern} />,
  };

  return (
    <>
      {/* Sticky header */}
      <div className="lesson-header">
        <button className="lesson-back" onClick={() => navigateTo('chart')}>
          ← MAP
        </button>
        <div className="lesson-header-info">
          <div className="lesson-formal-name">{pattern.formalName}</div>
          <div className="lesson-nautical-name">{pattern.name}</div>
          <div className="lesson-tagline">{pattern.tagline}</div>
        </div>
      </div>

      {/* Tab strip */}
      <div className="lesson-tabs" role="tablist">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            role="tab"
            className={`lesson-tab ${tab === id ? 'active' : ''}`}
            aria-selected={tab === id}
            onClick={() => switchTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab body */}
      <div className="lesson-body">
        {tabContent[tab]}
      </div>
    </>
  );
}

import { useApp } from './context/AppContext';
import Background  from './components/layout/Background';
import Header      from './components/layout/Header';
import BottomNav   from './components/layout/BottomNav';
import ChartView   from './components/chart/ChartView';
import LessonView  from './components/lesson/LessonView';
import CaptainView from './components/captain/CaptainView';

/**
 * Root application shell.
 * Renders the three main views and controls their visibility via CSS classes
 * rather than conditional rendering — preserves scroll position and timer state.
 */
export default function App() {
  const { view } = useApp();

  return (
    <>
      {/* Fixed background layers (camera / ocean / HUD) */}
      <Background />

      <div id="app">
        <Header />

        <main className="main">
          <div className={`view ${view === 'chart'   ? 'active' : ''}`} id="view-chart">
            <ChartView />
          </div>
          <div className={`view ${view === 'lesson'  ? 'active' : ''}`} id="view-lesson">
            <LessonView />
          </div>
          <div className={`view ${view === 'captain' ? 'active' : ''}`} id="view-captain">
            <CaptainView />
          </div>
        </main>

        <BottomNav />
      </div>
    </>
  );
}

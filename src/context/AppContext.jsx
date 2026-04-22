import { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

/** Global navigation + lesson state. Avoids prop-drilling across the component tree. */
export function AppProvider({ children }) {
  const [view,    setView]    = useState('chart');
  const [pattern, setPattern] = useState(null);
  const [tab,     setTab]     = useState('overview');

  const navigateTo   = useCallback((v) => setView(v), []);
  const openPattern  = useCallback((p) => { setPattern(p); setTab('overview'); setView('lesson'); }, []);
  const switchTab    = useCallback((t) => setTab(t), []);

  // Pre-seed the Captain chat with a pattern question, then navigate there
  const askCaptainAbout = useCallback((formalName) => {
    sessionStorage.setItem('captainSeed', `Teach me the ${formalName} pattern in depth. Use your best nautical metaphor, show me when to recognize it, and walk me through a concrete example.`);
    setView('captain');
  }, []);

  return (
    <AppContext.Provider value={{ view, pattern, tab, navigateTo, openPattern, switchTab, askCaptainAbout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside <AppProvider>');
  return ctx;
}
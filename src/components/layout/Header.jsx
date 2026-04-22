import { useRef } from 'react';
import { useApp } from '../../context/AppContext';

/** Compass needle decoration — pure CSS animation. */
function CompassWidget() {
  return (
    <div className="compass-widget" aria-hidden="true">
      <div className="compass-needle" />
    </div>
  );
}

/** Logo button — clicking navigates home with a wave-rise animation and anchor spin. */
function LogoButton() {
  const { navigateTo } = useApp();
  const waveRef   = useRef(null);
  const anchorRef = useRef(null);

  function handleClick() {
    // Spin the anchor emoji
    anchorRef.current?.classList.add('spinning');
    anchorRef.current?.addEventListener('animationend', () => {
      anchorRef.current?.classList.remove('spinning');
    }, { once: true });

    // Rise the wave, navigate, then fall
    waveRef.current?.classList.add('risen');
    setTimeout(() => navigateTo('chart'), 320);
    setTimeout(() => waveRef.current?.classList.remove('risen'), 680);
  }

  return (
    <button className="header-logo" onClick={handleClick} aria-label="Return to chart">
      <div className="logo-ripple" aria-hidden="true" />
      <div className="logo-bob">
        <span className="logo-anchor" ref={anchorRef}>⚓</span>
        <span className="logo-text">THE ALGO SEA</span>
      </div>

      {/* Animated wave strip */}
      <div className="logo-wave-wrap" ref={waveRef} aria-hidden="true">
        <svg className="logo-wave-svg" viewBox="0 0 400 56" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#00c4b8" stopOpacity="0.12" />
              <stop offset="40%"  stopColor="#00c4b8" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#006e69" stopOpacity="0.72" />
            </linearGradient>
            <linearGradient id="wg2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#00e8ff" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#00e8ff" stopOpacity="0.22" />
            </linearGradient>
          </defs>
          <path d="M0,24 C25,17 50,31 75,24 C100,17 125,31 150,24 C175,17 200,31 225,24 C250,17 275,31 300,24 C325,17 350,31 375,24 C400,17 400,24 400,24 L400,56 L0,56 Z" fill="url(#wg2)" />
          <path d="M0,21 C25,14 50,28 75,21 C100,14 125,28 150,21 C175,14 200,28 225,21 C250,14 275,28 300,21 C325,14 350,28 375,21 C400,14 400,21 400,21 L400,56 L0,56 Z" fill="url(#wg)" />
          <path d="M0,21 C25,14 50,28 75,21 C100,14 125,28 150,21 C175,14 200,28 225,21 C250,14 275,28 300,21 C325,14 350,28 375,21 C400,14 400,21" fill="none" stroke="rgba(100,255,240,0.7)" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="25"  cy="14" r="1.2" fill="rgba(180,255,248,0.55)" />
          <circle cx="125" cy="14" r="1.2" fill="rgba(180,255,248,0.55)" />
          <circle cx="225" cy="14" r="1.2" fill="rgba(180,255,248,0.55)" />
          <circle cx="325" cy="14" r="1.2" fill="rgba(180,255,248,0.55)" />
        </svg>
      </div>
    </button>
  );
}

export default function Header() {
  return (
    <header className="header">
      <LogoButton />
      <div className="header-status">
        <div className="status-dot" aria-hidden="true" />
        NAVIGATOR ACTIVE
      </div>
      <CompassWidget />
    </header>
  );
}

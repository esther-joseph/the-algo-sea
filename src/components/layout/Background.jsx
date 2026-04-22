import { useEffect, useRef } from 'react';

/** Generates a random star field on mount. Pure presentational. */
function StarField() {
  const ref = useRef(null);
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    for (let i = 0; i < 90; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      const size = Math.random() > 0.85 ? 3 : Math.random() > 0.5 ? 2 : 1;
      s.style.cssText = [
        `left:${Math.random()*100}%`,`top:${Math.random()*65}%`,
        `width:${size}px`,`height:${size}px`,
        `--d:${2+Math.random()*4}s`,`--del:${-Math.random()*5}s`,
        `opacity:${.1+Math.random()*.7}`,
      ].join(';');
      container.appendChild(s);
    }
    return () => { container.innerHTML = ''; };
  }, []);
  return <div className="stars" ref={ref} />;
}

/**
 * Full-screen background: AR camera feed (hidden by default), animated ocean,
 * HUD grid overlay, scan line, and vignette.
 */
export default function Background() {
  return (
    <>
      {/* Camera / ocean layer */}
      <div id="ar-bg">
        <video id="camera-feed" autoPlay playsInline muted />
        <div className="ocean-bg" id="ocean-bg">
          <StarField />
          <div className="waves">
            <div className="wave wave-1" />
            <div className="wave wave-2" />
            <div className="wave wave-3" />
          </div>
        </div>
      </div>

      {/* HUD decoration layers */}
      <div className="hud-grid" aria-hidden="true" />
      <div className="scan-line" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
    </>
  );
}

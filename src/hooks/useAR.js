import { useState, useCallback, useRef } from 'react';

/** Manages the AR camera stream. */
export function useAR() {
  const [arState, setArState] = useState('off'); // 'off' | 'on' | 'error'
  const streamRef = useRef(null);

  const toggle = useCallback(async () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      const v = document.getElementById('camera-feed');
      if (v) { v.srcObject = null; v.style.display = 'none'; }
      const o = document.getElementById('ocean-bg');
      if (o) o.style.display = '';
      setArState('off');
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        streamRef.current = stream;
        const v = document.getElementById('camera-feed');
        if (v) { v.srcObject = stream; v.style.display = 'block'; }
        const o = document.getElementById('ocean-bg');
        if (o) o.style.display = 'none';
        setArState('on');
      } catch {
        setArState('error');
        setTimeout(() => setArState('off'), 800);
      }
    }
  }, []);

  return { arState, toggle };
}
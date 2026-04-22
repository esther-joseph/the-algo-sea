import { useState, useRef, useCallback } from 'react';

/** Per-problem interval timer. Returns display string and color class for overtime/warning states. */
export function useTimer(recMinutes) {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const ref = useRef(null);
  const rec = recMinutes * 60;

  const start = useCallback(() => {
    if (running) return;
    setRunning(true);
    ref.current = setInterval(() => setElapsed((e) => e + 1), 1000);
  }, [running]);

  const pause = useCallback(() => { clearInterval(ref.current); setRunning(false); }, []);
  const reset = useCallback(() => { clearInterval(ref.current); setRunning(false); setElapsed(0); }, []);
  const toggle = running ? pause : start;

  const m = Math.floor(elapsed / 60), s = elapsed % 60;
  const display = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  const colorClass = elapsed > rec * 1.15 ? 'overtime' : elapsed > rec * 0.8 ? 'warning' : '';

  return { elapsed, running, display, colorClass, toggle, reset };
}
import { useEffect, useRef } from 'react';

// Run a callback every animation frame with delta-time in seconds.
export function useRaf(cb: (dt: number, t: number) => void, running = true) {
  const ref = useRef(cb);
  ref.current = cb;

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last = performance.now();
    const loop = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.1);
      last = t;
      ref.current(dt, t / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running]);
}

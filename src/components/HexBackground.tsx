'use client';

import * as React from 'react';
import CanvasShell from '@components/CanvasShell';
import { hexToRgba } from '@common/color';

const LIGHT = { color: '#b3c0d4', size: 38 };
const DARK = { color: '#3d4757', size: 38 };
const ORANGE = '#ff9d2d';

function resolveDark(): boolean {
  if (typeof window === 'undefined') return true;
  const t = document.documentElement.dataset.theme;
  if (t === 'dark') return true;
  if (t === 'light') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

interface Edge {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  mx: number;
  my: number;
}

interface Session {
  ox: number;
  oy: number;
  count: number;
  max: number;
  start: number;
}

/** deterministic 0..1 hash — used for per-edge glitch noise */
function hash(i: number, salt: number): number {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Full-viewport hexagon backdrop.
 * Individual hexagon EDGES animate: a small orange ring spreads outward from
 * the pointer a couple of times then stops. Idle frames are skipped entirely
 * (the static grid is drawn once and the canvas left alone) to keep CPU low.
 */
const HexBackground: React.FC = () => {
  const [dark, setDark] = React.useState<boolean>(resolveDark);

  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => setDark(resolveDark());
    mq.addEventListener('change', onChange);

    const observer = new MutationObserver(onChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      mq.removeEventListener('change', onChange);
      observer.disconnect();
    };
  }, []);

  const size = dark ? DARK.size : LIGHT.size;
  const baseColor = dark ? DARK.color : LIGHT.color;

  const pointerRef = React.useRef<{ x: number; y: number } | null>(null);
  const sessionRef = React.useRef<Session | null>(null);
  const edgesRef = React.useRef<{ key: string; edges: Edge[] }>({ key: '', edges: [] });
  const drawnRef = React.useRef('');
  const reducedRef = React.useRef(false);

  // Track the pointer at window level so hovering over content (which sits
  // above the fixed canvas) still drives the pulse near the cursor.
  React.useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointerRef.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => {
      pointerRef.current = null;
    };
    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  // Respect prefers-reduced-motion: no pulse when reduced motion is requested.
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedRef.current = mq.matches;
    const onChange = () => {
      reducedRef.current = mq.matches;
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      const key = `${w}x${h}x${size}`;

      // Build the edge list once per size/geometry (memoised across frames).
      let edges = edgesRef.current.edges;
      if (edgesRef.current.key !== key) {
        const rowH = Math.sqrt(3) * size;
        const colW = 1.5 * size;
        const cols = Math.ceil(w / colW) + 2;
        const rows = Math.ceil(h / rowH) + 2;
        edges = [];
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const x = c * colW;
            const y = r * rowH + (c % 2 ? rowH / 2 : 0);
            for (let k = 0; k < 6; k++) {
              const a1 = (Math.PI / 3) * k;
              const a2 = (Math.PI / 3) * (k + 1);
              const x1 = x + size * Math.cos(a1);
              const y1 = y + size * Math.sin(a1);
              const x2 = x + size * Math.cos(a2);
              const y2 = y + size * Math.sin(a2);
              edges.push({ x1, y1, x2, y2, mx: (x1 + x2) / 2, my: (y1 + y2) / 2 });
            }
          }
        }
        edgesRef.current = { key, edges };
        drawnRef.current = '';
      }

      const line = (e: Edge, color: string, alpha: number, width = 1) => {
        ctx.beginPath();
        ctx.moveTo(e.x1, e.y1);
        ctx.lineTo(e.x2, e.y2);
        ctx.strokeStyle = hexToRgba(color, alpha);
        ctx.lineWidth = width;
        ctx.stroke();
      };

      const drawBase = () => {
        ctx.lineWidth = 1;
        for (const e of edges) line(e, baseColor, 0.3);
      };

      // ---- determine whether a pulse is currently active ----
      const p = reducedRef.current ? null : pointerRef.current;
      let session = sessionRef.current;
      let active = false;

      if (p) {
        if (!session || Math.hypot(p.x - session.ox, p.y - session.oy) > size * 5) {
          session = { ox: p.x, oy: p.y, count: 0, max: 2 + Math.floor(Math.random() * 2), start: t };
          sessionRef.current = session;
        }
        const maxR = Math.min(w, h) * 0.18;
        const speed = maxR / 1.6;
        let R = (t - session.start) * speed;
        while (R >= maxR && session.count < session.max) {
          session.count += 1;
          session.start += maxR / speed;
          R = (t - session.start) * speed;
        }
        active = session.count < session.max && R >= 0;
      } else {
        sessionRef.current = null;
      }

      // ---- idle: draw the static grid once, then skip frames ----
      if (!active) {
        if (drawnRef.current === key) return;
        ctx.clearRect(0, 0, w, h);
        drawBase();
        drawnRef.current = key;
        return;
      }

      // ---- active: full redraw with the pulse ----
      ctx.clearRect(0, 0, w, h);
      drawBase();
      drawnRef.current = '';

      const maxR = Math.min(w, h) * 0.18;
      const speed = maxR / 1.6;
      const R = Math.min((t - session.start) * speed, maxR);
      const band = size * 1.5;
      const taper = Math.pow(1 - R / maxR, 1.3);
      const salt = Math.floor(t * 9);

      for (let i = 0; i < edges.length; i++) {
        const e = edges[i];
        const d = Math.hypot(e.mx - session.ox, e.my - session.oy);
        const noise = hash(i, salt);
        const dd = d * (1 + 0.16 * (noise - 0.5) * 2);
        const ring = Math.abs(dd - R);

        if (ring < band) {
          const flicker = 0.5 + 0.5 * hash(i, salt + 7);
          const a = Math.max(0, 1 - ring / band) * taper * (0.5 + 0.5 * flicker);
          line(e, ORANGE, a, 1.4);
        } else if (d < R) {
          const trail = Math.max(0, 1 - (R - d) / (band * 2));
          if (trail > 0.03) line(e, ORANGE, trail * 0.12 * taper, 1);
        }
      }

      ctx.lineWidth = 1;
    },
    [size, baseColor],
  );

  return (
    <div className="bg-hex" aria-hidden="true">
      <CanvasShell
        draw={draw}
        height="100%"
        style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}
      />
    </div>
  );
};

export default HexBackground;

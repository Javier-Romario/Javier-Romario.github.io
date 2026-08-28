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
 * the pointer, each edge lighting on its own with jagged/glitchy noise, and
 * brightness tapering off as the ring nears its (short) outer radius.
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

  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      ctx.clearRect(0, 0, w, h);

      const rowH = Math.sqrt(3) * size;
      const colW = 1.5 * size;
      const cols = Math.ceil(w / colW) + 2;
      const rows = Math.ceil(h / rowH) + 2;

      // Build the edge list once per size/geometry (memoised across frames).
      const key = `${w}x${h}x${size}`;
      let edges = edgesRef.current.edges;
      if (edgesRef.current.key !== key) {
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
      }

      const line = (e: Edge, color: string, alpha: number, width = 1) => {
        ctx.beginPath();
        ctx.moveTo(e.x1, e.y1);
        ctx.lineTo(e.x2, e.y2);
        ctx.strokeStyle = hexToRgba(color, alpha);
        ctx.lineWidth = width;
        ctx.stroke();
      };

      // ---- base grid (static, subtle) ----
      ctx.lineWidth = 1;
      for (const e of edges) {
        line(e, baseColor, 0.3);
      }

      // ---- expanding pulse following the pointer (fires 2–3 times, then stops) ----
      const p = pointerRef.current;
      if (!p) {
        sessionRef.current = null;
      } else {
        let s = sessionRef.current;
        // fresh burst when pointer (re)enters or moves well away from origin
        if (!s || Math.hypot(p.x - s.ox, p.y - s.oy) > size * 5) {
          s = { ox: p.x, oy: p.y, count: 0, max: 2 + Math.floor(Math.random() * 2), start: t };
          sessionRef.current = s;
        }

        const maxR = Math.min(w, h) * 0.18; // short spread, dies well before page edge
        const speed = maxR / 1.6; // one full spread ≈ 1.6s
        let R = (t - s.start) * speed;

        // advance past any completed pulses
        while (R >= maxR && s.count < s.max) {
          s.count += 1;
          s.start += maxR / speed;
          R = (t - s.start) * speed;
        }

        // only draw while a pulse is still active
        if (s.count < s.max && R >= 0) {
          const r = Math.min(R, maxR);
          const band = size * 1.5;
          // brightness tapers toward the outer edge of the spread
          const taper = Math.pow(1 - r / maxR, 1.3);
          const salt = Math.floor(t * 9);

          for (let i = 0; i < edges.length; i++) {
            const e = edges[i];
            const d = Math.hypot(e.mx - s.ox, e.my - s.oy);

            // per-edge viral distortion
            const noise = hash(i, salt);
            const dd = d * (1 + 0.16 * (noise - 0.5) * 2);
            const ring = Math.abs(dd - r);

            if (ring < band) {
              const flicker = 0.5 + 0.5 * hash(i, salt + 7);
              const a = Math.max(0, 1 - ring / band) * taper * (0.5 + 0.5 * flicker);
              line(e, ORANGE, a, 1.4);
            } else if (d < r) {
              // faint residue trailing the wave
              const trail = Math.max(0, 1 - (r - d) / (band * 2));
              if (trail > 0.03) {
                line(e, ORANGE, trail * 0.12 * taper, 1);
              }
            }
          }
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

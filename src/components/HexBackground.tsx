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

interface Pt {
  x: number;
  y: number;
}

/**
 * Full-viewport hexagon backdrop.
 * Static grey grid; on hover, an orange pulse walks a glitchy chain of
 * hexagon lines — each lit line is followed by the next hexagon's line plus
 * the connecting edge — with small random jitter/flicker for a glitch feel.
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

  const pointerRef = React.useRef<Pt | null>(null);
  const chainRef = React.useRef<Pt[]>([]);
  const chainKeyRef = React.useRef<string>('');
  const chainUntilRef = React.useRef(0);

  // Track the pointer at window level so hovering over content (which sits
  // above the fixed canvas) still drives the hex pulse near the cursor.
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

      const centers: Pt[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          centers.push({ x: c * colW, y: r * rowH + (c % 2 ? rowH / 2 : 0) });
        }
      }

      const trace = (x: number, y: number) => {
        ctx.beginPath();
        for (let k = 0; k < 6; k++) {
          const a = (Math.PI / 3) * k;
          const px = x + size * Math.cos(a);
          const py = y + size * Math.sin(a);
          if (k === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
      };

      const strokeHex = (x: number, y: number, color: string, alpha: number, width = 1) => {
        trace(x, y);
        ctx.strokeStyle = hexToRgba(color, alpha);
        ctx.lineWidth = width;
        ctx.stroke();
      };

      // ---- base grid (static, subtle) ----
      ctx.lineWidth = 1;
      for (const c of centers) {
        strokeHex(c.x, c.y, baseColor, 0.3);
      }

      // ---- hover chain ----
      const pointer = pointerRef.current;
      if (pointer) {
        // nearest hex to the pointer
        let nearest: Pt | null = null;
        let bd = Infinity;
        for (const c of centers) {
          const d = Math.hypot(c.x - pointer.x, c.y - pointer.y);
          if (d < bd) {
            bd = d;
            nearest = c;
          }
        }

        if (nearest && bd < size * 1.6) {
          const key = `${Math.round(nearest.x)},${Math.round(nearest.y)}`;
          if (chainKeyRef.current !== key || t > chainUntilRef.current) {
            chainKeyRef.current = key;
            chainUntilRef.current = t + 1.6 + Math.random() * 2.2;

            // random walk over nearby hexes (≈ neighbours)
            const chain: Pt[] = [nearest];
            let cur = nearest;
            const steps = 5 + Math.floor(Math.random() * 5);
            for (let i = 0; i < steps; i++) {
              const candidates = centers
                .filter((c) => c !== cur && !chain.includes(c))
                .map((c) => ({ c, d: Math.hypot(c.x - cur.x, c.y - cur.y) }))
                .sort((a, b) => a.d - b.d)
                .slice(0, 6);
              if (!candidates.length) break;
              const pick = candidates[Math.floor(Math.random() * Math.min(3, candidates.length))];
              chain.push(pick.c);
              cur = pick.c;
            }
            chainRef.current = chain;
          }

          const chain = chainRef.current;
          const n = chain.length;
          if (n > 1) {
            // wavefront position along the chain (hexes per second)
            const pos = (t * 2.4) % (n + 1);
            let idx = Math.floor(pos);
            const frac = pos - idx;

            // glitch: random ±1/±2 jump, occasional flicker
            const g = Math.random();
            let jitter = 0;
            if (g < 0.07) jitter = Math.random() < 0.5 ? -1 : 1;
            else if (g < 0.13) jitter = Math.random() < 0.5 ? -2 : 2;
            const flicker = Math.random() < 0.05 ? Math.random() * 0.5 + 0.3 : 1;

            const gi = Math.max(0, Math.min(n - 1, idx + jitter));
            const aCur = Math.max(0, 1 - frac) * flicker;
            const aNext = Math.min(1, frac) * flicker;

            const cur = chain[gi];
            const next = chain[Math.min(gi + 1, n - 1)];

            // connecting edge ("additional connected line")
            if (cur && next && next !== cur) {
              ctx.beginPath();
              ctx.moveTo(cur.x, cur.y);
              ctx.lineTo(next.x, next.y);
              ctx.strokeStyle = hexToRgba(ORANGE, Math.max(aCur, aNext));
              ctx.lineWidth = 1.5;
              ctx.stroke();
            }

            // lit hex lines + faint fill
            if (cur) {
              strokeHex(cur.x, cur.y, ORANGE, Math.max(0.3, aCur), 1.5);
              trace(cur.x, cur.y);
              ctx.fillStyle = hexToRgba(ORANGE, 0.06 * aCur);
              ctx.fill();
            }
            if (next && next !== cur) {
              strokeHex(next.x, next.y, ORANGE, Math.max(0.3, aNext), 1.5);
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

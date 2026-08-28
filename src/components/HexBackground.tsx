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

/** deterministic 0..1 hash — used for per-hex glitch noise */
function hash(i: number, salt: number): number {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Full-viewport hexagon backdrop.
 * A subtle orange pulse follows the pointer: an expanding ring of lit hexagon
 * lines spreads outward from the cursor with a jagged, glitchy "viral" edge
 * (per-hex noise + flicker) and dies out before reaching the page edge.
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

      // ---- expanding pulse following the pointer ----
      const p = pointerRef.current;
      if (p) {
        const maxR = Math.min(w, h) * 0.42; // die out before the page edge
        const speed = maxR / 2; // one full spread ≈ 2s
        const R = (t * speed) % maxR;
        const band = size * 2.1; // ring thickness
        const salt = Math.floor(t * 9); // glitchy flicker time-bucket

        for (let i = 0; i < centers.length; i++) {
          const c = centers[i];
          const d = Math.hypot(c.x - p.x, c.y - p.y);

          // viral distortion: per-hex jaggedness on the wavefront
          const noise = hash(i, salt);
          const dd = d * (1 + 0.14 * (noise - 0.5) * 2);
          const ring = Math.abs(dd - R);

          if (ring < band) {
            const flicker = 0.5 + 0.5 * hash(i, salt + 7);
            const a = Math.max(0, 1 - ring / band) * (0.45 + 0.55 * flicker);
            strokeHex(c.x, c.y, ORANGE, a, 1.4);
            trace(c.x, c.y);
            ctx.fillStyle = hexToRgba(ORANGE, 0.05 * a);
            ctx.fill();
          } else if (d < R) {
            // faint viral residue trailing the wave
            const trail = Math.max(0, 1 - (R - d) / (band * 2.4));
            if (trail > 0.04) {
              strokeHex(c.x, c.y, ORANGE, trail * 0.16, 1);
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

import { useEffect, useRef, useState } from 'react';
import { toScreen, H, V } from '../lib/iso';
import { centerIso, drawCube } from './shared';

const GW = 5;
const GH = 5;

interface Block {
  x: number;
  y: number;
  h: number;
  c: string;
}

// Insert order deliberately wrong (front first) to show the bug when unsorted.
const BLOCKS: Block[] = [
  { x: 2, y: 2, h: 56, c: '#ff2d78' },
  { x: 1, y: 1, h: 56, c: '#00ffd1' },
  { x: 0, y: 0, h: 56, c: '#00a896' },
];

export default function DemoDepth() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sorted, setSorted] = useState(true);
  const [height, setHeight] = useState(56);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    c.width = 720;
    c.height = 440;
  }, []);

  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return;
    const W = c.width;
    const Hh = c.height;
    const { ox, oy } = centerIso(GW, GH, W, Hh, 40);

    ctx.fillStyle = '#04070b';
    ctx.fillRect(0, 0, W, Hh);

    // grid underlay
    for (let y = 0; y < GH; y++) {
      for (let x = 0; x < GW; x++) {
        const s = toScreen(x, y, ox, oy);
        ctx.beginPath();
        ctx.moveTo(s.x, s.y - V);
        ctx.lineTo(s.x + H, s.y);
        ctx.lineTo(s.x, s.y + V);
        ctx.lineTo(s.x - H, s.y);
        ctx.closePath();
        ctx.strokeStyle = '#0d1a22';
        ctx.stroke();
      }
    }

    const blocks = BLOCKS.map((b) => ({ ...b, h: height }));
    const order = sorted
      ? [...blocks].sort((a, b) => a.x + a.y - (b.x + b.y))
      : blocks; // unsorted = wrong insertion order

    order.forEach((b) => {
      const s = toScreen(b.x, b.y, ox, oy);
      const shade = (hex: string) => hex;
      drawCube(ctx, s.x, s.y, b.h, H, V, {
        top: shade(b.c),
        right: b.c,
        left: '#0b2a2e',
      });
    });
  }, [sorted, height]);

  return (
    <div className="demo-box">
      <canvas ref={canvasRef} />
      <div className="demo-controls">
        <button className={sorted ? 'btn primary' : 'btn'} onClick={() => setSorted((s) => !s)}>
          {sorted ? 'y-sort: ON ✓' : 'y-sort: OFF ✗'}
        </button>
        <label>
          height
          <input
            type="range"
            min={20}
            max={100}
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
        </label>
        <span className="demo-readout">
          {sorted ? 'correct: back drawn first' : 'bug: front drawn first, overlap wrong'}
        </span>
      </div>
    </div>
  );
}

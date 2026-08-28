import { useEffect, useRef, useState } from 'react';
import type { Pt } from '../lib/iso';

const COLS = 8;
const ROWS = 4;
const CELL = 62;
const OX = 22;
const OY = 22;

export default function DemoGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hover, setHover] = useState<Pt | null>(null);
  const [pinned, setPinned] = useState<Pt | null>(null);
  const [dist, setDist] = useState(0);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    c.width = OX * 2 + COLS * CELL;
    c.height = OY * 2 + ROWS * CELL;
  }, []);

  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return;
    const W = c.width;
    const Hh = c.height;
    ctx.fillStyle = '#04070b';
    ctx.fillRect(0, 0, W, Hh);

    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const px = OX + x * CELL;
        const py = OY + y * CELL;
        const active = hover?.x === x && hover?.y === y;
        const isPin = pinned?.x === x && pinned?.y === y;
        const isOrigin = x === 0 && y === 0;
        ctx.fillStyle = isOrigin
          ? '#ff2d78'
          : isPin
          ? '#00ffd1'
          : active
          ? '#0e2a2a'
          : '#0a111c';
        ctx.fillRect(px, py, CELL, CELL);
        ctx.strokeStyle = isPin || isOrigin ? '#00ffd1' : '#12313a';
        ctx.strokeRect(px, py, CELL, CELL);
        ctx.fillStyle = '#5f8f88';
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillText(`${x},${y}`, px + 4, py + 12);
      }
    }
  }, [hover, pinned]);

  const pick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const c = canvasRef.current;
    if (!c) return;
    const rect = c.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * c.width;
    const py = ((e.clientY - rect.top) / rect.height) * c.height;
    const x = Math.floor((px - OX) / CELL);
    const y = Math.floor((py - OY) / CELL);
    if (x < 0 || y < 0 || x >= COLS || y >= ROWS) return;
    setHover({ x, y });
    setDist(Math.abs(x) + Math.abs(y)); // manhattan from (0,0)
  };

  return (
    <div className="demo-box">
      <canvas
        ref={canvasRef}
        onMouseMove={pick}
        onMouseLeave={() => setHover(null)}
        onClick={() => setPinned(hover)}
      />
      <div className="demo-controls">
        <span className="demo-readout">
          {hover
            ? `tile(${hover.x},${hover.y}) → distance from (0,0) = ${dist}`
            : 'hover a cell · click to pin'}
        </span>
      </div>
    </div>
  );
}

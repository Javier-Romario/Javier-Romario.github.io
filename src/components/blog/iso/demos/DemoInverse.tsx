import { useEffect, useRef, useState } from 'react';
import { toScreen, toTile, H } from '../lib/iso';
import type { Pt } from '../lib/iso';
import { centerIso, drawTile } from './shared';

const GW = 6;
const GH = 6;
const V = 16;

export default function DemoInverse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tile, setTile] = useState<Pt | null>(null);
  const [mouse, setMouse] = useState<Pt | null>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    c.width = 720;
    c.height = 420;
  }, []);

  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return;
    const W = c.width;
    const Hh = c.height;
    const { ox, oy } = centerIso(GW, GH, W, Hh, 30);

    ctx.fillStyle = '#04070b';
    ctx.fillRect(0, 0, W, Hh);

    for (let y = 0; y < GH; y++) {
      for (let x = 0; x < GW; x++) {
        const s = toScreen(x, y, ox, oy);
        const hit = tile?.x === x && tile?.y === y;
        drawTile(ctx, s.x, s.y, H, V, hit ? '#0e2f2f' : '#0a111c', hit ? '#00ffd1' : '#1d5a63');
        if (hit) {
          ctx.fillStyle = '#00ffd1';
          ctx.font = '11px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.fillText(`${x},${y}`, s.x, s.y + 3);
        }
      }
    }
    ctx.textAlign = 'left';
  }, [tile]);

  const move = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const c = canvasRef.current;
    if (!c) return;
    const rect = c.getBoundingClientRect();
    const sx = ((e.clientX - rect.left) / rect.width) * c.width;
    const sy = ((e.clientY - rect.top) / rect.height) * c.height;
    const { ox, oy } = centerIso(GW, GH, c.width, c.height, 30);
    setMouse({ x: Math.round(sx - ox), y: Math.round(sy - oy) });
    const t = toTile(sx, sy, ox, oy);
    if (t.x < 0 || t.y < 0 || t.x >= GW || t.y >= GH) { setTile(null); return; }
    setTile(t);
  };

  return (
    <div className="demo-box">
      <canvas ref={canvasRef} onMouseMove={move} onMouseLeave={() => { setTile(null); setMouse(null); }} />
      <div className="demo-controls">
        <span className="demo-readout">
          {mouse
            ? `screen(${mouse.x},${mouse.y}) → ${tile ? `tile(${tile.x},${tile.y})` : 'outside grid'}`
            : 'move mouse — watch it pick the right tile'}
        </span>
      </div>
    </div>
  );
}

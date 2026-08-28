import { useEffect, useRef, useState } from 'react';
import { toScreen, H, V } from '../lib/iso';
import { centerIso, drawCube, drawTile } from './shared';

const GW = 6;
const GH = 6;

const CUBES = [
  { x: 1, y: 1, h: 40 },
  { x: 2, y: 2, h: 80 },
  { x: 4, y: 3, h: 30 },
];

export default function DemoTiles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sel, setSel] = useState(1);
  const [height, setHeight] = useState(80);
  const [wire, setWire] = useState(false);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    c.width = 720;
    c.height = 460;
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

    // tiles
    for (let y = 0; y < GH; y++) {
      for (let x = 0; x < GW; x++) {
        const s = toScreen(x, y, ox, oy);
        drawTile(ctx, s.x, s.y, H, V, '#0a111c', '#1d5a63');
      }
    }

    const cubes = CUBES.map((c, i) => ({ ...c, h: i === sel ? height : c.h }));

    if (wire) {
      // wireframe: only edges of the cube
      cubes.forEach((c) => {
        const s = toScreen(c.x, c.y, ox, oy);
        const topY = s.y - c.h;
        ctx.strokeStyle = '#00ffd1';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y - V); ctx.lineTo(s.x + H, s.y);
        ctx.lineTo(s.x, s.y + V); ctx.lineTo(s.x - H, s.y); ctx.closePath();
        ctx.moveTo(s.x, topY - V); ctx.lineTo(s.x + H, topY);
        ctx.lineTo(s.x, topY + V); ctx.lineTo(s.x - H, topY); ctx.closePath();
        // vertical edges
        ctx.moveTo(s.x - H, topY); ctx.lineTo(s.x - H, s.y);
        ctx.moveTo(s.x + H, topY); ctx.lineTo(s.x + H, s.y);
        ctx.moveTo(s.x, topY - V); ctx.lineTo(s.x, s.y - V);
        ctx.moveTo(s.x, topY + V); ctx.lineTo(s.x, s.y + V);
        ctx.stroke();
      });
    } else {
      cubes.forEach((c, i) => {
        const s = toScreen(c.x, c.y, ox, oy);
        const isSel = i === sel ? 1 : 0;
        drawCube(ctx, s.x, s.y, c.h, H, V, {
          top: isSel ? '#00ffd1' : '#0affef',
          right: isSel ? '#00a896' : '#0b6b63',
          left: '#06312e',
        });
      });
    }
  }, [sel, height, wire]);

  return (
    <div className="demo-box">
      <canvas ref={canvasRef} />
      <div className="demo-controls">
        <button className="btn" onClick={() => setWire((w) => !w)}>
          {wire ? 'solid' : 'wireframe'}
        </button>
        <label>
          select cube
          <select value={sel} onChange={(e) => setSel(Number(e.target.value))} style={{ background: 'var(--neo-surface)', color: 'var(--theme-focused-foreground)', border: '1px solid var(--theme-border-bright)', borderRadius: 6, fontFamily: 'inherit' }}>
            {CUBES.map((c, i) => (
              <option key={i} value={i}>cube {i + 1} ({c.x},{c.y})</option>
            ))}
          </select>
        </label>
        <label>
          height
          <input type="range" min={0} max={120} value={height} onChange={(e) => setHeight(Number(e.target.value))} />
        </label>
        <span className="demo-readout">top = (x+y)·{V} − {height}</span>
      </div>
    </div>
  );
}

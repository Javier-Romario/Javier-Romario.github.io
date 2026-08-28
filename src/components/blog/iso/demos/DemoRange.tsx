import { useEffect, useRef, useState } from 'react';
import { toScreen, toTile, reachable, key, H, V } from '../lib/iso';
import type { Pt } from '../lib/iso';
import { centerIso, drawCube, drawTile } from './shared';

const GW = 8;
const GH = 8;
const WALLS = new Set(['3,2', '3,3', '3,4', '5,5', '6,5', '2,6']);

export default function DemoRange() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [unit, setUnit] = useState<Pt>({ x: 2, y: 3 });
  const [move, setMove] = useState(3);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    c.width = 720;
    c.height = 500;
  }, []);

  const range = reachable(unit, move, WALLS, GW, GH);

  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return;
    const W = c.width;
    const Hh = c.height;
    const { ox, oy } = centerIso(GW, GH, W, Hh, 44);

    ctx.fillStyle = '#04070b';
    ctx.fillRect(0, 0, W, Hh);

    for (let y = 0; y < GH; y++) {
      for (let x = 0; x < GW; x++) {
        const s = toScreen(x, y, ox, oy);
        const k = `${x},${y}`;
        const isUnit = unit.x === x && unit.y === y;
        const isWall = WALLS.has(k);
        const inRange = range.has(k) && !isUnit;
        let fill = '#0a111c';
        let stroke = '#1d5a63';
        if (isWall) { fill = '#1a0f1f'; stroke = '#ff2d78'; }
        else if (inRange) { fill = '#0e2f2f'; stroke = '#00a896'; }
        drawTile(ctx, s.x, s.y, H, V, fill, stroke);
        if (inRange) {
          const cost = range.get(k)!;
          ctx.fillStyle = '#00ffd1';
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.fillText(String(cost), s.x, s.y + 3);
        }
      }
    }

    // unit cube
    const s = toScreen(unit.x, unit.y, ox, oy);
    ctx.shadowColor = '#00ffd1';
    ctx.shadowBlur = 14;
    drawCube(ctx, s.x, s.y, 30, H, V, { top: '#00ffd1', right: '#00a896', left: '#06312e' });
    ctx.shadowBlur = 0;
    ctx.textAlign = 'left';
  }, [unit, move, range]);

  const click = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const c = canvasRef.current;
    if (!c) return;
    const rect = c.getBoundingClientRect();
    const sx = ((e.clientX - rect.left) / rect.width) * c.width;
    const sy = ((e.clientY - rect.top) / rect.height) * c.height;
    const { ox, oy } = centerIso(GW, GH, c.width, c.height, 44);
    const t = toTile(sx, sy, ox, oy);
    if (t.x < 0 || t.y < 0 || t.x >= GW || t.y >= GH) return;
    if (range.has(key(t)) && !WALLS.has(key(t))) setUnit(t);
  };

  return (
    <div className="demo-box">
      <canvas ref={canvasRef} onClick={click} />
      <div className="demo-controls">
        <label>
          move points
          <input type="range" min={1} max={6} value={move} onChange={(e) => setMove(Number(e.target.value))} />
        </label>
        <span className="demo-readout">
          move {move} · {range.size - 1} tiles reachable · click a teal tile to move
        </span>
      </div>
    </div>
  );
}

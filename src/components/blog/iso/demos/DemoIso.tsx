import { useEffect, useRef, useState } from 'react';
import { toScreen, H } from '../lib/iso';
import type { Pt } from '../lib/iso';
import { centerIso, drawTile } from './shared';

const GW = 6;
const GH = 6;

export default function DemoIso() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tileH, setTileH] = useState(32); // 32 = 2:1 ratio
  const [hover, setHover] = useState<Pt | null>(null);

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
    const V = tileH / 2;
    const { ox, oy } = centerIso(GW, GH, W, Hh, 30);

    ctx.fillStyle = '#04070b';
    ctx.fillRect(0, 0, W, Hh);

    for (let y = 0; y < GH; y++) {
      for (let x = 0; x < GW; x++) {
        const s = toScreen(x, y, ox, oy);
        const isHover = hover?.x === x && hover?.y === y;
        drawTile(
          ctx,
          s.x,
          s.y,
          H,
          V,
          isHover ? '#0e2f2f' : x === 0 && y === 0 ? '#1a0f1f' : '#0a111c',
          isHover ? '#00ffd1' : '#1d5a63'
        );
        if (hover?.x === x && hover?.y === y) {
          ctx.fillStyle = '#00ffd1';
          ctx.font = '11px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.fillText(`${x},${y}`, s.x, s.y + 3);
        }
      }
    }
    ctx.textAlign = 'left';
  }, [tileH, hover]);

  const pick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const c = canvasRef.current;
    if (!c) return;
    const rect = c.getBoundingClientRect();
    const sx = ((e.clientX - rect.left) / rect.width) * c.width;
    const sy = ((e.clientY - rect.top) / rect.height) * c.height;
    const V = tileH / 2;
    const { ox, oy } = centerIso(GW, GH, c.width, c.height, 30);
    const fx = (sx - ox) / H;
    const fy = (sy - oy) / V;
    const x = Math.floor((fx + fy) / 2);
    const y = Math.floor((fy - fx) / 2);
    if (x < 0 || y < 0 || x >= GW || y >= GH) { setHover(null); return; }
    setHover({ x, y });
  };

  const V = tileH / 2;
  const ratio = (tileH === 32 ? '2:1' : `${(64 / tileH).toFixed(1)}:1`);

  return (
    <div className="demo-box">
      <canvas ref={canvasRef} onMouseMove={pick} onMouseLeave={() => setHover(null)} />
      <div className="demo-controls">
        <label>
          tile height
          <input
            type="range"
            min={8}
            max={32}
            value={tileH}
            onChange={(e) => setTileH(Number(e.target.value))}
          />
        </label>
        <span className="demo-readout">
          ratio {ratio} · H {H} · V {V}
          {hover && ` · sx=${(hover.x - hover.y) * H} sy=${(hover.x + hover.y) * V}`}
        </span>
      </div>
    </div>
  );
}

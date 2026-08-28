import { useEffect, useRef, useState } from 'react';
import { astar, key } from '../lib/iso';
import type { Pt } from '../lib/iso';

const COLS = 12;
const ROWS = 8;
const CELL = 48;
const START: Pt = { x: 0, y: 0 };
const GOAL: Pt = { x: 11, y: 7 };

export default function DemoAStar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [walls, setWalls] = useState<Set<string>>(
    () => new Set(['5,1', '5,2', '5,3', '5,4', '5,5', '5,6', '8,2', '8,3', '8,4'])
  );
  const [path, setPath] = useState<Pt[] | null>(null);
  const [revealed, setRevealed] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    c.width = 12 + COLS * CELL + 12;
    c.height = 12 + ROWS * CELL + 12;
  }, []);

  useEffect(() => {
    if (!running) return;
    if (revealed >= (path?.length ?? 0)) {
      setRunning(false);
      return;
    }
    const id = setTimeout(() => setRevealed((r) => r + 1), 60);
    return () => clearTimeout(id);
  }, [running, revealed, path]);

  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return;
    const W = c.width;
    const Hh = c.height;
    ctx.fillStyle = '#04070b';
    ctx.fillRect(0, 0, W, Hh);
    const ox = 12;
    const oy = 12;

    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const px = ox + x * CELL;
        const py = oy + y * CELL;
        const k = `${x},${y}`;
        const isWall = walls.has(k);
        const isStart = START.x === x && START.y === y;
        const isGoal = GOAL.x === x && GOAL.y === y;
        const onPath = path?.slice(0, revealed).some((p) => p.x === x && p.y === y);
        ctx.fillStyle = isStart ? '#ff2d78' : isGoal ? '#00ffd1' : isWall ? '#1a0f1f' : onPath ? '#0e2f2f' : '#0a111c';
        ctx.fillRect(px, py, CELL, CELL);
        ctx.strokeStyle = onPath ? '#00ffd1' : '#12313a';
        ctx.strokeRect(px, py, CELL, CELL);
        if (isStart || isGoal) {
          ctx.fillStyle = '#04070b';
          ctx.font = 'bold 13px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.fillText(isStart ? 'A' : 'B', px + CELL / 2, py + CELL / 2 + 4);
          ctx.textAlign = 'left';
        }
      }
    }
  }, [walls, path, revealed]);

  const run = () => {
    const p = astar(START, GOAL, walls, COLS, ROWS);
    setPath(p);
    setRevealed(0);
    setRunning(true);
  };

  const toggleWall = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const c = canvasRef.current;
    if (!c) return;
    const rect = c.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * c.width;
    const py = ((e.clientY - rect.top) / rect.height) * c.height;
    const x = Math.floor((px - 12) / CELL);
    const y = Math.floor((py - 12) / CELL);
    if (x < 0 || y < 0 || x >= COLS || y >= ROWS) return;
    const k = `${x},${y}`;
    if (k === key(START) || k === key(GOAL)) return;
    setPath(null);
    setRevealed(0);
    setRunning(false);
    setWalls((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  };

  return (
    <div className="demo-box">
      <canvas ref={canvasRef} onClick={toggleWall} />
      <div className="demo-controls">
        <button className="btn primary" onClick={run}>run A*</button>
        <button className="btn" onClick={() => { setWalls(new Set()); setPath(null); setRevealed(0); setRunning(false); }}>
          clear walls
        </button>
        <span className="demo-readout">
          {path ? (path.length === 0 ? 'A and B same tile' : `path length ${path.length}`) : 'click cells to add/remove walls · then run'}
        </span>
      </div>
    </div>
  );
}

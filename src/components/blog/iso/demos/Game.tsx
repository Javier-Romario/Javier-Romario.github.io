import { useEffect, useRef, useState } from 'react';
import {
  toScreen,
  toTile,
  reachable,
  astar,
  key,
  manhattan,
  stepCost,
  H,
  V,
} from '../lib/iso';
import type { Pt } from '../lib/iso';
import { centerIso, drawCube, drawTile } from './shared';

const GRID = 8;
const CANVAS_W = 760;
const CANVAS_H = 560;
const LEVEL = 14; // px per terrain level
const SIGHT = 4; // vision range in steps
const WALL_H = 3; // wall cube height in levels

interface Unit {
  id: number;
  team: 'p' | 'e';
  x: number;
  y: number;
  hp: number;
  maxHp: number;
  atk: number;
  move: number;
  range: number; // attack reach in tiles (1 melee, 3 ranged)
  acted: boolean;
  name: string;
}

interface Level {
  name: string;
  heights: number[][];
  walls: string[];
  startUnits: Unit[];
}

const FLAT = Array.from({ length: GRID }, () => Array(GRID).fill(0));

const PLATEAU: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 1, 2, 1, 0, 0, 0],
  [0, 0, 1, 2, 2, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

const CANYON_H: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

const LEVELS: Level[] = [
  {
    name: '01 · FLATLINE',
    heights: FLAT,
    walls: [],
    startUnits: [
      { id: 1, team: 'p', x: 1, y: 1, hp: 20, maxHp: 20, atk: 5, move: 4, range: 1, acted: false, name: 'RUNNER-1' },
      { id: 2, team: 'p', x: 2, y: 1, hp: 16, maxHp: 16, atk: 6, move: 4, range: 1, acted: false, name: 'RUNNER-2' },
      { id: 3, team: 'p', x: 1, y: 2, hp: 22, maxHp: 22, atk: 4, move: 4, range: 1, acted: false, name: 'RUNNER-3' },
      { id: 4, team: 'e', x: 6, y: 6, hp: 20, maxHp: 20, atk: 5, move: 4, range: 1, acted: false, name: 'DRONE-A' },
      { id: 5, team: 'e', x: 6, y: 5, hp: 16, maxHp: 16, atk: 6, move: 4, range: 1, acted: false, name: 'DRONE-B' },
      { id: 6, team: 'e', x: 5, y: 6, hp: 22, maxHp: 22, atk: 4, move: 4, range: 1, acted: false, name: 'DRONE-C' },
    ],
  },
  {
    name: '02 · HIGHRISE',
    heights: PLATEAU,
    walls: [],
    startUnits: [
      { id: 1, team: 'p', x: 1, y: 1, hp: 20, maxHp: 20, atk: 5, move: 4, range: 1, acted: false, name: 'RUNNER-1' },
      { id: 2, team: 'p', x: 2, y: 1, hp: 16, maxHp: 16, atk: 6, move: 4, range: 1, acted: false, name: 'RUNNER-2' },
      { id: 3, team: 'p', x: 1, y: 2, hp: 14, maxHp: 14, atk: 4, move: 4, range: 3, acted: false, name: 'SNIPER' },
      { id: 4, team: 'e', x: 6, y: 6, hp: 20, maxHp: 20, atk: 5, move: 4, range: 1, acted: false, name: 'DRONE-A' },
      { id: 5, team: 'e', x: 6, y: 5, hp: 16, maxHp: 16, atk: 6, move: 4, range: 1, acted: false, name: 'DRONE-B' },
      { id: 6, team: 'e', x: 5, y: 6, hp: 14, maxHp: 14, atk: 4, move: 4, range: 3, acted: false, name: 'LONGDRONE' },
    ],
  },
  {
    name: '03 · CANYON',
    heights: CANYON_H,
    walls: ['3,0', '3,1', '3,2', '3,5', '3,6', '3,7', '4,0', '4,1', '4,2', '4,5', '4,6', '4,7'],
    startUnits: [
      { id: 1, team: 'p', x: 1, y: 1, hp: 20, maxHp: 20, atk: 5, move: 4, range: 1, acted: false, name: 'RUNNER-1' },
      { id: 2, team: 'p', x: 2, y: 1, hp: 14, maxHp: 14, atk: 4, move: 4, range: 3, acted: false, name: 'SNIPER-1' },
      { id: 3, team: 'p', x: 1, y: 2, hp: 14, maxHp: 14, atk: 4, move: 4, range: 3, acted: false, name: 'SNIPER-2' },
      { id: 4, team: 'e', x: 6, y: 6, hp: 20, maxHp: 20, atk: 5, move: 4, range: 1, acted: false, name: 'DRONE-A' },
      { id: 5, team: 'e', x: 6, y: 5, hp: 14, maxHp: 14, atk: 4, move: 4, range: 3, acted: false, name: 'LONGDRONE-1' },
      { id: 6, team: 'e', x: 5, y: 6, hp: 14, maxHp: 14, atk: 4, move: 4, range: 3, acted: false, name: 'LONGDRONE-2' },
    ],
  },
];

// screen position of a tile's TOP surface (raised by terrain height)
function tileTop(x: number, y: number, ox: number, oy: number, heights: number[][]) {
  const s = toScreen(x, y, ox, oy);
  return { x: s.x, y: s.y - heights[y][x] * LEVEL };
}

function terrainColors(h: number) {
  if (h <= 0) return { top: '#0a111c', right: '#062a2e', left: '#041417' };
  if (h === 1) return { top: '#0b6b63', right: '#07524c', left: '#04282b' };
  return { top: '#0ff0c8', right: '#00a896', left: '#0b6b63' };
}

const WALL_COLORS = { top: '#2c3540', right: '#1c232c', left: '#0e1218' };

// dim overlay covering a whole tile (top + both sides), not just the top face
function drawFog(ctx: CanvasRenderingContext2D, x: number, y: number, ox: number, oy: number, heights: number[][]) {
  const h = heights[y][x];
  const s = toScreen(x, y, ox, oy);
  ctx.fillStyle = 'rgba(3,6,10,0.7)';
  if (h === 0) {
    ctx.beginPath();
    ctx.moveTo(s.x, s.y - V);
    ctx.lineTo(s.x + H, s.y);
    ctx.lineTo(s.x, s.y + V);
    ctx.lineTo(s.x - H, s.y);
    ctx.closePath();
    ctx.fill();
    return;
  }
  const topY = s.y - h * LEVEL;
  ctx.beginPath();
  ctx.moveTo(s.x - H, topY); ctx.lineTo(s.x - H, s.y);
  ctx.lineTo(s.x, s.y + V); ctx.lineTo(s.x, topY + V);
  ctx.closePath(); ctx.fill();
  ctx.beginPath();
  ctx.moveTo(s.x + H, topY); ctx.lineTo(s.x + H, s.y);
  ctx.lineTo(s.x, s.y + V); ctx.lineTo(s.x, topY + V);
  ctx.closePath(); ctx.fill();
  ctx.beginPath();
  ctx.moveTo(s.x, topY - V); ctx.lineTo(s.x + H, topY);
  ctx.lineTo(s.x, topY + V); ctx.lineTo(s.x - H, topY);
  ctx.closePath(); ctx.fill();
}

// high-ground advantage: +1 dmg per level above the target
function highGround(a: Pt, b: Pt, heights: number[][]) {
  return Math.max(0, heights[a.y][a.x] - heights[b.y][b.x]);
}

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [levelIdx, setLevelIdx] = useState(0);
  const [units, setUnits] = useState<Unit[]>(() => LEVELS[0].startUnits);
  const [turn, setTurn] = useState<'p' | 'e'>('p');
  const [selected, setSelected] = useState<number | null>(null);
  const [moved, setMoved] = useState(false);
  const [hover, setHover] = useState<Pt | null>(null);
  const [winner, setWinner] = useState<'p' | 'e' | null>(null);
  const [log, setLog] = useState('select a teal runner');
  const [fogOn, setFogOn] = useState(true);

  const level = LEVELS[levelIdx];
  const heights = level.heights;
  const wallSet = new Set(level.walls);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    c.width = CANVAS_W;
    c.height = CANVAS_H;
  }, []);

  const selUnit = units.find((u) => u.id === selected) ?? null;

  const moveBlocked = new Set<string>(wallSet);
  for (const u of units) if (u.hp > 0 && u.id !== selected) moveBlocked.add(key(u));

  const moveRange =
    selUnit && !moved && !selUnit.acted
      ? reachable(selUnit, selUnit.move, moveBlocked, GRID, GRID, heights)
      : new Map<string, number>();

  const attackTargets = selUnit
    ? units.filter(
        (u) => u.team !== selUnit.team && u.hp > 0 && manhattan(u, selUnit) <= selUnit.range
      )
    : [];

  // vision: union of flood fill around each living runner (walls block sight)
  const visible = new Set<string>();
  if (fogOn) {
    for (const u of units) {
      if (u.team === 'p' && u.hp > 0) {
        for (const k of reachable(u, SIGHT, wallSet, GRID, GRID, heights).keys()) {
          visible.add(k);
        }
      }
    }
  } else {
    for (let y = 0; y < GRID; y++) for (let x = 0; x < GRID; x++) visible.add(`${x},${y}`);
  }

  // ---------- enemy AI ----------
  useEffect(() => {
    if (turn !== 'e' || winner) return;
    const enemy = units.find((u) => u.team === 'e' && u.hp > 0 && !u.acted);
    if (!enemy) {
      setUnits((prev) => prev.map((u) => (u.team === 'p' ? { ...u, acted: false } : u)));
      setTurn('p');
      setLog('your turn — pick a runner');
      return;
    }
    const t = setTimeout(() => aiStep(enemy), 550);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn, units, winner]);

  function aiStep(enemy: Unit) {
    const players = units.filter((u) => u.team === 'p' && u.hp > 0);
    if (players.length === 0) {
      setWinner('e');
      return;
    }
    const nearest = players.reduce((a, b) => (manhattan(a, enemy) < manhattan(b, enemy) ? a : b));

    let pos: Pt = { x: enemy.x, y: enemy.y };
    if (manhattan(enemy, nearest) > enemy.range) {
      const blocked = new Set<string>(wallSet);
      for (const u of units) if (u.hp > 0 && u.id !== enemy.id) blocked.add(key(u));
      const path = astar(enemy, nearest, blocked, GRID, GRID, heights);
      if (path) {
        let budget = enemy.move;
        for (const step of path) {
          if (budget <= 0) break;
          const cost = stepCost(pos, step, heights);
          if (cost > budget) break;
          if (units.some((u) => u.hp > 0 && u.id !== enemy.id && u.x === step.x && u.y === step.y))
            break;
          pos = step;
          budget -= cost;
        }
      }
    }

    let next = units.map((u) =>
      u.id === enemy.id ? { ...u, x: pos.x, y: pos.y, acted: true } : { ...u }
    );
    const after = next.find((u) => u.id === enemy.id)!;

    const inRange = next.filter(
      (u) => u.team === 'p' && u.hp > 0 && manhattan(u, after) <= after.range
    );
    const target = inRange.length
      ? inRange.reduce((a, b) => (manhattan(a, after) < manhattan(b, after) ? a : b))
      : null;

    let line = `${enemy.name} → (${pos.x},${pos.y})`;
    if (target) {
      const bonus = highGround(after, target, heights);
      const dmg = after.atk + bonus + Math.floor(Math.random() * 3);
      next = next.map((u) => (u.id === target.id ? { ...u, hp: Math.max(0, u.hp - dmg) } : u));
      line += ` · hits ${target.name} for ${dmg}${bonus ? ` (high +${bonus})` : ''}`;
    }
    setUnits(next);
    if (!next.some((u) => u.team === 'p' && u.hp > 0)) setWinner('e');
    if (!next.some((u) => u.team === 'e' && u.hp > 0)) setWinner('p');
    setLog(line);
  }

  // ---------- player actions ----------
  function doAttack(attacker: Unit, target: Unit) {
    const bonus = highGround(attacker, target, heights);
    const dmg = attacker.atk + bonus + Math.floor(Math.random() * 3);
    const next = units.map((u) =>
      u.id === target.id
        ? { ...u, hp: Math.max(0, u.hp - dmg) }
        : u.id === attacker.id
        ? { ...u, acted: true }
        : u
    );
    setUnits(next);
    if (!next.some((u) => u.team === 'e' && u.hp > 0)) setWinner('p');
    if (!next.some((u) => u.team === 'p' && u.hp > 0)) setWinner('e');
    setSelected(null);
    setLog(`${attacker.name} hits ${target.name} for ${dmg}${bonus ? ` (high +${bonus})` : ''}`);
  }

  function handleClick(tile: Pt) {
    if (winner || turn !== 'p') return;
    const clicked = units.find((u) => u.hp > 0 && u.x === tile.x && u.y === tile.y);

    if (!selUnit) {
      if (clicked && clicked.team === 'p' && !clicked.acted) {
        setSelected(clicked.id);
        setMoved(false);
      }
      return;
    }

    if (clicked && clicked.team === 'p' && clicked.id !== selUnit.id) {
      if (!clicked.acted) {
        setSelected(clicked.id);
        setMoved(false);
      }
      return;
    }

    // attack an enemy in range
    const target = attackTargets.find((u) => u.x === tile.x && u.y === tile.y);
    if (target) {
      doAttack(selUnit, target);
      return;
    }

    // move to reachable tile
    if (!moved && moveRange.has(key(tile))) {
      setUnits((prev) =>
        prev.map((u) => (u.id === selUnit.id ? { ...u, x: tile.x, y: tile.y } : u))
      );
      setMoved(true);
      setLog(`${selUnit.name} moved · now attack or end unit`);
      return;
    }

    setSelected(null);
  }

  function endUnit() {
    if (!selUnit) return;
    setUnits((prev) => prev.map((u) => (u.id === selUnit.id ? { ...u, acted: true } : u)));
    setSelected(null);
    setLog(`${selUnit.name} done`);
  }

  function endTurn() {
    if (turn !== 'p' || winner) return;
    setSelected(null);
    setTurn('e');
    setUnits((prev) => prev.map((u) => (u.team === 'e' ? { ...u, acted: false } : u)));
    setLog('enemy turn…');
  }

  function loadLevel(i: number) {
    setLevelIdx(i);
    setUnits(LEVELS[i].startUnits.map((u) => ({ ...u })));
    setTurn('p');
    setSelected(null);
    setMoved(false);
    setHover(null);
    setWinner(null);
    setLog(`level ${LEVELS[i].name} · select a teal runner`);
  }

  // ---------- render ----------
  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return;
    const { ox, oy } = centerIso(GRID, GRID, CANVAS_W, CANVAS_H, 56);

    ctx.fillStyle = '#04070b';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    const order: Pt[] = [];
    for (let y = 0; y < GRID; y++) for (let x = 0; x < GRID; x++) order.push({ x, y });
    order.sort((a, b) => a.x + a.y - (b.x + b.y));

    // terrain + walls
    for (const t of order) {
      const s = toScreen(t.x, t.y, ox, oy);
      const k = `${t.x},${t.y}`;
      if (wallSet.has(k)) {
        drawCube(ctx, s.x, s.y, WALL_H * LEVEL, H, V, WALL_COLORS);
      } else {
        const h = heights[t.y][t.x];
        if (h === 0) drawTile(ctx, s.x, s.y, H, V, '#0a111c', '#1d5a63');
        else drawCube(ctx, s.x, s.y, h * LEVEL, H, V, terrainColors(h));
      }
    }

    // move + attack highlights (on top surfaces)
    for (const t of order) {
      const k = `${t.x},${t.y}`;
      const top = tileTop(t.x, t.y, ox, oy, heights);
      if (moveRange.has(k)) drawTile(ctx, top.x, top.y, H, V, '#0e2f2f', '#00a896');
      if (attackTargets.some((u) => u.x === t.x && u.y === t.y) && visible.has(k))
        drawTile(ctx, top.x, top.y, H, V, '#2a0f1a', '#ff2d78');
    }

    if (hover) {
      const top = tileTop(hover.x, hover.y, ox, oy, heights);
      drawTile(ctx, top.x, top.y, H, V, 'rgba(0,255,209,0.08)', '#00ffd1');
    }

    // fog (whole cube)
    if (fogOn) {
      for (const t of order) {
        if (visible.has(`${t.x},${t.y}`)) continue;
        drawFog(ctx, t.x, t.y, ox, oy, heights);
      }
    }

    // units
    const sorted = [...units]
      .filter((u) => u.hp > 0)
      .filter((u) => u.team === 'p' || visible.has(key(u)))
      .sort((a, b) => a.x + a.y - (b.x + b.y));
    for (const u of sorted) {
      const top = tileTop(u.x, u.y, ox, oy, heights);
      const isSel = u.id === selected;
      const colors =
        u.team === 'p'
          ? { top: isSel ? '#00ffd1' : '#0affef', right: '#00a896', left: '#06312e' }
          : { top: isSel ? '#ff6ba0' : '#ff2d78', right: '#a0144a', left: '#3a0a1c' };
      ctx.shadowColor = isSel ? colors.top : 'transparent';
      ctx.shadowBlur = isSel ? 14 : 0;
      drawCube(ctx, top.x, top.y, 26, H, V, colors);
      ctx.shadowBlur = 0;

      // ranged marker: little barrel notch
      if (u.range > 1) {
        ctx.fillStyle = '#ffe66d';
        ctx.fillRect(top.x - 2, top.y - 26 - V - 2, 4, 4);
      }

      const bw = 30;
      const pct = u.hp / u.maxHp;
      const bx = top.x - bw / 2;
      const by = top.y - 26 - V - 10;
      ctx.fillStyle = '#0a111c';
      ctx.fillRect(bx, by, bw, 4);
      ctx.fillStyle = pct > 0.5 ? '#00ff9d' : pct > 0.25 ? '#ffe66d' : '#ff4d5e';
      ctx.fillRect(bx, by, bw * pct, 4);

      if (u.acted) {
        ctx.fillStyle = '#5f8f88';
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('DONE', top.x, by - 3);
        ctx.textAlign = 'left';
      }
    }

    if (winner) {
      ctx.fillStyle = 'rgba(4,7,11,0.78)';
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
      ctx.fillStyle = winner === 'p' ? '#00ffd1' : '#ff2d78';
      ctx.font = 'bold 30px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = 20;
      ctx.fillText(winner === 'p' ? '▲ YOU WIN' : '▼ DRONES WIN', CANVAS_W / 2, CANVAS_H / 2);
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#5f8f88';
      ctx.font = '13px "JetBrains Mono", monospace';
      ctx.fillText('pick a level or press RESET', CANVAS_W / 2, CANVAS_H / 2 + 28);
      ctx.textAlign = 'left';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [units, selected, moved, hover, turn, winner, moveRange, attackTargets, visible, fogOn, levelIdx]);

  const pick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const c = canvasRef.current;
    if (!c) return;
    const rect = c.getBoundingClientRect();
    const sx = ((e.clientX - rect.left) / rect.width) * c.width;
    const sy = ((e.clientY - rect.top) / rect.height) * c.height;
    const { ox, oy } = centerIso(GRID, GRID, CANVAS_W, CANVAS_H, 56);
    const t = toTile(sx, sy, ox, oy);
    if (t.x < 0 || t.y < 0 || t.x >= GRID || t.y >= GRID) return;
    setHover(t);
  };

  const clickCanvas = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const c = canvasRef.current;
    if (!c) return;
    const rect = c.getBoundingClientRect();
    const sx = ((e.clientX - rect.left) / rect.width) * c.width;
    const sy = ((e.clientY - rect.top) / rect.height) * c.height;
    const { ox, oy } = centerIso(GRID, GRID, CANVAS_W, CANVAS_H, 56);
    const t = toTile(sx, sy, ox, oy);
    if (t.x < 0 || t.y < 0 || t.x >= GRID || t.y >= GRID) return;
    handleClick(t);
  };

  const playerAlive = units.filter((u) => u.team === 'p' && u.hp > 0).length;
  const enemyAlive = units.filter((u) => u.team === 'e' && u.hp > 0).length;

  const selectStyle: React.CSSProperties = {
    background: '#0e1624',
    color: '#00ffd1',
    border: '1px solid #1d5a63',
    borderRadius: 6,
    fontFamily: 'inherit',
    fontSize: 13,
    padding: '4px 8px',
  };

  return (
    <div className="demo-box">
      <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H} onMouseMove={pick} onMouseLeave={() => setHover(null)} onClick={clickCanvas} />
      <div className="hud">
        <span className={`pill ${turn === 'e' ? 'enemy' : ''}`}>
          {winner ? 'OVER' : turn === 'p' ? '▲ YOUR TURN' : '▼ ENEMY TURN'}
        </span>
        <select value={levelIdx} onChange={(e) => loadLevel(Number(e.target.value))} style={selectStyle}>
          {LEVELS.map((l, i) => (
            <option key={i} value={i}>{l.name}</option>
          ))}
        </select>
        <span className="pill">you {playerAlive}</span>
        <span className="pill enemy">drones {enemyAlive}</span>
        <button className="btn" onClick={() => setFogOn((f) => !f)}>
          fog {fogOn ? 'on' : 'off'}
        </button>
        {selUnit && (
          <button className="btn" onClick={endUnit} disabled={selUnit.acted}>end unit</button>
        )}
        <button className="btn primary" onClick={endTurn} disabled={turn !== 'p' || !!winner}>
          end turn →
        </button>
        <button className="btn" onClick={() => loadLevel(levelIdx)}>reset</button>
        <span className="log">{log}</span>
      </div>
    </div>
  );
}

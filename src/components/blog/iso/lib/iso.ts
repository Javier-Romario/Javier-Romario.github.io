// Core isometric + pathfinding math. Every demo and the final game
// import these exact functions. Learn them once, use them forever.

export const TILE_W = 64; // iso tile width in px
export const TILE_H = 32; // iso tile height in px (2:1 ratio)
export const H = TILE_W / 2; // half width  = 32
export const V = TILE_H / 2; // half height = 16

export interface Pt {
  x: number;
  y: number;
}

// grid (x, y) -> screen (px). THE projection formula.
export function toScreen(x: number, y: number, ox = 0, oy = 0) {
  return {
    x: ox + (x - y) * H,
    y: oy + (x + y) * V,
  };
}

// screen (px) -> grid (x, y). The inverse. Used for mouse picking.
export function toTile(sx: number, sy: number, ox = 0, oy = 0): Pt {
  const px = sx - ox;
  const py = sy - oy;
  const fx = (px / H + py / V) / 2;
  const fy = (py / V - px / H) / 2;
  return { x: Math.floor(fx), y: Math.floor(fy) };
}

export const key = (p: Pt) => `${p.x},${p.y}`;

// 4-direction cardinal movement. Matches Manhattan distance.
export const DIRS4: Pt[] = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
];

export function manhattan(a: Pt, b: Pt) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

// terrain height lookup, 0 when no heightmap given
export function hgt(heights: number[][] | undefined, x: number, y: number) {
  return heights ? heights[y]?.[x] ?? 0 : 0;
}

// cost of one step: 1 base + climb (climbing up a level costs extra).
// Moving downhill is free (no bonus, no penalty).
export function stepCost(a: Pt, b: Pt, heights?: number[][]): number {
  return 1 + Math.max(0, hgt(heights, b.x, b.y) - hgt(heights, a.x, a.y));
}

// Flood fill. Returns map key -> move cost (steps) within maxSteps.
// With a heightmap, climbing costs more — Dijkstra relaxation, not plain BFS.
export function reachable(
  start: Pt,
  maxSteps: number,
  blocked: Set<string>,
  W: number,
  Hh: number,
  heights?: number[][]
): Map<string, number> {
  const cost = new Map<string, number>();
  const q: Pt[] = [start];
  cost.set(key(start), 0);
  for (let i = 0; i < q.length; i++) {
    const cur = q[i];
    const c = cost.get(key(cur))!;
    if (c >= maxSteps) continue;
    for (const d of DIRS4) {
      const n = { x: cur.x + d.x, y: cur.y + d.y };
      if (n.x < 0 || n.y < 0 || n.x >= W || n.y >= Hh) continue;
      const k = key(n);
      if (blocked.has(k)) continue;
      const nc = c + stepCost(cur, n, heights);
      if (nc > maxSteps) continue;
      const prev = cost.get(k);
      if (prev === undefined || nc < prev) {
        cost.set(k, nc);
        q.push(n);
      }
    }
  }
  return cost;
}

// A* pathfinding. Returns tile list excluding start, or null if no path.
export function astar(
  start: Pt,
  goal: Pt,
  blocked: Set<string>,
  W: number,
  Hh: number,
  heights?: number[][]
): Pt[] | null {
  const startK = key(start);
  const goalK = key(goal);
  const g = new Map<string, number>();
  const f = new Map<string, number>();
  const came = new Map<string, string>();
  const open = new Set<string>();
  const closed = new Set<string>();

  g.set(startK, 0);
  f.set(startK, manhattan(start, goal));
  open.add(startK);

  let guard = 0;
  while (open.size && guard++ < 20000) {
    // pick lowest f-score
    let curK = '';
    let best = Infinity;
    for (const k of open) {
      const v = f.get(k) ?? Infinity;
      if (v < best) {
        best = v;
        curK = k;
      }
    }

    if (curK === goalK) {
      const path: Pt[] = [];
      let k: string = goalK;
      while (k !== startK) {
        const [x, y] = k.split(',').map(Number);
        path.unshift({ x, y });
        k = came.get(k)!;
      }
      return path;
    }

    open.delete(curK);
    closed.add(curK);
    const [cx, cy] = curK.split(',').map(Number);

    for (const d of DIRS4) {
      const nx = cx + d.x;
      const ny = cy + d.y;
      if (nx < 0 || ny < 0 || nx >= W || ny >= Hh) continue;
      const nk = `${nx},${ny}`;
      if (closed.has(nk)) continue;
      if (blocked.has(nk) && nk !== goalK) continue;
      const ng = (g.get(curK) ?? 0) + stepCost({ x: cx, y: cy }, { x: nx, y: ny }, heights);
      if (!open.has(nk) || ng < (g.get(nk) ?? Infinity)) {
        came.set(nk, curK);
        g.set(nk, ng);
        f.set(nk, ng + manhattan({ x: nx, y: ny }, goal));
        open.add(nk);
      }
    }
  }
  return null;
}

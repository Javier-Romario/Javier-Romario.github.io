import { toScreen, H, V } from '../lib/iso';

// Compute an origin (ox, oy) so an iso grid of size WxH centers on the canvas.
export function centerIso(
  gridW: number,
  gridH: number,
  canvasW: number,
  canvasH: number,
  topPad = 30
) {
  const pts = [
    toScreen(0, 0),
    toScreen(gridW - 1, 0),
    toScreen(0, gridH - 1),
    toScreen(gridW - 1, gridH - 1),
  ];
  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const ox = (canvasW - (maxX + minX)) / 2;
  const oy = topPad + (canvasH - topPad - (maxY + minY)) / 2 - minY;
  return { ox, oy };
}

// Draw one iso diamond (top face of a tile) centered at (sx, sy).
export function drawTile(
  ctx: CanvasRenderingContext2D,
  sx: number,
  sy: number,
  hw = H,
  hv = V,
  fill = '#0a111c',
  stroke: string | null = '#1d5a63'
) {
  ctx.beginPath();
  ctx.moveTo(sx, sy - hv);
  ctx.lineTo(sx + hw, sy);
  ctx.lineTo(sx, sy + hv);
  ctx.lineTo(sx - hw, sy);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

// Draw a full iso cube with a given pixel height (fake 3D block).
export function drawCube(
  ctx: CanvasRenderingContext2D,
  sx: number,
  sy: number,
  height: number,
  hw = H,
  hv = V,
  colors = { top: '#00ffd1', right: '#00a896', left: '#0b6b63' }
) {
  const topY = sy - height;
  // left face
  ctx.beginPath();
  ctx.moveTo(sx - hw, topY);
  ctx.lineTo(sx - hw, sy);
  ctx.lineTo(sx, sy + hv);
  ctx.lineTo(sx, topY + hv);
  ctx.closePath();
  ctx.fillStyle = colors.left;
  ctx.fill();
  ctx.strokeStyle = '#062a2e';
  ctx.lineWidth = 1;
  ctx.stroke();
  // right face
  ctx.beginPath();
  ctx.moveTo(sx + hw, topY);
  ctx.lineTo(sx + hw, sy);
  ctx.lineTo(sx, sy + hv);
  ctx.lineTo(sx, topY + hv);
  ctx.closePath();
  ctx.fillStyle = colors.right;
  ctx.fill();
  ctx.stroke();
  // top face
  ctx.beginPath();
  ctx.moveTo(sx, topY - hv);
  ctx.lineTo(sx + hw, topY);
  ctx.lineTo(sx, topY + hv);
  ctx.lineTo(sx - hw, topY);
  ctx.closePath();
  ctx.fillStyle = colors.top;
  ctx.fill();
  ctx.stroke();
}

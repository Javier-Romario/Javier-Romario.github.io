import { useEffect, useRef, useState } from 'react';
import { useRaf } from './useRaf';

export default function DemoLoops() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [speed, setSpeed] = useState(140);
  const [paused, setPaused] = useState(false);
  const [fps, setFps] = useState(0);
  const state = useRef({ x: 40, dir: 1, frames: 0, acc: 0 });

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    c.width = 700;
    c.height = 320;
  }, []);

  useRaf((dt) => {
    const c = canvasRef.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return;
    const W = c.width;
    const Hh = c.height;
    const s = state.current;

    // --- update (uses dt: speed * seconds) ---
    s.x += speed * dt * s.dir;
    if (s.x > W - 24) { s.x = W - 24; s.dir = -1; }
    if (s.x < 24) { s.x = 24; s.dir = 1; }

    // --- fps meter ---
    s.frames++;
    s.acc += dt;
    if (s.acc >= 0.5) {
      setFps(Math.round(s.frames / s.acc));
      s.frames = 0;
      s.acc = 0;
    }

    // --- render ---
    ctx.fillStyle = '#04070b';
    ctx.fillRect(0, 0, W, Hh);
    ctx.strokeStyle = '#0d1a22';
    ctx.lineWidth = 1;
    for (let gx = 0; gx <= W; gx += 34) {
      ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, Hh); ctx.stroke();
    }
    for (let gy = 0; gy <= Hh; gy += 34) {
      ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
    }
    // trail
    ctx.fillStyle = 'rgba(0,255,209,0.08)';
    for (let i = 1; i <= 6; i++) {
      ctx.beginPath();
      ctx.arc(s.x - s.dir * i * 14, Hh / 2, 13, 0, Math.PI * 2);
      ctx.fill();
    }
    // ball
    ctx.fillStyle = '#00ffd1';
    ctx.shadowColor = '#00ffd1';
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(s.x, Hh / 2, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }, !paused);

  return (
    <div className="demo-box">
      <canvas ref={canvasRef} />
      <div className="demo-controls">
        <label>
          speed
          <input
            type="range"
            min={20}
            max={400}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </label>
        <button className="btn" onClick={() => setPaused((p) => !p)}>
          {paused ? '▶ run' : '❚❚ pause'}
        </button>
        <span className="demo-readout">fps {fps} · x {state.current.x.toFixed(0)}</span>
      </div>
    </div>
  );
}

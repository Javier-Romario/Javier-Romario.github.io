import { useRef, useState } from 'react';

const TOTAL = 500;
const ITEM_H = 48;
const VIEW_H = 300;

// FlatList never renders all N items. It only mounts the items inside
// (and just beyond) the viewport. This demo fakes that: scroll, and the
// "mounted" window follows you. `windowSize` controls how far past the
// viewport FlatList keeps items mounted.

export default function FlatListDemo() {
  const [scrollTop, setScrollTop] = useState(0);
  const [windowSize, setWindowSize] = useState(3);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const visibleStart = Math.floor(scrollTop / ITEM_H);
  const visibleEnd = Math.min(TOTAL, Math.ceil((scrollTop + VIEW_H) / ITEM_H));
  const start = Math.max(0, visibleStart - windowSize);
  const end = Math.min(TOTAL, visibleEnd + windowSize);

  const rows = [];
  for (let i = start; i < end; i++) {
    rows.push(
      <div
        key={i}
        style={{
          position: 'absolute',
          top: i * ITEM_H,
          left: 0,
          right: 0,
          height: ITEM_H,
          padding: '12px 16px',
          borderBottom: '1px solid var(--theme-border)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: i % 2 ? 'transparent' : 'rgba(0,255,209,0.02)',
        }}
      >
        <span style={{ color: '#00a896', fontSize: 11, minWidth: 34 }}>#{i}</span>
        <span style={{ color: 'var(--theme-text)', fontSize: 13 }}>
          item {i} {i === 0 ? '· the only thing here at the top' : ''}
        </span>
      </div>
    );
  }

  return (
    <div className="demo-box">
      <div
        ref={scrollerRef}
        onScroll={() => setScrollTop(scrollerRef.current?.scrollTop ?? 0)}
        style={{ position: 'relative', height: VIEW_H, overflowY: 'auto', background: 'var(--neo-surface)' }}
      >
        <div style={{ height: TOTAL * ITEM_H, position: 'relative' }}>{rows}</div>
      </div>
      <div className="demo-controls">
        <label>
          windowSize
          <input
            type="range"
            min={0}
            max={12}
            value={windowSize}
            onChange={(e) => setWindowSize(Number(e.target.value))}
          />
          <span style={{ color: 'var(--theme-muted)', fontSize: 12 }}>{windowSize} rows beyond viewport</span>
        </label>
        <span className="demo-readout">
          mounts {start}–{end} · {end - start} of {TOTAL}
        </span>
      </div>
    </div>
  );
}

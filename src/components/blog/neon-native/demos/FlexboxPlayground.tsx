import { useState } from 'react';

type Direction = 'row' | 'column';
type Justify = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
type Align = 'stretch' | 'flex-start' | 'center' | 'flex-end';

// React Native's flexbox is CSS flexbox with ONE big difference: the
// default flexDirection is `column`, not `row` like the web. Everything
// else (justifyContent, alignItems, flexWrap, gap) maps 1:1.

export default function FlexboxPlayground() {
  const [direction, setDirection] = useState<Direction>('column');
  const [justify, setJustify] = useState<Justify>('flex-start');
  const [align, setAlign] = useState<Align>('center');
  const [wrap, setWrap] = useState(false);
  const [gap, setGap] = useState(8);

  const style = {
    display: 'flex',
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align,
    flexWrap: wrap ? 'wrap' : 'nowrap',
    gap: `${gap}px`,
  } as const;

  const code = `style={{
  flexDirection: '${direction}',
  justifyContent: '${justify}',
  alignItems: '${align}',
  flexWrap: '${wrap ? 'wrap' : 'nowrap'}',
  gap: ${gap},
}}`;

  return (
    <div className="demo-box">
      <div className="demo-body">
        <div
          style={{
            ...style,
            height: 280,
            border: '1px dashed #1d5a63',
            borderRadius: 8,
            background: 'rgba(0,255,209,0.03)',
            overflow: 'auto',
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: i === 1 ? 96 : 64,
                height: i === 1 ? 72 : 48,
                background: ['#00ffd1', '#ff2d78', '#ffe66d'][i],
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#04070b',
                fontWeight: 700,
                fontSize: 13,
                flexShrink: 0,
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
      <div className="demo-controls">
        <label>
          flexDirection
          <select value={direction} onChange={(e) => setDirection(e.target.value as Direction)}>
            <option value="column">column</option>
            <option value="row">row</option>
          </select>
        </label>
        <label>
          justifyContent
          <select value={justify} onChange={(e) => setJustify(e.target.value as Justify)}>
            <option>flex-start</option>
            <option>center</option>
            <option>flex-end</option>
            <option>space-between</option>
            <option>space-around</option>
            <option>space-evenly</option>
          </select>
        </label>
        <label>
          alignItems
          <select value={align} onChange={(e) => setAlign(e.target.value as Align)}>
            <option>stretch</option>
            <option>flex-start</option>
            <option>center</option>
            <option>flex-end</option>
          </select>
        </label>
        <label>
          wrap
          <input type="checkbox" checked={wrap} onChange={(e) => setWrap(e.target.checked)} />
        </label>
        <label>
          gap {gap}
          <input
            type="range"
            min={0}
            max={24}
            value={gap}
            onChange={(e) => setGap(Number(e.target.value))}
          />
        </label>
      </div>
      <pre style={{ margin: 0, borderTop: '1px solid #12313a', borderRadius: 0 }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

import { useState } from 'react';
import { Badge } from '@javierromario/neondeck';
import { Button } from '@javierromario/neondeck';
import { BarProgress } from '@javierromario/neondeck';

interface Mod {
  name: string;
  on: boolean;
}

const START: Mod[] = [
  { name: 'Bevel', on: true },
  { name: 'Solidify', on: true },
  { name: 'Subdivision Surface', on: false },
  { name: 'Boolean (union)', on: false },
];

export default function DemoModifiers() {
  const [mods, setMods] = useState<Mod[]>(START);
  const onCount = mods.filter((m) => m.on).length;

  const toggle = (i: number) =>
    setMods((prev) => prev.map((m, idx) => (idx === i ? { ...m, on: !m.on } : m)));
  const reset = () => setMods(START);

  return (
    <div className="demo-box neondeck">
      <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Badge>MODIFIER STACK</Badge>
          <span style={{ color: 'var(--theme-muted)', fontSize: 12 }}>
            {onCount}/{mods.length} active · mesh is <b style={{ color: 'var(--theme-focused-foreground)' }}>never edited</b>
          </span>
        </div>
        {mods.map((m, i) => (
          <Button
            key={m.name}
            theme={m.on ? 'PRIMARY' : 'SECONDARY'}
            onClick={() => toggle(i)}
            style={{ justifyContent: 'space-between', width: '100%' }}
          >
            <span>{i + 1} · {m.name}</span>
            <span>{m.on ? '◉ ON' : '○ OFF'}</span>
          </Button>
        ))}
        <BarProgress progress={onCount / mods.length} fillChar="▮" />
      </div>
      <div className="demo-controls">
        <span className="demo-readout" style={{ marginLeft: 0 }}>
          toggle a modifier → the stack re-evaluates top-to-bottom. no vertices touched.
        </span>
        <button className="btn" onClick={reset}>RESET STACK</button>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Badge } from '@javierromario/neondeck';
import { Checkbox } from '@javierromario/neondeck';

interface Opt {
  key: string;
  label: string;
  on: boolean;
}

const START: Opt[] = [
  { key: 'applyModifiers', label: 'Apply Modifiers', on: true },
  { key: 'compress', label: 'Compress (Draco/Meshopt)', on: true },
  { key: 'plusYUp', label: '+Y Up (glTF convention)', on: true },
  { key: 'embedTextures', label: 'Embed Textures', on: true },
];

export default function DemoGltf() {
  const [opts, setOpts] = useState<Record<string, boolean>>(
    Object.fromEntries(START.map((o) => [o.key, o.on])),
  );

  const toggle = (key: string) => setOpts((p) => ({ ...p, [key]: !p[key] }));

  const out = {
    format: 'GLB (binary)',
    applyModifiers: opts.applyModifiers,
    compression: opts.compress ? 'meshopt' : 'none',
    upAxis: opts.plusYUp ? '+Y' : '+Z',
    textures: opts.embedTextures ? 'embedded' : 'external',
  };

  return (
    <div className="demo-box neondeck">
      <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Badge>glTF EXPORT</Badge>
          <span style={{ color: 'var(--theme-muted)', fontSize: 12 }}>File → Export → glTF 2.0</span>
        </div>
        {START.map((o) => (
          <Checkbox
            key={o.key}
            name={o.key}
            defaultChecked={o.on}
            onChange={() => toggle(o.key)}
          >
            {o.label}
          </Checkbox>
        ))}
        <pre style={{ margin: 0, fontSize: 12 }}>{JSON.stringify(out, null, 2)}</pre>
      </div>
      <div className="demo-controls">
        <span className="demo-readout" style={{ marginLeft: 0 }}>
          glTF is the JPEG of 3D: one file, every engine reads it. toggle settings → watch the export contract change.
        </span>
      </div>
    </div>
  );
}

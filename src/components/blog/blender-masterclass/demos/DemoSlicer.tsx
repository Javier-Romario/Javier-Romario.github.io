import { useState } from 'react';
import { Badge } from '@javierromario/neondeck';
import { BarLoader } from '@javierromario/neondeck';
import { Select } from '@javierromario/neondeck';

export default function DemoSlicer() {
  const [layer, setLayer] = useState(0.2);
  const [infill, setInfill] = useState(20);
  const [orient, setOrient] = useState('UPRIGHT');

  // toy model: thinner layers + more infill = more time
  const timeMin = Math.round((0.2 / layer) * 40 + infill * 1.6);
  const timeLabel = `${Math.floor(timeMin / 60)}h ${timeMin % 60}m`;

  return (
    <div className="demo-box neondeck">
      <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Badge>SLICER PREVIEW</Badge>
          <span style={{ color: '#5f8f88', fontSize: 12 }}>FDM · PLA · 0.4mm nozzle</span>
        </div>

        <div>
          <div style={{ fontSize: 12, color: '#5f8f88', marginBottom: 6 }}>LAYER HEIGHT — {layer.toFixed(2)} mm</div>
          <input
            type="range"
            min={0.08}
            max={0.32}
            step={0.02}
            value={layer}
            onChange={(e) => setLayer(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#00ffd1' }}
          />
          <div style={{ fontSize: 11, color: '#5f8f88', marginTop: 2 }}>
            0.08 = fine detail · 0.28 = fast draft
          </div>
        </div>

        <div>
          <div style={{ fontSize: 12, color: '#5f8f88', marginBottom: 6 }}>INFILL — {infill}%</div>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={infill}
            onChange={(e) => setInfill(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#00ffd1' }}
          />
        </div>

        <div style={{ fontSize: 12, color: '#5f8f88' }}>
          ORIENTATION
          <Select
            name="orient"
            options={['UPRIGHT', 'ON ITS SIDE', '45° TILT']}
            defaultValue="UPRIGHT"
            onChange={(v) => setOrient(v)}
          />
          <div style={{ fontSize: 11, color: '#ff9d2d', marginTop: 4 }}>
            {orient === 'UPRIGHT' ? 'fewest supports, weakest layer shear' : orient === 'ON ITS SIDE' ? 'stronger along load, more supports' : 'compromise: hides layer lines, needs supports'}
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#5f8f88', marginBottom: 6 }}>
            <span>PRINT TIME</span>
            <span style={{ color: '#00ffd1' }}>{timeLabel}</span>
          </div>
          <BarLoader progress={Math.min(timeMin / 200, 1)} />
        </div>
      </div>
      <div className="demo-controls">
        <span className="demo-readout" style={{ marginLeft: 0 }}>
          shell the thin, support the overhang. dial layer + infill → watch the time move.
        </span>
      </div>
    </div>
  );
}

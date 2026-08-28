import { useState } from 'react';

function HPBar({ hp, max, color }: { hp: number; max: number; color: string }) {
  const pct = (hp / max) * 100;
  return (
    <div style={{ height: 10, background: 'var(--neo-surface)', border: '1px solid var(--theme-border)', borderRadius: 4, overflow: 'hidden', width: 180 }}>
      <div
        style={{
          width: `${pct}%`, height: '100%', background: color,
          boxShadow: `0 0 10px ${color}`, transition: 'width .2s ease',
        }}
      />
    </div>
  );
}

export default function DemoCombat() {
  const [dHp, setDHp] = useState(20);
  const [cover, setCover] = useState(0);
  const [dice, setDice] = useState<number | null>(null);
  const [last, setLast] = useState<string>('press ATTACK to roll');

  const attack = () => {
    const roll = 1 + Math.floor(Math.random() * 6);
    const dmg = Math.max(1, 3 + roll - cover);
    setDice(roll);
    setDHp((d) => Math.max(0, d - dmg));
    setLast(`d6 = ${roll} → dmg = 3 + ${roll} − ${cover} = ${dmg}`);
  };

  return (
    <div className="demo-box">
      <div style={{ padding: 18, background: 'var(--neo-surface)', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', gap: 30, alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <div style={{ color: 'var(--theme-focused-foreground)', fontSize: 13, marginBottom: 6 }}>▲ ATTACKER · atk 3</div>
            <HPBar hp={20} max={20} color="#00ffd1" />
          </div>
          <div style={{ color: 'var(--theme-accent)', fontSize: 20, fontFamily: 'inherit' }}>▶</div>
          <div>
            <div style={{ color: 'var(--theme-accent)', fontSize: 13, marginBottom: 6 }}>▼ DEFENDER · hp {dHp}/20</div>
            <HPBar hp={dHp} max={20} color="#ff2d78" />
          </div>
        </div>

        {dice !== null && (
          <div style={{ fontSize: 30, color: '#ffe66d', textShadow: '0 0 12px rgba(255,230,109,.5)', fontFamily: 'inherit' }}>
            ⚄ {dice}
          </div>
        )}

        <div className="demo-controls" style={{ borderTop: 'none', padding: 0 }}>
          <button className="btn primary" onClick={attack}>attack</button>
          <button className="btn" onClick={() => { setDHp(20); setDice(null); setLast('press ATTACK to roll'); }}>
            reset
          </button>
          <label>
            defender cover
            <input type="range" min={0} max={2} value={cover} onChange={(e) => setCover(Number(e.target.value))} />
          </label>
          <span className="demo-readout">{last}</span>
        </div>
      </div>
    </div>
  );
}

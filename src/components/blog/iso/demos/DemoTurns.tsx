import { useState } from 'react';

type Turn = 'PLAYER' | 'ENEMY';

export default function DemoTurns() {
  const [state, setState] = useState<Turn>('PLAYER');
  const [ap, setAp] = useState(3);
  const [log, setLog] = useState<string[]>(['[SYSTEM] boot — player turn']);

  const push = (line: string) => setLog((l) => [line, ...l].slice(0, 6));

  const act = (cost: number, name: string) => {
    if (state !== 'PLAYER' || ap < cost) return;
    setAp(ap - cost);
    push(`[PLAYER] ${name} (−${cost} AP)`);
  };

  const endTurn = () => {
    if (state !== 'PLAYER') return;
    setState('ENEMY');
    push('[ENEMY] turn — AI moves…');
    setTimeout(() => {
      setState('PLAYER');
      setAp(3);
      push('[PLAYER] your turn — AP reset to 3');
    }, 1200);
  };

  return (
    <div className="demo-box">
      <div style={{ padding: 16, background: 'transparent' }}>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 18, fontFamily: 'inherit' }}>
          <div
            style={{
              padding: '10px 18px', border: '1px solid', borderRadius: 8,
              borderColor: state === 'PLAYER' ? 'var(--theme-focused-foreground)' : 'var(--theme-border)',
              color: state === 'PLAYER' ? 'var(--theme-focused-foreground)' : 'var(--theme-muted)',
              background: state === 'PLAYER' ? 'var(--neo-surface)' : 'transparent',
              textShadow: state === 'PLAYER' ? '0 0 8px rgba(0,255,209,.5)' : 'none',
            }}
          >
            PLAYER
          </div>
          <div style={{ color: 'var(--theme-muted)', alignSelf: 'center' }}>⇄</div>
          <div
            style={{
              padding: '10px 18px', border: '1px solid', borderRadius: 8,
              borderColor: state === 'ENEMY' ? 'var(--theme-accent)' : 'var(--theme-border)',
              color: state === 'ENEMY' ? 'var(--theme-accent)' : 'var(--theme-muted)',
              background: state === 'ENEMY' ? 'var(--neo-surface)' : 'transparent',
              textShadow: state === 'ENEMY' ? '0 0 8px rgba(255,45,120,.5)' : 'none',
            }}
          >
            ENEMY
          </div>
        </div>

        <div className="demo-controls" style={{ borderTop: 'none', paddingTop: 0, justifyContent: 'center' }}>
          <span className="pill" style={{ padding: '4px 14px', border: '1px solid var(--theme-focused-foreground)', borderRadius: 999, color: 'var(--theme-focused-foreground)' }}>
            AP {ap}
          </span>
          <button className="btn" onClick={() => act(1, 'move')} disabled={state !== 'PLAYER' || ap < 1}>
            move −1
          </button>
          <button className="btn" onClick={() => act(2, 'attack')} disabled={state !== 'PLAYER' || ap < 2}>
            attack −2
          </button>
          <button className="btn primary" onClick={endTurn} disabled={state !== 'PLAYER'}>
            end turn →
          </button>
        </div>

        <div style={{ marginTop: 14, fontSize: 12.5, color: 'var(--theme-muted)', lineHeight: 1.7, minHeight: 100 }}>
          {log.map((l, i) => (
            <div key={i} style={{ color: i === 0 ? 'var(--theme-focused-foreground)' : 'var(--theme-muted)' }}>{l}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

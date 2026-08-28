import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

// Every async thing in your app is one of these four states. Model it as
// a union type and render ONE branch at a time. No `isLoading && !error`
// boolean spaghetti.

const COLOR: Record<Status, string> = {
  idle: '#5f8f88',
  loading: '#ffe66d',
  success: '#00ff9d',
  error: '#ff4d5e',
};

export default function StateDemo() {
  const [status, setStatus] = useState<Status>('idle');

  const load = () => {
    setStatus('loading');
    setTimeout(() => {
      setStatus(Math.random() > 0.3 ? 'success' : 'error');
    }, 1200);
  };

  return (
    <div className="demo-box">
      <div className="demo-body" style={{ padding: '20px 16px' }}>
        <div
          style={{
            padding: 18,
            borderRadius: 10,
            border: `2px solid ${COLOR[status]}`,
            background: 'var(--neo-surface)',
            color: COLOR[status],
            textAlign: 'center',
            fontFamily: 'Berkeley Mono, JetBrains Mono, monospace',
            fontWeight: 700,
            fontSize: 20,
            letterSpacing: 1,
            textShadow: `0 0 12px ${COLOR[status]}`,
            transition: 'all 0.2s ease',
          }}
        >
          {status.toUpperCase()}
        </div>
        <div style={{ marginTop: 12, color: 'var(--theme-muted)', fontSize: 12.5 }}>
          type Status = 'idle' | 'loading' | 'success' | 'error'
        </div>
      </div>
      <div className="demo-controls">
        <button className="btn primary" onClick={load} disabled={status === 'loading'}>
          {status === 'loading' ? 'fetching…' : 'fetch user'}
        </button>
        <button className="btn" onClick={() => setStatus('idle')}>
          reset
        </button>
        <span className="demo-readout">1 of every 3 fetches fails on purpose</span>
      </div>
    </div>
  );
}

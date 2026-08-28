'use client';

import * as React from 'react';
import HexGrid from '@components/HexGrid';

const LIGHT = { color: '#b3c0d4', size: 38, pulseRate: 0.12 };
const DARK = { color: '#3d4757', size: 38, pulseRate: 0.12 };

/**
 * Full-viewport hexagon backdrop that follows the system color scheme.
 * The NEONDECK HexGrid draws its own color on canvas, so we can't theme it
 * via CSS custom properties — read prefers-color-scheme here instead.
 */
const HexBackground: React.FC = () => {
  const [dark, setDark] = React.useState<boolean>(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches,
  );

  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => setDark(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const cfg = dark ? DARK : LIGHT;

  return (
    <div className="bg-hex" aria-hidden="true">
      <HexGrid
        height="100%"
        color={cfg.color}
        size={cfg.size}
        pulseRate={cfg.pulseRate}
        glow={false}
        style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}
      />
    </div>
  );
};

export default HexBackground;

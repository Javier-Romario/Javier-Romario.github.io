'use client';

import * as React from 'react';
import HexGrid from '@components/HexGrid';

const LIGHT = { color: '#b3c0d4', size: 38, pulseRate: 0.12 };
const DARK = { color: '#3d4757', size: 38, pulseRate: 0.12 };

function resolveDark(): boolean {
  if (typeof window === 'undefined') return true;
  const t = document.documentElement.dataset.theme;
  if (t === 'dark') return true;
  if (t === 'light') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Full-viewport hexagon backdrop that follows the theme.
 * The NEONDECK HexGrid draws its own color on canvas, so we can't theme it
 * via CSS custom properties — read data-theme (manual override) then
 * prefers-color-scheme (system) here instead.
 */
const HexBackground: React.FC = () => {
  const [dark, setDark] = React.useState<boolean>(resolveDark);

  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => setDark(resolveDark());
    mq.addEventListener('change', onChange);

    // Observe manual theme changes (html[data-theme]) set by the switcher.
    const observer = new MutationObserver(onChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      mq.removeEventListener('change', onChange);
      observer.disconnect();
    };
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

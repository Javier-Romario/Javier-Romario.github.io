import * as React from 'react';

interface Props {
  /** 0..100 */
  value: number;
  /** number of braille cells in the track */
  cells?: number;
  /** text shown after the glyphs, e.g. "3 / 6" */
  label?: string;
  /** neon tone key (teal | magenta | violet | blue | green | …) */
  tone?: string;
}

const GLYPH = '⣿';

/**
 * Determinate braille progress bar.
 * Filled cells glow in the tone colour up to the current value; the empty
 * remainder is a grey track (light grey in light mode, dark grey in dark mode);
 * the leading edge pulses to mark the current position.
 */
const BrailleProgress: React.FC<Props> = ({ value, cells = 8, label, tone = 'teal' }) => {
  const total = Math.max(1, cells);
  const clamped = Math.max(0, Math.min(100, value));
  const filled = Math.round((clamped / 100) * total);

  return (
    <span
      className="braille-progress"
      data-tone={tone}
      style={{ '--bp-tone': `var(--neon-${tone})` } as React.CSSProperties}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
      aria-label={label ?? `${Math.round(clamped)}%`}
    >
      <span className="braille-progress__track" aria-hidden="true">
        {Array.from({ length: total }, (_, i) => {
          const state = i < filled ? 'on' : i === filled ? 'tip' : 'off';
          return (
            <span key={i} className="braille-progress__cell" data-state={state}>
              {GLYPH}
            </span>
          );
        })}
      </span>
      {label ? <span className="braille-progress__label">{label}</span> : null}
    </span>
  );
};

export default BrailleProgress;

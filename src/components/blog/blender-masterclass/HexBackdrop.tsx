import HexGrid from './neondeck/HexGrid';

/**
 * Fixed, full-viewport hexagon field behind every page. Subtle by design:
 * low opacity via `.hex-backdrop` + dim color + no glow + slow pulse.
 */
export default function HexBackdrop() {
  return (
    <div className="hex-backdrop" aria-hidden="true">
      <HexGrid color="#00ffd1" size={34} pulseRate={0.18} glow={false} height="100%" />
    </div>
  );
}

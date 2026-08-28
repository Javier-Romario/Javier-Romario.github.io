/**
 * Shared placeholder + loading UI for click-to-activate demos.
 * Kept free of three.js/r3f imports so the island chunk stays tiny;
 * the heavy scene is lazy-loaded only after the user activates it.
 */

export function DemoActivate({
  onClick,
  label = 'Load 3D demo',
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <div className="demo-box">
      <button className="demo-activate" type="button" onClick={onClick}>
        <span className="demo-activate__glyph" aria-hidden="true">
          ▶
        </span>
        <span>{label}</span>
      </button>
    </div>
  );
}

export function DemoLoading({ label = 'Loading three.js…' }: { label?: string }) {
  return (
    <div className="demo-box demo-loading" role="status">
      <span className="demo-loading__bar" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

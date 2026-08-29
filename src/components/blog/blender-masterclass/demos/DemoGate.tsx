/**
 * Shared placeholder + loading UI for click-to-activate demos.
 * Kept free of three.js/r3f imports so the island chunk stays tiny;
 * the heavy scene is lazy-loaded only after the user activates it.
 */

import { Component } from 'react';
import type { ReactNode } from 'react';

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

/**
 * Catches a failed lazy import (the classic "error loading dynamically
 * imported module" from Vite). That happens when a chunk 404s — usually a
 * stale ClientRouter session whose cached hashes no longer match the freshly
 * deployed files, or a transient network blip on the ~850 kB three.js chunk.
 * A rejected dynamic import is cached by the browser for the life of the
 * session, so the only reliable recovery is a full reload (fresh hashes).
 */
export class DemoErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error('3D demo failed to load:', error);
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="demo-box demo-error" role="alert">
          <span>Couldn't load the 3D demo.</span>
          <button
            className="demo-activate"
            type="button"
            onClick={() => window.location.reload()}
          >
            <span className="demo-activate__glyph" aria-hidden="true">↻</span>
            <span>Reload page</span>
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

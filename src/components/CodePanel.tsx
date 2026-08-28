import * as React from 'react';

interface Props {
  code: string;
  filename?: string;
}

export default function CodePanel({ code, filename }: Props) {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable — no-op
    }
  };

  return (
    <div className="code-panel">
      <div className="code-panel__bar">
        <span className="code-panel__file">{filename ?? 'snippet'}</span>
        <button
          type="button"
          className={'code-panel__copy' + (copied ? ' is-copied' : '')}
          onClick={copy}
        >
          {copied ? 'COPIED ✓' : 'COPY'}
        </button>
      </div>
      <pre className="code-panel__pre">
        <code>{code}</code>
      </pre>
    </div>
  );
}

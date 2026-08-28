import * as React from 'react';
import Button from '@components/Button';
import ButtonGroup from '@components/ButtonGroup';
import Select from '@components/Select';
import Checkbox from '@components/Checkbox';
import Accordion from '@components/Accordion';
import Ticker from '@components/Ticker';

type Tone = 'teal' | 'magenta' | 'yellow' | 'green' | 'violet' | 'orange' | 'red' | 'blue';

const TONES: Tone[] = ['teal', 'magenta', 'yellow', 'green', 'violet', 'orange', 'red', 'blue'];

const TABS = [
  { body: 'UPLINK', selected: true },
  { body: 'ICE-BREAKER' },
  { body: 'NETMAP' },
];

const TAB_COPY: Record<string, string> = {
  UPLINK: 'UPLINK 34.2TB/S — neon tokens, glass panels, ticker edges. All server-rendered unless a component needs state.',
  'ICE-BREAKER': 'ICE-BREAKER v2.1 — hydrated islands via client:load / client:visible / client:idle.',
  NETMAP: 'NETMAP — @components / @common path aliases mapped in tsconfig.json AND astro.config.mjs (vite).',
};

export default function Playground() {
  const [tone, setTone] = React.useState<Tone>('teal');
  const [tab, setTab] = React.useState<string>('UPLINK');
  const [armed, setArmed] = React.useState(false);
  const [glitch, setGlitch] = React.useState(false);
  const [count, setCount] = React.useState(0);

  return (
    <div className="stack">
      <Ticker items={['NEONDECK', 'REACT 19', 'ASTRO ISLANDS', 'GITHUB PAGES']} tone={tone} speed={18} />

      <div className="flow flow--2">
        <div className="stack">
          <Select
            name="tone"
            options={TONES}
            placeholder="SELECT TONE"
            defaultValue="teal"
            onChange={(v) => setTone(v as Tone)}
          />

          <ButtonGroup
            items={TABS.map((t) => ({
              body: t.body,
              selected: t.body === 'UPLINK',
              onClick: () => setTab(t.body),
            }))}
            isFull
          />

          <Checkbox name="armed" defaultChecked={false} onChange={(e) => setArmed(e.target.checked)}>
            ARM ICE-BREAKER
          </Checkbox>
          <Checkbox name="glitch" defaultChecked={false} onChange={(e) => setGlitch(e.target.checked)}>
            GLITCH OVERLAY
          </Checkbox>

          <Button
            theme="PRIMARY"
            onClick={() => setCount((c) => c + 1)}
            isDisabled={armed && glitch}
          >
            {armed && glitch ? 'LOCKED' : `PING (${count})`}
          </Button>
        </div>

        <div className="stack">
          <Accordion title={`TAB: ${tab}`} defaultValue>
            <div className="prose">
              <strong>{TAB_COPY[tab] ?? TAB_COPY.UPLINK}</strong>
            </div>
          </Accordion>
          <Accordion title="STATE READOUT">
            <div className="prose">
              tone=<strong>{tone}</strong> · armed=<strong>{String(armed)}</strong> · glitch=
              <strong>{String(glitch)}</strong> · pings=<strong>{count}</strong>
            </div>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

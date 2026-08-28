import { Suspense, lazy, useState } from 'react';
import { DemoActivate, DemoLoading } from './DemoGate';

const Scene = lazy(() => import('./DemoBakeScene'));

export default function DemoBake() {
  const [active, setActive] = useState(false);
  if (!active) return <DemoActivate onClick={() => setActive(true)} label="Load bake demo" />;
  return (
    <Suspense fallback={<DemoLoading />}>
      <Scene />
    </Suspense>
  );
}

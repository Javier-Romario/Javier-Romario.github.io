import { Suspense, lazy, useState } from 'react';
import { DemoActivate, DemoLoading, DemoErrorBoundary } from './DemoGate';

const Scene = lazy(() => import('./DemoBevelScene'));

export default function DemoBevel() {
  const [active, setActive] = useState(false);
  if (!active) return <DemoActivate onClick={() => setActive(true)} label="Load bevel demo" />;
  return (
    <Suspense fallback={<DemoLoading />}>
      <DemoErrorBoundary>
        <Scene />
      </DemoErrorBoundary>
    </Suspense>
  );
}

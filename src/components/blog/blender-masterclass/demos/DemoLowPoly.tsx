import { Suspense, lazy, useState } from 'react';
import { DemoActivate, DemoLoading, DemoErrorBoundary } from './DemoGate';

const Scene = lazy(() => import('./DemoLowPolyScene'));

export default function DemoLowPoly() {
  const [active, setActive] = useState(false);
  if (!active) return <DemoActivate onClick={() => setActive(true)} label="Load low-poly demo" />;
  return (
    <Suspense fallback={<DemoLoading />}>
      <DemoErrorBoundary>
        <Scene />
      </DemoErrorBoundary>
    </Suspense>
  );
}

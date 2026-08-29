import { Suspense, lazy, useState } from 'react';
import { DemoActivate, DemoLoading, DemoErrorBoundary } from './DemoGate';

const Scene = lazy(() => import('./DemoR3FScene'));

export default function DemoR3F() {
  const [active, setActive] = useState(false);
  if (!active) return <DemoActivate onClick={() => setActive(true)} />;
  return (
    <Suspense fallback={<DemoLoading />}>
      <DemoErrorBoundary>
        <Scene />
      </DemoErrorBoundary>
    </Suspense>
  );
}

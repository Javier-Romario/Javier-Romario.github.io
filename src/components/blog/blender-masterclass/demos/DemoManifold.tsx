import { Suspense, lazy, useState } from 'react';
import { DemoActivate, DemoLoading, DemoErrorBoundary } from './DemoGate';

const Scene = lazy(() => import('./DemoManifoldScene'));

export default function DemoManifold() {
  const [active, setActive] = useState(false);
  if (!active) return <DemoActivate onClick={() => setActive(true)} label="Load manifold demo" />;
  return (
    <Suspense fallback={<DemoLoading />}>
      <DemoErrorBoundary>
        <Scene />
      </DemoErrorBoundary>
    </Suspense>
  );
}

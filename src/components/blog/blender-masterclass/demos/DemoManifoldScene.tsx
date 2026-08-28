import { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// A box with the +Y (top) face removed — a non-manifold "hole".
function openBoxGeometry(size = 1.6) {
  const h = size / 2;
  const faces: number[][][] = [
    // bottom -Y
    [[-h, -h, -h], [-h, -h, h], [h, -h, h], [h, -h, -h]],
    // front +Z
    [[-h, -h, h], [-h, h, h], [h, h, h], [h, -h, h]],
    // back -Z
    [[-h, -h, -h], [h, -h, -h], [h, h, -h], [-h, h, -h]],
    // left -X
    [[-h, -h, -h], [-h, h, -h], [-h, h, h], [-h, -h, h]],
    // right +X
    [[h, -h, -h], [h, -h, h], [h, h, h], [h, h, -h]],
  ];
  const pos: number[] = [];
  for (const [a, b, c, d] of faces) {
    for (const p of [a, b, c, a, c, d]) pos.push(...p);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.computeVertexNormals();
  return g;
}

export default function DemoManifold() {
  const openGeo = useMemo(() => openBoxGeometry(), []);
  const [holed, setHoled] = useState(false);
  const manifold = !holed;

  return (
    <div className="demo-box">
      <div className="demo-stage" style={{ height: 320 }}>
        <Canvas camera={{ position: [2.4, 1.8, 3.4], fov: 45 }} dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={40} color={manifold ? '#00ff9d' : '#ff4d5e'} />
          <mesh geometry={holed ? openGeo : new THREE.BoxGeometry(1.6, 1.6, 1.6)}>
            <meshStandardMaterial
              color={manifold ? '#00ff9d' : '#ff4d5e'}
              emissive={manifold ? '#00ff9d' : '#ff4d5e'}
              emissiveIntensity={0.2}
              metalness={0.4}
              roughness={0.3}
              side={THREE.DoubleSide}
              wireframe={holed}
            />
          </mesh>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
        </Canvas>
        <div
          className="demo-readout-overlay"
          style={{ color: manifold ? '#00ff9d' : '#ff4d5e' }}
        >{`${manifold ? '✓ MANIFOLD' : '✗ NON-MANIFOLD'}\n${holed ? 'top face missing' : 'watertight'}`}</div>
      </div>
      <div className="demo-controls">
        <label>
          CUT A HOLE (delete top face)
          <input type="checkbox" checked={holed} onChange={(e) => setHoled(e.target.checked)} />
        </label>
        <span className="demo-readout">
          Blender check: <code>Select → Select All by Trait → Non Manifold</code>. a slicer rejects this mesh — fill the hole with <code>F</code>.
        </span>
      </div>
    </div>
  );
}

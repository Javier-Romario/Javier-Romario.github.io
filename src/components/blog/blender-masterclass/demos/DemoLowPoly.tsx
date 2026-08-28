import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Icosahedron, OrbitControls } from '@react-three/drei';

export default function DemoLowPoly() {
  const [detail, setDetail] = useState(2);
  const [wire, setWire] = useState(true);
  const tris = 20 * Math.pow(4, detail);

  return (
    <div className="demo-box">
      <div className="demo-stage" style={{ height: 320 }}>
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={40} color="#ffe66d" />
          <Icosahedron args={[1.5, detail]}>
            <meshStandardMaterial
              color="#ffe66d"
              emissive="#ffe66d"
              emissiveIntensity={0.2}
              metalness={0.4}
              roughness={0.3}
              wireframe={wire}
              flatShading
            />
          </Icosahedron>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
        </Canvas>
        <div className="demo-readout-overlay">{`${tris.toLocaleString()} TRIANGLES\nDETAIL ${detail}`}</div>
      </div>
      <div className="demo-controls">
        <label>
          SUBDIVISIONS
          <input
            type="range"
            min={0}
            max={4}
            step={1}
            value={detail}
            onChange={(e) => setDetail(Number(e.target.value))}
          />
        </label>
        <label>
          WIREFRAME
          <input type="checkbox" checked={wire} onChange={(e) => setWire(e.target.checked)} />
        </label>
        <span className="demo-readout">
          every step ×4 the triangles. game meshes want <b style={{ color: '#ffe66d' }}>as few as look right</b> — the GPU pays for each one.
        </span>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { RoundedBox, OrbitControls } from '@react-three/drei';

export default function DemoBevel() {
  const [radius, setRadius] = useState(0.18);
  const [wire, setWire] = useState(false);

  return (
    <div className="demo-box">
      <div className="demo-stage" style={{ height: 320 }}>
        <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }} dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={40} color="#00ffd1" />
          <RoundedBox args={[1.7, 1.7, 1.7]} radius={radius} smoothness={8}>
            <meshStandardMaterial
              color="#00ffd1"
              emissive="#00ffd1"
              emissiveIntensity={0.25}
              metalness={0.5}
              roughness={0.3}
              wireframe={wire}
            />
          </RoundedBox>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
        </Canvas>
        <div className="demo-readout-overlay">{`BEVEL ${radius.toFixed(2)}\nWIRE ${wire ? 'ON' : 'OFF'}`}</div>
      </div>
      <div className="demo-controls">
        <label>
          BEVEL RADIUS
          <input
            type="range"
            min={0}
            max={0.5}
            step={0.01}
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
          />
        </label>
        <label>
          WIREFRAME
          <input type="checkbox" checked={wire} onChange={(e) => setWire(e.target.checked)} />
        </label>
        <span className="demo-readout">
          Blender: this is the <code>Bevel</code> modifier — 0 = sharp edge, higher = chamfer. a bevel is what makes edges catch light.
        </span>
      </div>
    </div>
  );
}

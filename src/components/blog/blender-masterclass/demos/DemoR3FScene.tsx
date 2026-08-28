import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

const COLORS = ['#00ffd1', '#ff9d2d', '#ff2d78'];

export default function DemoR3F() {
  const [color, setColor] = useState(COLORS[0]);
  const [wire, setWire] = useState(false);

  return (
    <div className="demo-box">
      <div className="demo-stage" style={{ height: 360 }}>
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
          <ambientLight intensity={0.4} />
          <pointLight position={[6, 6, 6]} intensity={40} color={color} />
          <mesh>
            <torusKnotGeometry args={[1.4, 0.42, 160, 20]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.35}
              metalness={0.6}
              roughness={0.25}
              wireframe={wire}
            />
          </mesh>
          <Stars radius={60} depth={40} count={1200} factor={3} fade speed={1} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
        </Canvas>
        <div className="demo-readout-overlay">{`useGLTF('/my-model.glb')\n<primitive object={scene} />\ncolor ${color}`}</div>
      </div>
      <div className="demo-controls">
        <div style={{ display: 'flex', gap: 8 }}>
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              style={{
                width: 26,
                height: 26,
                borderRadius: '50%',
                background: c,
                border: c === color ? '2px solid #fff' : '2px solid transparent',
                cursor: 'pointer',
                boxShadow: c === color ? `0 0 12px ${c}` : 'none',
              }}
            />
          ))}
        </div>
        <label>
          WIREFRAME
          <input type="checkbox" checked={wire} onChange={(e) => setWire(e.target.checked)} />
        </label>
        <span className="demo-readout">
          this knot is just a Blender primitive recreated in r3f. your GLB slots in the same way — drag it.
        </span>
      </div>
    </div>
  );
}

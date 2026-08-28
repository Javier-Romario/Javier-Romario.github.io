import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function makeBakeTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#0a1620';
  ctx.fillRect(0, 0, 256, 256);
  const s = 32;
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      ctx.fillStyle = (x + y) % 2 === 0 ? '#00ffd1' : '#0a1620';
      ctx.fillRect(x * s, y * s, s, s);
    }
  }
  // fake baked ambient-occlusion (edges darken)
  const g = ctx.createRadialGradient(128, 128, 40, 128, 128, 200);
  g.addColorStop(0, 'rgba(0,0,0,0)');
  g.addColorStop(1, 'rgba(0,0,0,0.75)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export default function DemoBake() {
  const [tex, setTex] = useState<THREE.Texture | null>(null);
  const [baked, setBaked] = useState(true);

  useEffect(() => {
    setTex(makeBakeTexture());
  }, []);

  return (
    <div className="demo-box">
      <div className="demo-stage" style={{ height: 320 }}>
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={40} color="#00ffd1" />
          <Box args={[1.7, 1.7, 1.7]}>
            <meshStandardMaterial
              map={baked ? tex : null}
              color={baked ? '#ffffff' : '#00ffd1'}
              emissive={baked ? '#000000' : '#00ffd1'}
              emissiveIntensity={baked ? 0 : 0.2}
              metalness={0.4}
              roughness={0.4}
            />
          </Box>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
        </Canvas>
        <div className="demo-readout-overlay">{`${baked ? '✓ BAKED' : 'FLAT SHADING'}\n${baked ? 'texture carries the detail' : 'no texture, plain color'}`}</div>
      </div>
      <div className="demo-controls">
        <label>
          BAKE HIGH→LOW
          <input type="checkbox" checked={baked} onChange={(e) => setBaked(e.target.checked)} />
        </label>
        <span className="demo-readout">
          same 12-triangle box. the <b>checker + edge shading live in a texture</b>, not in the geometry. that's the whole bake.
        </span>
      </div>
    </div>
  );
}

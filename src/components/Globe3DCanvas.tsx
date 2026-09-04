import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Convert Lat/Lon to 3D coordinates on sphere
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Major cities connecting to Rajkot for industrial B2B network
const NETWORK_NODES = [
  { name: 'Rajkot (Plant HQ)', lat: 22.3039, lon: 70.8022, isHq: true },
  { name: 'Ahmedabad', lat: 23.0225, lon: 72.5714 },
  { name: 'Surat', lat: 21.1702, lon: 72.8311 },
  { name: 'Vadodara', lat: 22.3072, lon: 73.1812 },
  { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
  { name: 'Delhi NCR', lat: 28.6139, lon: 77.2090 },
  { name: 'Bengaluru', lat: 12.9716, lon: 77.5946 },
  { name: 'Hyderabad', lat: 17.3850, lon: 78.4867 },
  { name: 'Dubai', lat: 25.2048, lon: 55.2708 },
  { name: 'London', lat: 51.5074, lon: -0.1278 },
  { name: 'Singapore', lat: 1.3521, lon: 103.8198 },
];

function InteractiveGlobe() {
  const globeGroupRef = useRef<THREE.Group>(null);
  const pulseRingRef = useRef<THREE.Mesh>(null);
  const beaconRef = useRef<THREE.Mesh>(null);

  const radius = 2.4;

  // Rajkot coordinates
  const rajkotPos = useMemo(() => latLonToVector3(22.3039, 70.8022, radius), [radius]);

  // Generate latitude/longitude wireframe arcs & node points
  const { pointsPositions, arcLines } = useMemo(() => {
    // Generate surface dotted grid
    const points: number[] = [];
    for (let lat = -80; lat <= 80; lat += 8) {
      const ringRadius = radius * Math.cos(lat * (Math.PI / 180));
      const y = radius * Math.sin(lat * (Math.PI / 180));
      const count = Math.max(12, Math.floor(48 * (ringRadius / radius)));
      for (let i = 0; i < count; i++) {
        const theta = (i / count) * Math.PI * 2;
        const x = ringRadius * Math.cos(theta);
        const z = ringRadius * Math.sin(theta);
        points.push(x, y, z);
      }
    }

    // Connect Rajkot to other hub locations with arched bezier curves
    const lines: THREE.Vector3[][] = [];
    const hq = latLonToVector3(22.3039, 70.8022, radius);

    NETWORK_NODES.filter(n => !n.isHq).forEach(dest => {
      const target = latLonToVector3(dest.lat, dest.lon, radius);
      // Midpoint elevated off surface
      const mid = new THREE.Vector3().addVectors(hq, target).multiplyScalar(0.5);
      const distance = hq.distanceTo(target);
      mid.normalize().multiplyScalar(radius + distance * 0.25);

      const curve = new THREE.QuadraticBezierCurve3(hq, mid, target);
      lines.push(curve.getPoints(24));
    });

    return {
      pointsPositions: new Float32Array(points),
      arcLines: lines
    };
  }, [radius]);

  // Pre-create Three.js Line instances for smooth rendering without JSX SVG collision
  const lineObjects = useMemo(() => {
    return arcLines.map(pts => {
      const geometry = new THREE.BufferGeometry().setFromPoints(pts);
      const material = new THREE.LineBasicMaterial({
        color: '#38bdf8',
        transparent: true,
        opacity: 0.4
      });
      return new THREE.Line(geometry, material);
    });
  }, [arcLines]);

  useFrame((state, delta) => {
    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.y += delta * 0.12; // slow cinematic rotation
    }

    // Pulsing beacon ring around Rajkot
    if (pulseRingRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.4;
      pulseRingRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={globeGroupRef} rotation={[0.2, 0.4, 0]}>
      {/* 1. Dark Solid Inner Core */}
      <mesh>
        <sphereGeometry args={[radius * 0.985, 48, 48]} />
        <meshStandardMaterial
          color="#060913"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* 2. Glowing Wireframe Shell */}
      <mesh>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* 3. Luminous Dotted Surface Grid */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[pointsPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#60a5fa"
          transparent
          opacity={0.45}
        />
      </points>

      {/* 4. Outer Radiant Atmosphere Halo */}
      <mesh>
        <sphereGeometry args={[radius * 1.15, 32, 32]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>

      {/* 5. Dispatch / Connectivity Arc Lines */}
      {lineObjects.map((lineObj, idx) => (
        <primitive key={idx} object={lineObj} />
      ))}

      {/* 6. Destination Node Markers */}
      {NETWORK_NODES.filter(n => !n.isHq).map((node, i) => {
        const pos = latLonToVector3(node.lat, node.lon, radius);
        return (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.025, 12, 12]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        );
      })}

      {/* 7. PINPOINT MARKER ON RAJKOT, GUJARAT, INDIA */}
      <group position={rajkotPos}>
        {/* Bright Glowing Core Beacon */}
        <mesh ref={beaconRef}>
          <sphereGeometry args={[0.075, 16, 16]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>

        {/* Pulsing Emerald Radar Ring */}
        <mesh ref={pulseRingRef}>
          <ringGeometry args={[0.1, 0.16, 32]} />
          <meshBasicMaterial
            color="#10b981"
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Vertical Light Pillar pointing from Rajkot */}
        <mesh position={[0, 0, 0.25]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.5, 8]} />
          <meshBasicMaterial color="#34d399" transparent opacity={0.8} />
        </mesh>

        {/* Floating Top Beacon */}
        <mesh position={[0, 0, 0.5]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
    </group>
  );
}

export function Globe3DCanvas() {
  return (
    <div className="relative w-full h-[460px] sm:h-[540px] rounded-3xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]">
      {/* 3D Canvas */}
      <Canvas className="w-full h-full cursor-grab active:cursor-grabbing">
        <PerspectiveCamera makeDefault position={[0, 0, 6.2]} fov={45} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#38bdf8" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#10b981" />

        <InteractiveGlobe />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          dampingFactor={0.06}
          rotateSpeed={0.8}
        />
      </Canvas>

      {/* Pinpoint Callout Badge on Rajkot */}
      <div className="absolute top-6 left-6 pointer-events-none">
        <div className="p-3.5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/15 shadow-xl space-y-1 max-w-[260px]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              Plant Headquarters
            </span>
          </div>
          <div className="text-sm font-extrabold text-sky-300">
            Rajkot, Gujarat, India
          </div>
          <p className="text-[11px] text-slate-300 font-mono">
            Lat 22.30° N • Long 70.80° E • Kuvadva G.I.D.C
          </p>
        </div>
      </div>

      {/* Bottom overlay info */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-slate-400 bg-slate-950/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 pointer-events-none">
        <span>Extrusion Works & Pan-India Dispatch Hub</span>
        <span>Drag 360° to explore global connectivity</span>
      </div>
    </div>
  );
}

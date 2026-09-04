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

// Major export footprint nodes connecting to Rajkot
const NETWORK_NODES = [
  { name: 'Rajkot (Plant HQ)', region: 'Gujarat', lat: 22.3039, lon: 70.8022, isHq: true, domestic: true },
  { name: 'Ahmedabad Hub', region: 'Gujarat', lat: 23.0225, lon: 72.5714, domestic: true },
  { name: 'Surat Industrial', region: 'Gujarat', lat: 21.1702, lon: 72.8311, domestic: true },
  { name: 'Jaipur Logistics', region: 'Rajasthan', lat: 26.9124, lon: 75.7873, domestic: true },
  { name: 'Jodhpur Agri Depot', region: 'Rajasthan', lat: 26.2389, lon: 73.0243, domestic: true },
  { name: 'Mumbai Seaport & City', region: 'Maharashtra', lat: 19.0760, lon: 72.8777, domestic: true },
  { name: 'Pune Industrial', region: 'Maharashtra', lat: 18.5204, lon: 73.8567, domestic: true },
  { name: 'Delhi NCR Freight', region: 'North Corridor', lat: 28.6139, lon: 77.2090, domestic: true },
  { name: 'Dubai Port (Jebel Ali)', region: 'Middle East', lat: 25.2048, lon: 55.2708, domestic: false },
  { name: 'Riyadh Infrastructure', region: 'Middle East', lat: 24.7136, lon: 46.6753, domestic: false },
  { name: 'Muscat Port', region: 'Middle East', lat: 23.5880, lon: 58.3829, domestic: false },
  { name: 'Nairobi Agri Projects', region: 'East Africa', lat: -1.2921, lon: 36.8219, domestic: false },
  { name: 'Lagos Harbor', region: 'West Africa', lat: 6.5244, lon: 3.3792, domestic: false },
  { name: 'Cairo Municipal', region: 'North Africa', lat: 30.0444, lon: 31.2357, domestic: false },
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

    // Connect Rajkot to export destinations with elevated quadratic bezier curves
    const lines: { points: THREE.Vector3[]; domestic: boolean }[] = [];
    const hq = latLonToVector3(22.3039, 70.8022, radius);

    NETWORK_NODES.filter(n => !n.isHq).forEach(dest => {
      const target = latLonToVector3(dest.lat, dest.lon, radius);
      // Midpoint elevated off surface
      const mid = new THREE.Vector3().addVectors(hq, target).multiplyScalar(0.5);
      const distance = hq.distanceTo(target);
      mid.normalize().multiplyScalar(radius + distance * 0.28);

      const curve = new THREE.QuadraticBezierCurve3(hq, mid, target);
      lines.push({
        points: curve.getPoints(24),
        domestic: dest.domestic
      });
    });

    return {
      pointsPositions: new Float32Array(points),
      arcLines: lines
    };
  }, [radius]);

  // Pre-create Three.js Line instances with bright industrial blue & emerald styling
  const lineObjects = useMemo(() => {
    return arcLines.map(item => {
      const geometry = new THREE.BufferGeometry().setFromPoints(item.points);
      const material = new THREE.LineBasicMaterial({
        color: item.domestic ? '#2563eb' : '#059669',
        transparent: true,
        opacity: item.domestic ? 0.75 : 0.85,
        linewidth: 2
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
      {/* 1. Light Solid Inner Core for Vercel Theme */}
      <mesh>
        <sphereGeometry args={[radius * 0.985, 48, 48]} />
        <meshStandardMaterial
          color="#f8fafc"
          roughness={0.6}
          metalness={0.05}
        />
      </mesh>

      {/* 2. Soft Blue Subtle Wireframe Shell */}
      <mesh>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial
          color="#cbd5e1"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* 3. Surface Dotted Grid */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[pointsPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#3b82f6"
          transparent
          opacity={0.5}
        />
      </points>

      {/* 4. Outer Radiant Atmosphere Halo */}
      <mesh>
        <sphereGeometry args={[radius * 1.08, 32, 32]} />
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>

      {/* 5. Dispatch / Connectivity Arc Lines */}
      {lineObjects.map((lineObj, idx) => (
        <primitive key={idx} object={lineObj} />
      ))}

      {/* 6. Destination Node Markers (Blue for Domestic, Emerald for Global) */}
      {NETWORK_NODES.filter(n => !n.isHq).map((node, i) => {
        const pos = latLonToVector3(node.lat, node.lon, radius);
        return (
          <group key={i} position={pos}>
            <mesh>
              <sphereGeometry args={[0.045, 12, 12]} />
              <meshBasicMaterial color={node.domestic ? '#2563eb' : '#059669'} />
            </mesh>
            {/* Small outer target ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.06, 0.08, 16]} />
              <meshBasicMaterial
                color={node.domestic ? '#3b82f6' : '#10b981'}
                transparent
                opacity={0.6}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        );
      })}

      {/* 7. PINPOINT MARKER ON RAJKOT, GUJARAT, INDIA */}
      <group position={rajkotPos}>
        {/* Bright Glowing Core Beacon */}
        <mesh ref={beaconRef}>
          <sphereGeometry args={[0.085, 16, 16]} />
          <meshBasicMaterial color="#2563eb" />
        </mesh>

        {/* Pulsing Emerald Radar Ring */}
        <mesh ref={pulseRingRef}>
          <ringGeometry args={[0.11, 0.18, 32]} />
          <meshBasicMaterial
            color="#2563eb"
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Vertical Light Pillar pointing from Rajkot */}
        <mesh position={[0, 0, 0.25]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.5, 8]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.85} />
        </mesh>

        {/* Floating Top Beacon */}
        <mesh position={[0, 0, 0.5]}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
    </group>
  );
}

export function Globe3DCanvas() {
  return (
    <div className="relative w-full h-[460px] sm:h-[540px] rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-sm">
      {/* 3D Canvas with Light Studio Setup */}
      <Canvas className="w-full h-full cursor-grab active:cursor-grabbing">
        <PerspectiveCamera makeDefault position={[0, 0, 6.2]} fov={45} />
        <ambientLight intensity={1.6} />
        <directionalLight position={[10, 10, 10]} intensity={2.0} color="#ffffff" />
        <directionalLight position={[-10, -10, 8]} intensity={1.0} color="#e2e8f0" />

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
        <div className="p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-md space-y-1 max-w-[270px]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600" />
            </span>
            <span className="font-mono text-xs font-bold text-slate-900 uppercase tracking-wider">
              Plant Headquarters
            </span>
          </div>
          <div className="text-sm font-extrabold text-blue-600">
            Rajkot, Gujarat, India
          </div>
          <p className="text-[11px] text-slate-500 font-mono">
            Lat 22.30° N • Long 70.80° E • Kuvadva G.I.D.C
          </p>
        </div>
      </div>

      {/* Legend & Navigation Overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-600 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-200 shadow-xs pointer-events-none gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
            Domestic: Gujarat, Rajasthan, Maharashtra
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
            Global: Middle East, Africa
          </span>
        </div>
        <span className="text-slate-400 hidden sm:inline">Drag 360° to explore export footprint</span>
      </div>
    </div>
  );
}

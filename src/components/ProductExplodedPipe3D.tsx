import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { Layers, RotateCcw, Eye, Sparkles, Shield, Cpu } from 'lucide-react';

interface ExplodedPipeProps {
  explodeAmount: number; // 0 (assembled) to 1 (fully exploded)
  pipeVariant: 'hdpe' | 'mdpe' | 'drip' | 'plb';
}

function ExplodedPipeModel({ explodeAmount, pipeVariant }: ExplodedPipeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const outerRef = useRef<THREE.Group>(null);
  const middleRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);

  // Procedural texture for outer cylinder
  const { outerTexture, stripeColor, middleColor, innerGlowColor } = useMemo(() => {
    let color = '#38bdf8'; // sky blue
    let midColor = '#1e293b';
    let innerColor = '#0284c7';
    let text = 'ABHAY POLYPLAST • RAJKOT • IS 4984 : 2016 • PE-100 PN-16 • 110MM • BATCH #2026';

    if (pipeVariant === 'mdpe') {
      color = '#f59e0b';
      midColor = '#292524';
      innerColor = '#d97706';
      text = 'ABHAY POLYPLAST • MDPE GAS DUCT • ISO 4437 • 63MM SDR-11 • RAJKOT';
    } else if (pipeVariant === 'drip') {
      color = '#10b981';
      midColor = '#064e3b';
      innerColor = '#059669';
      text = 'ABHAY POLYPLAST • DRIP PRECISION LATERAL • IS 12786 • 16MM UV RESISTANT';
    } else if (pipeVariant === 'plb') {
      color = '#06b6d4';
      midColor = '#164e63';
      innerColor = '#0891b2';
      text = 'ABHAY POLYPLAST • PLB OPTICAL FIBER DUCT • SILICON COATED INNER BORE';
    }

    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Matte black polymer finish
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Fine extrusion micro-striations
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
      ctx.lineWidth = 1;
      for (let y = 0; y < canvas.height; y += 3) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // 4 co-extruded longitudinal stripes
      [0.12, 0.37, 0.62, 0.87].forEach(pos => {
        const y = pos * canvas.height;
        ctx.fillStyle = color + '44';
        ctx.fillRect(0, y - 10, canvas.width, 20);
        ctx.fillStyle = color;
        ctx.fillRect(0, y - 4, canvas.width, 8);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, y - 1, canvas.width, 2);
      });

      // Technical laser engraved markings
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = 'bold 24px "Plus Jakarta Sans", monospace, sans-serif';
      ctx.letterSpacing = '3px';
      for (let x = 80; x < canvas.width; x += 950) {
        ctx.fillText(text, x, canvas.height * 0.25);
        ctx.fillText(text, x, canvas.height * 0.75);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    return {
      outerTexture: texture,
      stripeColor: color,
      middleColor: midColor,
      innerGlowColor: innerColor
    };
  }, [pipeVariant]);

  // Procedural texture for inner mirror-smooth bore
  const innerBoreTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#050811';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Continuous micro-lubrication lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x += 16) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Gentle constant rotation
      groupRef.current.rotation.y += 0.003;
    }

    // Lerp exploded positions
    const targetOuterX = explodeAmount * 1.8;
    const targetMiddleX = 0;
    const targetInnerX = -explodeAmount * 1.8;

    if (outerRef.current) {
      outerRef.current.position.x = THREE.MathUtils.lerp(outerRef.current.position.x, targetOuterX, delta * 6);
    }
    if (middleRef.current) {
      middleRef.current.position.x = THREE.MathUtils.lerp(middleRef.current.position.x, targetMiddleX, delta * 6);
    }
    if (innerRef.current) {
      innerRef.current.position.x = THREE.MathUtils.lerp(innerRef.current.position.x, targetInnerX, delta * 6);
    }
  });

  return (
    <group ref={groupRef} rotation={[0.3, 0.6, 0]}>
      {/* 1. OUTER CYLINDER: Matte Black Carbon Shield with Specification Engraving */}
      <group ref={outerRef}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.5, 1.5, 4.4, 64, 1, true]} />
          <meshStandardMaterial
            map={outerTexture}
            roughness={0.88}
            metalness={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Beveled edge rings */}
        <mesh position={[2.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[1.5, 0.04, 16, 64]} />
          <meshStandardMaterial color={stripeColor} emissive={stripeColor} emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[-2.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[1.5, 0.04, 16, 64]} />
          <meshStandardMaterial color={stripeColor} emissive={stripeColor} emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* 2. MIDDLE CYLINDER: High-Density Virgin PE-100 Core Matrix */}
      <group ref={middleRef}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.22, 1.22, 4.4, 64, 1, true]} />
          <meshStandardMaterial
            color={middleColor}
            roughness={0.55}
            metalness={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Core structural wall indicator rings */}
        <mesh position={[2.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <ringGeometry args={[1.22, 1.48, 64]} />
          <meshStandardMaterial
            color="#334155"
            roughness={0.4}
            metalness={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[-2.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <ringGeometry args={[1.22, 1.48, 64]} />
          <meshStandardMaterial
            color="#334155"
            roughness={0.4}
            metalness={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* 3. INNER CYLINDER: Smooth Glossy Mirror Bore (Low Friction Hydraulic Layer) */}
      <group ref={innerRef}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.96, 0.96, 4.4, 64, 1, true]} />
          <meshPhysicalMaterial
            map={innerBoreTexture}
            color="#0f172a"
            emissive={innerGlowColor}
            emissiveIntensity={0.25}
            roughness={0.12}
            metalness={0.6}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            reflectivity={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Inner edge glowing ring */}
        <mesh position={[2.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <ringGeometry args={[0.96, 1.20, 64]} />
          <meshStandardMaterial
            color={stripeColor}
            emissive={stripeColor}
            emissiveIntensity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[-2.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <ringGeometry args={[0.96, 1.20, 64]} />
          <meshStandardMaterial
            color={stripeColor}
            emissive={stripeColor}
            emissiveIntensity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}

export function ProductExplodedPipe3D() {
  const [explodeAmount, setExplodeAmount] = useState<number>(0.75);
  const [pipeVariant, setPipeVariant] = useState<'hdpe' | 'mdpe' | 'drip' | 'plb'>('hdpe');
  const [isExploded, setIsExploded] = useState<boolean>(true);

  const toggleExploded = () => {
    if (isExploded) {
      setExplodeAmount(0);
      setIsExploded(false);
    } else {
      setExplodeAmount(0.85);
      setIsExploded(true);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setExplodeAmount(val);
    setIsExploded(val > 0.05);
  };

  return (
    <div className="relative w-full h-[520px] sm:h-[580px] rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-sm">
      {/* 3D Canvas Scene */}
      <Canvas className="w-full h-full cursor-grab active:cursor-grabbing">
        <PerspectiveCamera makeDefault position={[0, 1.5, 6.5]} fov={45} />
        
        {/* Studio Lights for Light Background */}
        <ambientLight intensity={1.4} />
        <directionalLight position={[10, 12, 10]} intensity={2.0} color="#ffffff" />
        <directionalLight position={[-10, -5, -8]} intensity={0.8} color="#e2e8f0" />
        <pointLight position={[0, 0, 4]} intensity={1.2} color="#ffffff" />
        <pointLight position={[2, 2, -2]} intensity={1.0} color="#93c5fd" />

        {/* 3D Exploded Model */}
        <ExplodedPipeModel explodeAmount={explodeAmount} pipeVariant={pipeVariant} />

        {/* 360 Degree Drag Rotation */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={3.8}
          maxDistance={12}
          dampingFactor={0.06}
        />
      </Canvas>

      {/* Top Overlay: Technical Title & 360 Badge */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-slate-800 text-xs font-mono shadow-xs">
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span className="font-semibold text-slate-900">Interactive 3D Exploded View</span>
          <span className="text-slate-400">• Drag 360° to Rotate</span>
        </div>

        {/* Variant selector buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xs pointer-events-auto">
          <button
            onClick={() => setPipeVariant('hdpe')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
              pipeVariant === 'hdpe'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            HDPE (IS 4984)
          </button>
          <button
            onClick={() => setPipeVariant('mdpe')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
              pipeVariant === 'mdpe'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            MDPE Gas
          </button>
          <button
            onClick={() => setPipeVariant('drip')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
              pipeVariant === 'drip'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Drip Lateral
          </button>
          <button
            onClick={() => setPipeVariant('plb')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
              pipeVariant === 'plb'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            PLB Duct
          </button>
        </div>
      </div>

      {/* Layer Callout Annotations (When Exploded) */}
      <div className="absolute top-20 left-4 pointer-events-none hidden md:flex flex-col gap-2 max-w-[240px]">
        <div className="p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-xs shadow-sm space-y-1">
          <div className="flex items-center gap-1.5 font-mono text-blue-600 font-bold text-[11px] uppercase">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            1. Outer Protective Shell
          </div>
          <p className="text-[11px] text-slate-600">
            Matte black 2.5% carbon black masterbatch. Laser standard markings & co-extruded tracer stripes.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-xs shadow-sm space-y-1">
          <div className="flex items-center gap-1.5 font-mono text-slate-800 font-bold text-[11px] uppercase">
            <span className="w-2 h-2 rounded-full bg-slate-500" />
            2. Middle Strength Layer
          </div>
          <p className="text-[11px] text-slate-600">
            100% prime molecular weight PE-100 structural matrix. Pressure certified up to PN 16 (16 kg/cm²).
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-xs shadow-sm space-y-1">
          <div className="flex items-center gap-1.5 font-mono text-emerald-600 font-bold text-[11px] uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            3. Inner Smooth Core
          </div>
          <p className="text-[11px] text-slate-600">
            Mirror-smooth silicone-coated low-friction interior bore (μ ≤ 0.06) preventing scaling and sediment.
          </p>
        </div>
      </div>

      {/* Bottom Control Bar: Explode Slider & Toggle Button */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-md pointer-events-auto">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={toggleExploded}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 flex items-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <Layers className="w-4 h-4" />
            <span>{isExploded ? 'Assemble Layers' : 'Explode Layers'}</span>
          </button>

          <span className="text-xs font-mono text-slate-600 hidden sm:inline">
            Separation: {Math.round(explodeAmount * 100)}%
          </span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-72">
          <span className="text-[11px] font-mono text-slate-500">Assemble</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={explodeAmount}
            onChange={handleSliderChange}
            className="w-full accent-blue-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
          />
          <span className="text-[11px] font-mono font-medium text-blue-600">Exploded</span>
        </div>
      </div>
    </div>
  );
}

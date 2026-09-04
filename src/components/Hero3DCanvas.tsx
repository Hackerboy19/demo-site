import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface PipeSceneProps {
  pipeType: 'hdpe' | 'mdpe' | 'drip' | 'plb';
}

function HdpePipeModel({ pipeType }: PipeSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const outerMeshRef = useRef<THREE.Mesh>(null);
  const targetRotation = useRef({ x: 0.35, y: 0.5 });
  const targetPosition = useRef({ x: 1.2, y: 0 });

  // Generate high-resolution procedural texture for authentic HDPE extrusion markings
  const { pipeTexture, stripeColorHex, accentColorHex } = useMemo(() => {
    let stripeColor = '#3b82f6'; // vibrant brand blue
    let pipeBase = '#090d16';
    let gradeText = 'ABHAY POLYPLAST • RAJKOT • IS 4984 : 2016 • PE-100 PN-16 • 110mm SDR-11 • BATCH #2026-09';

    if (pipeType === 'mdpe') {
      stripeColor = '#f59e0b';
      pipeBase = '#111827';
      gradeText = 'ABHAY POLYPLAST • MDPE GAS DUCT • ISO 4437 • 63mm SDR-11 • SDR GAS/WATER';
    } else if (pipeType === 'drip') {
      stripeColor = '#10b981';
      pipeBase = '#05070d';
      gradeText = 'ABHAY POLYPLAST • DRIP PRECISION LATERAL • IS 12786 • 16MM UV STABILIZED';
    } else if (pipeType === 'plb') {
      stripeColor = '#06b6d4';
      pipeBase = '#090d16';
      gradeText = 'ABHAY POLYPLAST • PLB OPTICAL FIBER DUCT • 40/33MM • SILICON LUBRICATED CORE';
    }

    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Pipe dark polymer body with subtle carbon black texture
      ctx.fillStyle = pipeBase;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Micro surface polymer extrusion grain lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // 4 authentic longitudinal co-extruded stripes around the circumference
      const stripePositions = [0.12, 0.37, 0.62, 0.87];
      stripePositions.forEach((pos) => {
        const stripeY = pos * canvas.height;
        // Outer glow
        ctx.fillStyle = stripeColor + '33';
        ctx.fillRect(0, stripeY - 12, canvas.width, 24);
        // Core stripe
        ctx.fillStyle = stripeColor;
        ctx.fillRect(0, stripeY - 4, canvas.width, 8);
        // Highlight core
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, stripeY - 1, canvas.width, 2);
      });

      // Laser etched industrial grade standard specifications
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.font = 'bold 22px "Plus Jakarta Sans", monospace, sans-serif';
      ctx.letterSpacing = '3px';
      // Repeat markings along pipe length
      for (let x = 60; x < canvas.width; x += 900) {
        ctx.fillText(gradeText, x, canvas.height * 0.25);
        ctx.fillText(gradeText, x, canvas.height * 0.75);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.anisotropy = 8;

    return {
      pipeTexture: texture,
      stripeColorHex: stripeColor,
      accentColorHex: stripeColor
    };
  }, [pipeType]);

  // Smooth mouse parallax and rotation loop
  useFrame((state) => {
    if (!groupRef.current) return;

    // Auto slow rotation
    groupRef.current.rotation.y += 0.006;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      0.35 + state.pointer.y * 0.25,
      0.05
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      -0.25 + state.pointer.x * 0.25,
      0.05
    );

    // Subtle parallax position shift
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetPosition.current.x + state.pointer.x * 0.3,
      0.05
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetPosition.current.y + state.pointer.y * 0.2,
      0.05
    );
  });

  return (
    <group ref={groupRef} position={[1.0, 0, 0]} rotation={[0.35, 0.6, -0.25]}>
      {/* Outer High-Density Polymer Tube */}
      <mesh ref={outerMeshRef}>
        <cylinderGeometry args={[1.35, 1.35, 5.2, 64, 1, true]} />
        <meshPhysicalMaterial
          map={pipeTexture}
          roughness={0.18}
          metalness={0.3}
          clearcoat={0.9}
          clearcoatRoughness={0.12}
          reflectivity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Realistic Inner Bore / Wall Tube */}
      <mesh>
        <cylinderGeometry args={[1.15, 1.15, 5.18, 64, 1, true]} />
        <meshStandardMaterial
          color="#04060a"
          roughness={0.3}
          metalness={0.2}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Top Beveled Wall Rim Ring */}
      <mesh position={[0, 2.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.15, 1.35, 64]} />
        <meshStandardMaterial
          color="#1e293b"
          roughness={0.25}
          metalness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Bottom Beveled Wall Rim Ring */}
      <mesh position={[0, -2.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.15, 1.35, 64]} />
        <meshStandardMaterial
          color="#1e293b"
          roughness={0.25}
          metalness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Glowing High-Tech Precision Measurement Rings */}
      <mesh position={[0, 1.2, 0]}>
        <torusGeometry args={[1.39, 0.015, 16, 64]} />
        <meshBasicMaterial color={stripeColorHex} transparent opacity={0.65} />
      </mesh>
      <mesh position={[0, -1.2, 0]}>
        <torusGeometry args={[1.39, 0.015, 16, 64]} />
        <meshBasicMaterial color={stripeColorHex} transparent opacity={0.65} />
      </mesh>

      {/* Floating internal flow particle indicator */}
      <pointLight position={[0, 0, 0]} intensity={0.8} color={stripeColorHex} distance={3} />

      {/* Realistic Soft Contact Shadow on Studio Ground Plane */}
      <mesh position={[0, -2.85, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[7, 7]} />
        <meshBasicMaterial
          transparent
          opacity={0.12}
          color="#0f172a"
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// Background Floating Ambient Subtle Droplets (clean light theme)
function FloatingOrbs() {
  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh position={[-3, 2, -2]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.2} />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={0.4} floatIntensity={1}>
        <mesh position={[3.2, -1.8, -1]}>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0.2} />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.9}>
        <mesh position={[-2.2, -2, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshBasicMaterial color="#0284c7" transparent opacity={0.25} />
        </mesh>
      </Float>
    </group>
  );
}

export function Hero3DCanvas({ pipeType = 'hdpe' }: { pipeType: 'hdpe' | 'mdpe' | 'drip' | 'plb' }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    // Graceful fallback if WebGL is unavailable
    return (
      <div className="w-full h-full flex items-center justify-center relative">
        <div className="w-64 h-64 rounded-full bg-blue-100 blur-3xl absolute animate-pulse" />
        <div className="relative z-10 border border-slate-200 bg-white/90 backdrop-blur-xl p-8 rounded-2xl text-center shadow-xl">
          <div className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-1">
            Abhay Polyplast
          </div>
          <div className="text-xl font-bold text-slate-900">PE-100 HDPE Specimen</div>
          <div className="text-xs text-slate-500 mt-2">Precision Extruded Polymer Tube</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
      <Canvas
        className="w-full h-full"
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
        }}
        onError={() => setHasError(true)}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 7.5]} fov={42} />

        {/* Soft Studio Lighting Setup for Pure Light Vercel Environment */}
        <ambientLight intensity={1.4} />
        {/* Main Studio Key Softbox */}
        <directionalLight position={[6, 8, 8]} intensity={2.2} color="#ffffff" />
        {/* Soft Ambient Fill Light */}
        <directionalLight position={[-6, -2, 5]} intensity={1.0} color="#f8fafc" />
        {/* Crisp Backlight / Rim Definition */}
        <directionalLight position={[0, 7, -6]} intensity={1.6} color="#e2e8f0" />
        {/* Specular Glint Accent */}
        <pointLight position={[3, 2, 4]} intensity={1.2} color="#93c5fd" distance={12} />
        {/* Agricultural Emerald Rim Reflection */}
        <pointLight position={[-3, -2, 3]} intensity={1.0} color="#6ee7b7" distance={8} />

        <HdpePipeModel pipeType={pipeType} />
        <FloatingOrbs />
      </Canvas>
    </div>
  );
}

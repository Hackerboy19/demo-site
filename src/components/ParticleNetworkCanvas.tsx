import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function WaterParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Define grid dimensions
  const rows = 36;
  const cols = 48;
  const count = rows * cols;

  const { positions, originalPositions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const colorBlue = new THREE.Color('#3b82f6');
    const colorEmerald = new THREE.Color('#10b981');
    const colorCyan = new THREE.Color('#06b6d4');

    let idx = 0;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = (j - cols / 2) * 0.28;
        const y = (i - rows / 2) * 0.28;
        const z = 0;

        pos[idx * 3] = x;
        pos[idx * 3 + 1] = y;
        pos[idx * 3 + 2] = z;

        orig[idx * 3] = x;
        orig[idx * 3 + 1] = y;
        orig[idx * 3 + 2] = z;

        // Color interpolation based on spatial coordinates (water blue to agri emerald)
        const t = (i / rows + j / cols) * 0.5;
        const mixedColor = new THREE.Color();
        if (t < 0.5) {
          mixedColor.lerpColors(colorBlue, colorCyan, t * 2);
        } else {
          mixedColor.lerpColors(colorCyan, colorEmerald, (t - 0.5) * 2);
        }

        col[idx * 3] = mixedColor.r;
        col[idx * 3 + 1] = mixedColor.g;
        col[idx * 3 + 2] = mixedColor.b;

        idx++;
      }
    }

    return {
      positions: pos,
      originalPositions: orig,
      colors: col
    };
  }, [count, rows, cols]);

  // Create line connectivity between adjacent nodes for agricultural network look
  const linePositions = useMemo(() => {
    const lines: number[] = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const current = i * cols + j;
        // Connect to right neighbor
        if (j < cols - 1) {
          const right = current + 1;
          lines.push(
            originalPositions[current * 3],
            originalPositions[current * 3 + 1],
            originalPositions[current * 3 + 2],
            originalPositions[right * 3],
            originalPositions[right * 3 + 1],
            originalPositions[right * 3 + 2]
          );
        }
        // Connect to top neighbor
        if (i < rows - 1) {
          const top = current + cols;
          lines.push(
            originalPositions[current * 3],
            originalPositions[current * 3 + 1],
            originalPositions[current * 3 + 2],
            originalPositions[top * 3],
            originalPositions[top * 3 + 1],
            originalPositions[top * 3 + 2]
          );
        }
      }
    }
    return new Float32Array(lines);
  }, [rows, cols, originalPositions]);

  useFrame(({ clock, pointer }) => {
    if (!pointsRef.current || !linesRef.current) return;

    const t = clock.getElapsedTime() * 1.5;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    const lineAttr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const lineArray = lineAttr.array as Float32Array;

    let idx = 0;
    const mouseWorldX = pointer.x * 6;
    const mouseWorldY = pointer.y * 4;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = originalPositions[idx * 3];
        const y = originalPositions[idx * 3 + 1];

        // Complex fluid hydraulic wave formula
        const wave1 = Math.sin(x * 0.7 + t) * 0.45;
        const wave2 = Math.cos(y * 0.8 + t * 0.8) * 0.4;
        const wave3 = Math.sin((x + y) * 0.4 + t * 1.2) * 0.3;

        // Proximity disturbance from cursor
        const dx = x - mouseWorldX;
        const dy = y - mouseWorldY;
        const distSq = dx * dx + dy * dy;
        const cursorImpact = Math.max(0, 1.2 - Math.sqrt(distSq)) * 0.8;

        const z = wave1 + wave2 + wave3 + cursorImpact;
        array[idx * 3 + 2] = z;

        idx++;
      }
    }

    posAttr.needsUpdate = true;

    // Update lines to follow nodes
    let lineIdx = 0;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const current = i * cols + j;
        const curX = array[current * 3];
        const curY = array[current * 3 + 1];
        const curZ = array[current * 3 + 2];

        if (j < cols - 1) {
          const right = current + 1;
          lineArray[lineIdx++] = curX;
          lineArray[lineIdx++] = curY;
          lineArray[lineIdx++] = curZ;
          lineArray[lineIdx++] = array[right * 3];
          lineArray[lineIdx++] = array[right * 3 + 1];
          lineArray[lineIdx++] = array[right * 3 + 2];
        }

        if (i < rows - 1) {
          const top = current + cols;
          lineArray[lineIdx++] = curX;
          lineArray[lineIdx++] = curY;
          lineArray[lineIdx++] = curZ;
          lineArray[lineIdx++] = array[top * 3];
          lineArray[lineIdx++] = array[top * 3 + 1];
          lineArray[lineIdx++] = array[top * 3 + 2];
        }
      }
    }
    lineAttr.needsUpdate = true;
  });

  return (
    <group rotation={[-0.85, 0.15, 0.45]} position={[0, -0.5, 0]}>
      {/* Network Points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>

      {/* Interconnecting Agricultural Mesh Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.18}
        />
      </lineSegments>
    </group>
  );
}

export function ParticleNetworkCanvas() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center p-8 bg-slate-900/60 rounded-2xl border border-slate-800">
        <div className="text-center">
          <div className="text-emerald-400 font-mono text-xs uppercase tracking-widest mb-1">
            Flow Simulation Network
          </div>
          <p className="text-slate-300 text-sm">Hydraulic distribution model active</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[450px] md:h-[550px] relative rounded-3xl overflow-hidden border border-slate-200/80 bg-slate-50/80 backdrop-blur-xl shadow-sm">
      <div className="absolute top-4 left-5 z-10 flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
        </span>
        <span className="text-xs font-mono font-medium text-slate-700 tracking-wider uppercase">
          Live Fluidic & Mesh Flow Sim
        </span>
      </div>

      <div className="absolute bottom-4 right-5 z-10 text-right pointer-events-none">
        <span className="text-[10px] font-mono text-slate-500 block">
          FLOW COEFFICIENT: 0.984
        </span>
        <span className="text-[10px] font-mono text-emerald-600 font-semibold block">
          PRESSURE TEST: NOMINAL 16 BAR
        </span>
      </div>

      <Canvas
        className="w-full h-full"
        gl={{ antialias: true, alpha: true }}
        onError={() => setHasError(true)}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 7.5]} fov={50} />
        <ambientLight intensity={1.2} />
        <pointLight position={[0, 5, 5]} intensity={2.2} color="#2563eb" />
        <pointLight position={[5, -5, 2]} intensity={2.0} color="#059669" />
        <WaterParticleField />
      </Canvas>
    </div>
  );
}

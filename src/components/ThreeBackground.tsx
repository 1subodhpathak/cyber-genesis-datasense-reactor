import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const ParticleField = () => {
  const mesh = useRef<THREE.Points>(null);
  const particleCount = 2000;

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      // Cyan color variations
      colors[i * 3] = 0; // R
      colors[i * 3 + 1] = Math.random() * 0.5 + 0.5; // G
      colors[i * 3 + 2] = 1; // B
    }

    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.1;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.05;
      
      const positions = mesh.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i * 0.1) * 0.001;
      }
      mesh.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} vertexColors sizeAttenuation />
    </points>
  );
};

const GeometricGrid = () => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={group}>
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh key={i} position={[0, 0, -i * 2]}>
          <ringGeometry args={[2 + i * 0.1, 2.1 + i * 0.1, 32]} />
          <meshBasicMaterial color="#00ffff" opacity={0.1 - i * 0.005} transparent />
        </mesh>
      ))}
    </group>
  );
};

// Floating 3D Cubes
const FloatingCubes = () => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.05;
      group.current.children.forEach((child, i) => {
        child.rotation.x = state.clock.elapsedTime * (0.5 + i * 0.1);
        child.rotation.z = state.clock.elapsedTime * (0.3 + i * 0.05);
        child.position.y = Math.sin(state.clock.elapsedTime + i) * 0.5;
      });
    }
  });

  return (
    <group ref={group}>
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 12) * Math.PI * 2) * 8,
            Math.sin(i * 0.5) * 3,
            Math.sin((i / 12) * Math.PI * 2) * 8
          ]}
          scale={0.3 + Math.sin(i) * 0.2}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial
            color="#00ffff"
            opacity={0.3}
            transparent
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
};

// Enhanced Matrix Code Rain Effect
const MatrixRain = () => {
  const group = useRef<THREE.Group>(null);
  const matrixChars = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => ({
      char: Math.random() > 0.5 ? '1' : '0',
      speed: 0.02 + Math.random() * 0.08,
      opacity: 0.3 + Math.random() * 0.7,
      scale: 0.5 + Math.random() * 1.5,
      glitch: Math.random() > 0.8,
    }));
  }, []);
  
  useFrame((state) => {
    if (group.current) {
      group.current.children.forEach((child, i) => {
        const data = matrixChars[i];
        child.position.y -= data.speed;
        
        // Add glitch effect
        if (data.glitch && Math.random() > 0.95) {
          child.position.x += (Math.random() - 0.5) * 0.5;
        }
        
        // Reset position with new random character
        if (child.position.y < -15) {
          child.position.y = 15 + Math.random() * 5;
          child.position.x = (Math.random() - 0.5) * 30;
          child.position.z = -2 - Math.random() * 8;
          data.char = Math.random() > 0.5 ? '1' : '0';
          data.opacity = 0.3 + Math.random() * 0.7;
        }
        
        // Animate opacity for robotic blinking effect
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial) {
          child.material.opacity = data.opacity * (0.5 + 0.5 * Math.sin(state.clock.elapsedTime * 10 + i));
        }
      });
    }
  });

  return (
    <group ref={group}>
      {matrixChars.map((data, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 30,
            Math.random() * 30 - 15,
            -2 - Math.random() * 8
          ]}
          scale={[data.scale, data.scale, 1]}
        >
          <planeGeometry args={[0.2, 0.8]} />
          <meshBasicMaterial
            color={data.char === '1' ? "#00ff41" : "#00ffff"}
            opacity={data.opacity}
            transparent
          />
        </mesh>
      ))}
      
      {/* Add some larger robotic symbols */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={`symbol-${i}`}
          position={[
            (Math.random() - 0.5) * 25,
            Math.random() * 25 - 12,
            -1 - Math.random() * 6
          ]}
          rotation={[0, 0, Math.random() * Math.PI]}
        >
          <ringGeometry args={[0.1, 0.3, 6]} />
          <meshBasicMaterial
            color="#ff0080"
            opacity={0.4}
            transparent
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
};

// Holographic Torus
const HolographicTorus = () => {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.3;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, -8]}>
      <torusGeometry args={[3, 0.8, 16, 100]} />
      <meshBasicMaterial
        color="#ff00ff"
        opacity={0.4}
        transparent
        wireframe
      />
    </mesh>
  );
};

const ThreeBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} color="#00ffff" intensity={0.5} />
        <pointLight position={[-10, -10, -10]} color="#ff00ff" intensity={0.3} />
        <ParticleField />
        <GeometricGrid />
        <FloatingCubes />
        <MatrixRain />
        <HolographicTorus />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
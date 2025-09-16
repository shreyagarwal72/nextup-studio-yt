import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls, Float, Text3D, Center, Sparkles } from '@react-three/drei';
import { useTheme } from './ThemeProvider';

function FloatingLogo() {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
      <Center>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.5}
          height={0.1}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          NEXTUP
          <meshStandardMaterial 
            color={isDark ? "#ff0000" : "#e60000"}
            metalness={0.3}
            roughness={0.4}
            emissive={isDark ? "#220000" : "#330000"}
            emissiveIntensity={0.2}
          />
        </Text3D>
      </Center>
    </Float>
  );
}

function FloatingElements() {
  return (
    <>
      <Sparkles 
        count={50} 
        scale={5} 
        size={2} 
        speed={0.5}
        color="#ff0000"
      />
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.3} position={[-2, 1, 0]}>
        <mesh>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial 
            color="#ff0000" 
            emissive="#330000"
            metalness={0.2}
            roughness={0.3}
          />
        </mesh>
      </Float>
      
      <Float speed={2} rotationIntensity={0.8} floatIntensity={0.4} position={[2, -1, 0]}>
        <mesh>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial 
            color="#ffeb3b" 
            emissive="#332900"
            metalness={0.1}
            roughness={0.2}
          />
        </mesh>
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.35} position={[0, -2, -1]}>
        <mesh>
          <torusGeometry args={[0.4, 0.15, 16, 100]} />
          <meshStandardMaterial 
            color="#ff0000" 
            emissive="#220000"
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>
      </Float>
    </>
  );
}

interface Scene3DProps {
  className?: string;
}

export default function Scene3D({ className = "" }: Scene3DProps) {
  return (
    <div className={`${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
        onCreated={(state) => {
          // Ensure canvas doesn't cause issues
          state.gl.setClearColor('#000000', 0);
        }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff0000" />
          
          {/* 3D Elements */}
          <FloatingLogo />
          <FloatingElements />
          
          {/* Controls */}
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
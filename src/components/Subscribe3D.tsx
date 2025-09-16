import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useState } from 'react';
import { Float, Text3D, Center, useMatcapTexture, Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import * as THREE from 'three';

function AnimatedSubscribeText({ isHovered }: { isHovered: boolean }) {
  const textRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  const [matcap] = useMatcapTexture(isDark ? 'C9C9C9_ACACAC_818181_666666' : '7B5254_E9DCC7_B19986_C8AC91');

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
      textRef.current.scale.setScalar(isHovered ? 1.1 : 1);
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.2} floatIntensity={0.1}>
      <Center>
        <Text3D
          ref={textRef}
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.3}
          height={0.08}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.01}
          bevelSize={0.01}
        >
          SUBSCRIBE
          <meshMatcapMaterial matcap={matcap} />
        </Text3D>
      </Center>
    </Float>
  );
}

function YouTubeLogo3D({ isHovered }: { isHovered: boolean }) {
  const logoRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (logoRef.current) {
      logoRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      logoRef.current.scale.setScalar(isHovered ? 1.2 : 1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.2} position={[-1.5, 0, 0.5]}>
      <mesh ref={logoRef}>
        <boxGeometry args={[0.4, 0.3, 0.1]} />
        <meshStandardMaterial 
          color="#ff0000" 
          emissive="#330000"
          emissiveIntensity={isHovered ? 0.5 : 0.2}
        />
      </mesh>
      {/* Play button triangle */}
      <mesh position={[0, 0, 0.06]}>
        <coneGeometry args={[0.08, 0.15, 3]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </Float>
  );
}

export default function Subscribe3D() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* 3D Scene Background */}
      <div className="absolute inset-0 h-64">
        <Canvas
          camera={{ position: [0, 0, 3], fov: 75 }}
          style={{ background: 'transparent' }}
          gl={{ alpha: true, antialias: true }}
        >
          <Suspense fallback={null}>
            {/* Lighting */}
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <pointLight position={[0, 0, 2]} intensity={0.8} color="#ff0000" />
            
            {/* 3D Elements */}
            <AnimatedSubscribeText isHovered={isHovered} />
            <YouTubeLogo3D isHovered={isHovered} />
            
            {/* Sparkles Effect */}
            <Sparkles 
              count={30} 
              scale={3} 
              size={1.5} 
              speed={0.3}
              color={isHovered ? "#ffeb3b" : "#ff0000"}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Interactive Button Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-64 space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl md:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Join the Journey
          </h3>
          <p className="text-muted-foreground">
            Subscribe for the latest tracks, gaming content, and creative shorts
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            size="lg"
            className={`
              relative overflow-hidden px-8 py-4
              bg-youtube-red hover:bg-youtube-red-hover 
              text-white font-bold text-lg
              shadow-youtube hover:shadow-glow
              transform hover:scale-105 active:scale-95
              transition-all duration-300 ease-out
              animate-glow-pulse
            `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => window.open('https://www.youtube.com/@nextupstudioyt', '_blank')}
          >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-youtube-red to-red-600 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative flex items-center gap-3">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" 
                alt="YouTube" 
                className="h-6 w-6 brightness-0 invert" 
              />
              <span>Subscribe Now</span>
              <div className={`
                w-2 h-2 rounded-full bg-white
                animate-pulse
                ${isHovered ? 'scale-150' : 'scale-100'}
                transition-transform duration-300
              `} />
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className={`
              px-8 py-4 font-semibold text-lg
              border-2 hover:border-primary
              hover:bg-primary/10 hover:scale-105
              transition-all duration-300 ease-out
              backdrop-blur-sm
            `}
          >
            <Play className="h-5 w-5 mr-2" />
            Latest Video
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>🔥 <strong>1.2K+</strong> subscribers already joined • New videos every week</p>
        </div>
      </div>
    </div>
  );
}
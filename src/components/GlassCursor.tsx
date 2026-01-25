import { useEffect, useState, useRef } from "react";
import { useGlassEffect } from "./GlassEffectProvider";

export function GlassCursor() {
  const { isGlassEnabled } = useGlassEffect();
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isGlassEnabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      setTargetPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('glass-panel') ||
        target.classList.contains('glass-card') ||
        target.classList.contains('glass-button') ||
        target.closest('.glass-panel') ||
        target.closest('.glass-card');
      
      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isGlassEnabled]);

  // Smooth cursor animation
  useEffect(() => {
    if (!isGlassEnabled) return;

    let animationFrameId: number;
    
    const animate = () => {
      setCursorPosition(prev => ({
        x: prev.x + (targetPosition.x - prev.x) * 0.15,
        y: prev.y + (targetPosition.y - prev.y) * 0.15,
      }));
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [targetPosition, isGlassEnabled]);

  if (!isGlassEnabled) return null;

  return (
    <>
      {/* Main glass cursor */}
      <div
        ref={cursorRef}
        className={`
          fixed pointer-events-none z-[9999] mix-blend-difference
          transition-transform duration-100 ease-out
          ${isHovering ? 'scale-150' : 'scale-100'}
          ${isClicking ? 'scale-75' : ''}
        `}
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1}) ${isClicking ? 'scale(0.75)' : ''}`,
        }}
      >
        {/* Outer glass ring */}
        <div 
          className={`
            w-10 h-10 rounded-full
            border border-white/40
            backdrop-blur-sm
            transition-all duration-300 ease-out
            ${isHovering ? 'w-14 h-14 border-white/60' : ''}
            ${isClicking ? 'w-8 h-8' : ''}
          `}
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            boxShadow: isHovering 
              ? '0 0 20px rgba(255,255,255,0.3), inset 0 0 10px rgba(255,255,255,0.1)'
              : '0 0 10px rgba(255,255,255,0.1)',
          }}
        />
      </div>

      {/* Center dot */}
      <div
        ref={cursorDotRef}
        className={`
          fixed pointer-events-none z-[9999]
          w-2 h-2 rounded-full bg-white
          transition-all duration-75 ease-out
          ${isClicking ? 'scale-200 opacity-50' : 'opacity-80'}
        `}
        style={{
          left: targetPosition.x,
          top: targetPosition.y,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 10px rgba(255,255,255,0.5)',
        }}
      />

      {/* Trailing particles */}
      {isHovering && (
        <div
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: cursorPosition.x,
            top: cursorPosition.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/30 animate-ping"
              style={{
                animationDelay: `${i * 0.15}s`,
                animationDuration: '1s',
              }}
            />
          ))}
        </div>
      )}

      {/* Hide default cursor globally when glass effect is enabled */}
      <style>{`
        .glass-enabled * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}

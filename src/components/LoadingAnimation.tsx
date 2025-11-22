import { useEffect, useState } from "react";

interface LoadingAnimationProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
}

const LoadingAnimation = ({ 
  size = "md", 
  text = "Loading...",
  fullScreen = false 
}: LoadingAnimationProps) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24"
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  const containerClasses = fullScreen
    ? "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
    : "flex items-center justify-center p-8";

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        {/* YouTube Play Button Animation */}
        <div className="relative">
          {/* Outer rotating ring */}
          <div className={`${sizeClasses[size]} relative`}>
            <svg
              className="animate-spin"
              style={{ animationDuration: "3s" }}
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="4"
                strokeDasharray="70 213"
                strokeLinecap="round"
                opacity="0.3"
              />
            </svg>
          </div>

          {/* Inner pulsing play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative bg-primary rounded-full p-4 animate-glow-pulse shadow-youtube">
              {/* Play triangle */}
              <svg
                className="w-6 h-6 text-primary-foreground animate-pulse"
                style={{ animationDuration: "2s" }}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Orbiting dots */}
          <div className="absolute inset-0">
            <div 
              className="absolute w-2 h-2 bg-accent-yellow rounded-full top-0 left-1/2 -translate-x-1/2 animate-float"
              style={{ animationDelay: "0s" }}
            />
            <div 
              className="absolute w-2 h-2 bg-accent rounded-full bottom-0 right-0 animate-float"
              style={{ animationDelay: "0.5s" }}
            />
            <div 
              className="absolute w-2 h-2 bg-youtube-red rounded-full top-1/2 left-0 -translate-y-1/2 animate-float"
              style={{ animationDelay: "1s" }}
            />
          </div>
        </div>

        {/* Loading text with animated dots */}
        {text && (
          <div className={`${textSizeClasses[size]} font-medium text-foreground flex items-center gap-1`}>
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              {text}
            </span>
            <span className="inline-block w-8 text-primary">
              {dots}
            </span>
          </div>
        )}

        {/* Progress bar */}
        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-primary animate-pulse"
            style={{
              width: "60%",
              animation: "slide-right 2s ease-in-out infinite"
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes slide-right {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;

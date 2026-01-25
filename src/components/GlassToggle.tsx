import { Play, Pause, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGlassEffect } from "@/components/GlassEffectProvider";

export function GlassToggle() {
  const { isGlassEnabled, toggleGlass } = useGlassEffect();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleGlass}
      className={`
        relative overflow-hidden border-2 group
        hover:scale-110 hover:shadow-3d
        transition-all duration-500 ease-out
        ${isGlassEnabled 
          ? "border-primary/50 bg-primary/10 hover:bg-primary/20 shadow-glow" 
          : "border-border/50 bg-card/50 hover:bg-card/80"
        }
      `}
      title={isGlassEnabled ? "Disable Glass Effect" : "Enable Glass Effect"}
    >
      {/* Animated background gradient */}
      <div className={`
        absolute inset-0 transition-all duration-700 ease-out
        ${isGlassEnabled 
          ? "bg-gradient-to-br from-primary/30 via-accent/20 to-primary/30 opacity-100" 
          : "opacity-0"
        }
      `} />
      
      {/* Liquid effect overlay */}
      <div className={`
        absolute inset-0 transition-all duration-1000
        ${isGlassEnabled 
          ? "bg-[radial-gradient(circle_at_50%_120%,hsl(var(--primary)/0.4),transparent_70%)] animate-pulse" 
          : "opacity-0"
        }
      `} />

      <div className="relative z-10 flex items-center justify-center">
        {isGlassEnabled ? (
          <div className="relative">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            <div className="absolute inset-0 blur-sm">
              <Sparkles className="h-5 w-5 text-primary opacity-50" />
            </div>
          </div>
        ) : (
          <Play className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        )}
      </div>

      {/* Sparkle particles when enabled */}
      {isGlassEnabled && (
        <>
          <span className="absolute top-1 right-1 w-1 h-1 bg-accent rounded-full animate-ping" />
          <span className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-primary rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
        </>
      )}
      
      <span className="sr-only">{isGlassEnabled ? "Disable" : "Enable"} Glass Effect</span>
    </Button>
  );
}

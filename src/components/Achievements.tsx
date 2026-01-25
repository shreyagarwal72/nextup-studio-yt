import { Card } from "@/components/ui/card";
import { Trophy, TrendingUp } from "lucide-react";
import { useGlassEffect } from "@/components/GlassEffectProvider";

const Achievements = () => {
  const { isGlassEnabled } = useGlassEffect();

  return (
    <Card className={`
      p-6 border-border/50 animate-fade-in
      ${isGlassEnabled 
        ? "glass-card liquid-morph" 
        : "bg-gradient-secondary"
      }
    `}>
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <div className="w-1 h-6 bg-gradient-primary rounded-full" />
        Achievements
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 500 Subscribers Milestone */}
        <div className={`
          p-4 rounded-lg border border-border/30 
          hover:shadow-card transition-all duration-300 group
          ${isGlassEnabled 
            ? "glass-panel liquid-ripple glass-shimmer glass-glow glass-depth glass-elastic glass-holographic glass-icon-float" 
            : "bg-card/50 hover:bg-card/80"
          }
        `}>
          <div className="flex items-start gap-4 relative z-10">
            <div className="p-3 rounded-lg bg-primary/10">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                500 Subscribers Milestone
              </h4>
              <p className="text-sm text-muted-foreground">
                Achieved on <span className="font-medium text-foreground">9 August 2025</span>
              </p>
            </div>
          </div>
        </div>

        {/* Highest Viewed Short */}
        <div className={`
          p-4 rounded-lg border border-border/30 
          hover:shadow-card transition-all duration-300 group
          ${isGlassEnabled 
            ? "glass-panel liquid-ripple glass-shimmer glass-glow glass-depth glass-elastic glass-holographic glass-icon-float" 
            : "bg-card/50 hover:bg-card/80"
          }
        `}>
          <div className="flex items-start gap-4 relative z-10">
            <div className="p-3 rounded-lg bg-youtube-red/10">
              <TrendingUp className="h-6 w-6 text-youtube-red" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                Most Viewed Short
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                <span className="font-bold text-lg text-youtube-red">50K+</span> views
              </p>
              <a 
                href="https://youtube.com/shorts/67X4SxImDuM"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-primary hover:underline"
              >
                Watch Short →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Video Preview */}
      <div className="mt-6">
        <div className={`
          aspect-video rounded-lg overflow-hidden border border-border/30
          ${isGlassEnabled ? "shadow-3d" : ""}
        `}>
          <iframe
            src="https://www.youtube.com/embed/67X4SxImDuM"
            title="Most Viewed Short"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  );
};

export default Achievements;

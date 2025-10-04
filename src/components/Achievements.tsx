import { Card } from "@/components/ui/card";
import { Trophy, TrendingUp } from "lucide-react";

const Achievements = () => {
  return (
    <Card className="p-6 bg-gradient-secondary border-border/50 animate-fade-in">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <div className="w-1 h-6 bg-gradient-primary rounded-full" />
        Achievements
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 500 Subscribers Milestone */}
        <div className="p-4 rounded-lg bg-card/50 border border-border/30 hover:bg-card/80 hover:shadow-card transition-all duration-300 group">
          <div className="flex items-start gap-4">
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
        <div className="p-4 rounded-lg bg-card/50 border border-border/30 hover:bg-card/80 hover:shadow-card transition-all duration-300 group">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-youtube-red/10">
              <TrendingUp className="h-6 w-6 text-youtube-red" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                Most Viewed Short
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                <span className="font-bold text-lg text-youtube-red">31k</span> views
              </p>
              <a 
                href="https://youtube.com/shorts/V4HbQ6CMHxE?si=Mg1tBWzID_20wc8r"
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
        <div className="aspect-video rounded-lg overflow-hidden border border-border/30">
          <iframe
            src="https://www.youtube.com/embed/V4HbQ6CMHxE"
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

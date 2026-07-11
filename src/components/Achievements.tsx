import { Trophy, TrendingUp, ExternalLink } from "lucide-react";

const Achievements = () => {
  return (
    <section className="neu-card p-8 md:p-10 animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <div className="neu-icon-well w-12 h-12">
          <Trophy className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-bold text-2xl text-foreground">
            Achievements
          </h3>
          <p className="text-sm text-muted-foreground">Milestones and highlights</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="neu-card neu-card-hover p-6">
          <div className="flex items-start gap-4">
            <div className="neu-icon-well w-14 h-14 shrink-0">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div className="min-w-0">
              <h4 className="font-display font-bold text-foreground">
                500 Subscribers Milestone
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                Achieved on{" "}
                <span className="font-medium text-foreground">9 August 2025</span>
              </p>
            </div>
          </div>
        </div>

        <div className="neu-card neu-card-hover p-6">
          <div className="flex items-start gap-4">
            <div className="neu-icon-well w-14 h-14 shrink-0">
              <TrendingUp className="h-6 w-6 text-accent" />
            </div>
            <div className="min-w-0">
              <h4 className="font-display font-bold text-foreground">
                Most Viewed Short
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="font-display font-bold text-lg text-primary">
                  50K+
                </span>{" "}
                views
              </p>
              <a
                href="https://youtube.com/shorts/67X4SxImDuM"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              >
                Watch Short <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 neu-inset-deep rounded-3xl p-3">
        <div className="aspect-video rounded-2xl overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/67X4SxImDuM"
            title="Most Viewed Short"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Achievements;

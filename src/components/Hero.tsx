import { useYouTubeStats } from "@/hooks/useYouTubeStats";
import { Play, Music, Gamepad2, Sparkles, Youtube } from "lucide-react";

const features = [
  { icon: Music, label: "Original Rap" },
  { icon: Gamepad2, label: "Minecraft" },
  { icon: Sparkles, label: "Shorts" },
];

const Hero = () => {
  const { stats, isLoading } = useYouTubeStats();

  return (
    <section className="relative px-4 sm:px-8 pt-16 pb-12 lg:pt-24 lg:pb-16">
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10 animate-fade-in">
        {/* Icon well */}
        <div className="neu-icon-well w-20 h-20 mx-auto animate-neu-float">
          <Play className="h-8 w-8 text-primary fill-primary" />
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="font-display font-extrabold text-5xl md:text-7xl tracking-tight text-foreground">
            Nextup <span className="text-primary">Studio</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            by <span className="font-semibold text-foreground">Vanshu Agarwal</span>
          </p>
        </div>

        {/* Description card */}
        <div className="neu-card p-8 max-w-2xl mx-auto animate-slide-up">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Welcome to the official home of{" "}
            <strong className="text-foreground font-semibold">Nextup Studio</strong> —
            where creativity meets content. Dive into original rap music, epic Minecraft
            adventures, and innovative short-form videos.
          </p>
        </div>

        {/* Feature pills */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.label}
                className="neu-card neu-card-hover p-4 sm:p-6 flex flex-col items-center gap-3 animate-scale-in"
                style={{ animationDelay: `${200 + i * 100}ms` }}
              >
                <div className="neu-icon-well w-12 h-12">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-foreground">
                  {f.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
          <button
            onClick={() => window.open("https://www.youtube.com/@nextupstudioyt", "_blank")}
            className="neu-btn-primary px-8 py-4 inline-flex items-center gap-3 font-semibold"
          >
            <Youtube className="h-5 w-5" />
            Subscribe to Channel
          </button>
          <button
            onClick={() => window.open("https://www.youtube.com/@nextupstudioyt", "_blank")}
            className="neu-btn px-8 py-4 inline-flex items-center gap-3 font-semibold text-primary"
          >
            <Play className="h-4 w-4 fill-primary" />
            Watch Latest Video
          </button>
        </div>

        {/* Stats strip */}
        <div className="neu-card p-6 md:p-8 max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
            Join our growing community
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Subscribers", value: stats.subscriberCount },
              { label: "Views", value: stats.viewCount },
              { label: "Videos", value: stats.videoCount },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display font-bold text-2xl md:text-3xl text-foreground">
                  {isLoading ? "…" : s.value}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

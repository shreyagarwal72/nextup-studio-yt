import { useYouTubeStats } from "@/hooks/useYouTubeStats";
import { Play, Youtube, Sparkles } from "lucide-react";

export default function Subscribe3D() {
  const { stats, isLoading } = useYouTubeStats();

  return (
    <div className="relative max-w-3xl mx-auto animate-fade-in">
      <div className="neu-card p-10 md:p-14 text-center relative overflow-hidden">
        {/* Decorative concentric wells */}
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full neu-inset opacity-70 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full neu-raised opacity-60 pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="neu-icon-well w-20 h-20 mx-auto animate-neu-float">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>

          <div className="space-y-3">
            <h3 className="font-display font-extrabold text-3xl md:text-4xl text-foreground tracking-tight">
              Join the Journey
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Subscribe for the latest tracks, gaming content, and creative shorts.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <button
              onClick={() =>
                window.open("https://www.youtube.com/@nextupstudioyt", "_blank")
              }
              className="neu-btn-primary px-8 py-4 inline-flex items-center gap-3 font-semibold text-base"
            >
              <Youtube className="h-5 w-5" />
              Subscribe Now
            </button>
            <button
              onClick={() =>
                window.open("https://www.youtube.com/@nextupstudioyt", "_blank")
              }
              className="neu-btn px-8 py-4 inline-flex items-center gap-3 font-semibold text-base text-primary"
            >
              <Play className="h-4 w-4 fill-primary" /> Latest Video
            </button>
          </div>

          <p className="text-sm text-muted-foreground pt-2">
            <strong className="text-foreground font-semibold">
              {isLoading ? "…" : stats.subscriberCount}
            </strong>{" "}
            subscribers already joined · New videos every week
          </p>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Play, ExternalLink, Youtube, AlertTriangle, RefreshCw, VideoOff } from "lucide-react";
import VideoModal from "./VideoModal";
import { useVideoStore, type StoredVideo } from "@/hooks/useVideoStore";

type Video = StoredVideo;

interface VideoShowcaseProps {
  videos?: Video[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}


const VideoSkeleton = ({ delay = 0 }: { delay?: number }) => (
  <div className="neu-card p-4 animate-fade-in" style={{ animationDelay: `${delay}ms` }}>
    <div className="neu-inset-deep rounded-3xl p-2">
      <div className="aspect-video rounded-2xl neu-inset-sm animate-pulse" />
    </div>
    <div className="p-4 space-y-3">
      <div className="h-5 w-2/3 rounded-lg neu-inset-sm animate-pulse" />
      <div className="h-3 w-full rounded neu-inset-sm animate-pulse" />
      <div className="h-3 w-4/5 rounded neu-inset-sm animate-pulse" />
      <div className="neu-divider" />
      <div className="flex items-center justify-between pt-1">
        <div className="h-3 w-24 rounded neu-inset-sm animate-pulse" />
        <div className="h-8 w-20 rounded-2xl neu-inset-sm animate-pulse" />
      </div>
    </div>
  </div>
);

const VideoCard = ({ v, i, onPlay }: { v: Video; i: number; onPlay: (v: Video) => void }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;

  return (
    <article
      className="neu-card neu-card-hover p-4 animate-slide-up group"
      style={{ animationDelay: `${i * 120}ms` }}
    >
      <button
        type="button"
        onClick={() => onPlay(v)}
        aria-label={`Play ${v.title}`}
        className="block w-full text-left neu-inset-deep rounded-3xl p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-3xl"
      >
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-background">
          {!imgFailed ? (
            <img
              src={thumb}
              alt={v.title}
              loading="lazy"
              onError={() => setImgFailed(true)}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="neu-icon-well w-14 h-14">
                <VideoOff className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          )}
          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-background/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="neu-btn-primary h-16 w-16 rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
              <Play className="h-6 w-6 fill-primary-foreground text-primary-foreground ml-0.5" />
            </div>
          </div>
        </div>
      </button>
      <div className="p-4 space-y-3">
        <h3 className="font-display font-bold text-lg text-foreground line-clamp-1">
          {v.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {v.description}
        </p>
        <div className="neu-divider" />
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-muted-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Nextup Studio
          </span>
          <button
            onClick={() => onPlay(v)}
            className="neu-btn px-4 py-2 text-xs font-medium inline-flex items-center gap-1.5 text-primary"
          >
            <Play className="h-3 w-3 fill-primary" /> Watch
          </button>
        </div>
      </div>
    </article>
  );
};

const VideoShowcase = ({
  videos,
  isLoading = false,
  error = null,
  onRetry,
}: VideoShowcaseProps) => {
  const { videos: stored } = useVideoStore();
  const list = videos ?? stored;
  const isEmpty = !isLoading && !error && list.length === 0;

  const [active, setActive] = useState<Video | null>(null);

  return (
    <section className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-foreground tracking-tight">
            Featured Videos
          </h2>
          <p className="text-muted-foreground mt-2">
            {isLoading
              ? "Loading the latest highlights…"
              : "Discover the best content from Nextup Studio"}
          </p>
        </div>
        <button
          onClick={() =>
            window.open(
              "https://youtube.com/playlist?list=PLA5p2Fcrkh8WjSpTTIYzeFIrscRZJQ4-T&feature=shared",
              "_blank"
            )
          }
          className="neu-btn px-5 py-3 inline-flex items-center gap-2 text-sm font-medium self-start disabled:opacity-50"
          disabled={isLoading}
        >
          <Play className="h-4 w-4" /> View All <ExternalLink className="h-3 w-3" />
        </button>
      </div>

      {error && !isLoading && (
        <div
          role="alert"
          className="neu-inset rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <div className="neu-icon-well w-12 h-12 shrink-0">
            <AlertTriangle className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display font-bold text-foreground">
              Couldn't load videos
            </p>
            <p className="text-sm text-muted-foreground mt-1">{error}</p>
          </div>
          {onRetry && (
            <button
              onClick={onRetry}
              className="neu-btn px-5 py-2.5 text-sm font-medium inline-flex items-center gap-2 shrink-0"
            >
              <RefreshCw className="h-4 w-4" /> Retry
            </button>
          )}
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <VideoSkeleton key={i} delay={i * 100} />
          ))}
        </div>
      ) : isEmpty ? (
        <div className="neu-card p-12 text-center flex flex-col items-center gap-5">
          <div className="neu-icon-well w-20 h-20">
            <VideoOff className="h-7 w-7 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl text-foreground">
              No videos to show yet
            </h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
              New tracks and shorts are on the way. Subscribe to be first when they drop.
            </p>
          </div>
          <button
            onClick={() => window.open("https://www.youtube.com/@nextupstudioyt", "_blank")}
            className="neu-btn-primary px-6 py-3 inline-flex items-center gap-2 font-semibold"
          >
            <Youtube className="h-4 w-4" /> Visit Channel
          </button>
        </div>
      ) : (
        !error && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {list.map((v, i) => (
              <VideoCard key={v.id} v={v} i={i} onPlay={setActive} />
            ))}
          </div>
        )
      )}

      {!isLoading && !error && !isEmpty && (
        <div className="neu-card p-8 md:p-12 text-center max-w-3xl mx-auto">
          <h3 className="font-display font-extrabold text-2xl md:text-3xl text-foreground">
            More amazing content coming soon
          </h3>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">
            These are just highlights of our creative journey. Stay tuned for more music,
            gaming, and shorts.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
            <button
              onClick={() => window.open("https://www.youtube.com/@nextupstudioyt", "_blank")}
              className="neu-btn-primary px-6 py-3 inline-flex items-center gap-2 font-semibold"
            >
              <Youtube className="h-4 w-4" /> Subscribe Now
            </button>
            <button
              onClick={() =>
                window.open(
                  "https://youtube.com/playlist?list=PLA5p2Fcrkh8WjSpTTIYzeFIrscRZJQ4-T&feature=shared",
                  "_blank"
                )
              }
              className="neu-btn px-6 py-3 inline-flex items-center gap-2 font-semibold"
            >
              <Play className="h-4 w-4" /> Browse Playlist
            </button>
          </div>
        </div>
      )}

      <VideoModal
        videoId={active?.id ?? null}
        title={active?.title}
        onClose={() => setActive(null)}
      />
    </section>
  );
};

export default VideoShowcase;

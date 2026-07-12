import { useEffect, useState, useCallback } from "react";
import { X, ExternalLink, AlertTriangle, RefreshCw, Loader2 } from "lucide-react";

interface VideoModalProps {
  videoId: string | null;
  title?: string;
  onClose: () => void;
}

const VideoModal = ({ videoId, title, onClose }: VideoModalProps) => {
  const [mounted, setMounted] = useState(false);      // controls enter/exit animation
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const isOpen = videoId !== null;

  // Trigger enter animation on next frame after open
  useEffect(() => {
    if (isOpen) {
      setLoaded(false);
      setFailed(false);
      const id = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(id);
    }
    setMounted(false);
  }, [isOpen, videoId, reloadKey]);

  // Iframe onError doesn't reliably fire; fall back to timeout
  useEffect(() => {
    if (!isOpen || loaded || failed) return;
    const t = window.setTimeout(() => {
      if (!loaded) setFailed(true);
    }, 8000);
    return () => window.clearTimeout(t);
  }, [isOpen, loaded, failed, reloadKey]);

  // Lock scroll + ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setMounted(false);
    window.setTimeout(onClose, 260); // match exit duration
  }, [onClose]);

  const retry = () => {
    setLoaded(false);
    setFailed(false);
    setReloadKey((k) => k + 1);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title || "Video player"}
      onClick={handleClose}
      className={`
        fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6
        bg-background/70 backdrop-blur-xl
        transition-opacity duration-300 ease-out
        ${mounted ? "opacity-100" : "opacity-0"}
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          neu-card w-full max-w-4xl p-3 sm:p-4 relative
          origin-center transition-all duration-300
          ${mounted ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}
        `}
        style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-2 pb-3">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse-ring shrink-0" />
          <h3 className="font-display font-bold text-sm sm:text-base text-foreground truncate flex-1">
            {title || "Now Playing"}
          </h3>
          <a
            href={`https://youtu.be/${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="neu-btn hidden sm:inline-flex px-3 py-2 text-xs font-medium items-center gap-1.5 text-primary"
            aria-label="Open on YouTube"
          >
            <ExternalLink className="h-3.5 w-3.5" /> YouTube
          </a>
          <button
            onClick={handleClose}
            aria-label="Close player"
            className="neu-btn h-10 w-10 flex items-center justify-center shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Player well */}
        <div className="neu-inset-deep rounded-3xl p-2">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-background">
            {/* Loading */}
            {!loaded && !failed && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 animate-fade-in">
                <div className="neu-icon-well w-14 h-14">
                  <Loader2 className="h-5 w-5 text-primary animate-spin" />
                </div>
                <p className="text-xs text-muted-foreground tracking-wide">
                  Loading video…
                </p>
                <div className="absolute inset-x-0 top-0 h-0.5 overflow-hidden">
                  <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent animate-shimmer" />
                </div>
              </div>
            )}

            {/* Error */}
            {failed && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center animate-fade-in">
                <div className="neu-icon-well w-14 h-14">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-display font-bold text-foreground">
                    Video couldn't load
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                    Playback may be restricted here. Try again or open it on YouTube.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={retry}
                    className="neu-btn px-4 py-2 text-xs font-medium inline-flex items-center gap-1.5"
                  >
                    <RefreshCw className="h-3.5 w-3.5" /> Retry
                  </button>
                  <a
                    href={`https://youtu.be/${videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neu-btn-primary px-4 py-2 text-xs font-semibold inline-flex items-center gap-1.5"
                  >
                    Open on YouTube <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            )}

            {/* Player */}
            {!failed && (
              <iframe
                key={reloadKey}
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title={title || "YouTube video player"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => setLoaded(true)}
                onError={() => setFailed(true)}
                className={`w-full h-full border-0 transition-opacity duration-500 ${
                  loaded ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;

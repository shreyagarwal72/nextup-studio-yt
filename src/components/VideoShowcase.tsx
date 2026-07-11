import { Play, ExternalLink, Youtube } from "lucide-react";

interface Video {
  id: string;
  title: string;
  description: string;
  embedUrl: string;
}

const defaultVideos: Video[] = [
  {
    id: "apok4v8Pzow",
    title: "Fire Within — Official Track",
    description: "A powerful original rap track showcasing lyrical prowess and intense energy.",
    embedUrl: "https://www.youtube.com/embed/apok4v8Pzow",
  },
  {
    id: "xftcj39h-QY",
    title: "Raat Ka Banda — Epic Edit",
    description: "Cinematic visuals with strong vibes, creative editing and atmospheric storytelling.",
    embedUrl: "https://www.youtube.com/embed/xftcj39h-QY",
  },
  {
    id: "F4ctUpMRP4w",
    title: "Echoes in the Storm",
    description: "An atmospheric masterpiece combining powerful lyrics with storm-like energy.",
    embedUrl: "https://www.youtube.com/embed/F4ctUpMRP4w",
  },
  {
    id: "b63MnxqG9-c",
    title: "Nextup Studio Official Trailer",
    description: "The official trailer showcasing the creative vision of Nextup Studio.",
    embedUrl: "https://www.youtube.com/embed/b63MnxqG9-c",
  },
];

const VideoShowcase = ({ videos = defaultVideos }: { videos?: Video[] }) => {
  return (
    <section className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-foreground tracking-tight">
            Featured Videos
          </h2>
          <p className="text-muted-foreground mt-2">
            Discover the best content from Nextup Studio
          </p>
        </div>
        <button
          onClick={() =>
            window.open(
              "https://youtube.com/playlist?list=PLA5p2Fcrkh8WjSpTTIYzeFIrscRZJQ4-T&feature=shared",
              "_blank"
            )
          }
          className="neu-btn px-5 py-3 inline-flex items-center gap-2 text-sm font-medium self-start"
        >
          <Play className="h-4 w-4" /> View All <ExternalLink className="h-3 w-3" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {videos.map((v, i) => (
          <article
            key={v.id}
            className="neu-card neu-card-hover p-4 animate-slide-up"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <div className="neu-inset-deep rounded-3xl p-2">
              <div className="aspect-video rounded-2xl overflow-hidden">
                <iframe
                  src={v.embedUrl}
                  title={v.title}
                  allowFullScreen
                  loading="lazy"
                  className="w-full h-full border-0"
                />
              </div>
            </div>
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
                  onClick={() => window.open(`https://youtu.be/${v.id}`, "_blank")}
                  className="neu-btn px-4 py-2 text-xs font-medium inline-flex items-center gap-1.5 text-primary"
                >
                  <Play className="h-3 w-3 fill-primary" /> Watch
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

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
    </section>
  );
};

export default VideoShowcase;

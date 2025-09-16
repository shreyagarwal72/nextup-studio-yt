import { Card } from "@/components/ui/card";
import { Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Video {
  id: string;
  title: string;
  description: string;
  embedUrl: string;
  thumbnailUrl?: string;
}

interface VideoShowcaseProps {
  videos?: Video[];
}

const defaultVideos: Video[] = [
  {
    id: "apok4v8Pzow",
    title: "🔥 Fire Within - Official Track",
    description: "A powerful original rap track by Vanshu showcasing lyrical prowess and intense energy.",
    embedUrl: "https://www.youtube.com/embed/apok4v8Pzow"
  },
  {
    id: "xftcj39h-QY",
    title: "🎵 Raat Ka Banda - Epic Edit",
    description: "Cinematic visuals with strong vibes, featuring creative editing and atmospheric storytelling.",
    embedUrl: "https://www.youtube.com/embed/xftcj39h-QY"
  },
  {
    id: "F4ctUpMRP4w",
    title: "🌊 Echoes in the Storm",
    description: "An atmospheric masterpiece combining powerful lyrics with storm-like energy and emotional depth.",
    embedUrl: "https://www.youtube.com/embed/F4ctUpMRP4w"
  },
  {
    id: "b63MnxqG9-c",
    title: "🎬 Nextup Studio Official Trailer",
    description: "The official trailer showcasing the creative vision and upcoming content from Nextup Studio.",
    embedUrl: "https://www.youtube.com/embed/b63MnxqG9-c"
  }
];

const VideoShowcase = ({ videos = defaultVideos }: VideoShowcaseProps) => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1 animate-fade-in">
          <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Featured Videos
          </h2>
          <p className="text-muted-foreground">
            Discover the best content from Nextup Studio
          </p>
        </div>
        
        <Button 
          variant="outline" 
          className="hidden sm:flex items-center gap-2 hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-300 shadow-card"
        >
          <Play className="h-4 w-4" />
          View All
          <ExternalLink className="h-3 w-3" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {videos.map((video, index) => (
          <Card
            key={video.id}
            className={`
              overflow-hidden bg-gradient-secondary/90 backdrop-blur-sm border-border/50
              hover:shadow-3d hover:scale-[1.02] hover:-translate-y-1 
              transition-all duration-500 group
              animate-slide-up
            `}
            style={{ animationDelay: `${index * 0.3}s` }}
          >
            <div className="aspect-video relative overflow-hidden">
              <iframe
                src={video.embedUrl}
                title={video.title}
                allowFullScreen
                className="w-full h-full border-0 rounded-t-lg"
                loading="lazy"
              />
              
              {/* Overlay for hover effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
            
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {video.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                  {video.description}
                </p>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-border/30">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-youtube-red rounded-full animate-pulse" />
                  <span>Nextup Studio</span>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-youtube-red hover:text-youtube-red hover:bg-youtube-red/10 hover:scale-105 transition-all duration-300"
                  onClick={() => window.open(`https://youtu.be/${video.id}`, '_blank')}
                >
                  <Play className="h-4 w-4 mr-1" />
                  Watch
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <Card className="p-8 text-center bg-gradient-primary/5 border-primary/20 animate-fade-in shadow-3d">
        <div className="space-y-4 max-w-md mx-auto">
          <h3 className="text-2xl font-bold">More Amazing Content Coming Soon!</h3>
          <p className="text-muted-foreground">
            These are just highlights of our creative journey. Stay tuned for more original music, gaming content, and creative shorts.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button 
              className="bg-youtube-red hover:bg-youtube-red-hover text-white shadow-youtube animate-glow-pulse hover:scale-105 transition-all duration-300"
              onClick={() => window.open('https://www.youtube.com/@nextupstudioyt', '_blank')}
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" 
                alt="YouTube" 
                className="h-5 w-5 mr-2 brightness-0 invert" 
              />
              Subscribe Now
            </Button>
            
            <Button 
              variant="outline" 
              className="hover:bg-accent hover:text-accent-foreground hover:scale-105 transition-all duration-300"
            >
              <Play className="h-4 w-4 mr-2" />
              Browse Playlist
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default VideoShowcase;
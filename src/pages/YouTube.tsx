import { Play } from "lucide-react";
import VideoShowcase from "@/components/VideoShowcase";
import ChannelStats from "@/components/ChannelStats";
import Subscribe3D from "@/components/Subscribe3D";

const YouTubePage = () => {
  return (
    <div className="container mx-auto px-6 py-10 space-y-10 max-w-6xl">
      <header className="flex items-center gap-5 animate-blur-in">
        <div className="neu-icon-well w-14 h-14 animate-neu-float">
          <Play className="h-6 w-6 text-primary fill-primary" />
        </div>
        <div>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-foreground tracking-tight">
            YouTube <span className="text-gradient-primary">Highlights</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Discover the best content from Nextup Studio
          </p>
        </div>
      </header>

      <div className="reveal">
        <ChannelStats />
      </div>
      <div className="reveal">
        <VideoShowcase />
      </div>

      <div className="reveal py-8">
        <Subscribe3D />
      </div>
    </div>
  );
};

export default YouTubePage;

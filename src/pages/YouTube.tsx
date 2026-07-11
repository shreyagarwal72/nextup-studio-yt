import { Play } from "lucide-react";
import VideoShowcase from "@/components/VideoShowcase";
import ChannelStats from "@/components/ChannelStats";
import Subscribe3D from "@/components/Subscribe3D";

const YouTubePage = () => {
  return (
    <div className="container mx-auto px-6 py-10 space-y-10 max-w-6xl">
      <header className="flex items-center gap-5 animate-fade-in">
        <div className="neu-icon-well w-14 h-14">
          <Play className="h-6 w-6 text-primary fill-primary" />
        </div>
        <div>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-foreground tracking-tight">
            YouTube Highlights
          </h1>
          <p className="text-muted-foreground mt-1">
            Discover the best content from Nextup Studio
          </p>
        </div>
      </header>

      <ChannelStats />
      <VideoShowcase />

      <div className="py-8">
        <Subscribe3D />
      </div>
    </div>
  );
};

export default YouTubePage;

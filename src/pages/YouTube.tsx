import VideoShowcase from "@/components/VideoShowcase";
import ChannelStats from "@/components/ChannelStats";
import { Play } from "lucide-react";

const YouTubePage = () => {
  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3 animate-fade-in">
        <div className="p-3 bg-gradient-primary rounded-lg">
          <Play className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-4xl font-bold">YouTube Highlights</h1>
          <p className="text-muted-foreground">
            Discover the best content from Nextup Studio
          </p>
        </div>
      </div>

      {/* Channel Stats */}
      <ChannelStats />

      {/* Video Showcase */}
      <VideoShowcase />
    </div>
  );
};

export default YouTubePage;
import VideoShowcase from "@/components/VideoShowcase";
import ChannelStats from "@/components/ChannelStats";
import Subscribe3D from "@/components/Subscribe3D";
import { Play } from "lucide-react";

const YouTubePage = () => {
  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3 animate-fade-in">
        <div className="p-3 bg-gradient-primary rounded-xl shadow-3d">
          <Play className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            YouTube Highlights
          </h1>
          <p className="text-muted-foreground">
            Discover the best content from Nextup Studio
          </p>
        </div>
      </div>

      {/* Channel Stats */}
      <ChannelStats />

      {/* Video Showcase */}
      <VideoShowcase />
      
      {/* 3D Subscribe Section */}
      <div className="py-16">
        <Subscribe3D />
      </div>
    </div>
  );
};

export default YouTubePage;
import Hero from "@/components/Hero";
import VideoShowcase from "@/components/VideoShowcase";
import ChannelStats from "@/components/ChannelStats";
import Subscribe3D from "@/components/Subscribe3D";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <div className="container mx-auto px-6 py-8 space-y-12">
        <ChannelStats />
        <VideoShowcase />
        
        {/* 3D Subscribe Section */}
        <div className="py-16">
          <Subscribe3D />
        </div>
      </div>
    </div>
  );
};

export default Index;

import Hero from "@/components/Hero";
import VideoShowcase from "@/components/VideoShowcase";
import ChannelStats from "@/components/ChannelStats";
import Achievements from "@/components/Achievements";
import Subscribe3D from "@/components/Subscribe3D";

const Index = () => {
  return (
    <div className="min-h-screen">
      <div id="home">
        <Hero />
      </div>
      <div className="container mx-auto px-6 py-8 space-y-12">
        <div id="statistics">
          <ChannelStats />
        </div>
        <div id="achievements">
          <Achievements />
        </div>
        <div id="videos">
          <VideoShowcase />
        </div>
        
        {/* 3D Subscribe Section */}
        <div id="community" className="py-16">
          <Subscribe3D />
        </div>
      </div>
    </div>
  );
};

export default Index;

import Hero from "@/components/Hero";
import VideoShowcase from "@/components/VideoShowcase";
import ChannelStats from "@/components/ChannelStats";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <div className="container mx-auto px-6 py-8 space-y-12">
        <ChannelStats />
        <VideoShowcase />
      </div>
    </div>
  );
};

export default Index;

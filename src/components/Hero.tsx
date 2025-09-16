import { useYouTubeStats } from "@/hooks/useYouTubeStats";
import { Play, Music, Gamepad2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";

const Hero = () => {
  const { stats, isLoading } = useYouTubeStats();
  const features = [
    {
      icon: Music,
      label: "Original Rap Tracks",
      color: "text-youtube-red"
    },
    {
      icon: Gamepad2,
      label: "Minecraft Content",
      color: "text-accent-yellow"
    },
    {
      icon: Sparkles,
      label: "Creative Shorts",
      color: "text-primary"
    }
  ];

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-background" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent-yellow/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      {/* Theme Toggle - Fixed Position */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8 animate-fade-in">
        {/* Brand Logo/Title */}
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-primary/10 border border-primary/20 mb-6 animate-glow-pulse shadow-3d">
            <Play className="h-8 w-8 text-primary" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-slide-up drop-shadow-2xl">
            Nextup Studio
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground animate-slide-up" style={{ animationDelay: '0.2s' }}>
            by <span className="text-foreground font-semibold">Vanshu Agarwal</span>
          </p>
        </div>

        {/* Description */}
        <div className="max-w-2xl mx-auto space-y-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Welcome to the official home of <strong className="text-foreground">Nextup Studio</strong> – 
            where creativity meets content. Dive into a world of original rap music, 
            epic Minecraft adventures, and innovative short-form content.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.6s' }}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.label}
                className={`
                  p-4 bg-card/50 border-border/30 backdrop-blur-sm
                  hover:bg-card/80 hover:shadow-3d hover:scale-105
                  transition-all duration-300 group
                  animate-scale-in
                `}
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <Icon className={`h-6 w-6 ${feature.color} group-hover:scale-110 transition-transform drop-shadow-lg`} />
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {feature.label}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '1s' }}>
          <Button 
            size="lg"
            className="bg-youtube-red hover:bg-youtube-red-hover text-white shadow-youtube animate-glow-pulse px-8 hover:scale-105 transition-all duration-300"
            onClick={() => window.open('https://www.youtube.com/@nextupstudioyt', '_blank')}
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" 
              alt="YouTube" 
              className="h-5 w-5 mr-2 brightness-0 invert" 
            />
            Subscribe to Channel
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="hover:bg-primary hover:text-primary-foreground border-primary/30 px-8 hover:scale-105 transition-all duration-300 shadow-card"
          >
            <Play className="h-5 w-5 mr-2" />
            Watch Latest Video
          </Button>
        </div>

        {/* Stats Preview */}
        <div className="pt-8 animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <p className="text-sm text-muted-foreground mb-4">Join our growing community</p>
          <div className="flex justify-center gap-8 text-center">
            <div className="hover:scale-110 transition-transform duration-300">
              <div className="text-2xl font-bold text-foreground">
                {isLoading ? "..." : stats.subscriberCount}
              </div>
              <div className="text-xs text-muted-foreground">Subscribers</div>
            </div>
            <div className="w-px bg-border" />
            <div className="hover:scale-110 transition-transform duration-300">
              <div className="text-2xl font-bold text-foreground">
                {isLoading ? "..." : stats.viewCount}
              </div>
              <div className="text-xs text-muted-foreground">Views</div>
            </div>
            <div className="w-px bg-border" />
            <div className="hover:scale-110 transition-transform duration-300">
              <div className="text-2xl font-bold text-foreground">
                {isLoading ? "..." : stats.videoCount}
              </div>
              <div className="text-xs text-muted-foreground">Videos</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
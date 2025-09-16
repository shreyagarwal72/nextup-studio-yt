import { Card } from "@/components/ui/card";
import { MapPin, Calendar, Trophy, Users } from "lucide-react";

const JourneyPage = () => {
  const milestones = [
    {
      year: "2023",
      title: "Channel Launch",
      description: "Started Nextup Studio with a vision to create unique content",
      icon: MapPin,
      color: "text-youtube-red"
    },
    {
      year: "2024",
      title: "First Viral Hit",
      description: "Fire Within reached 10K+ views, establishing our musical identity",
      icon: Trophy,
      color: "text-accent-yellow"
    },
    {
      year: "2024",
      title: "Growing Community",
      description: "Reached 1K+ subscribers and built an engaged audience",
      icon: Users,
      color: "text-primary"
    }
  ];

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          My Creative Journey
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          From a passion for music and gaming to building a creative studio that inspires others
        </p>
      </div>

      {/* Story Section */}
      <Card className="p-8 bg-gradient-secondary border-border/50 animate-slide-up">
        <div className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-4">The Beginning</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Hey there! I'm Vanshu Agarwal, the creator behind Nextup Studio. My journey started with a simple love for music and gaming. 
            What began as experimenting with beats in my room has evolved into a platform where I share my passion for rap music, 
            Minecraft content, and creative storytelling.
          </p>
          
          <h3 className="text-xl font-semibold mb-3">What Drives Me</h3>
          <p className="text-muted-foreground leading-relaxed">
            Every track I create, every video I edit, comes from a place of authentic expression. I believe in the power of original content 
            that connects with people on a deeper level. Whether it's a hard-hitting rap verse or an epic Minecraft build, 
            I pour my creativity into everything I do.
          </p>
        </div>
      </Card>

      {/* Timeline */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Key Milestones</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;
            return (
              <Card
                key={milestone.year}
                className={`
                  p-6 bg-gradient-secondary border-border/50
                  hover:shadow-card hover:scale-105 transition-all duration-300
                  animate-slide-up
                `}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg bg-card/50`}>
                    <Icon className={`h-5 w-5 ${milestone.color}`} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">{milestone.year}</span>
                      <div className="flex-1 h-px bg-border" />
                    </div>
                    <h3 className="font-bold text-lg">{milestone.title}</h3>
                    <p className="text-muted-foreground text-sm">{milestone.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Future Goals */}
      <Card className="p-8 text-center bg-gradient-primary/5 border-primary/20 animate-fade-in">
        <h2 className="text-2xl font-bold mb-4">What's Next?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          The journey is just beginning. I'm working on expanding into new content formats, 
          collaborating with other creators, and always pushing the boundaries of creativity.
        </p>
        <div className="flex justify-center">
          <Calendar className="h-6 w-6 text-primary animate-float" />
        </div>
      </Card>
    </div>
  );
};

export default JourneyPage;
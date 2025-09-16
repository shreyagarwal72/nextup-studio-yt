import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Sparkles, Zap, Code, Brain } from "lucide-react";

const AIPage = () => {
  const aiTools = [
    {
      title: "Music Generation",
      description: "AI-powered beat creation and melody suggestions for rap tracks",
      icon: Sparkles,
      color: "text-youtube-red",
      status: "In Development"
    },
    {
      title: "Video Editing AI",
      description: "Automated editing suggestions and thumbnail generation",
      icon: Zap,
      color: "text-accent-yellow",
      status: "Beta"
    },
    {
      title: "Content Ideas",
      description: "AI brainstorming for creative concepts and storylines",
      icon: Brain,
      color: "text-primary",
      status: "Active"
    }
  ];

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4 animate-fade-in">
        <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-primary/10 border border-primary/20 mb-4">
          <Bot className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          AI Creative Tools
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Exploring the intersection of artificial intelligence and creative content production
        </p>
      </div>

      {/* AI Philosophy */}
      <Card className="p-8 bg-gradient-secondary border-border/50 animate-slide-up">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">AI as a Creative Partner</h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            At Nextup Studio, we believe AI isn't here to replace creativity—it's here to amplify it. 
            We're experimenting with cutting-edge AI tools to enhance our music production, 
            streamline video editing, and generate fresh ideas while keeping the human touch at the core.
          </p>
        </div>
      </Card>

      {/* AI Tools Grid */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Current AI Experiments</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {aiTools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <Card
                key={tool.title}
                className={`
                  p-6 bg-gradient-secondary border-border/50
                  hover:shadow-card hover:scale-105 transition-all duration-300
                  group animate-slide-up
                `}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg bg-card/50 group-hover:scale-110 transition-transform`}>
                      <Icon className={`h-6 w-6 ${tool.color}`} />
                    </div>
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${tool.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                        tool.status === 'Beta' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'}
                    `}>
                      {tool.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Future Vision */}
      <Card className="p-8 bg-gradient-primary/5 border-primary/20 animate-fade-in">
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-bold">The Future of AI in Content Creation</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-3">
              <Code className="h-8 w-8 text-primary mx-auto" />
              <h3 className="font-semibold">Intelligent Workflows</h3>
              <p className="text-muted-foreground text-sm">
                AI-powered content pipelines that understand our creative style and suggest improvements
              </p>
            </div>
            
            <div className="space-y-3">
              <Sparkles className="h-8 w-8 text-accent-yellow mx-auto" />
              <h3 className="font-semibold">Personalized Experiences</h3>
              <p className="text-muted-foreground text-sm">
                AI that helps create tailored content experiences for different audience segments
              </p>
            </div>
          </div>
          
          <Button 
            className="mt-6 bg-gradient-primary text-primary-foreground hover:shadow-glow"
            onClick={() => window.open('https://www.youtube.com/@nextupstudioyt', '_blank')}
          >
            <Bot className="h-4 w-4 mr-2" />
            See AI in Action
          </Button>
        </div>
      </Card>

      {/* Collaboration Call */}
      <Card className="p-6 bg-gradient-secondary border-border/50 text-center animate-slide-up">
        <h3 className="text-xl font-bold mb-3">Interested in AI Collaboration?</h3>
        <p className="text-muted-foreground mb-4">
          If you're working on AI tools for creators or want to collaborate on innovative projects, let's connect!
        </p>
        <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground">
          Get In Touch
        </Button>
      </Card>
    </div>
  );
};

export default AIPage;
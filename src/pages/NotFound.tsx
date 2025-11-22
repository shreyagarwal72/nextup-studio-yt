import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, Youtube, Eye, Video } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const stats = [
    { icon: Youtube, label: "Subscribers", value: "500+" },
    { icon: Eye, label: "Views", value: "3.7 Lakh+" },
    { icon: Video, label: "Videos", value: "120+" },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-background p-4">
      <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
        {/* 404 Number with Glow Effect */}
        <div className="relative">
          <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-primary bg-clip-text text-transparent animate-glow-pulse">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Looks like this page got lost in the YouTube void. But don't worry, here's what's real:
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 animate-slide-up">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="p-6 bg-card hover:shadow-youtube transition-all duration-300 hover:scale-105 animate-scale-in border-border"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </Card>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="pt-6">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-youtube group"
          >
            <a href="/" className="flex items-center gap-2">
              <Home className="w-5 h-5 group-hover:animate-float" />
              Return to Home
            </a>
          </Button>
        </div>

        {/* Additional Info */}
        <p className="text-sm text-muted-foreground pt-4">
          Or navigate using the menu to explore our content
        </p>
      </div>
    </div>
  );
};

export default NotFound;

import { useYouTubeStats } from "@/hooks/useYouTubeStats";
import { Users, Eye, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

const ChannelStats = () => {
  const { stats, isLoading } = useYouTubeStats();

  const statsItems = [
    {
      label: "Subscribers",
      value: stats.subscriberCount,
      icon: Users,
      color: "text-youtube-red",
      bgColor: "bg-youtube-red/10"
    },
    {
      label: "Total Views",
      value: stats.viewCount,
      icon: Eye,
      color: "text-accent-yellow",
      bgColor: "bg-accent-yellow/10"
    },
    {
      label: "Videos",
      value: stats.videoCount,
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10"
    }
  ];

  return (
    <Card className="p-6 bg-gradient-secondary border-border/50 animate-fade-in">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <div className="w-1 h-6 bg-gradient-primary rounded-full" />
        Channel Statistics
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statsItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`
                p-4 rounded-lg bg-card/50 border border-border/30
                hover:bg-card/80 hover:shadow-card transition-all duration-300
                group cursor-pointer animate-slide-up
              `}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${item.bgColor}`}>
                  <Icon className={`h-5 w-5 ${item.color}`} />
                </div>
                {isLoading && (
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                )}
              </div>
              
              <div className="space-y-1">
                <p className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {item.value}
                </p>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ChannelStats;
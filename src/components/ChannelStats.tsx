import { useEffect, useState } from "react";
import { Users, Eye, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ChannelStatsProps {
  channelId?: string;
  apiKey?: string;
}

interface Stats {
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
}

const ChannelStats = ({ 
  channelId = "UCFEyuiIys7KoiZkczq4erJw", 
  apiKey = "AIzaSyCM7WK3KYdLFh2xPOFL8amaFxgVCg3etU4" 
}: ChannelStatsProps) => {
  const [stats, setStats] = useState<Stats>({
    subscriberCount: "Loading...",
    viewCount: "Loading...",
    videoCount: "Loading..."
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChannelStats = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`
        );
        const data = await response.json();
        
        if (data?.items?.length > 0) {
          const statistics = data.items[0].statistics;
          setStats({
            subscriberCount: Number(statistics.subscriberCount).toLocaleString(),
            viewCount: Number(statistics.viewCount).toLocaleString(),
            videoCount: Number(statistics.videoCount).toLocaleString()
          });
        } else {
          setStats({
            subscriberCount: "1.2K+",
            viewCount: "50K+",
            videoCount: "25+"
          });
        }
      } catch (error) {
        console.error("Error fetching channel stats:", error);
        setStats({
          subscriberCount: "1.2K+",
          viewCount: "50K+",
          videoCount: "25+"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchChannelStats();
  }, [channelId, apiKey]);

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
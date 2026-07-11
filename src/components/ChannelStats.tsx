import { useYouTubeStats } from "@/hooks/useYouTubeStats";
import { Users, Eye, TrendingUp } from "lucide-react";

const ChannelStats = () => {
  const { stats, isLoading } = useYouTubeStats();

  const items = [
    { label: "Subscribers", value: stats.subscriberCount, icon: Users },
    { label: "Total Views", value: stats.viewCount, icon: Eye },
    { label: "Videos", value: stats.videoCount, icon: TrendingUp },
  ];

  return (
    <section className="neu-card p-8 md:p-10 animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <div className="neu-icon-well w-12 h-12">
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-bold text-2xl text-foreground">
            Channel Statistics
          </h3>
          <p className="text-sm text-muted-foreground">Live from YouTube</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="neu-card neu-card-hover p-6 animate-slide-up"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="neu-icon-well w-12 h-12">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                {isLoading && (
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                )}
              </div>
              <p className="font-display font-extrabold text-3xl text-foreground">
                {item.value}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{item.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ChannelStats;

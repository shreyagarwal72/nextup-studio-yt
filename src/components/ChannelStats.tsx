import { useYouTubeStats } from "@/hooks/useYouTubeStats";
import { Users, Eye, TrendingUp, AlertTriangle, RefreshCw, Inbox } from "lucide-react";

const ChannelStats = () => {
  const { stats, isLoading, error, refetch } = useYouTubeStats();

  const items = [
    { label: "Subscribers", value: stats.subscriberCount, icon: Users },
    { label: "Total Views", value: stats.viewCount, icon: Eye },
    { label: "Videos", value: stats.videoCount, icon: TrendingUp },
  ];

  const isEmpty =
    !isLoading &&
    !error &&
    items.every((i) => !i.value || i.value === "—" || i.value === "0");

  return (
    <section className="neu-card p-8 md:p-10 animate-fade-in">
      <div className="flex items-start justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="neu-icon-well w-12 h-12">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-bold text-2xl text-foreground">
              Channel Statistics
            </h3>
            <p className="text-sm text-muted-foreground">
              {isLoading ? "Fetching latest numbers…" : "Live from YouTube"}
            </p>
          </div>
        </div>
        {!isLoading && (
          <button
            onClick={refetch}
            aria-label="Refresh statistics"
            className="neu-btn h-11 w-11 flex items-center justify-center shrink-0"
          >
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {error && !isLoading && (
        <div
          role="alert"
          className="neu-inset rounded-2xl p-4 mb-6 flex items-start gap-3"
        >
          <div className="neu-icon-well w-9 h-9 shrink-0">
            <AlertTriangle className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">
              Something went wrong
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{error}</p>
          </div>
          <button
            onClick={refetch}
            className="neu-btn px-3 py-2 text-xs font-medium inline-flex items-center gap-1.5 shrink-0"
          >
            <RefreshCw className="h-3 w-3" /> Retry
          </button>
        </div>
      )}

      {isEmpty ? (
        <div className="flex flex-col items-center text-center py-10 gap-4">
          <div className="neu-icon-well w-16 h-16">
            <Inbox className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <p className="font-display font-bold text-foreground">No stats yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Channel data hasn't come through. Try again in a moment.
            </p>
          </div>
          <button onClick={refetch} className="neu-btn px-5 py-2.5 text-sm font-medium inline-flex items-center gap-2">
            <RefreshCw className="h-4 w-4" /> Try again
          </button>
        </div>
      ) : (
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
                </div>
                {isLoading ? (
                  <div className="space-y-3">
                    <div className="h-8 w-24 rounded-lg neu-inset-sm animate-pulse" />
                    <div className="h-3 w-20 rounded neu-inset-sm animate-pulse" />
                  </div>
                ) : (
                  <>
                    <p className="font-display font-extrabold text-3xl text-foreground">
                      {item.value}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{item.label}</p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ChannelStats;

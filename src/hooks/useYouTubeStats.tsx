import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";

interface Stats {
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
}

interface YouTubeStatsContextType {
  stats: Stats;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

const FALLBACK: Stats = {
  subscriberCount: "510+",
  viewCount: "36K+",
  videoCount: "95+",
};

const EMPTY: Stats = {
  subscriberCount: "—",
  viewCount: "—",
  videoCount: "—",
};

const YouTubeStatsContext = createContext<YouTubeStatsContextType | undefined>(undefined);

interface YouTubeStatsProviderProps {
  children: ReactNode;
  channelId?: string;
  apiKey?: string;
}

export const YouTubeStatsProvider = ({
  children,
  channelId = "UCFEyuiIys7KoiZkczq4erJw",
  apiKey = "AIzaSyCM7WK3KYdLFh2xPOFL8amaFxgVCg3etU4",
}: YouTubeStatsProviderProps) => {
  const [stats, setStats] = useState<Stats>(EMPTY);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  const refetch = useCallback(() => {
    setAttempt((a) => a + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    const run = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (cancelled) return;

        const s = data?.items?.[0]?.statistics;
        if (s) {
          setStats({
            subscriberCount: Number(s.subscriberCount).toLocaleString(),
            viewCount: Number(s.viewCount).toLocaleString(),
            videoCount: Number(s.videoCount).toLocaleString(),
          });
          setError(null);
        } else {
          setStats(FALLBACK);
          setError("Channel data unavailable — showing recent values.");
        }
      } catch (e) {
        console.error("Error fetching channel stats:", e);
        if (cancelled) return;
        setStats(FALLBACK);
        setError("Couldn't reach YouTube — showing recent values.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [channelId, apiKey, attempt]);

  return (
    <YouTubeStatsContext.Provider value={{ stats, isLoading, error, refetch }}>
      {children}
    </YouTubeStatsContext.Provider>
  );
};

export const useYouTubeStats = () => {
  const context = useContext(YouTubeStatsContext);
  if (context === undefined) {
    throw new Error("useYouTubeStats must be used within a YouTubeStatsProvider");
  }
  return context;
};

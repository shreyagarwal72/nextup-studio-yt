import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface Stats {
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
}

interface YouTubeStatsContextType {
  stats: Stats;
  isLoading: boolean;
}

const YouTubeStatsContext = createContext<YouTubeStatsContextType | undefined>(undefined);

interface YouTubeStatsProviderProps {
  children: ReactNode;
  channelId?: string;
  apiKey?: string;
}

export const YouTubeStatsProvider = ({ 
  children, 
  channelId = "UCFEyuiIys7KoiZkczq4erJw", 
  apiKey = "AIzaSyCM7WK3KYdLFh2xPOFL8amaFxgVCg3etU4" 
}: YouTubeStatsProviderProps) => {
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
            subscriberCount: "510+",
            viewCount: "36K+",
            videoCount: "95+"
          });
        }
      } catch (error) {
        console.error("Error fetching channel stats:", error);
        setStats({
          subscriberCount: "510+",
          viewCount: "36K+",
          videoCount: "95+"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchChannelStats();
  }, [channelId, apiKey]);

  return (
    <YouTubeStatsContext.Provider value={{ stats, isLoading }}>
      {children}
    </YouTubeStatsContext.Provider>
  );
};

export const useYouTubeStats = () => {
  const context = useContext(YouTubeStatsContext);
  if (context === undefined) {
    throw new Error('useYouTubeStats must be used within a YouTubeStatsProvider');
  }
  return context;
};
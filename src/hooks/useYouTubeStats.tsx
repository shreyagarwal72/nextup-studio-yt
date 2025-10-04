import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface Stats {
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
}

const formatApproximate = (num: number, type: 'subscribers' | 'views' | 'videos'): string => {
  if (type === 'subscribers') {
    if (num >= 1000000) return `${Math.floor(num / 100000) / 10}M+`;
    if (num >= 10000) return `${Math.floor(num / 1000)}K+`;
    if (num >= 1000) return `${Math.floor(num / 100) / 10}K+`;
    if (num >= 100) return `${Math.floor(num / 100) * 100}+`;
    return `${Math.floor(num / 10) * 10}+`;
  }
  
  if (type === 'views') {
    if (num >= 100000) {
      const lakhs = num / 100000;
      return `${Math.floor(lakhs * 10) / 10} Lakh+`;
    }
    if (num >= 10000) return `${Math.floor(num / 1000)}K+`;
    if (num >= 1000) return `${Math.floor(num / 100) / 10}K+`;
    return `${Math.floor(num / 100) * 100}+`;
  }
  
  if (type === 'videos') {
    if (num >= 100) return `${Math.floor(num / 10) * 10}+`;
    if (num >= 10) return `${Math.floor(num / 5) * 5}+`;
    return `${num}+`;
  }
  
  return `${num}+`;
};

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
            subscriberCount: formatApproximate(Number(statistics.subscriberCount), 'subscribers'),
            viewCount: formatApproximate(Number(statistics.viewCount), 'views'),
            videoCount: formatApproximate(Number(statistics.videoCount), 'videos')
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
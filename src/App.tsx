import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { YouTubeStatsProvider } from "@/hooks/useYouTubeStats";
import Index from "./pages/Index";
import YouTubePage from "./pages/YouTube";
import NotFound from "./pages/NotFound";
import Sidebar from "./components/Sidebar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="nextup-theme">
      <YouTubeStatsProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex min-h-screen w-full bg-gradient-background transition-colors duration-300">
              <Sidebar />
              <main className="flex-1 w-full overflow-x-hidden">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/youtube" element={<YouTubePage />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </YouTubeStatsProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

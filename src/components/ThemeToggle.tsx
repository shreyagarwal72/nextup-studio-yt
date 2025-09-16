import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    } else {
      // If system, toggle to light first
      setTheme("light");
    }
  };

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className={`
        relative overflow-hidden border-2
        hover:scale-110 hover:shadow-3d
        transition-all duration-300 ease-out
        ${isDark 
          ? "border-yellow-400/30 bg-slate-800/50 hover:bg-slate-700/80" 
          : "border-slate-300/50 bg-white/50 hover:bg-slate-100/80"
        }
      `}
    >
      <div className="relative">
        {/* Sun Icon */}
        <Sun 
          className={`
            h-5 w-5 transition-all duration-500 ease-out
            ${isDark 
              ? "rotate-180 scale-0 text-transparent" 
              : "rotate-0 scale-100 text-yellow-500"
            }
          `} 
        />
        
        {/* Moon Icon */}
        <Moon 
          className={`
            absolute inset-0 h-5 w-5 transition-all duration-500 ease-out
            ${isDark 
              ? "rotate-0 scale-100 text-blue-400" 
              : "rotate-180 scale-0 text-transparent"
            }
          `} 
        />
      </div>

      {/* 3D Glow Effect */}
      <div 
        className={`
          absolute inset-0 rounded-md transition-opacity duration-300
          ${isDark 
            ? "bg-gradient-to-br from-blue-400/20 to-purple-500/20 opacity-50" 
            : "bg-gradient-to-br from-yellow-400/20 to-orange-500/20 opacity-50"
          }
        `}
      />
      
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
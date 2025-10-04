import { Link, useLocation } from "react-router-dom";
import { Home, TrendingUp, Trophy, Play, Users, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import Scene3D from "@/components/Scene3D";

const Sidebar = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigationItems = [
    { href: "#home", label: "Home", icon: Home },
    { href: "#statistics", label: "Statistics", icon: TrendingUp },
    { href: "#achievements", label: "Achievements", icon: Trophy },
    { href: "#videos", label: "Videos", icon: Play },
    { href: "#community", label: "Community", icon: Users },
  ];

  const [activeSection, setActiveSection] = useState("#home");

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActiveSection(href);
    setIsMobileOpen(false);
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const isActive = (href: string) => activeSection === href;

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="secondary"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-card/80 backdrop-blur-sm shadow-3d hover:scale-110 transition-all duration-300"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 
          bg-gradient-secondary/95 backdrop-blur-xl border-r border-border/50
          transform transition-all duration-500 ease-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:inset-0
        `}
      >
        <div className="flex h-full flex-col">
          {/* 3D Logo Section */}
          <div className="relative h-48 border-b border-border/50 overflow-hidden">
            <Scene3D className="absolute inset-0" />
            <div className="absolute bottom-4 left-0 right-0 text-center z-10">
              <h2 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                Nextup Studio
              </h2>
              <p className="text-xs text-muted-foreground">by Vanshu Agarwal</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-3">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`
                    relative flex items-center gap-3 px-4 py-3 rounded-xl
                    transition-all duration-500 group overflow-hidden
                    hover:shadow-3d hover:scale-105
                    animate-slide-up backdrop-blur-sm
                    ${active 
                      ? "bg-gradient-primary text-primary-foreground shadow-youtube scale-105" 
                      : "text-foreground hover:bg-depth-2 hover:text-primary"
                    }
                  `}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* 3D Background Effect */}
                  <div className={`
                    absolute inset-0 rounded-xl transition-all duration-300
                    ${active 
                      ? "bg-gradient-to-br from-primary/20 to-transparent" 
                      : "bg-gradient-to-br from-transparent to-depth-1 opacity-0 group-hover:opacity-100"
                    }
                  `} />
                  
                  <Icon className={`h-5 w-5 transition-all duration-300 relative z-10 ${
                    active ? "scale-110 drop-shadow-lg" : "group-hover:scale-105"
                  }`} />
                  
                  <span className="font-medium relative z-10">{item.label}</span>
                  
                  {active && (
                    <div className="ml-auto w-2 h-2 bg-accent-yellow rounded-full animate-glow-pulse relative z-10" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Theme Toggle & Footer */}
          <div className="p-4 space-y-4 border-t border-border/50">
            <div className="flex justify-center">
              <ThemeToggle />
            </div>
            
            <div className="text-xs text-muted-foreground text-center animate-fade-in">
              <p>© 2024 Nextup Studio</p>
              <p className="mt-1">Powered by creativity</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
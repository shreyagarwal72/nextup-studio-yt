import { Link, useLocation } from "react-router-dom";
import { Home, Play, MapPin, Bot, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigationItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/youtube", label: "YouTube", icon: Play },
    { href: "/journey", label: "My Journey", icon: MapPin },
    { href: "/ai", label: "AI", icon: Bot },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="secondary"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-card/80 backdrop-blur-sm"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 
          bg-gradient-secondary border-r border-border/50 backdrop-blur-xl
          transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:inset-0
        `}
      >
        <div className="flex h-full flex-col">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center p-6 border-b border-border/50">
            <div className="text-center animate-fade-in">
              <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Nextup Studio
              </h2>
              <p className="text-sm text-muted-foreground mt-1">by Vanshu Agarwal</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-all duration-300 group
                    hover:bg-secondary/80 hover:shadow-card
                    animate-slide-up
                    ${active 
                      ? "bg-gradient-primary text-primary-foreground shadow-youtube" 
                      : "text-foreground hover:text-primary"
                    }
                  `}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon className={`h-5 w-5 transition-transform duration-300 ${
                    active ? "scale-110" : "group-hover:scale-105"
                  }`} />
                  <span className="font-medium">{item.label}</span>
                  {active && (
                    <div className="ml-auto w-2 h-2 bg-accent-yellow rounded-full animate-glow-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border/50">
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
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
import { Home, TrendingUp, Trophy, Play, Users, Menu, X, Youtube, Sun, Moon, Monitor } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";

const navigationItems = [
  { href: "#home", label: "Home", icon: Home },
  { href: "#statistics", label: "Statistics", icon: TrendingUp },
  { href: "#achievements", label: "Achievements", icon: Trophy },
  { href: "#videos", label: "Videos", icon: Play },
  { href: "#community", label: "Community", icon: Users },
];

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    const next = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    setTheme(next);
  };

  const ThemeIcon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;
  const themeLabel = theme === "light" ? "Light" : theme === "dark" ? "Dark" : "System";

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActiveSection(href);
    setIsMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Mobile trigger */}
      <button
        aria-label={isMobileOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="neu-btn fixed top-4 left-4 z-50 lg:hidden h-12 w-12 flex items-center justify-center"
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-72 shrink-0 bg-background
          transform transition-transform duration-500 ease-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen
        `}
      >
        <div className="flex h-full flex-col p-6 gap-8">
          {/* Brand */}
          <div className="neu-card p-6 text-center animate-fade-in">
            <div className="neu-icon-well w-16 h-16 mx-auto mb-4">
              <Youtube className="h-7 w-7 text-primary" />
            </div>
            <h2 className="font-display font-extrabold text-lg text-foreground">
              Nextup Studio
            </h2>
            <p className="text-xs text-muted-foreground mt-1">by Vanshu Agarwal</p>
          </div>

          {/* Nav */}
          <nav className="flex-1 space-y-3">
            {navigationItems.map((item, i) => {
              const Icon = item.icon;
              const active = activeSection === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`
                    group flex items-center gap-4 px-4 py-3 rounded-2xl
                    transition-all duration-300 ease-out animate-slide-up
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-primary focus-visible:ring-offset-2
                    focus-visible:ring-offset-background
                    ${active
                      ? "neu-inset text-primary"
                      : "text-foreground neu-raised-sm hover:-translate-y-0.5 hover:neu-raised"}
                  `}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <span
                    className={`
                      h-9 w-9 rounded-xl flex items-center justify-center
                      transition-all duration-300
                      ${active ? "neu-inset-deep text-primary" : "neu-raised-sm text-muted-foreground group-hover:text-foreground"}
                    `}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-medium text-sm">{item.label}</span>
                  {active && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Theme toggle */}
          <button
            onClick={cycleTheme}
            aria-label={`Switch theme (current: ${themeLabel})`}
            className="neu-btn w-full flex items-center gap-3 px-4 py-3 group"
          >
            <span className="neu-icon-well h-9 w-9 rounded-xl">
              <ThemeIcon
                key={theme}
                className="h-4 w-4 text-primary animate-spin-in"
              />
            </span>
            <span className="font-medium text-sm">Theme</span>
            <span className="ml-auto text-xs text-muted-foreground uppercase tracking-wider">
              {themeLabel}
            </span>
          </button>

          {/* Footer */}
          <div className="neu-card p-4 text-center text-xs text-muted-foreground">
            <p className="font-medium text-foreground/80 flex items-center justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse-ring" />
              © 2026 Nextup Studio
            </p>
            <p className="mt-1">Powered by creativity</p>
          </div>
        </div>
      </aside>

      {isMobileOpen && (
        <button
          aria-label="Close menu overlay"
          className="fixed inset-0 z-30 lg:hidden bg-background/70 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;

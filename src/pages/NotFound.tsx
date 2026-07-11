import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, Youtube, Eye, Video } from "lucide-react";

const stats = [
  { icon: Youtube, label: "Subscribers", value: "500+" },
  { icon: Eye, label: "Views", value: "3.7 Lakh+" },
  { icon: Video, label: "Videos", value: "120+" },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: attempted route", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="max-w-2xl w-full text-center space-y-10 animate-fade-in">
        <div className="neu-card p-10 md:p-14">
          <div className="neu-inset-deep rounded-full w-40 h-40 mx-auto flex items-center justify-center">
            <h1 className="font-display font-extrabold text-6xl md:text-7xl text-primary tracking-tight">
              404
            </h1>
          </div>

          <div className="space-y-3 mt-8">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground">
              Page Not Found
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              This page got lost in the YouTube void. But here's what's real:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="neu-card neu-card-hover p-5 animate-scale-in"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="neu-icon-well w-11 h-11 mx-auto mb-3">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="font-display font-extrabold text-2xl text-foreground">
                    {s.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              );
            })}
          </div>

          <a
            href="/"
            className="neu-btn-primary inline-flex items-center gap-2 px-7 py-3.5 font-semibold mt-10"
          >
            <Home className="w-4 h-4" />
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

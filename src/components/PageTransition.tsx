import { useEffect, useState, ReactNode } from "react";
import { useLocation } from "react-router-dom";

/**
 * Replays an enter animation on every route change by remounting via key.
 */
const PageTransition = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [displayKey, setDisplayKey] = useState(location.pathname);
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    if (location.pathname === displayKey) return;
    setPhase("out");
    const t = window.setTimeout(() => {
      setDisplayKey(location.pathname);
      setPhase("in");
      window.scrollTo({ top: 0 });
    }, 280);
    return () => window.clearTimeout(t);
  }, [location.pathname, displayKey]);

  return (
    <div
      key={displayKey}
      className={phase === "in" ? "animate-page-in" : "animate-page-out"}
    >
      {children}
    </div>
  );
};

export default PageTransition;

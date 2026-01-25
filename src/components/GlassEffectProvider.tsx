import { createContext, useContext, useEffect, useState } from "react";

type GlassEffectProviderProps = {
  children: React.ReactNode;
  defaultEnabled?: boolean;
  storageKey?: string;
};

type GlassEffectProviderState = {
  isGlassEnabled: boolean;
  setGlassEnabled: (enabled: boolean) => void;
  toggleGlass: () => void;
};

const initialState: GlassEffectProviderState = {
  isGlassEnabled: true,
  setGlassEnabled: () => null,
  toggleGlass: () => null,
};

const GlassEffectContext = createContext<GlassEffectProviderState>(initialState);

export function GlassEffectProvider({
  children,
  defaultEnabled = true,
  storageKey = "nextup-glass-effect",
}: GlassEffectProviderProps) {
  const [isGlassEnabled, setIsGlassEnabled] = useState<boolean>(() => {
    const stored = localStorage.getItem(storageKey);
    return stored !== null ? stored === "true" : defaultEnabled;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (isGlassEnabled) {
      root.classList.add("glass-enabled");
      root.classList.remove("glass-disabled");
    } else {
      root.classList.remove("glass-enabled");
      root.classList.add("glass-disabled");
    }
  }, [isGlassEnabled]);

  const value = {
    isGlassEnabled,
    setGlassEnabled: (enabled: boolean) => {
      localStorage.setItem(storageKey, String(enabled));
      setIsGlassEnabled(enabled);
    },
    toggleGlass: () => {
      const newValue = !isGlassEnabled;
      localStorage.setItem(storageKey, String(newValue));
      setIsGlassEnabled(newValue);
    },
  };

  return (
    <GlassEffectContext.Provider value={value}>
      {children}
    </GlassEffectContext.Provider>
  );
}

export const useGlassEffect = () => {
  const context = useContext(GlassEffectContext);

  if (context === undefined)
    throw new Error("useGlassEffect must be used within a GlassEffectProvider");

  return context;
};

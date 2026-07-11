interface LoadingAnimationProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
}

const sizeMap = {
  sm: "w-10 h-10",
  md: "w-16 h-16",
  lg: "w-24 h-24",
};

const LoadingAnimation = ({
  size = "md",
  text = "Loading",
  fullScreen = false,
}: LoadingAnimationProps) => {
  const wrap = fullScreen
    ? "fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm"
    : "flex items-center justify-center p-8";

  return (
    <div className={wrap}>
      <div className="flex flex-col items-center gap-6">
        <div className={`neu-icon-well rounded-full ${sizeMap[size]}`}>
          <div className="w-1/2 h-1/2 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
        {text && (
          <p className="font-display font-semibold text-sm text-foreground tracking-wide">
            {text}
            <span className="inline-block animate-pulse text-primary">…</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadingAnimation;

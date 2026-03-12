import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-in" | "fade-in-up" | "scale-in" | "slide-in-left" | "slide-in-right";
  delay?: string;
}

const ScrollReveal = ({ children, className, animation = "fade-in-up", delay }: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={cn(
        "transition-none",
        isVisible ? `animate-${animation}` : "opacity-0",
        className
      )}
      style={isVisible && delay ? { animationDelay: delay, animationFillMode: "both" } : undefined}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;

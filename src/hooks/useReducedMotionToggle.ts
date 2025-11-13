import { useEffect, useState } from "react";

export function useReducedMotionToggle() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("aludo-reduced-motion");
    const system = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const applied = stored ? stored === "1" : system;
    setReduced(applied);
    document.documentElement.classList.toggle("reduce-motion", applied);
  }, []);

  const toggle = () => {
    setReduced((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("reduce-motion", next);
      localStorage.setItem("aludo-reduced-motion", next ? "1" : "0");
      return next;
    });
  };

  return { reduced, toggle } as const;
}

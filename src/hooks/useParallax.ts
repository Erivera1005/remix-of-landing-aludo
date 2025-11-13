import { useEffect, useRef, useState } from "react";

interface Options {
  speed?: number; // pixels moved per pixel scrolled (e.g., 0.15)
  enabled?: boolean;
}

export function useParallax<T extends HTMLElement>({ speed = 0.15, enabled = true }: Options = {}) {
  const ref = useRef<T | null>(null);
  const frame = useRef<number | null>(null);
  const inView = useRef(false);
  const baseOffset = useRef(0);
  const [style, setStyle] = useState<React.CSSProperties>({});

  // Respect reduced motion
  const prefersReduced = typeof window !== "undefined" &&
    (document.documentElement.classList.contains("reduce-motion") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!enabled || prefersReduced) {
      setStyle({ transform: "translate3d(0,0,0)" });
      return;
    }

    // Cache initial offset to avoid repeated layout reads
    const cacheOffset = () => {
      // Read once per resize/observer entry
      baseOffset.current = window.scrollY + el.getBoundingClientRect().top;
    };

    cacheOffset();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          inView.current = entry.isIntersecting;
          if (inView.current) start();
          else stop();
        }
      },
      { root: null, threshold: 0 },
    );

    io.observe(el);

    const onResize = () => {
      cacheOffset();
      tick();
    };
    window.addEventListener("resize", onResize, { passive: true });

    function tick() {
      if (!inView.current) return;
      const y = (window.scrollY - baseOffset.current) * speed;
      setStyle((prev) => ({ ...prev, transform: `translate3d(0, ${y.toFixed(2)}px, 0)` }));
    }

    const onScroll = () => {
      if (frame.current != null) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = null;
        tick();
      });
    };

    function start() {
      el.style.willChange = "transform";
      tick();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    function stop() {
      el.style.willChange = "auto";
      window.removeEventListener("scroll", onScroll as any);
    }

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", onResize as any);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [enabled, prefersReduced, speed]);

  return { ref, style } as const;
}

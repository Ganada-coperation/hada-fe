// src/hooks/useScrollFadeIn.ts
import { useRef, useEffect, useState, CSSProperties } from "react";

export default function useScrollFadeIn(duration = 700, delay = 0) {
  const dom = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({
    opacity: 0,
    transform: "translateY(20px)",
  });

  useEffect(() => {
    const { current } = dom;
    if (!current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStyle({
            opacity: 1,
            transform: "translateY(0)",
            transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
          });
          observer.unobserve(current);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(current);
    return () => observer.disconnect();
  }, [delay, duration]);

  return { ref: dom, style };
}

import { useEffect } from "react";

/**
 * Page-level parallax + hero "vanish" fade, ported from the prototype's fx().
 * - `data-par="<rate>"` elements translate vertically as a function of scroll position.
 * - `data-vanish` elements (the hero) fade/lift/scale out as the page scrolls past them.
 */
export function useParallax() {
  useEffect(() => {
    let raf = 0;

    const apply = () => {
      const vh = window.innerHeight || 800;

      document.querySelectorAll<HTMLElement>("[data-par]").forEach((el) => {
        const rate = parseFloat(el.getAttribute("data-par") || "0") || 0;
        const r = el.getBoundingClientRect();
        const offset = (r.top + r.height / 2 - vh / 2) * -rate;
        el.style.transform = `translate3d(0,${offset.toFixed(1)}px,0)`;
      });

      document.querySelectorAll<HTMLElement>("[data-vanish]").forEach((el) => {
        const span = Math.max(el.offsetHeight * 0.9, vh * 0.9);
        const p = Math.min(Math.max((window.scrollY || 0) / span, 0), 1);
        el.style.opacity = (1 - p * 0.78).toFixed(3);
        el.style.transform = `translate3d(0,${(p * -44).toFixed(1)}px,0) scale(${(1 - p * 0.02).toFixed(4)})`;
        el.style.transformOrigin = "50% 0%";
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
}

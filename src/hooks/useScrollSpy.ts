import { useEffect, useState } from "react";

/**
 * Tracks which `#sec-<id>` section is nearest the top of the viewport, ported
 * from the prototype's spy(). Used by Nav to drive the active nav item and
 * the sliding indicator's target. Only meaningful on the home page, so
 * callers pass `enabled=false` on other routes.
 */
export function useScrollSpy(sectionIds: string[], enabled: boolean) {
  const [active, setActive] = useState(sectionIds[0]);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;

    const check = () => {
      let found = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(`sec-${id}`);
        if (el && el.getBoundingClientRect().top <= 140) found = id;
      }
      setActive((prev) => (prev === found ? prev : found));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(check);
    };

    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, sectionIds.join(",")]);

  return active;
}

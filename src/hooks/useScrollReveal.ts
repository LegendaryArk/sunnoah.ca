import { useEffect } from "react";

interface RevealElement extends HTMLElement {
  _revealAnim?: Animation | null;
}

const FROM: Record<string, string> = {
  up: "translate3d(0,42px,0) scale(.972)",
  left: "translate3d(-38px,10px,0) scale(.978)",
  right: "translate3d(38px,10px,0) scale(.978)",
  scale: "translate3d(0,18px,0) scale(.93)",
  soft: "translate3d(0,26px,0) scale(.99)",
};

const MID: Record<string, string> = {
  up: "translate3d(0,-6px,0) scale(1.006)",
  left: "translate3d(5px,-2px,0) scale(1.004)",
  right: "translate3d(-5px,-2px,0) scale(1.004)",
  scale: "translate3d(0,-3px,0) scale(1.014)",
  soft: "translate3d(0,-3px,0) scale(1.002)",
};

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function tweenVars(el: HTMLElement) {
  const dir = el.getAttribute("data-tween") || "up";
  return {
    from: FROM[dir] ?? FROM.up,
    mid: MID[dir] ?? MID.up,
    delay: Math.min(parseInt(el.getAttribute("data-reveal") || "0", 10), 6) * 95,
  };
}

function reveal(el: RevealElement) {
  if (el.getAttribute("data-seen")) return;
  el.setAttribute("data-seen", "1");
  const v = tweenVars(el);
  if (reducedMotion()) {
    el.style.transition = "opacity .4s ease";
    el.style.opacity = "1";
    el.style.transform = "none";
    return;
  }
  el._revealAnim?.cancel();
  el.style.transition = "none";
  el.style.willChange = "transform,opacity,filter";
  const anim = el.animate(
    [
      { opacity: 0, transform: v.from, filter: "blur(7px)", offset: 0 },
      { opacity: 1, transform: v.mid, filter: "blur(0px)", offset: 0.62 },
      { opacity: 1, transform: "none", filter: "blur(0px)", offset: 1 },
    ],
    { duration: 1020, delay: v.delay, fill: "backwards", easing: "cubic-bezier(.22,1.04,.32,1)" },
  );
  el._revealAnim = anim;
  el.style.opacity = "1";
  el.style.transform = "none";
  anim.finished
    .then(() => {
      el.style.willChange = "";
      el.style.filter = "";
    })
    .catch(() => {});
}

function unreveal(el: RevealElement) {
  if (!el.getAttribute("data-seen")) return;
  el.removeAttribute("data-seen");
  const v = tweenVars(el);
  el._revealAnim?.cancel();
  el._revealAnim = null;
  if (reducedMotion()) {
    el.style.transition = "opacity .3s ease";
    el.style.opacity = "0";
    return;
  }
  el.style.transition = "opacity .45s ease, transform .45s cubic-bezier(.4,0,.7,.2), filter .45s ease";
  el.style.opacity = "0";
  el.style.transform = v.from;
  el.style.filter = "blur(5px)";
}

/**
 * Page-level scroll-reveal system, ported from the prototype's reveal()/
 * unreveal()/scan(). Mount once near the app root. A MutationObserver picks
 * up any element rendered anywhere with data-reveal/data-tween automatically,
 * so React-driven remounts (route changes, accordion panels opening) don't
 * need to manually re-trigger a scan the way the prototype's componentDidUpdate did.
 */
export function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as RevealElement;
          if (entry.isIntersecting) reveal(el);
          else if (entry.boundingClientRect.top > 0) unreveal(el);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0 },
    );

    const vh = () => window.innerHeight || 800;

    const observeAndPrime = (el: RevealElement) => {
      io.observe(el);
      const r = el.getBoundingClientRect();
      if (r.top < vh() * 0.94) reveal(el);
    };

    const scan = () => {
      document.querySelectorAll<RevealElement>("[data-reveal]").forEach(observeAndPrime);
    };

    scan();
    const safety = setTimeout(scan, 800);

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches("[data-reveal]")) observeAndPrime(node);
          node.querySelectorAll<RevealElement>("[data-reveal]").forEach(observeAndPrime);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      clearTimeout(safety);
    };
  }, []);
}

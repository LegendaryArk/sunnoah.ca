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

// The element's own declared transition (e.g. a theme color fade set via
// React's style prop) — captured once so reveal()/unreveal() can restore it
// instead of permanently clobbering it with their own transient overrides.
const baseTransitions = new WeakMap<HTMLElement, string>();

function getBaseTransition(el: HTMLElement): string {
  if (!baseTransitions.has(el)) {
    baseTransitions.set(el, el.style.transition || "");
  }
  return baseTransitions.get(el) as string;
}

function joinTransitions(...parts: string[]) {
  return parts.filter(Boolean).join(", ");
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
  const base = getBaseTransition(el);
  const v = tweenVars(el);
  if (reducedMotion()) {
    el.style.transition = joinTransitions(base, "opacity .4s ease");
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
  const clear = () => {
    // Only clear if this animation is still the element's active one — a
    // cancel() (from a subsequent reveal()/unreveal() call superseding this
    // one) rejects `finished` too, and without this we'd otherwise leave
    // will-change/filter dangling on the element forever, which is what was
    // making fast-toggling elements (elements sitting right at the reveal
    // threshold, re-triggering before the previous pass finishes) render
    // permanently blurry.
    if (el._revealAnim === anim) {
      el.style.willChange = "";
      el.style.filter = "";
      // Restore the element's own transition (e.g. a theme color fade) only
      // once the reveal animation has actually finished. Restoring it any
      // earlier re-arms a CSS transition on opacity/transform while the
      // WAAPI animation is still driving those same properties; it sits
      // masked until the animation's fill runs out, then plays on its own
      // — visible as the reveal flickering or fading in a second time.
      el.style.transition = base;
    }
  };
  anim.finished.then(clear, clear);
}

function unreveal(el: RevealElement) {
  if (!el.getAttribute("data-seen")) return;
  // A reveal that's still actively running (its delay or its duration) is
  // itself moving the element via `transform` — its "from" position sits
  // below the element's resting spot by design, for the slide-up effect.
  // That self-inflicted displacement can momentarily push a borderline
  // element out of the IntersectionObserver's root, firing a spurious
  // "not intersecting" callback for an element that never actually left
  // the viewport. Without this guard that cancels the just-started
  // animation and restarts it, which is exactly what shows up as the
  // reveal flickering mid-fade while scrolling.
  if (el._revealAnim?.playState === "running") return;
  el.removeAttribute("data-seen");
  const base = getBaseTransition(el);
  const v = tweenVars(el);
  el._revealAnim?.cancel();
  el._revealAnim = null;
  if (reducedMotion()) {
    el.style.transition = joinTransitions(base, "opacity .3s ease");
    el.style.opacity = "0";
    return;
  }
  el.style.transition = joinTransitions(
    base,
    "opacity .45s ease, transform .45s cubic-bezier(.4,0,.7,.2), filter .45s ease",
  );
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

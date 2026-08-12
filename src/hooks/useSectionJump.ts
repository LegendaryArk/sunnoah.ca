import { useNavigate, useLocation } from "react-router-dom";

/**
 * Scrolls to a `#sec-<id>` anchor on the home page, ported from the
 * prototype's scrollTo(). The `top` section gets extra offset for the hero's
 * larger top padding; everything else clears the sticky nav height.
 */
export function scrollToSection(id: string) {
  const el = document.getElementById(`sec-${id}`);
  if (!el) return;
  const y = el.getBoundingClientRect().top + (window.scrollY || 0) - (id === "top" ? 200 : 88);
  window.scrollTo({ top: Math.max(y, 0), behavior: "smooth" });
}

/**
 * Ported from the prototype's jump(): if we're not on the home page, navigate
 * there first, then scroll once the sections have mounted.
 */
export function useSectionJump() {
  const navigate = useNavigate();
  const location = useLocation();

  return (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(id), 90);
    } else {
      scrollToSection(id);
    }
  };
}

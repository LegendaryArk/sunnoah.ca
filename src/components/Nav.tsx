import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../hooks/useThemeMode";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { useSectionJump } from "../hooks/useSectionJump";
import { NAV_ITEMS, SECTION_IDS } from "../data/nav";

export default function Nav() {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";
  const location = useLocation();
  const jump = useSectionJump();

  const isHome = location.pathname === "/";
  const isProjectsGrid = location.pathname === "/projects";
  const scrollSpyActive = useScrollSpy(SECTION_IDS, isHome);
  const activeId = isHome ? scrollSpyActive : isProjectsGrid ? "projects" : null;

  const indicatorRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const measure = () => {
    const ind = indicatorRef.current;
    if (!ind) return;
    const el = activeId ? itemRefs.current[activeId] : null;
    if (el) {
      ind.style.width = `${el.offsetWidth}px`;
      ind.style.transform = `translateX(${el.offsetLeft}px)`;
      ind.style.opacity = "1";
    } else {
      ind.style.opacity = "0";
    }
  };

  // Measured against the actual nav item's rendered rect (not a CSS-only
  // approximation), matching the design spec's requirement for the sliding
  // indicator.
  useLayoutEffect(measure);

  useLayoutEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pointer-events-none sticky top-0 z-[60] flex justify-center pt-5 pb-1">
      <div
        className="pointer-events-auto flex items-center gap-1 rounded-full p-1.5 backdrop-blur-[14px] transition-colors duration-500"
        style={{
          background: "var(--nav-bg)",
          border: "1px solid var(--line)",
          boxShadow: "0 8px 30px var(--shadow)",
        }}
      >
        <div className="relative flex items-center gap-1">
          <div
            ref={indicatorRef}
            className="pointer-events-none absolute top-0 left-0 z-[1] h-full rounded-full transition-[transform,width,background,opacity] duration-[.45s] ease-[cubic-bezier(.4,1.25,.35,1)]"
            style={{ background: "var(--indicator)", opacity: 0 }}
          />
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              ref={(el) => {
                itemRefs.current[item.id] = el;
              }}
              onClick={() => jump(item.id)}
              className="relative z-[2] cursor-pointer rounded-full px-[17px] py-[9px] text-[12.5px] font-medium whitespace-nowrap transition-colors duration-[.35s] ease"
              style={{ color: activeId === item.id ? (dark ? "#0e1418" : "#ffffff") : "var(--muted)" }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mx-[5px] h-[22px] w-px" style={{ background: "var(--line)" }} />

        <button
          type="button"
          onClick={toggleTheme}
          title="Toggle theme"
          className="relative h-7 w-[50px] flex-none cursor-pointer rounded-full transition-colors duration-500"
          style={{ background: "var(--chip)" }}
        >
          <div
            className="absolute top-1 left-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] [transition:transform_.45s_cubic-bezier(.4,1.25,.35,1),background-color_.4s_ease]"
            style={{
              background: dark ? "#e9eef1" : "#ffffff",
              color: dark ? "#0e1418" : "#10161a",
              boxShadow: dark ? "none" : "0 1px 4px rgba(0,0,0,.22)",
              transform: dark ? "translateX(22px)" : "none",
            }}
          >
            {dark ? "☾" : "☀"}
          </div>
        </button>
      </div>
    </div>
  );
}

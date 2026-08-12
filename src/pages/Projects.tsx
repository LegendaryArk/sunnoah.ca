import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useThemeMode";
import { PROJECTS, type ProjectCategory } from "../data/projects";
import { numberBullets, toKeyValues, toLinks } from "../lib/list";

type Filter = "all" | ProjectCategory;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "ALL" },
  { id: "robotics", label: "ROBOTICS" },
  { id: "embedded", label: "EMBEDDED" },
  { id: "software", label: "SOFTWARE" },
];

// How long the zoom-out takes before the overlay actually unmounts.
const CLOSE_MS = 260;

export default function Projects() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const openProject = (id: string) => {
    clearTimeout(closeTimer.current);
    setOpenId(id);
    setMounted(true);
    // Two rAFs so the closed (scale/opacity 0) styles commit to the DOM
    // before flipping to the open state — otherwise React can batch both
    // and the transition never plays.
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  };

  const closeProject = () => {
    setVisible(false);
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setMounted(false);
      setOpenId(null);
    }, CLOSE_MS);
  };

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  // Always land at the top of the projects grid, regardless of where the
  // page was scrolled to on whatever page linked here.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProject();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  const visibleProjects = PROJECTS.filter((p) => filter === "all" || p.cat === filter);
  const openProjectData = openId ? PROJECTS.find((p) => p.id === openId) : undefined;

  return (
    <div
      style={{ animation: "pageIn .55s cubic-bezier(.2,.7,.2,1) both" }}
      className="mx-auto max-w-[1140px] px-10 pt-16 pb-24"
    >
      <button
        type="button"
        onClick={() => navigate("/")}
        className="mb-[34px] inline-flex cursor-pointer items-center gap-2 font-mono text-[11px] tracking-[.1em] text-[var(--muted)]"
      >
        ← Back
      </button>

      <div className="mb-10 flex items-end justify-between gap-[30px]">
        <div>
          <div className="mb-3.5 font-mono text-[11px] tracking-[.18em] text-[var(--muted)]">
            ALL PROJECTS
          </div>
          <h1 className="m-0 mb-3 text-[52px] font-normal tracking-[-.042em]">
            Things I&rsquo;ve built
          </h1>
          <p className="m-0 max-w-[58ch] text-[16.5px] leading-[1.68] font-light text-[var(--muted)] [text-wrap:pretty]">
            Robotics, embedded firmware, and full-stack tooling. Filter by category, or click a
            card for the details.
          </p>
        </div>
        <div className="flex flex-none gap-1.5">
          {FILTERS.map((f) => {
            const active = f.id === filter;
            return (
              <FilterPill key={f.id} active={active} onClick={() => setFilter(f.id)}>
                {f.label}
              </FilterPill>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-[18px]">
        {visibleProjects.map((p, i) => (
          <div
            key={p.id}
            onClick={() => openProject(p.id)}
            data-reveal={i}
            data-tween="scale"
            className="h-full cursor-pointer overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)] opacity-0 [transition:opacity_.9s_cubic-bezier(.2,.7,.2,1),transform_.45s_cubic-bezier(.2,.7,.2,1),box-shadow_.3s_ease] hover:shadow-[0_16px_36px_var(--shadow)]"
            style={{ transform: "translateY(24px)" }}
          >
            <div className="relative flex h-[150px] items-end bg-[var(--slot)] p-3">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg,var(--stripe) 0 2px,transparent 2px 9px)",
                }}
              />
              <span className="relative font-mono text-[9px] text-[var(--muted)]">{p.slot}</span>
            </div>
            <div className="px-5 pt-[18px] pb-5">
              <div className="mb-[9px] flex items-baseline justify-between">
                <span className="font-mono text-[10px] tracking-[.13em] text-[var(--accent-text)]">
                  {p.kicker}
                </span>
                <span className="font-mono text-[10px] text-[var(--muted)]">{p.year}</span>
              </div>
              <div className="mb-2 text-lg font-medium tracking-[-.02em]">{p.name}</div>
              <p className="m-0 mb-3.5 text-[13px] leading-[1.6] font-light text-[var(--muted)]">
                {p.short}
              </p>
              <div className="font-mono text-[10px] tracking-[.1em] text-[var(--accent)]">
                VIEW DETAILS →
              </div>
            </div>
          </div>
        ))}
      </div>

      {mounted &&
        openProjectData &&
        createPortal(
          <div
            onClick={closeProject}
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-6 py-12 md:px-10"
            style={{
              background: "rgba(10,14,17,.6)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              opacity: visible ? 1 : 0,
              transition: "opacity 220ms ease",
            }}
          >
          <div
            onClick={(e) => e.stopPropagation()}
            className="my-auto w-full max-w-[900px] overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)] shadow-[0_24px_56px_var(--shadow)]"
            style={{
              transform: visible ? "scale(1)" : "scale(.94)",
              opacity: visible ? 1 : 0,
              transition: "transform 280ms cubic-bezier(.2,.7,.2,1), opacity 220ms ease",
            }}
          >
            <div className="flex items-center border-b border-[var(--line)]">
              <span className="px-[22px] py-[15px] font-mono text-[11px] tracking-[.12em] text-[var(--muted)]">
                {openProjectData.kicker}
              </span>
              <button
                type="button"
                onClick={closeProject}
                className="ml-auto cursor-pointer px-[22px] py-[15px] font-mono text-[11px] tracking-[.1em] text-[var(--accent)]"
              >
                CLOSE ✕
              </button>
            </div>
            <div className="px-[34px] pt-8 pb-9">
              <div className="grid grid-cols-[1fr_320px] gap-11">
                <div>
                  <h3 className="m-0 mb-2 text-[40px] font-normal tracking-[-.038em]">
                    {openProjectData.name}
                  </h3>
                  <div className="mb-6 font-mono text-[10.5px] tracking-[.13em] text-[var(--accent-text)]">
                    {openProjectData.meta}
                  </div>
                  <p className="m-0 mb-5 text-base leading-[1.75] font-light text-[var(--muted)] [text-wrap:pretty]">
                    {openProjectData.blurb}
                  </p>
                  <div className="grid gap-[13px]">
                    {numberBullets(openProjectData.bullets).map((b) => (
                      <div key={b.n} className="flex gap-3.5 text-[14.5px] leading-[1.6] font-light">
                        <span className="pt-[3px] font-mono text-[11px] text-[var(--accent)]">
                          {b.n}
                        </span>
                        {b.t}
                      </div>
                    ))}
                  </div>
                  <div className="mt-[30px] border-t border-[var(--line)] pt-6">
                    <div className="mb-[11px] font-mono text-[10.5px] tracking-[.14em] text-[var(--muted)]">
                      STACK
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {openProjectData.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-[7px] border border-[var(--line)] bg-[var(--chip)] px-3 py-[7px] font-mono text-[11.5px]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-7 border-t border-[var(--line)] pt-6">
                    <div className="mb-[11px] font-mono text-[10.5px] tracking-[.14em] text-[var(--muted)]">
                      RELATED LINKS
                    </div>
                    <div className="grid max-w-[460px] gap-[9px]">
                      {[
                        { label: "Read more", arrow: "→" },
                        ...toLinks(openProjectData.links),
                      ].map((l) => (
                        <span
                          key={l.label}
                          className="flex items-center justify-between rounded-[10px] border border-[var(--line)] px-4 py-3.5 text-sm transition-colors duration-250 ease-out hover:bg-[var(--chip)]"
                        >
                          {l.label}
                          <span className="font-mono text-xs text-[var(--accent)]">{l.arrow}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-[18px]">
                  <div className="relative flex h-[190px] items-end overflow-hidden rounded-xl bg-[var(--slot)] p-3">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(135deg,var(--stripe) 0 2px,transparent 2px 9px)",
                      }}
                    />
                    <span className="relative font-mono text-[9px] text-[var(--muted)]">
                      {openProjectData.slot}
                    </span>
                  </div>
                  <div className="relative flex aspect-[4/3] items-end overflow-hidden rounded-xl bg-[var(--slot)] p-3">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(135deg,var(--stripe) 0 2px,transparent 2px 9px)",
                      }}
                    />
                    <span className="relative font-mono text-[9px] text-[var(--muted)]">
                      [ SECOND SCREENSHOT ]
                    </span>
                  </div>
                  <div className="grid border-t border-[var(--line)]">
                    {toKeyValues(openProjectData.stats).map((s) => (
                      <div
                        key={s.k}
                        className="flex justify-between border-b border-[var(--line)]/80 py-[11px] font-mono text-[11px] text-[var(--muted)]"
                      >
                        <span>{s.k}</span>
                        <span className="text-[var(--text)]">{s.v}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate(`/projects/${openProjectData.id}`)}
                    className="flex cursor-pointer justify-between rounded-[9px] bg-[var(--accent)] px-4 py-3 text-[13px] font-medium text-white"
                  >
                    Read more<span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer rounded-full border border-[var(--line)] px-3.5 py-2 font-mono text-[10.5px] tracking-[.1em] transition-colors duration-300 ease-in-out"
      style={{
        background: active ? (dark ? "var(--accent)" : "#10161a") : "transparent",
        color: active ? (dark ? "#0e1418" : "#ffffff") : "var(--muted)",
      }}
    >
      {children}
    </button>
  );
}

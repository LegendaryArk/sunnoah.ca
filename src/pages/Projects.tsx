import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useThemeMode";
import { PROJECTS, type ProjectCategory } from "../data/projects";
import { numberBullets, toKeyValues } from "../lib/list";
import WipPill from "../components/WipPill";

type Filter = "all" | ProjectCategory;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "ALL" },
  { id: "robotics", label: "ROBOTICS" },
  { id: "embedded", label: "EMBEDDED" },
  { id: "software", label: "SOFTWARE" },
];

// How long the zoom-out takes before the overlay actually unmounts.
const CLOSE_MS = 260;
const LIGHTBOX_CLOSE_MS = 380;

export default function Projects() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const [lightboxData, setLightboxData] = useState<{
    imgs: string[];
    index: number;
    originRect: DOMRect;
  } | null>(null);
  const [lightboxMounted, setLightboxMounted] = useState(false);
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const lightboxCloseTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

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

  const openLightbox = (imgs: string[], index: number, originRect: DOMRect) => {
    clearTimeout(lightboxCloseTimer.current);
    setLightboxData({ imgs, index, originRect });
    setLightboxMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setLightboxVisible(true)));
  };

  const closeLightbox = () => {
    setLightboxVisible(false);
    clearTimeout(lightboxCloseTimer.current);
    lightboxCloseTimer.current = setTimeout(() => {
      setLightboxMounted(false);
      setLightboxData(null);
    }, LIGHTBOX_CLOSE_MS);
  };

  useEffect(() => {
    return () => {
      clearTimeout(closeTimer.current);
      clearTimeout(lightboxCloseTimer.current);
    };
  }, []);

  // Always land at the top of the projects grid, regardless of where the
  // page was scrolled to on whatever page linked here.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      // Escape closes whichever layer is on top first.
      if (lightboxMounted) closeLightbox();
      else closeProject();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, lightboxMounted]);

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
            key={`${filter}-${p.id}`}
            onClick={() => openProject(p.id)}
            data-reveal={i}
            data-tween="scale"
            className="h-full cursor-pointer overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)] opacity-0 hover:shadow-[0_16px_36px_var(--shadow)]"
            style={{
              transform: "translateY(24px)",
              transition:
                "opacity .9s cubic-bezier(.2,.7,.2,1), transform .45s cubic-bezier(.2,.7,.2,1), box-shadow .3s ease, background-color .5s ease, border-color .5s ease",
            }}
          >
            <div className="relative flex h-[150px] items-end bg-[var(--slot)] p-3">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg,var(--stripe) 0 2px,transparent 2px 9px)",
                }}
              >
                {p.imgs && p.imgs[0] && (
                  <img
                    src={p.imgs[0]}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                )}
              </div>
            </div>
            <div className="px-5 pt-[18px] pb-5">
              <div className="mb-[9px] flex items-baseline justify-between">
                <span className="font-mono text-[10px] tracking-[.13em] text-[var(--accent-text)]">
                  {p.kicker}
                </span>
                <span className="font-mono text-[10px] text-[var(--muted)]">{p.year}</span>
              </div>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-lg font-medium tracking-[-.02em]">{p.name}</span>
                {p.wip && <WipPill />}
              </div>
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
              transition:
                "transform 280ms cubic-bezier(.2,.7,.2,1), opacity 220ms ease, background-color .5s ease, border-color .5s ease",
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
                  <div className="mb-2 flex items-center gap-3">
                    <h3 className="m-0 text-[40px] font-normal tracking-[-.038em]">
                      {openProjectData.name}
                    </h3>
                    {openProjectData.wip && <WipPill />}
                  </div>
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
                    <ImageCarousel
                      key={openProjectData.id}
                      imgs={openProjectData.imgs}
                      onOpen={(index, rect) => openLightbox(openProjectData.imgs, index, rect)}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-[18px]">
                  
                  <div className="mb-[-8px] font-mono text-[10.5px] tracking-[.14em] text-[var(--muted)]">
                      STACK
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {openProjectData.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-[7px] border border-[var(--line)] bg-[var(--chip)] px-3 py-[7px] font-mono text-[11.5px] [transition:background-color_.5s_ease,border-color_.5s_ease]"
                        >
                          {s}
                        </span>
                      ))}
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
                  <div className="grid max-w-[460px] gap-[9px]">
                    <div className="mb-[4px] font-mono text-[10.5px] tracking-[.14em] text-[var(--muted)]">
                      RELATED LINKS
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate(`/projects/${openProjectData.id}`)}
                      className="flex cursor-pointer items-center justify-between rounded-[10px] bg-[var(--accent)] px-4 py-3.5 text-left text-sm font-medium text-white [transition:background-color_.5s_ease]"
                    >
                      Read more
                      <span className="font-mono text-xs">→</span>
                    </button>
                    {openProjectData.links.map(([label, link]) => (
                      <a
                        key={label}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-[10px] border border-[var(--line)] px-4 py-3.5 text-sm transition-colors duration-250 ease-out hover:bg-[var(--chip)]"
                      >
                        {label}
                        <span className="font-mono text-xs text-[var(--accent)]">↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>,
          document.body,
        )}

      {lightboxMounted &&
        lightboxData &&
        createPortal(
          <Lightbox
            imgs={lightboxData.imgs}
            startIndex={lightboxData.index}
            originRect={lightboxData.originRect}
            visible={lightboxVisible}
            onClose={closeLightbox}
          />,
          document.body,
        )}
    </div>
  );
}

function ImageSlides({
  imgs,
  index,
  imgClassName = "object-cover",
  onImageClick,
}: {
  imgs: string[];
  index: number;
  imgClassName?: string;
  onImageClick?: (index: number, rect: DOMRect) => void;
}) {
  return (
    <div
      className="flex h-full"
      style={{
        transform: `translateX(-${index * 100}%)`,
        transition: "transform 460ms cubic-bezier(.2,.7,.2,1)",
      }}
    >
      {imgs.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          loading="lazy"
          onClick={
            onImageClick
              ? (e) => onImageClick(i, (e.currentTarget as HTMLImageElement).getBoundingClientRect())
              : undefined
          }
          className={`h-full w-full shrink-0 ${imgClassName} ${onImageClick ? "cursor-zoom-in" : ""}`}
        />
      ))}
    </div>
  );
}

function CarouselNav({
  imgs,
  index,
  onPrev,
  onNext,
  onDot,
  size = "sm",
}: {
  imgs: string[];
  index: number;
  onPrev: () => void;
  onNext: () => void;
  onDot: (i: number) => void;
  size?: "sm" | "lg";
}) {
  const btnSize = size === "lg" ? "h-11 w-11 text-lg" : "h-8 w-8";
  return (
    <>
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous image"
        className={`absolute top-1/2 left-2 z-10 grid -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 ${btnSize}`}
      >
        ‹
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Next image"
        className={`absolute top-1/2 right-2 z-10 grid -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 ${btnSize}`}
      >
        ›
      </button>
      <div className="absolute bottom-2.5 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {imgs.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => onDot(i)}
            aria-label={`Go to image ${i + 1}`}
            className="h-1.5 w-1.5 cursor-pointer rounded-full transition-[background-color]"
            style={{ background: i === index ? "#fff" : "rgba(255,255,255,.4)" }}
          />
        ))}
      </div>
    </>
  );
}

function ImageCarousel({
  imgs,
  onOpen,
}: {
  imgs: string[];
  onOpen: (index: number, rect: DOMRect) => void;
}) {
  const [index, setIndex] = useState(0);
  const hasImages = imgs.length > 0;
  const multi = imgs.length > 1;

  const prev = () => setIndex((i) => (i - 1 + imgs.length) % imgs.length);
  const next = () => setIndex((i) => (i + 1) % imgs.length);

  return (
    <div className="relative flex aspect-[4/3] items-end overflow-hidden rounded-xl bg-[var(--slot)] p-3">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg,var(--stripe) 0 2px,transparent 2px 9px)",
        }}
      />

      {hasImages && (
        <div className="absolute inset-0">
          <ImageSlides imgs={imgs} index={index} onImageClick={onOpen} />
        </div>
      )}

      {multi && <CarouselNav imgs={imgs} index={index} onPrev={prev} onNext={next} onDot={setIndex} />}
    </div>
  );
}

function Lightbox({
  imgs,
  startIndex,
  originRect,
  visible,
  onClose,
}: {
  imgs: string[];
  startIndex: number;
  originRect: DOMRect;
  visible: boolean;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);
  const multi = imgs.length > 1;

  const prev = () => setCurrent((i) => (i - 1 + imgs.length) % imgs.length);
  const next = () => setCurrent((i) => (i + 1) % imgs.length);

  useEffect(() => {
    if (!multi) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multi, imgs.length]);

  // The viewer box is centered in the viewport at a fixed size; the closed
  // (thumbnail) state is derived analytically from that box vs. the
  // clicked image's rect, so no ref measurement / layout effect is needed —
  // it's a pure FLIP transform driven by the `visible` flag.
  const targetW = Math.min(window.innerWidth * 0.9, 1200);
  const targetH = Math.min(window.innerHeight * 0.82, 820);
  const originCx = originRect.left + originRect.width / 2;
  const originCy = originRect.top + originRect.height / 2;
  const viewportCx = window.innerWidth / 2;
  const viewportCy = window.innerHeight / 2;
  const scaleX = originRect.width / targetW;
  const scaleY = originRect.height / targetH;
  const dx = originCx - viewportCx;
  const dy = originCy - viewportCy;
  const closedTransform = `translate(${dx}px, ${dy}px) scale(${scaleX}, ${scaleY})`;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[70] flex items-center justify-center"
      style={{
        background: "rgba(6,9,11,.82)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        opacity: visible ? 1 : 0,
        transition: "opacity 260ms ease",
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-6 z-10 cursor-pointer font-mono text-[13px] tracking-[.1em] text-white/80 transition-colors hover:text-white"
      >
        CLOSE ✕
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative overflow-hidden rounded-xl bg-black"
        style={{
          width: targetW,
          height: targetH,
          transform: visible ? "translate(0,0) scale(1,1)" : closedTransform,
          opacity: visible ? 1 : 0.5,
          transition: "transform 400ms cubic-bezier(.2,.7,.2,1), opacity 300ms ease",
        }}
      >
        <ImageSlides imgs={imgs} index={current} imgClassName="object-contain" />
        {multi && (
          <CarouselNav imgs={imgs} index={current} onPrev={prev} onNext={next} onDot={setCurrent} size="lg" />
        )}
      </div>
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

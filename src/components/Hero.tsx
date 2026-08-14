import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSectionJump } from "../hooks/useSectionJump";
import { CONTACT_LINKS, LOCATION } from "../data/profile";

export default function Hero() {
  const navigate = useNavigate();
  const jump = useSectionJump();
  const movesRef = useRef<HTMLSpanElement>(null);

  // While the intro is about to play, this terminal stays hidden — the
  // loading screen's own terminal card docks into this exact spot and
  // reveals it the instant its zoom finishes, so there's never a frame
  // with both terminals visible at once.
  const introPending = !sessionStorage.getItem("intro-played");

  // A CSS transition can't pick up where a :hover-triggered animation left
  // off — per spec its "before" value ignores the animation's contribution,
  // so removing the animation just snaps to rest instead of easing there.
  // Capturing the live transform and transitioning from that explicit value
  // sidesteps it.
  const startDrift = () => {
    const el = movesRef.current;
    if (!el) return;
    el.style.transition = "none";
    el.style.animation = "drift .8s ease-in-out infinite";
  };

  const stopDrift = () => {
    const el = movesRef.current;
    if (!el) return;
    const current = getComputedStyle(el).transform;
    el.style.animation = "none";
    el.style.transform = current === "none" ? "translateX(0)" : current;
    void el.offsetWidth;
    el.style.transition = "transform .3s ease";
    el.style.transform = "translateX(0)";
  };

  return (
    <div
      id="sec-top"
      data-vanish="1"
      className="relative overflow-hidden pt-[104px] pb-24 min-h-[78vh]"
    >
      <div
        data-par="0.16"
        className="pointer-events-none absolute -inset-[18%] bg-[length:64px_64px]"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px)",
          maskImage: "radial-gradient(ellipse 62% 58% at 28% 22%,#000,transparent)",
        }}
      />

      <div className="relative mx-auto max-w-[1140px] px-10">
        <div
          data-reveal="0"
          className="mb-[34px] flex items-center gap-4 opacity-0 [transition:opacity_.9s_cubic-bezier(.2,.7,.2,1),transform_.9s_cubic-bezier(.2,.7,.2,1)]"
          style={{ transform: "translateY(20px)" }}
        >
          <div
            className="inline-flex items-center gap-[9px] rounded-full bg-[var(--accent-soft)] px-[13px] py-[6px] font-mono text-[10.5px] font-medium tracking-[.11em] text-[var(--accent-text)]"
            style={{ transition: "background-color .5s ease, color .5s ease" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] [animation:pulse_2.4s_ease-in-out_infinite]" />
            OPEN TO SUMMER 2027 INTERNSHIPS
          </div>
          <div className="font-mono text-[10.5px] tracking-[.14em] text-[var(--muted)]">
            {LOCATION}
          </div>
        </div>

        <h1
          data-reveal="1"
          data-tween="scale"
          className="m-0 max-w-[17ch] text-[96px] leading-[0.99] font-normal tracking-[-.048em] opacity-0 [transition:opacity_.95s_cubic-bezier(.2,.7,.2,1),transform_.95s_cubic-bezier(.2,.7,.2,1)]"
          style={{ transform: "translateY(22px)" }}
        >
          Noah Sun
        </h1>

        <p
          data-reveal="2"
          className="m-0 mt-5 max-w-[42ch] text-[30px] leading-[1.5] font-light text-[var(--muted)] opacity-0 [transition:opacity_.9s_ease,transform_.9s_ease] [text-wrap:pretty]"
          style={{ transform: "translateY(20px)" }}
        >
          Building software: some of it ships,{" "}
          <span className="text-[var(--accent)]">
            some of it{" "}
            <span
              ref={movesRef}
              onMouseEnter={startDrift}
              onMouseLeave={stopDrift}
              onTransitionEnd={() => {
                const el = movesRef.current;
                if (el) {
                  el.style.transition = "";
                  el.style.transform = "";
                }
              }}
              className="inline-block [will-change:transform]"
            >
              moves
            </span>
          </span>
          .
        </p>

        <div
          data-reveal="3"
          className="mt-14 grid grid-cols-[1fr_300px] gap-11 border-t border-[var(--line)] pt-7 opacity-0 [transition:opacity_.9s_ease,transform_.9s_ease]"
          style={{ transform: "translateY(20px)" }}
        >
          <div
            id="hero-terminal"
            style={introPending ? { opacity: 0 } : undefined}
            className="overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--panel)] [transition:background-color_.5s_ease,border-color_.5s_ease]"
          >
            <div className="flex items-center gap-[7px] border-b border-[var(--line)] px-4 py-[10px] [transition:border-color_.5s_ease]">
              <span className="h-[9px] w-[9px] rounded-full bg-[var(--line)]" />
              <span className="h-[9px] w-[9px] rounded-full bg-[var(--line)]" />
              <span className="h-[9px] w-[9px] rounded-full bg-[var(--line)]" />
              <span className="ml-2 font-mono text-[10.5px] tracking-[.08em] text-[var(--muted)]">
                status.sh
              </span>
            </div>
            <div className="px-5 py-[18px] font-mono text-[13px] leading-[1.9]">
              <div className="text-[var(--muted)]">
                <span className="text-[var(--accent)]">noah@waterloo</span>:~$ whoami --now
              </div>
              <div>→ Mechatronics Engineering &rsquo;30, University of Waterloo</div>
              <div>→ Full Stack Software Engineer, Thames Valley Financial Inc.</div>
              <div>→ Embedded Flight Software Developer, Waterloo Aerial Robotics Group</div>
              <div className="mt-3 text-[var(--muted)]">
                <span className="text-[var(--accent)]">noah@waterloo</span>:~$ whoami --before
              </div>
              <div>→ Forward Deployed Engineer, Ascendance Foundry</div>
              <div>→ 5× VEX Robotics World Championship, team captain & programming lead</div>
              <div>→ Flutter app used by 3,500+ competitors, Elapse</div>
              <div className="mt-3 flex items-center gap-1.5 text-[var(--muted)]">
                <span className="text-[var(--accent)]">noah@waterloo</span>:~$
                <span className="inline-block h-[13px] w-[7px] bg-[var(--muted)] [animation:pulse_1.1s_step-end_infinite]" />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-[10px]">
            <button
              type="button"
              onClick={() => navigate("/projects")}
              className="flex cursor-pointer justify-between rounded-[9px] bg-[var(--accent)] px-5 py-[13px] text-[13.5px] font-medium text-white [transition:transform_.25s_ease-out,background-color_.5s_ease] hover:-translate-y-0.5"
            >
              Browse projects<span>→</span>
            </button>
            <button
              type="button"
              onClick={() => jump("resume")}
              className="flex cursor-pointer justify-between rounded-[9px] border border-[var(--line)] bg-[var(--panel)] px-5 py-[13px] text-[13.5px] font-medium [transition:transform_.25s_ease-out,background-color_.5s_ease,border-color_.5s_ease] hover:-translate-y-0.5"
            >
              Résumé<span>↓</span>
            </button>

            <div className="mt-5 border-t border-[var(--line)] pt-4">
              <div className="mb-1.5 font-mono text-[10px] tracking-[.14em] text-[var(--muted)]">
                CONNECT WITH ME
              </div>
              {CONTACT_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex cursor-pointer justify-between border-b border-[var(--line)] py-[9px] text-[12.5px] [transition:border-color_.5s_ease] last:border-b-0"
                >
                  {link.label}
                  <span className="text-[var(--accent)]">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

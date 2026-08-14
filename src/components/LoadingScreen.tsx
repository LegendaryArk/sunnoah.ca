import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface Step {
  user: string;
  accentUser: boolean;
  command: string;
  output: string[];
  /** Simulates the command clearing the screen once it "runs" (e.g. a
   * script taking over) — every step before it is wiped, and the title bar
   * switches to `titleAfter`, exactly like a real terminal retitles itself
   * to the running process. */
  clearsAfter?: boolean;
  titleAfter?: string;
  /** Extra pause (ms), on top of the normal per-line stagger, after a given
   * output line index reveals — e.g. a beat after "Authenticating...". */
  extraPause?: Record<number, number>;
}

// The final two commands mirror Hero.tsx's status.sh terminal exactly, so
// once the "./status.sh" step clears the ssh preamble, this card's content
// is pixel-identical to the real one — same size, same lines, no reflow.
const STEPS: Step[] = [
  {
    user: "you@local",
    accentUser: false,
    command: "ssh noah@waterloo",
    output: ["→ Connecting...", "→ Authenticating...", "→ Welcome, noah."],
    extraPause: { 0: 400, 1: 600 },
  },
  {
    user: "noah@waterloo",
    accentUser: true,
    command: "./status.sh",
    output: [],
    clearsAfter: true,
    titleAfter: "status.sh",
  },
  {
    user: "noah@waterloo",
    accentUser: true,
    command: "whoami --now",
    output: [
      "→ Mechatronics Engineering ’30, University of Waterloo",
      "→ Full Stack Software Engineer, Thames Valley Financial Inc.",
      "→ Embedded Flight Software Developer, Waterloo Aerial Robotics Group",
    ],
  },
  {
    user: "noah@waterloo",
    accentUser: true,
    command: "whoami --before",
    output: [
      "→ Forward Deployed Engineer, Ascendance Foundry",
      "→ 5× VEX Robotics World Championship, team captain & programming lead",
      "→ Flutter app used by 3,500+ competitors, Elapse",
    ],
  },
];

const CLEAR_INDEX = STEPS.findIndex((s) => s.clearsAfter);
const FINAL_SCREEN_START = CLEAR_INDEX >= 0 ? CLEAR_INDEX + 1 : 0;
const FINAL_TITLE = (CLEAR_INDEX >= 0 && STEPS[CLEAR_INDEX].titleAfter) || "status.sh";
const DEFAULT_TITLE = "ssh";
const IDLE_SCALE = 1.12;
const FALLBACK_WIDTH = 640;

const TYPE_MS = 28;
const OUTPUT_STEP_MS = 300;
const RUN_PAUSE_MS = 380;

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function PromptLine({ step, command, cursor }: { step: Step; command: string; cursor?: boolean }) {
  return (
    <div className="text-[var(--muted)]">
      {step.accentUser ? (
        <span className="text-[var(--accent)]">{step.user}</span>
      ) : (
        step.user
      )}
      :~$ {command}
      {cursor && (
        <span className="ml-0.5 inline-block h-[13px] w-[7px] bg-[var(--muted)] align-middle [animation:pulse_1.1s_step-end_infinite]" />
      )}
    </div>
  );
}

export default function LoadingScreen() {
  const [active, setActive] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem("intro-played");
  });
  const [zooming, setZooming] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [screenStart, setScreenStart] = useState(0);
  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [typed, setTyped] = useState("");
  const [outputCount, setOutputCount] = useState(0);
  const [cardWidth, setCardWidth] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const zoomStarted = useRef(false);

  // Match the real Hero terminal's width up front (offsetWidth, so it's
  // unaffected by that element's own entrance transform) — otherwise this
  // card wraps its lines differently than the real one, and the docking
  // animation has to stretch x and y by different amounts to reconcile the
  // mismatch, visibly distorting the text mid-zoom.
  useLayoutEffect(() => {
    if (!active) return;
    const target = document.getElementById("hero-terminal");
    if (target) setCardWidth(target.offsetWidth);
  }, [active]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const runZoom = () => {
    if (zoomStarted.current) return;
    zoomStarted.current = true;
    clearTimers();
    setZooming(true);
  };

  // Drives the whole sequence: type each step's command, step its output
  // lines in (or, for a screen-clearing step, just pause as if it's
  // running), pause, move to the next step, and once every step is done
  // hold on the final blinking prompt before handing off to the zoom.
  useEffect(() => {
    if (!active) return;

    if (reducedMotion()) {
      setScreenStart(FINAL_SCREEN_START);
      setTitle(FINAL_TITLE);
      setStepIndex(STEPS.length);
      const t = window.setTimeout(runZoom, 200);
      timers.current.push(t);
      return () => clearTimers();
    }

    let cancelled = false;

    const typeCommand = (step: Step, onDone: () => void) => {
      let i = 0;
      const next = () => {
        if (cancelled) return;
        i += 1;
        setTyped(step.command.slice(0, i));
        if (i < step.command.length) {
          timers.current.push(window.setTimeout(next, TYPE_MS));
        } else {
          timers.current.push(window.setTimeout(onDone, 260));
        }
      };
      timers.current.push(window.setTimeout(next, TYPE_MS));
    };

    const revealOutput = (step: Step, onDone: () => void) => {
      let n = 0;
      const next = () => {
        if (cancelled) return;
        n += 1;
        setOutputCount(n);
        const extra = step.extraPause?.[n - 1] ?? 0;
        if (n < step.output.length) {
          timers.current.push(window.setTimeout(next, OUTPUT_STEP_MS + extra));
        } else {
          timers.current.push(window.setTimeout(onDone, 380 + extra));
        }
      };
      timers.current.push(window.setTimeout(next, OUTPUT_STEP_MS));
    };

    const runStep = (idx: number) => {
      if (cancelled) return;
      if (idx >= STEPS.length) {
        setStepIndex(STEPS.length);
        timers.current.push(window.setTimeout(runZoom, 550));
        return;
      }
      const step = STEPS[idx];
      setStepIndex(idx);
      setTyped("");
      setOutputCount(0);
      typeCommand(step, () => {
        if (step.output.length === 0) {
          timers.current.push(
            window.setTimeout(() => {
              if (step.clearsAfter) {
                setScreenStart(idx + 1);
                if (step.titleAfter) setTitle(step.titleAfter);
              }
              runStep(idx + 1);
            }, RUN_PAUSE_MS),
          );
        } else {
          revealOutput(step, () => runStep(idx + 1));
        }
      });
    };

    const start = window.setTimeout(() => runStep(0), 220);
    timers.current.push(start);

    return () => {
      cancelled = true;
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // Zoom the loading card onto the real Hero terminal's position, fading
  // the backdrop concurrently so the already-rendered page shows through.
  // The card's own width already matches the real terminal's, and the idle
  // look is a uniform scale-up (IDLE_SCALE, same factor on both axes), so
  // the zoom back down to 1x is also uniform — no x/y stretch.
  useEffect(() => {
    if (!zooming) return;

    const card = cardRef.current;
    const finish = () => {
      sessionStorage.setItem("intro-played", "1");
      // Reveal the real terminal in the same tick the overlay unmounts —
      // no fade, so the swap is a single clean cut, not a second reveal
      // stacked on top of this card disappearing.
      const target = document.getElementById("hero-terminal");
      if (target) target.style.opacity = "1";
      setActive(false);
    };

    if (!card) {
      finish();
      return;
    }

    const backdrop = backdropRef.current;

    if (reducedMotion()) {
      if (backdrop) {
        backdrop.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 200,
          easing: "ease",
          fill: "forwards",
        });
      }
      const t = window.setTimeout(finish, 220);
      timers.current.push(t);
      return () => window.clearTimeout(t);
    }

    const from = card.getBoundingClientRect();
    const target = document.getElementById("hero-terminal");
    const to = target?.getBoundingClientRect();
    // WAAPI transform keyframes are absolute, relative to the element's own
    // natural (untransformed) box — not cumulative with the idle scale
    // already showing. So the landing scale has to be figured against that
    // natural width, not against `from`, which is the box as currently
    // rendered (i.e. already inflated by IDLE_SCALE).
    const naturalWidth = cardWidth ?? FALLBACK_WIDTH;

    let keyframes: Keyframe[];
    if (to && to.width > 0) {
      const finalScale = to.width / naturalWidth;
      const dx = to.left + to.width / 2 - (from.left + from.width / 2);
      const dy = to.top + to.height / 2 - (from.top + from.height / 2);
      keyframes = [
        { transform: `scale(${IDLE_SCALE})` },
        { transform: `translate(${dx}px,${dy}px) scale(${finalScale})` },
      ];
    } else {
      keyframes = [{ transform: `scale(${IDLE_SCALE})` }, { transform: "scale(1)" }];
    }

    const cardAnim = card.animate(keyframes, {
      duration: 800,
      easing: "cubic-bezier(.22,1.04,.32,1)",
      fill: "forwards",
    });

    if (backdrop) {
      backdrop.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 650,
        easing: "ease",
        fill: "forwards",
      });
    }

    cardAnim.finished.then(finish, finish);
  }, [zooming, cardWidth]);

  useEffect(() => {
    if (!active) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

  useEffect(() => {
    if (!active || zooming) return;

    // A skip jumps straight to the final, fully-typed state before zooming,
    // so the dock-and-replace at the end still lands on matching content.
    const skip = () => {
      setScreenStart(FINAL_SCREEN_START);
      setTitle(FINAL_TITLE);
      setStepIndex(STEPS.length);
      setTyped("");
      setOutputCount(0);
      runZoom();
    };

    window.addEventListener("click", skip);
    window.addEventListener("keydown", skip);
    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("touchstart", skip, { passive: true });
    return () => {
      window.removeEventListener("click", skip);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchstart", skip);
    };
  }, [active, zooming]);

  if (!active) return null;

  const currentStep = stepIndex < STEPS.length ? STEPS[stepIndex] : null;
  const currentTypingDone = currentStep ? typed.length === currentStep.command.length : false;

  return (
    <div aria-hidden="true" className="fixed inset-0 z-[100] flex items-center justify-center">
      <div ref={backdropRef} className="absolute inset-0 bg-[var(--bg)]" />
      <div
        ref={cardRef}
        style={{
          width: `${cardWidth ?? FALLBACK_WIDTH}px`,
          transform: `scale(${IDLE_SCALE})`,
        }}
        className="relative max-w-[88vw] overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--panel)]"
      >
        <div className="flex items-center gap-[7px] border-b border-[var(--line)] px-4 py-[10px]">
          <span className="h-[9px] w-[9px] rounded-full bg-[var(--line)]" />
          <span className="h-[9px] w-[9px] rounded-full bg-[var(--line)]" />
          <span className="h-[9px] w-[9px] rounded-full bg-[var(--line)]" />
          <span className="ml-2 font-mono text-[10.5px] tracking-[.08em] text-[var(--muted)]">
            {title}
          </span>
        </div>
        <div className="px-5 py-[18px] font-mono text-[13px] leading-[1.9]">
          {STEPS.slice(screenStart, stepIndex).map((step, i) => (
            <div key={step.command} className={i > 0 ? "mt-3" : undefined}>
              <PromptLine step={step} command={step.command} />
              {step.output.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
          ))}

          {currentStep && (
            <div className={stepIndex > screenStart ? "mt-3" : undefined}>
              <PromptLine
                step={currentStep}
                command={typed}
                cursor={currentTypingDone && outputCount === 0}
              />
              {currentStep.output.slice(0, outputCount).map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
          )}

          {!currentStep && (
            <div className="mt-3 flex items-center gap-1.5 text-[var(--muted)]">
              <span className="text-[var(--accent)]">noah@waterloo</span>:~$
              <span className="inline-block h-[13px] w-[7px] bg-[var(--muted)] [animation:pulse_1.1s_step-end_infinite]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

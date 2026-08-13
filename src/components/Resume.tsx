import { useEffect, useRef, useState } from "react";
import { useTheme } from "../hooks/useThemeMode";
import { RESUMES } from "../data/resumes";

export default function Resume() {
  const { theme } = useTheme();
  const [resumeId, setResumeId] = useState(RESUMES[0].id);
  const [resumeReady, setResumeReady] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);

  const resume = RESUMES.find((r) => r.id === resumeId) ?? RESUMES[0];
  const dark = theme === "dark";

  // PDF iframes grab focus and drag the page down to this section on load,
  // so the src stays about:blank until the section scrolls into view.
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            timeoutId = setTimeout(() => setResumeReady(true), 400);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div id="sec-resume" className="mx-auto max-w-[1140px] px-10 pt-[88px] pb-24">
      <div
        data-reveal="0"
        className="mb-[30px] flex items-end justify-between gap-[30px] opacity-0 [transition:opacity_.9s_ease,transform_.9s_ease]"
        style={{ transform: "translateY(20px)" }}
      >
        <div>
          <div className="mb-3.5 font-mono text-[11px] tracking-[.18em] text-[var(--muted)]">
            04 — RÉSUMÉ
          </div>
          <h2 className="m-0 mb-3 text-[40px] font-normal tracking-[-.038em]">Two résumés</h2>
          <p className="m-0 max-w-[56ch] text-base leading-[1.7] font-light text-[var(--muted)] [text-wrap:pretty]">
            Same background, different emphasis. Pick the one that matches the role you&rsquo;re
            hiring for.
          </p>
        </div>
        <div className="flex flex-none gap-1.5">
          {RESUMES.map((r) => {
            const active = r.id === resumeId;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setResumeId(r.id)}
                className="cursor-pointer rounded-full border border-[var(--line)] px-4 py-[9px] font-mono text-[10.5px] tracking-[.1em] transition-colors duration-[.35s] ease-in-out"
                style={{
                  background: active ? (dark ? "var(--accent)" : "#10161a") : "transparent",
                  color: active ? (dark ? "#0e1418" : "#ffffff") : "var(--muted)",
                }}
              >
                {r.tab}
              </button>
            );
          })}
        </div>
      </div>

      <div
        ref={hostRef}
        data-reveal="1"
        className="grid grid-cols-[1fr_300px] items-start gap-6 opacity-0 [transition:opacity_.9s_ease,transform_.9s_ease]"
        style={{ transform: "translateY(22px)" }}
      >
        <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)] shadow-[0_10px_34px_var(--shadow)] [transition:background-color_.5s_ease,border-color_.5s_ease]">
          <div className="flex items-center justify-between border-b border-[var(--line)] px-[18px] py-[13px] font-mono text-[10.5px] tracking-[.12em] text-[var(--muted)]">
            <span>{resume.file}</span>
            <span>UPDATED AUG 2026</span>
          </div>
          <iframe
            src={resumeReady ? `${resume.src}#navpanes=0` : "about:blank"}
            title="Résumé preview"
            tabIndex={-1}
            loading="lazy"
            className="block h-[760px] w-full border-0 bg-[var(--chip)] [transition:background-color_.5s_ease]"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] px-[26px] py-6 [transition:background-color_.5s_ease,border-color_.5s_ease]">
            <div className="mb-2 text-[19px] font-medium tracking-[-.02em]">{resume.title}</div>
            <p className="m-0 mb-[18px] text-sm leading-[1.65] font-light text-[var(--muted)]">
              {resume.note}
            </p>
            <div className="mb-[18px] grid border-t border-[var(--line)]">
              {resume.highlights.map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between gap-3.5 border-b border-[var(--line)]/80 py-[10px] font-mono text-[11px] text-[var(--muted)]"
                >
                  <span>{k}</span>
                  <span className="text-right text-[var(--text)]">{v}</span>
                </div>
              ))}
            </div>
            <a
              href={resume.src}
              download={resume.file}
              className="flex justify-between rounded-[9px] bg-[var(--accent)] px-4 py-3 text-[13px] font-medium text-white [transition:background-color_.5s_ease]"
            >
              Download PDF<span>↓</span>
            </a>
            <a
              href={resume.src}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-[9px] flex justify-between rounded-[9px] border border-[var(--line)] px-4 py-3 text-[13px] font-medium [transition:border-color_.5s_ease]"
            >
              Open in new tab<span>↗</span>
            </a>
          </div>
          <div className="px-1 font-mono text-[10.5px] leading-[1.7] text-[var(--muted)]">
            If the preview doesn&rsquo;t render in your browser, use &ldquo;Open in new
            tab&rdquo;.
          </div>
        </div>
      </div>
    </div>
  );
}

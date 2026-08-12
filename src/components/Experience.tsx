import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useThemeMode";
import { EXPERIENCES } from "../data/experience";
import { numberBullets, toKeyValues } from "../lib/list";

export default function Experience() {
  const { theme } = useTheme();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div id="sec-experience" className="mx-auto max-w-[1140px] px-10 pb-24">
      <div
        data-reveal="0"
        className="mb-[30px] opacity-0 [transition:opacity_.9s_ease,transform_.9s_ease]"
        style={{ transform: "translateY(20px)" }}
      >
        <div className="mb-3.5 font-mono text-[11px] tracking-[.18em] text-[var(--muted)]">
          01 — EXPERIENCE
        </div>
        <h2 className="m-0 mb-3 text-[40px] font-normal tracking-[-.038em]">Where I&rsquo;ve worked</h2>
        <p className="m-0 max-w-[62ch] text-base leading-[1.7] font-light text-[var(--muted)] [text-wrap:pretty]">
          Flight software, AI deployment, mobile, and competitive robotics. Open a row for the
          detail, or read the full write-up.
        </p>
      </div>

      {EXPERIENCES.map((e, i) => {
        const isOpen = openId === e.id;
        return (
          <div
            key={e.id}
            data-reveal={i}
            data-tween="left"
            className="border-t border-[var(--line)] opacity-0 [transition:opacity_.9s_cubic-bezier(.2,.7,.2,1),transform_.9s_cubic-bezier(.2,.7,.2,1),background_.35s_ease]"
            style={{
              transform: "translateY(22px)",
              background: isOpen
                ? theme === "dark"
                  ? "rgba(233,238,241,.035)"
                  : "rgba(16,22,26,.022)"
                : "transparent",
            }}
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : e.id)}
              className="grid w-full cursor-pointer grid-cols-[150px_1fr_230px_40px] items-baseline gap-[22px] px-3.5 py-[26px] text-left"
            >
              <span className="font-mono text-[11px] text-[var(--muted)]">{e.period}</span>
              <span className="text-[21px] font-medium tracking-[-.022em]">{e.role}</span>
              <span className="text-[13.5px] font-light text-[var(--muted)]">{e.org}</span>
              <span
                className="inline-flex h-4 w-4 items-center justify-center self-center justify-self-end font-mono text-base transition-transform duration-[.38s] ease-[cubic-bezier(.4,1.3,.4,1)]"
                style={{
                  color: isOpen ? "var(--accent)" : "var(--muted)",
                  transform: isOpen ? "rotate(90deg)" : "none",
                }}
              >
                &gt;
              </span>
            </button>

            {/* CSS-grid row collapse: height animates continuously alongside the
                fade instead of snapping at the end of a fixed-duration close. */}
            <div
              className="grid transition-[grid-template-rows] duration-[350ms] ease-[cubic-bezier(.2,.7,.2,1)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div
                  className="px-3.5 pb-[34px] transition-opacity ease-out"
                  style={{
                    opacity: isOpen ? 1 : 0,
                    transitionDuration: isOpen ? "250ms" : "150ms",
                    transitionDelay: isOpen ? "100ms" : "0ms",
                  }}
                >
                  <div className="grid grid-cols-[1fr_320px] gap-11">
                    <div>
                      <p className="m-0 mb-[22px] text-base leading-[1.75] font-light text-[var(--muted)] [text-wrap:pretty]">
                        {e.blurb}
                      </p>
                      <div className="grid gap-3.5">
                        {numberBullets(e.bullets).map((b) => (
                          <div key={b.n} className="flex gap-3.5 text-[14.5px] leading-[1.65] font-light">
                            <span className="pt-[3px] font-mono text-[11px] text-[var(--accent)]">
                              {b.n}
                            </span>
                            {b.t}
                          </div>
                        ))}
                      </div>
                      <div className="mt-[26px] border-t border-[var(--line)] pt-[22px]">
                        <div className="mb-[11px] font-mono text-[10.5px] tracking-[.14em] text-[var(--muted)]">
                          STACK
                        </div>
                        <div className="flex flex-wrap gap-[7px]">
                          {e.stack.map((s) => (
                            <span
                              key={s}
                              className="rounded-[7px] border border-[var(--line)] bg-[var(--chip)] px-[11px] py-[6px] font-mono text-[11.5px]"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="relative flex h-[170px] items-end overflow-hidden rounded-xl bg-[var(--slot)] p-3">
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(135deg,var(--stripe) 0 2px,transparent 2px 9px)",
                          }}
                        />
                        <span className="relative font-mono text-[9px] text-[var(--muted)]">
                          {e.slot}
                        </span>
                      </div>
                      <div className="grid border-t border-[var(--line)]">
                        {toKeyValues(e.stats).map((s) => (
                          <div
                            key={s.k}
                            className="flex justify-between border-b border-[var(--line)]/80 py-[11px] font-mono text-[11px] text-[var(--muted)]"
                          >
                            <span>{s.k}</span>
                            <span className="text-[var(--text)]">{s.v}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Link
                          to={`/experience/${e.id}`}
                          className="rounded-lg bg-[var(--accent)] px-[15px] py-[10px] text-[12.5px] font-medium text-white"
                        >
                          Full write-up →
                        </Link>
                        {e.links.map(([label]) => (
                          <span
                            key={label}
                            className="cursor-pointer rounded-lg border border-[var(--line)] px-[15px] py-[10px] text-[12.5px] font-medium transition-transform duration-200 ease-out hover:-translate-y-0.5"
                          >
                            {label} ↗
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="border-t border-[var(--line)]" />
    </div>
  );
}

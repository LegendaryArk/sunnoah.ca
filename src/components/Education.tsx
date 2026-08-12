import { COURSES, EDUCATION } from "../data/awards";

export default function Education() {
  return (
    <div id="sec-education" className="mx-auto max-w-[1140px] px-10 pt-[88px] pb-24">
      <div
        data-reveal="0"
        className="mb-8 opacity-0 [transition:opacity_.9s_ease,transform_.9s_ease]"
        style={{ transform: "translateY(20px)" }}
      >
        <div className="mb-3.5 font-mono text-[11px] tracking-[.18em] text-[var(--muted)]">
          03 — EDUCATION
        </div>
        <h2 className="m-0 text-[40px] font-normal tracking-[-.038em]">Study</h2>
      </div>

      <div
        data-reveal="1"
        className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] px-[34px] py-8 opacity-0 shadow-[0_10px_34px_var(--shadow)] [transition:opacity_.9s_ease,transform_.9s_ease]"
        style={{ transform: "translateY(22px)" }}
      >
        <div className="grid grid-cols-[1fr_240px] items-start gap-10">
          <div>
            <div className="mb-3 font-mono text-[11px] tracking-[.12em] text-[var(--muted)]">
              {EDUCATION.dates}
            </div>
            <div className="mb-2 text-[30px] font-medium tracking-[-.03em]">{EDUCATION.school}</div>
            <div className="mb-[26px] text-[16.5px] font-light text-[var(--muted)]">
              {EDUCATION.program}
            </div>
            <div className="mb-[11px] font-mono text-[10.5px] tracking-[.13em] text-[var(--muted)]">
              RELEVANT COURSEWORK
            </div>
            <div className="flex flex-wrap gap-[7px]">
              {COURSES.map((c) => (
                <span
                  key={c}
                  className="rounded-[7px] border border-[var(--line)] bg-[var(--chip)] px-[11px] py-[6px] font-mono text-[11.5px]"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div className="border-l border-[var(--line)] pl-7">
            <div className="text-[52px] leading-none font-extralight tracking-[-.04em] text-[var(--accent)]">
              {EDUCATION.gpa}
            </div>
            <div className="mt-2 font-mono text-[10.5px] tracking-[.13em] text-[var(--muted)]">
              {EDUCATION.gpaScale}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

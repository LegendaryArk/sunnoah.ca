import { SKILLS } from "../data/skills";

export default function Skills() {
  return (
    <div className="border-t border-[var(--line)] bg-[var(--panel)] transition-colors duration-500">
      <div className="mx-auto max-w-[1140px] px-10 pt-[72px] pb-20">
        <h2
          data-reveal="0"
          className="m-0 mb-8 text-[28px] font-normal tracking-[-.03em] opacity-0 [transition:opacity_.9s_ease,transform_.9s_ease]"
          style={{ transform: "translateY(20px)" }}
        >
          Skills &amp; tools
        </h2>
        <div className="grid gap-[26px]">
          {SKILLS.map((g, i) => (
            <div
              key={g.label}
              data-reveal={i}
              data-tween="left"
              className="grid grid-cols-[200px_1fr] items-start gap-7 opacity-0 [transition:opacity_.9s_ease,transform_.9s_ease]"
              style={{ transform: "translateY(20px)" }}
            >
              <div className="pt-1.5 font-mono text-[10.5px] tracking-[.13em] text-[var(--muted)]">
                {g.label}
              </div>
              <div className="flex flex-wrap gap-[7px]">
                {g.items.map((t) => (
                  <span
                    key={t}
                    className="rounded-[7px] border border-[var(--line)] bg-[var(--chip)] px-[11px] py-[6px] font-mono text-[11.5px] [transition:transform_.2s_ease-out,background-color_.5s_ease,border-color_.5s_ease] hover:-translate-y-0.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

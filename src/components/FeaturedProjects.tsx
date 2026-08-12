import { useNavigate } from "react-router-dom";
import { PROJECTS } from "../data/projects";

export default function FeaturedProjects() {
  const navigate = useNavigate();
  const featured = PROJECTS.slice(0, 3);

  return (
    <div
      id="sec-projects"
      className="border-t border-[var(--line)] bg-[var(--panel)] transition-colors duration-500"
    >
      <div className="mx-auto max-w-[1140px] px-10 pt-20 pb-[88px]">
        <div
          data-reveal="0"
          className="mb-[30px] flex items-end justify-between gap-[30px] opacity-0 [transition:opacity_.9s_ease,transform_.9s_ease]"
          style={{ transform: "translateY(20px)" }}
        >
          <div>
            <div className="mb-3.5 font-mono text-[11px] tracking-[.18em] text-[var(--muted)]">
              02 — PROJECTS
            </div>
            <h2 className="m-0 mb-3 text-[40px] font-normal tracking-[-.038em]">
              Things I&rsquo;ve built
            </h2>
            <p className="m-0 max-w-[56ch] text-base leading-[1.7] font-light text-[var(--muted)] [text-wrap:pretty]">
              Robotics, embedded firmware, and full-stack tooling. Three highlights here — six
              more on the projects page.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/projects")}
            className="flex-none cursor-pointer rounded-[9px] border border-[var(--line)] px-5 py-3 text-[13px] font-medium transition-transform duration-250 ease-out hover:-translate-y-0.5"
          >
            More projects →
          </button>
        </div>

        <div className="grid grid-cols-3 gap-[18px]">
          {featured.map((p, i) => (
            <div
              key={p.id}
              role="link"
              tabIndex={0}
              onClick={() => navigate(`/projects/${p.id}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter") navigate(`/projects/${p.id}`);
              }}
              data-reveal={i}
              data-tween="scale"
              className="cursor-pointer overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--bg)] opacity-0 [transition:opacity_.9s_cubic-bezier(.2,.7,.2,1),transform_.45s_cubic-bezier(.2,.7,.2,1),box-shadow_.3s_ease] hover:shadow-[0_16px_36px_var(--shadow)]"
              style={{ transform: "translateY(24px)" }}
            >
              <div className="relative flex h-[172px] items-end bg-[var(--slot)] p-3">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(135deg,var(--stripe) 0 2px,transparent 2px 9px)",
                  }}
                />
                <span className="relative font-mono text-[9px] text-[var(--muted)]">{p.slot}</span>
              </div>
              <div className="px-[22px] pt-5 pb-[22px]">
                <div className="mb-[9px] font-mono text-[10px] tracking-[.13em] text-[var(--accent-text)]">
                  {p.kicker}
                </div>
                <div className="mb-2 text-[19px] font-medium tracking-[-.02em]">{p.name}</div>
                <p className="m-0 mb-3.5 text-[13px] leading-[1.6] font-light text-[var(--muted)]">
                  {p.short}
                </p>
                <div className="font-mono text-[10px] tracking-[.1em] text-[var(--accent)]">
                  READ MORE →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

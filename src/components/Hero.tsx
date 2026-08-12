import { useNavigate } from "react-router-dom";
import { useSectionJump } from "../hooks/useSectionJump";

export default function Hero() {
  const navigate = useNavigate();
  const jump = useSectionJump();

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
            WATERLOO, ON
          </div>
        </div>

        <h1
          data-reveal="1"
          data-tween="scale"
          className="m-0 max-w-[17ch] text-[86px] leading-[0.99] font-normal tracking-[-.048em] opacity-0 [transition:opacity_.95s_cubic-bezier(.2,.7,.2,1),transform_.95s_cubic-bezier(.2,.7,.2,1)]"
          style={{ transform: "translateY(22px)" }}
        >
          Noah Sun builds software that moves{" "}
          <span className="text-[var(--accent)]">physical things</span>.
        </h1>

        <div
          data-reveal="2"
          className="mt-14 grid grid-cols-[1.05fr_1fr_300px] gap-11 border-t border-[var(--line)] pt-7 opacity-0 [transition:opacity_.9s_ease,transform_.9s_ease]"
          style={{ transform: "translateY(20px)" }}
        >
          <p className="m-0 text-[16.5px] leading-[1.7] font-light text-[var(--muted)] [text-wrap:pretty]">
            Mechatronics Engineering &rsquo;30 at the University of Waterloo. Currently writing
            embedded flight software for the Waterloo Aerial Robotics Group — a 32 MB flash
            driver and RTOS flash translation layer on STM32.
          </p>
          <p className="m-0 text-[16.5px] leading-[1.7] font-light text-[var(--muted)] [text-wrap:pretty]">
            Before that, five consecutive years at the VEX Robotics World Championship as a
            programming lead, and a Flutter app that 3,500+ competitors use at tournaments.
          </p>
          <div className="flex flex-col gap-[10px]">
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
          </div>
        </div>
      </div>

      <div
        data-reveal="4"
        className="absolute bottom-[26px] left-1/2 -ml-10 font-mono text-[9.5px] tracking-[.2em] text-[var(--muted)] opacity-0 [animation:cue_2.6s_ease-in-out_infinite] [transition:opacity_1.1s_ease]"
      >
        SCROLL ↓
      </div>
    </div>
  );
}

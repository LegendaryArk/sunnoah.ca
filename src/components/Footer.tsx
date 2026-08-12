import { FOOTER_EMAIL, FOOTER_NAME } from "../data/profile";

export default function Footer() {
  return (
    <div className="border-t border-[var(--line)] bg-[var(--panel)] transition-colors duration-500">
      <div className="mx-auto flex max-w-[1140px] items-center justify-between px-10 py-[30px] font-mono text-[10.5px] tracking-[.1em] text-[var(--muted)]">
        <span>{FOOTER_NAME}</span>
        <span>{FOOTER_EMAIL}</span>
      </div>
    </div>
  );
}

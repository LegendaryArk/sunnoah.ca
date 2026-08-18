import { useNavigate } from "react-router-dom";

export default function Detail() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-[900px] px-10 py-24">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-[34px] inline-flex cursor-pointer items-center gap-2 font-mono text-[11px] tracking-[.1em] text-[var(--muted)]"
      >
        ← Back
      </button>
      <p className="font-mono text-sm text-[var(--muted)]">In Development. Coming soon.</p>
    </div>
  );
}

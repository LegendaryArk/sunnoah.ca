import { useState, type FormEvent } from "react";
import { CONTACT_LINKS, LOCATION, PHONE } from "../data/profile";

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);

  const setField = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors: FormErrors = {};
    if (!form.name.trim()) nextErrors.name = "Tell me who you are.";
    if (!EMAIL_RE.test(form.email)) nextErrors.email = "That email doesn’t look right.";
    if (form.message.trim().length < 12) {
      nextErrors.message = "A little more detail, please (12+ characters).";
    }
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
    } else {
      setSent(true);
      setErrors({});
    }
  };

  const reset = () => {
    setSent(false);
    setForm({ name: "", email: "", message: "" });
    setErrors({});
  };

  return (
    <div
      id="sec-contact"
      className="border-t border-[var(--line)] bg-[var(--panel)] transition-colors duration-500"
    >
      <div className="mx-auto max-w-[1140px] px-10 pt-20 pb-24">
        <div
          data-reveal="0"
          className="mb-8 opacity-0 [transition:opacity_.9s_ease,transform_.9s_ease]"
          style={{ transform: "translateY(20px)" }}
        >
          <div className="mb-3.5 font-mono text-[11px] tracking-[.18em] text-[var(--muted)]">
            05 — CONTACT
          </div>
          <h2 className="m-0 text-[40px] font-normal tracking-[-.038em]">Get in touch</h2>
        </div>

        <div
          data-reveal="1"
          className="grid grid-cols-[1fr_300px] items-start gap-14 opacity-0 [transition:opacity_.9s_ease,transform_.9s_ease]"
          style={{ transform: "translateY(22px)" }}
        >
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg)] px-8 py-[30px]">
            {!sent ? (
              <form onSubmit={submit}>
                <div className="grid gap-5">
                  <div>
                    <div className="mb-2 font-mono text-[10.5px] tracking-[.13em] text-[var(--muted)]">
                      NAME
                    </div>
                    <input
                      value={form.name}
                      onChange={(e) => setField("name", e.target.value)}
                      placeholder="Jane Recruiter"
                      className="w-full rounded-[9px] border border-[var(--line)] bg-[var(--panel)] px-3.5 py-3 text-[14.5px] text-[var(--text)] outline-none transition-colors duration-250 ease-out focus:border-[var(--accent)]"
                    />
                    <div
                      className="mt-[7px] font-mono text-[10.5px] transition-opacity duration-300 ease-out"
                      style={{ color: "oklch(0.58 0.17 25)", opacity: errors.name ? 1 : 0 }}
                    >
                      {errors.name}
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 font-mono text-[10.5px] tracking-[.13em] text-[var(--muted)]">
                      EMAIL
                    </div>
                    <input
                      value={form.email}
                      onChange={(e) => setField("email", e.target.value)}
                      placeholder="you@company.com"
                      className="w-full rounded-[9px] border border-[var(--line)] bg-[var(--panel)] px-3.5 py-3 text-[14.5px] text-[var(--text)] outline-none transition-colors duration-250 ease-out focus:border-[var(--accent)]"
                    />
                    <div
                      className="mt-[7px] font-mono text-[10.5px] transition-opacity duration-300 ease-out"
                      style={{ color: "oklch(0.58 0.17 25)", opacity: errors.email ? 1 : 0 }}
                    >
                      {errors.email}
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 font-mono text-[10.5px] tracking-[.13em] text-[var(--muted)]">
                      MESSAGE
                    </div>
                    <textarea
                      value={form.message}
                      onChange={(e) => setField("message", e.target.value)}
                      rows={5}
                      placeholder="What are you building?"
                      className="w-full resize-y rounded-[9px] border border-[var(--line)] bg-[var(--panel)] px-3.5 py-3 text-[14.5px] leading-[1.6] text-[var(--text)] outline-none transition-colors duration-250 ease-out focus:border-[var(--accent)]"
                    />
                    <div
                      className="mt-[7px] font-mono text-[10.5px] transition-opacity duration-300 ease-out"
                      style={{ color: "oklch(0.58 0.17 25)", opacity: errors.message ? 1 : 0 }}
                    >
                      {errors.message}
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-6 inline-flex cursor-pointer justify-between rounded-[9px] bg-[var(--accent)] px-[22px] py-[13px] text-[13.5px] font-medium text-white transition-transform duration-250 ease-out hover:-translate-y-0.5"
                >
                  Send message →
                </button>
              </form>
            ) : (
              <div style={{ animation: "fadeIn .5s ease both" }} className="py-9 text-center">
                <div className="mx-auto mb-[18px] flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[var(--accent-soft)] text-[20px] text-[var(--accent-text)]">
                  ✓
                </div>
                <div className="mb-2 text-xl font-medium tracking-[-.02em]">Message sent</div>
                <p className="m-0 mb-5 text-[14.5px] font-light text-[var(--muted)]">
                  Thanks {form.name} — I&rsquo;ll reply to {form.email} within a day or two.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-block cursor-pointer font-mono text-[11px] tracking-[.1em] text-[var(--accent)]"
                >
                  SEND ANOTHER →
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <div className="mb-1 font-mono text-[10.5px] tracking-[.14em] text-[var(--muted)]">
              ELSEWHERE
            </div>
            {CONTACT_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex cursor-pointer justify-between border-b border-[var(--line)] py-[13px] text-sm"
              >
                {link.label}
                <span className="text-[var(--accent)]">↗</span>
              </a>
            ))}
            <div className="mt-3 font-mono text-[11px] leading-[1.7] text-[var(--muted)]">
              {PHONE}
              <br />
              {LOCATION}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

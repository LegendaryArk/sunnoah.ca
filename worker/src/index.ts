export interface Env {
  RESEND_API_KEY: string;
}

const TO_EMAIL = "nn2sun@uwaterloo.ca";
const FROM_EMAIL = "Contact Form <contact@sunnoah.ca>";

const ALLOWED_ORIGINS = new Set([
  "https://sunnoah.ca",
  "http://localhost:5173",
]);

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

interface ContactPayload {
  name: string;
  email: string;
  message: string;
  company?: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

function corsHeaders(origin: string | null): HeadersInit {
  const allowOrigin = origin && ALLOWED_ORIGINS.has(origin) ? origin : "";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

function json(body: unknown, status: number, origin: string | null): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(origin),
    },
  });
}

function validate(payload: Partial<ContactPayload>): FieldErrors {
  const errors: FieldErrors = {};
  if (!payload.name || !payload.name.trim()) {
    errors.name = "Tell me who you are.";
  }
  if (!payload.email || !EMAIL_RE.test(payload.email)) {
    errors.email = "That email doesn't look right.";
  }
  if (!payload.message || payload.message.trim().length < 12) {
    errors.message = "A little more detail, please (12+ characters).";
  }
  return errors;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin");

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== "POST") {
      return json({ ok: false, error: "Method not allowed" }, 405, origin);
    }

    let payload: Partial<ContactPayload>;
    try {
      payload = await request.json();
    } catch {
      return json({ ok: false, error: "Invalid JSON body" }, 400, origin);
    }

    // Honeypot: bots fill hidden fields, real visitors never see this one.
    if (payload.company && payload.company.trim()) {
      return json({ ok: true }, 200, origin);
    }

    const errors = validate(payload);
    if (Object.keys(errors).length) {
      return json({ ok: false, errors }, 400, origin);
    }

    const { name, email, message } = payload as ContactPayload;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `New message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });

    if (!resendResponse.ok) {
      const detail = await resendResponse.text();
      console.error("Resend error:", resendResponse.status, detail);
      return json({ ok: false, error: "Failed to send message" }, 502, origin);
    }

    return json({ ok: true }, 200, origin);
  },
};

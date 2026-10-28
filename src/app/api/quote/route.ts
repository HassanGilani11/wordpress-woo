import { quoteSchema } from "@/lib/quote";
import { SITE } from "@/content/site";

// Best-effort, per-instance rate limit. Use a shared store (e.g. Upstash) in production.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

async function turnstileOk(token: string | undefined, ip: string) {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) return true; // Not configured yet.
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  const json = (await res.json()) as { success?: boolean };
  return json.success === true;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) {
    return Response.json({ message: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Invalid request." }, { status: 400 });
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) errors[String(issue.path[0])] ??= issue.message;
    // A filled honeypot is treated as success so bots learn nothing.
    if (errors.website) return Response.json({ ok: true });
    return Response.json({ message: "Please check the highlighted fields.", errors }, { status: 400 });
  }

  const data = parsed.data;
  if (!(await turnstileOk(data.turnstileToken, ip))) {
    return Response.json({ message: "Spam check failed. Please try again." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not set. Quote request was not emailed.");
    return Response.json({ message: "Email delivery is not configured yet." }, { status: 503 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.QUOTE_FROM_EMAIL ?? `Quotes <quotes@${new URL(SITE.url).hostname}>`,
      to: [process.env.QUOTE_TO_EMAIL ?? SITE.email],
      reply_to: data.email,
      subject: `Quote request: ${data.service} (${data.name})`,
      html: `<p><b>Name:</b> ${esc(data.name)}</p><p><b>Email:</b> ${esc(data.email)}</p><p><b>Service:</b> ${esc(
        data.service,
      )}</p><p><b>Budget:</b> ${esc(data.budget)}</p><p>${esc(data.message).replace(/\n/g, "<br>")}</p>`,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status);
    return Response.json({ message: "We couldn't send your request. Please try again." }, { status: 502 });
  }
  return Response.json({ ok: true });
}

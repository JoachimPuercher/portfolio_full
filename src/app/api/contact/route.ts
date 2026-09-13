import { NextResponse } from "next/server";
import { isContactValid, trimContact } from "@/helpers/contact-validation";

/**
 * Contact form endpoint.
 * Angular posted straight from the browser to https://www.puercherjoachim.com/sendMail.php.
 * Now the browser posts here; the server validates (same rules as the form), drops
 * honeypot submissions and forwards the payload to CONTACT_FORWARD_URL (the existing
 * PHP mailer). Swapping in a mail API later only touches this file.
 */
export async function POST(request: Request) {
  let parsed: unknown;
  try {
    parsed = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }
  const body = parsed as Record<string, unknown>;

  // Honeypot: real users never fill the hidden "website" field. Pretend success.
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const data = trimContact({
    name: String(body.name ?? ""),
    email: String(body.email ?? ""),
    message: String(body.message ?? ""),
    privacy: body.privacy === true,
  });

  if (!isContactValid(data)) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const target = process.env.CONTACT_FORWARD_URL;
  if (!target) {
    console.error("CONTACT_FORWARD_URL is not configured");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  try {
    const res = await fetch(target, {
      method: "POST",
      // text/plain like the PHP mailer expects (it reads php://input and json_decodes it)
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Mailer responded ${res.status}`);
  } catch (error) {
    console.error("Contact forward failed", error);
    return NextResponse.json({ ok: false, error: "forward_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

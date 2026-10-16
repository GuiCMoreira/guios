import { EMAIL } from "@/data/projects";
import { sanitizeContact, validateContact, type ContactPayload } from "@/lib/contact";

/*
 * Recebe o formulário de contato, valida e entrega no e-mail do Guilherme.
 * Entrega: Resend se RESEND_API_KEY estiver configurada na Vercel; senão,
 * FormSubmit (gratuito, sem chave). O FormSubmit fica atrás do Cloudflare, que
 * recusa chamadas vindas de IPs de datacenter (erro 1010 a partir da Vercel):
 * por isso a rota devolve o pedido pronto (`relay`) e quem o envia é o
 * navegador do visitante. CONTACT_TO troca o destino.
 */

const TO = process.env.CONTACT_TO ?? EMAIL;

const TOPIC_LABEL: Record<ContactPayload["topic"], string> = {
  vaga: "Vaga / oportunidade",
  freelance: "Projeto freelance",
  parceria: "Parceria",
  oi: "Só um oi",
};
const PERIOD_LABEL = { manha: "Manhã", tarde: "Tarde", noite: "Noite" } as const;

// Limite simples por IP (best-effort: cada instância serverless tem a sua memória).
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const subject = (p: ContactPayload) => `Portfólio — ${TOPIC_LABEL[p.topic]} — ${p.name}`;

function summary(p: ContactPayload) {
  const lines = [
    `Assunto: ${TOPIC_LABEL[p.topic]}`,
    `Nome: ${p.name}`,
    p.whatsapp && `WhatsApp: ${p.whatsapp}`,
    p.phone && `Telefone (ligação): ${p.phone}`,
    p.email && `E-mail: ${p.email}`,
    p.linkedin && `LinkedIn: ${p.linkedin}`,
    p.period && `Melhor horário: ${PERIOD_LABEL[p.period]}`,
    "",
    p.message,
  ];
  return lines.filter((l): l is string => typeof l === "string").join("\n");
}

/** Pedido ao FormSubmit que o navegador do visitante repassa (ver POST). */
function formSubmitRelay(p: ContactPayload) {
  return {
    url: `https://formsubmit.co/ajax/${encodeURIComponent(TO)}`,
    body: {
      _subject: subject(p),
      _template: "box",
      _captcha: "false",
      ...(p.email ? { _replyto: p.email } : {}),
      Assunto: TOPIC_LABEL[p.topic],
      Nome: p.name,
      WhatsApp: p.whatsapp ?? "—",
      "Telefone (ligação)": p.phone ?? "—",
      "E-mail": p.email ?? "—",
      LinkedIn: p.linkedin ?? "—",
      "Melhor horário": p.period ? PERIOD_LABEL[p.period] : "—",
      Mensagem: p.message,
    },
  };
}

async function sendWithResend(p: ContactPayload, key: string) {
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Portfólio <onboarding@resend.dev>",
      to: [TO],
      subject: subject(p),
      text: summary(p),
      ...(p.email ? { reply_to: p.email } : {}),
    }),
  });
  return r.ok;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: "form.err.rate" }, { status: 429 });
  }

  const payload = sanitizeContact(await request.json().catch(() => null));
  if (!payload) return Response.json({ ok: false, error: "form.err.generic" }, { status: 400 });

  // robô preencheu o campo invisível: finge sucesso e descarta
  if (payload.website) return Response.json({ ok: true });

  const errors = validateContact(payload);
  if (Object.keys(errors).length) return Response.json({ ok: false, errors }, { status: 422 });

  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ ok: true, relay: formSubmitRelay(payload) });

  try {
    if (await sendWithResend(payload, key)) return Response.json({ ok: true });
  } catch {}
  return Response.json({ ok: false, error: "form.err.delivery" }, { status: 502 });
}

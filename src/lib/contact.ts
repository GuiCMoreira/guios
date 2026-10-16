// Contrato do formulário de contato — compartilhado entre o client e a rota da API.

export const CONTACT_TOPICS = ["vaga", "freelance", "parceria", "oi"] as const;
export const CONTACT_CHANNELS = ["whatsapp", "ligacao", "email", "linkedin"] as const;
export const CONTACT_PERIODS = ["manha", "tarde", "noite"] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number];
export type ContactChannel = (typeof CONTACT_CHANNELS)[number];
export type ContactPeriod = (typeof CONTACT_PERIODS)[number];

export type ContactPayload = {
  name: string;
  topic: ContactTopic;
  message: string;
  channels: ContactChannel[];
  whatsapp?: string;
  phone?: string;
  email?: string;
  linkedin?: string;
  period?: ContactPeriod;
  /** Campo-armadilha: humanos não veem, robôs preenchem. */
  website?: string;
};

export type ContactErrors = Partial<Record<"name" | "message" | "channels" | "whatsapp" | "phone" | "email" | "linkedin", string>>;

const digits = (v: string) => v.replace(/\D/g, "");

/** Formata enquanto digita: (11) 98765-4321. Aceita DDI 55 opcional. */
export function formatPhone(raw: string) {
  let d = digits(raw);
  if (d.startsWith("55") && d.length > 11) d = d.slice(2);
  d = d.slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const isPhone = (v?: string) => !!v && digits(v).length >= 10 && digits(v).length <= 13;
const isEmail = (v?: string) => !!v && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

/**
 * Validação única para os dois lados: o client mostra os erros no campo,
 * o servidor recusa o que passar por fora. Mensagens em chaves de i18n.
 */
export function validateContact(p: ContactPayload): ContactErrors {
  const e: ContactErrors = {};
  const name = p.name?.trim() ?? "";
  const message = p.message?.trim() ?? "";
  if (name.length < 2 || name.length > 80) e.name = "form.err.name";
  if (message.length < 10 || message.length > 2000) e.message = "form.err.message";
  if (!p.channels?.length) e.channels = "form.err.channels";
  if (p.channels?.includes("whatsapp") && !isPhone(p.whatsapp)) e.whatsapp = "form.err.phone";
  if (p.channels?.includes("ligacao") && !isPhone(p.phone)) e.phone = "form.err.phone";
  if (p.channels?.includes("email") && !isEmail(p.email)) e.email = "form.err.email";
  if (p.channels?.includes("linkedin") && (p.linkedin?.trim().length ?? 0) < 3) e.linkedin = "form.err.linkedin";
  return e;
}

/** Normaliza o que chega da rede: só campos e valores conhecidos. */
export function sanitizeContact(raw: unknown): ContactPayload | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const str = (k: string, max = 2000) => (typeof r[k] === "string" ? (r[k] as string).trim().slice(0, max) : undefined);
  const topic = CONTACT_TOPICS.includes(r.topic as ContactTopic) ? (r.topic as ContactTopic) : "oi";
  const channels = Array.isArray(r.channels)
    ? [...new Set(r.channels.filter((c): c is ContactChannel => CONTACT_CHANNELS.includes(c as ContactChannel)))]
    : [];
  const period = CONTACT_PERIODS.includes(r.period as ContactPeriod) ? (r.period as ContactPeriod) : undefined;
  return {
    name: str("name", 80) ?? "",
    topic,
    message: str("message", 2000) ?? "",
    channels,
    whatsapp: channels.includes("whatsapp") ? str("whatsapp", 30) : undefined,
    phone: channels.includes("ligacao") ? str("phone", 30) : undefined,
    email: channels.includes("email") ? str("email", 120) : undefined,
    linkedin: channels.includes("linkedin") ? str("linkedin", 200) : undefined,
    period,
    website: str("website", 200),
  };
}

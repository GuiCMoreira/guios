"use client";

import { useState, type ReactNode } from "react";
import { useReducedMotionSafe } from "./fx/useReducedMotionSafe";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  Check,
  Loader2,
  MessageCircle,
  Phone,
  AtSign,
  RotateCcw,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { LinkedInIcon } from "@/components/ui/icons";
import { LINKEDIN_URL } from "@/data/projects";
import {
  CONTACT_PERIODS,
  CONTACT_TOPICS,
  formatPhone,
  validateContact,
  type ContactChannel,
  type ContactErrors,
  type ContactPayload,
  type ContactPeriod,
  type ContactTopic,
} from "@/lib/contact";
import { StarButton } from "./fx/rb";

const CHANNELS: { id: ContactChannel; icon: ReactNode }[] = [
  { id: "whatsapp", icon: <MessageCircle className="h-4 w-4" /> },
  { id: "linkedin", icon: <LinkedInIcon className="h-4 w-4" /> },
  { id: "email", icon: <AtSign className="h-4 w-4" /> },
  { id: "ligacao", icon: <Phone className="h-4 w-4" /> },
];

type Status = "idle" | "sending" | "sent" | "error";

/** Pílula selecionável (chips de assunto, canal e horário). */
function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      data-cursor="hover"
      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-200 active:scale-95 ${
        active
          ? "border-fx bg-fx/15 font-semibold text-text-hi"
          : "border-line text-text-lo hover:border-line-strong hover:text-text-hi"
      }`}
    >
      {children}
      {active && <Check className="h-3.5 w-3.5 text-fx-ink" />}
    </button>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  const { t } = useI18n();
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block font-mono text-xs text-text-lo"
      >
        {label}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-err`}
          className="mt-1.5 text-xs text-rose-500"
          role="alert"
        >
          {t(error)}
        </p>
      )}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-line bg-(--landing-bg) px-4 py-3 text-[15px] text-text-hi placeholder:text-text-lo/60 transition-colors focus:border-fx focus:outline-none";

// Prazo do envio inteiro (nossa API + repasse ao FormSubmit). Sem ele, um serviço
// de e-mail fora do ar deixa o botão girando por minutos (aconteceu em 22/10/2026).
const SEND_TIMEOUT_MS = 15_000;

async function relayToFormSubmit(
  relay: { url: string; body: Record<string, string> },
  signal: AbortSignal,
) {
  const r = await fetch(relay.url, {
    signal,
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(relay.body),
  });
  if (!r.ok) return false;
  const data = (await r.json().catch(() => null)) as {
    success?: string | boolean;
  } | null;
  return data?.success === true || data?.success === "true";
}
export function ContactForm() {
  const { t } = useI18n();
  const reduced = useReducedMotionSafe();
  const [topic, setTopic] = useState<ContactTopic>("vaga");
  const [name, setName] = useState("");
  const [channels, setChannels] = useState<ContactChannel[]>([]);
  const [whatsapp, setWhatsapp] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [period, setPeriod] = useState<ContactPeriod | undefined>();
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const clearError = (k: keyof ContactErrors) =>
    setErrors((prev) => {
      if (!prev[k]) return prev;
      const next = { ...prev };
      delete next[k];
      return next;
    });

  const toggleChannel = (c: ContactChannel) => {
    clearError("channels");
    setChannels((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );
  };

  const wantsCall =
    channels.includes("whatsapp") || channels.includes("ligacao");

  const payload = (): ContactPayload => ({
    name,
    topic,
    message,
    channels,
    whatsapp: channels.includes("whatsapp") ? whatsapp : undefined,
    phone: channels.includes("ligacao") ? phone : undefined,
    email: channels.includes("email") ? email : undefined,
    linkedin: channels.includes("linkedin") ? linkedin : undefined,
    period: wantsCall ? period : undefined,
    website,
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const p = payload();
    const errs = validateContact(p);
    setErrors(errs);
    if (Object.keys(errs).length) {
      // leva o foco ao primeiro campo com problema
      const first = Object.keys(errs)[0];
      document.getElementById(`cf-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    setServerError(null);
    const signal = AbortSignal.timeout(SEND_TIMEOUT_MS);
    // depois que a API validou, qualquer falha é de entrega, não "algo deu errado"
    let validated = false;
    try {
      const r = await fetch("/api/contato", {
        signal,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(p),
      });
      const data = (await r.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        errors?: ContactErrors;
        relay?: { url: string; body: Record<string, string> };
      };
      if (r.ok && data.ok && data.relay) {
        // o servidor validou; o envio ao FormSubmit sai daqui (ver /api/contato)
        validated = true;
        if (await relayToFormSubmit(data.relay, signal)) {
          setStatus("sent");
          return;
        }
        setServerError("form.err.delivery");
        setStatus("error");
        return;
      }
      if (r.ok && data.ok) {
        setStatus("sent");
        return;
      }
      if (data.errors) setErrors(data.errors);
      setServerError(data.error ?? "form.err.generic");
      setStatus("error");
    } catch (err) {
      const timedOut =
        err instanceof DOMException && err.name === "TimeoutError";
      setServerError(
        timedOut || validated ? "form.err.delivery" : "form.err.generic",
      );
      setStatus("error");
    }
  };

  const reset = () => {
    setName("");
    setMessage("");
    setChannels([]);
    setWhatsapp("");
    setPhone("");
    setEmail("");
    setLinkedin("");
    setPeriod(undefined);
    setErrors({});
    setStatus("idle");
  };

  const reveal = reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: "auto" },
        exit: { opacity: 0, height: 0 },
      };

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-line bg-(--landing-card) p-6 shadow-2xl shadow-black/10 md:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[420px] flex-col items-center justify-center gap-4 text-center"
            role="status"
          >
            <motion.span
              initial={reduced ? false : { scale: 0, rotate: -40 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-fx text-black"
            >
              <Check className="h-8 w-8" />
            </motion.span>
            <h3 className="font-display text-3xl font-bold tracking-tight">
              {t("form.sent.title")}
            </h3>
            <p className="max-w-sm leading-relaxed text-text-lo">
              {t("form.sent.body")}
            </p>
            <button
              type="button"
              onClick={reset}
              data-cursor="hover"
              className="mt-2 inline-flex items-center gap-2 font-mono text-sm text-text-lo underline decoration-line underline-offset-4 hover:text-text-hi"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {t("form.sent.again")}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            noValidate
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div>
              <p className="font-mono text-xs text-text-lo">
                <span className="text-fx-ink">gui@os</span>:~$ ./mensagem --nova
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
                {t("form.title")}
              </h3>
            </div>

            <fieldset>
              <legend className="mb-2 font-mono text-xs text-text-lo">
                {t("form.topic")}
              </legend>
              <div className="flex flex-wrap gap-2">
                {CONTACT_TOPICS.map((tp) => (
                  <Pill
                    key={tp}
                    active={topic === tp}
                    onClick={() => setTopic(tp)}
                  >
                    {t(`form.topic.${tp}`)}
                  </Pill>
                ))}
              </div>
            </fieldset>

            <Field id="cf-name" label={t("form.name")} error={errors.name}>
              <input
                id="cf-name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  clearError("name");
                }}
                autoComplete="name"
                placeholder={t("form.name.ph")}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "cf-name-err" : undefined}
                className={inputCls}
              />
            </Field>

            <fieldset>
              <legend
                id="cf-channels"
                tabIndex={-1}
                className="mb-2 font-mono text-xs text-text-lo"
              >
                {t("form.channels")}
              </legend>
              <div className="flex flex-wrap gap-2">
                {CHANNELS.map((c) => (
                  <Pill
                    key={c.id}
                    active={channels.includes(c.id)}
                    onClick={() => toggleChannel(c.id)}
                  >
                    {c.icon}
                    {t(`form.ch.${c.id}`)}
                  </Pill>
                ))}
              </div>
              {errors.channels && (
                <p className="mt-1.5 text-xs text-rose-500" role="alert">
                  {t(errors.channels)}
                </p>
              )}

              {/* cada canal escolhido abre o campo dele */}
              <div className="mt-1">
                <AnimatePresence initial={false}>
                  {channels.includes("whatsapp") && (
                    <motion.div
                      key="wa"
                      {...reveal}
                      className="overflow-hidden"
                    >
                      <div className="pt-4">
                        <Field
                          id="cf-whatsapp"
                          label={t("form.ch.whatsapp")}
                          error={errors.whatsapp}
                        >
                          <input
                            id="cf-whatsapp"
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            value={whatsapp}
                            onChange={(e) => {
                              setWhatsapp(formatPhone(e.target.value));
                              clearError("whatsapp");
                            }}
                            placeholder="(11) 98765-4321"
                            aria-invalid={!!errors.whatsapp}
                            className={inputCls}
                          />
                        </Field>
                      </div>
                    </motion.div>
                  )}
                  {channels.includes("linkedin") && (
                    <motion.div
                      key="li"
                      {...reveal}
                      className="overflow-hidden"
                    >
                      <div className="pt-4">
                        <Field
                          id="cf-linkedin"
                          label={t("form.linkedin")}
                          error={errors.linkedin}
                        >
                          <input
                            id="cf-linkedin"
                            value={linkedin}
                            onChange={(e) => {
                              setLinkedin(e.target.value);
                              clearError("linkedin");
                            }}
                            placeholder="linkedin.com/in/seu-perfil"
                            aria-invalid={!!errors.linkedin}
                            className={inputCls}
                          />
                        </Field>
                      </div>
                    </motion.div>
                  )}
                  {channels.includes("email") && (
                    <motion.div
                      key="em"
                      {...reveal}
                      className="overflow-hidden"
                    >
                      <div className="pt-4">
                        <Field
                          id="cf-email"
                          label={t("form.email")}
                          error={errors.email}
                        >
                          <input
                            id="cf-email"
                            type="email"
                            inputMode="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              clearError("email");
                            }}
                            placeholder="voce@empresa.com"
                            aria-invalid={!!errors.email}
                            className={inputCls}
                          />
                        </Field>
                      </div>
                    </motion.div>
                  )}
                  {channels.includes("ligacao") && (
                    <motion.div
                      key="ph"
                      {...reveal}
                      className="overflow-hidden"
                    >
                      <div className="pt-4">
                        <Field
                          id="cf-phone"
                          label={t("form.phone")}
                          error={errors.phone}
                        >
                          <input
                            id="cf-phone"
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            value={phone}
                            onChange={(e) => {
                              setPhone(formatPhone(e.target.value));
                              clearError("phone");
                            }}
                            placeholder="(11) 3456-7890"
                            aria-invalid={!!errors.phone}
                            className={inputCls}
                          />
                        </Field>
                      </div>
                    </motion.div>
                  )}
                  {wantsCall && (
                    <motion.fieldset
                      key="period"
                      {...reveal}
                      className="overflow-hidden"
                    >
                      <div className="pt-4">
                        <legend className="mb-2 font-mono text-xs text-text-lo">
                          {t("form.period")}
                        </legend>
                        <div className="flex flex-wrap gap-2">
                          {CONTACT_PERIODS.map((pd) => (
                            <Pill
                              key={pd}
                              active={period === pd}
                              onClick={() =>
                                setPeriod(period === pd ? undefined : pd)
                              }
                            >
                              {t(`form.period.${pd}`)}
                            </Pill>
                          ))}
                        </div>
                      </div>
                    </motion.fieldset>
                  )}
                </AnimatePresence>
              </div>
            </fieldset>

            <Field
              id="cf-message"
              label={t("form.message")}
              error={errors.message}
            >
              <textarea
                id="cf-message"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value.slice(0, 2000));
                  clearError("message");
                }}
                rows={4}
                placeholder={t(`form.message.ph.${topic}`)}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "cf-message-err" : undefined}
                className={`${inputCls} resize-y`}
              />
              <p className="mt-1 text-right font-mono text-[11px] text-text-lo">
                {message.length}/2000
              </p>
            </Field>

            {/* campo-armadilha: invisível para pessoas, irresistível para robôs */}
            <div
              aria-hidden
              className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
            >
              <label htmlFor="cf-website">Website</label>
              <input
                id="cf-website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            {status === "error" && serverError && (
              <p
                className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-500"
                role="alert"
              >
                {t(serverError)}{" "}
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold underline"
                >
                  LinkedIn ↗
                </a>
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="max-w-xs text-xs leading-relaxed text-text-lo">
                {t("form.privacy")}
              </p>
              <StarButton
                as="button"
                type="submit"
                disabled={status === "sending"}
                data-cursor="hover"
              >
                <span className="inline-flex items-center gap-2 text-sm font-semibold">
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t("form.sending")}
                    </>
                  ) : (
                    <>
                      {t("form.send")}
                      <ArrowUpRight className="h-4 w-4" />
                    </>
                  )}
                </span>
              </StarButton>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

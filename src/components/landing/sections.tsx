"use client";

import { useEffect, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import type { Project } from "@/lib/types";
import { useI18n } from "@/lib/i18n";
import { career, education } from "@/data/career";
import { projects, AVATAR_URL, GITHUB_URL } from "@/data/projects";
import { GuiOSShowcase } from "./GuiOSShowcase";
import { Magnetic, SplitWords } from "./fx/bits";

// ————— blocos compartilhados —————

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Container full-bleed: a página usa a tela inteira, com respiro lateral fluido. */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`w-full px-[clamp(20px,5vw,96px)] ${className}`}>{children}</div>;
}

/** Cabeçalho de seção como prompt de terminal: a voz do sistema no lugar de números. */
function PromptHeading({
  command,
  title,
  aside,
}: {
  command: string;
  title: string;
  aside?: string;
}) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="flex items-end justify-between gap-4 border-b border-line pb-5">
        <div>
          <p className="font-mono text-xs text-text-lo md:text-sm">
            <span className="text-amber-500">gui@os</span>:{command}
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-[-0.03em] md:text-6xl">
            <SplitWords text={title} />
          </h2>
        </div>
        {aside && <p className="hidden pb-1 text-right font-mono text-xs text-text-lo lg:block">{aside}</p>}
      </div>
    </Reveal>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-text-lo">
      {children}
    </span>
  );
}

/** Acende o holofote do .spotlight-card seguindo o mouse — direto no style, sem re-render. */
function moveSpot(e: ReactPointerEvent<HTMLElement>) {
  if (e.pointerType !== "mouse") return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
  el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
}

// ————— Projetos —————

function WipBadge() {
  const { t } = useI18n();
  return (
    <span className="rounded-full bg-amber-400/15 px-2 py-0.5 font-mono text-[10px] tracking-wide text-amber-600 uppercase dark:text-amber-400">
      {t("landing.projects.wip")}
    </span>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { lang, t } = useI18n();
  const reduced = useReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm md:p-8"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={project.name}
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="max-h-full w-full max-w-3xl overflow-y-auto rounded-3xl border border-line bg-(--landing-card) shadow-2xl shadow-black/30"
        onClick={(e) => e.stopPropagation()}
      >
        {project.image && (
          <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line bg-fill-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={`${project.name} — ${project.tagline[lang]}`}
              className="h-full w-full object-cover object-top"
            />
            <button
              type="button"
              onClick={onClose}
              data-cursor="hover"
              aria-label={t("landing.projects.close")}
              className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition-transform hover:scale-105"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>
        )}
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] tracking-[0.15em] text-text-lo uppercase">
            <span>
              {project.year} · {project.category === "web" ? "Web" : "Mobile"}
            </span>
            {project.status === "wip" && <WipBadge />}
          </div>
          <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight">{project.name}</h3>
          <p className="mt-1 text-sm text-text-lo">{project.tagline[lang]}</p>

          <p className="mt-5 leading-relaxed text-text-lo">{project.description[lang]}</p>

          {project.highlights && (
            <ul className="mt-6 space-y-2.5">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-text-lo">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" aria-hidden />
                  <span>{h[lang]}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-line pt-6">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="inline-flex items-center gap-2 rounded-full bg-text-hi px-5 py-2.5 text-sm font-semibold text-(--landing-bg) transition-transform hover:scale-[1.03] active:scale-95"
              >
                {project.id === "guios" ? t("landing.os.cta") : t("projects.viewDemo")}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="group inline-flex items-center gap-1.5 text-sm font-medium underline decoration-line underline-offset-4 transition-colors hover:decoration-text-hi"
              >
                {t("projects.viewGithub")}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ) : (
              <p className="text-xs text-text-lo">{t("landing.projects.private")}</p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Larguras assimétricas no xl (12 colunas): ritmo editorial em vez de grade uniforme. */
const SPANS = ["xl:col-span-7", "xl:col-span-5", "xl:col-span-5", "xl:col-span-7", "xl:col-span-6", "xl:col-span-6"];

export function ProjectsSection() {
  const { lang, t } = useI18n();
  const [openId, setOpenId] = useState<string | null>(null);
  const open = projects.find((p) => p.id === openId) ?? null;

  return (
    <section id="projetos" className="scroll-mt-24 py-20 md:py-32">
      <Container>
        <PromptHeading
          command="~/projetos$ ls --destaques"
          title={t("landing.sec.projects")}
          aside={t("landing.sec.projectsAside")}
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-12 xl:gap-6">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={Math.min(i % 2, 1) * 0.08} className={SPANS[i % SPANS.length]}>
              <button
                type="button"
                onClick={() => setOpenId(p.id)}
                onPointerMove={moveSpot}
                data-cursor="hover"
                data-cursor-label={t("landing.cursor.open")}
                aria-label={`${p.name} — ${t("landing.projects.details")}`}
                className="spotlight-card group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-(--landing-card) text-left transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-xl hover:shadow-black/5"
              >
                {p.image && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-line bg-fill-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3 font-mono text-[11px] tracking-[0.15em] text-text-lo uppercase">
                    <span className="flex items-center gap-2">
                      {p.year} · {p.category === "web" ? "Web" : "Mobile"}
                      {p.status === "wip" && <WipBadge />}
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{p.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-text-lo">{p.tagline[lang]}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 4).map((s) => (
                      <Chip key={s}>{s}</Chip>
                    ))}
                    {p.stack.length > 4 && <Chip>+{p.stack.length - 4}</Chip>}
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="group inline-flex items-center gap-1.5 font-mono text-sm underline decoration-line underline-offset-4 transition-colors hover:decoration-amber-400"
          >
            {t("landing.projects.all")}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </Container>
      <AnimatePresence>
        {open && <ProjectModal project={open} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </section>
  );
}

// ————— GuiOS —————

export function GuiOSSection() {
  const { t } = useI18n();
  return (
    <section id="guios" className="scroll-mt-24 border-y border-line bg-fill-1 py-20 md:py-32">
      <Container>
        <PromptHeading command="~/guios$ ./boot --preview" title={t("landing.sec.os")} />
        <div className="grid items-center gap-10 lg:grid-cols-[4fr_6fr] lg:gap-16">
          <Reveal>
            <h3 className="font-display text-3xl font-semibold tracking-tight text-balance md:text-[2.8rem] md:leading-[1.08]">
              {t("landing.os.title.before")}
              <span className="mark">{t("landing.os.title.mark")}</span>
            </h3>
            <p className="mt-5 max-w-prose leading-relaxed text-text-lo">{t("landing.os.body")}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Magnetic strength={0.25}>
                <Link
                  href="/os"
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 rounded-full bg-text-hi px-7 py-3.5 text-sm font-semibold text-(--landing-bg)"
                >
                  {t("landing.os.cta")}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Magnetic>
              <p className="font-mono text-xs text-text-lo">{t("landing.os.hint")}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/os"
              aria-label={t("landing.os.cta")}
              data-cursor="hover"
              data-cursor-label={t("landing.cursor.open")}
              className="block transition-transform duration-300 hover:scale-[1.015]"
            >
              <GuiOSShowcase label={t("landing.os.preview")} />
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

// ————— Ferramentas —————

const STACK_GROUPS = [
  { key: "landing.stack.frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "React Native"] },
  { key: "landing.stack.backend", items: ["PHP", "Node.js", "MySQL", "RabbitMQ"] },
  { key: "landing.stack.tools", items: ["Docker", "Git"] },
];

export function StackSection() {
  const { t } = useI18n();
  return (
    <section id="stack" className="scroll-mt-24 py-20 md:py-32">
      <Container>
        <PromptHeading
          command="~/stack$ ls ferramentas/"
          title={t("landing.sec.stack")}
          aside={t("landing.sec.stackAside")}
        />
        <div className="grid gap-5 md:grid-cols-3">
          {STACK_GROUPS.map((g, i) => (
            <Reveal key={g.key} delay={i * 0.06}>
              <div
                onPointerMove={moveSpot}
                className="spotlight-card h-full rounded-2xl border border-line bg-(--landing-card) p-7"
              >
                <p className="font-mono text-xs text-text-lo">
                  <span className="text-amber-500">dir</span> {t(g.key).toLowerCase()}/
                </p>
                <ul className="mt-5 space-y-2.5">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="border-b border-line pb-2.5 font-medium last:border-0 last:pb-0"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ————— Experiência —————

export function ExperienceSection() {
  const { lang, t } = useI18n();
  return (
    <section id="experiencia" className="scroll-mt-24 border-y border-line bg-fill-1 py-20 md:py-32">
      <Container>
        <PromptHeading
          command="~/experiencia$ git log --oneline"
          title={t("landing.sec.exp")}
          aside={t("landing.sec.expAside")}
        />
        <div className="space-y-10 md:space-y-14">
          {career.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.06}>
              <div className="grid gap-3 md:grid-cols-[220px_1fr] md:gap-10">
                <p className="pt-1 font-mono text-sm text-text-lo">
                  {c.start} — {c.end ?? t("landing.exp.now")}
                </p>
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight">
                    {c.role[lang]} <span className="font-normal text-text-lo">· {c.company}</span>
                  </h3>
                  <p className="mt-1 font-mono text-xs text-text-lo">{c.location}</p>
                  <p className="mt-3 max-w-prose leading-relaxed text-text-lo">{c.summary[lang]}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.stack.map((s) => (
                      <Chip key={s}>{s}</Chip>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal>
            <div className="grid gap-3 border-t border-line pt-10 md:grid-cols-[220px_1fr] md:gap-10">
              <p className="pt-1 font-mono text-sm text-text-lo">
                {education.start} — {education.end}
              </p>
              <div>
                <p className="font-mono text-xs text-text-lo">
                  <span className="text-amber-500">tag</span> {t("landing.sec.edu").toLowerCase()}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">
                  {education.degree[lang]}{" "}
                  <span className="font-normal text-text-lo">· {education.institution}</span>
                </h3>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

// ————— Sobre —————

export function AboutSection() {
  const { t } = useI18n();
  return (
    <section id="sobre" className="scroll-mt-24 py-20 md:py-32">
      <Container>
        <PromptHeading command="~/sobre$ cat bio.md" title={t("landing.sec.about")} />
        <div className="grid items-start gap-10 md:grid-cols-[240px_1fr] md:gap-16">
          <Reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={AVATAR_URL}
              alt="Guilherme Carvalho"
              width={240}
              height={240}
              loading="lazy"
              className="aspect-square w-44 rounded-3xl border border-line object-cover md:w-full"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="max-w-3xl space-y-4 leading-relaxed text-text-lo md:text-lg">
              <p>{t("landing.about.p1")}</p>
              <p>{t("landing.about.p2")}</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

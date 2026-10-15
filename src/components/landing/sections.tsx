"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { career, education } from "@/data/career";
import { projects, AVATAR_URL, GITHUB_URL } from "@/data/projects";
import { GuiOSShowcase } from "./GuiOSShowcase";

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

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-5xl px-5 md:px-8 ${className}`}>{children}</div>;
}

function SectionHeading({ num, title, aside }: { num: string; title: string; aside?: string }) {
  return (
    <Reveal className="mb-10 md:mb-14">
      <div className="flex items-end justify-between gap-4 border-b border-line pb-4">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-text-lo uppercase">{num}</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>
        </div>
        {aside && <p className="hidden pb-1 text-right text-sm text-text-lo sm:block">{aside}</p>}
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

// ————— 01 · Projetos —————

export function ProjectsSection() {
  const { lang, t } = useI18n();
  return (
    <section id="projetos" className="scroll-mt-24 py-20 md:py-28">
      <Container>
        <SectionHeading num="01" title={t("landing.sec.projects")} aside={t("landing.sec.projectsAside")} />
        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={Math.min(i, 3) * 0.06}>
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col rounded-2xl border border-line bg-(--landing-card) p-6 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-xl hover:shadow-black/5 md:p-7"
              >
                <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.15em] text-text-lo uppercase">
                  <span>
                    {p.year} · {p.category === "web" ? "Web" : "Mobile"}
                    {p.featured && <span className="mark ml-2 text-text-hi normal-case">★</span>}
                  </span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">
                  {p.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-text-lo">{p.tagline[lang]}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <Chip key={s}>{s}</Chip>
                  ))}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm font-medium underline decoration-line underline-offset-4 transition-colors hover:decoration-text-hi"
          >
            {t("landing.projects.all")}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </Container>
    </section>
  );
}

// ————— 02 · GuiOS —————

export function GuiOSSection() {
  const { t } = useI18n();
  return (
    <section id="guios" className="scroll-mt-24 border-y border-line bg-fill-1 py-20 md:py-28">
      <Container>
        <SectionHeading num="02" title={t("landing.sec.os")} />
        <div className="grid items-center gap-10 lg:grid-cols-[5fr_6fr] lg:gap-14">
          <Reveal>
            <h3 className="font-display text-3xl font-semibold tracking-tight text-balance md:text-[2.6rem] md:leading-[1.1]">
              {t("landing.os.title.before")}
              <span className="mark">{t("landing.os.title.mark")}</span>
            </h3>
            <p className="mt-5 max-w-prose leading-relaxed text-text-lo">{t("landing.os.body")}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/os"
                className="inline-flex items-center gap-2 rounded-full bg-text-hi px-6 py-3 text-sm font-semibold text-(--landing-bg) transition-transform hover:scale-[1.03] active:scale-95"
              >
                {t("landing.os.cta")}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <p className="text-xs text-text-lo">{t("landing.os.hint")}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/os" aria-label={t("landing.os.cta")} className="block transition-transform duration-300 hover:scale-[1.015]">
              <GuiOSShowcase label={t("landing.os.preview")} />
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

// ————— 03 · Ferramentas —————

const STACK_GROUPS = [
  { key: "landing.stack.frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "React Native"] },
  { key: "landing.stack.backend", items: ["PHP", "Node.js", "MySQL", "RabbitMQ"] },
  { key: "landing.stack.tools", items: ["Docker", "Git"] },
];

export function StackSection() {
  const { t } = useI18n();
  return (
    <section id="stack" className="scroll-mt-24 py-20 md:py-28">
      <Container>
        <SectionHeading num="03" title={t("landing.sec.stack")} aside={t("landing.sec.stackAside")} />
        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {STACK_GROUPS.map((g, i) => (
            <Reveal key={g.key} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-line bg-(--landing-card) p-6">
                <p className="font-mono text-[11px] tracking-[0.2em] text-text-lo uppercase">{t(g.key)}</p>
                <ul className="mt-4 space-y-2">
                  {g.items.map((item) => (
                    <li key={item} className="border-b border-line pb-2 text-sm font-medium last:border-0 last:pb-0">
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

// ————— 04 · Experiência —————

export function ExperienceSection() {
  const { lang, t } = useI18n();
  return (
    <section id="experiencia" className="scroll-mt-24 border-y border-line bg-fill-1 py-20 md:py-28">
      <Container>
        <SectionHeading num="04" title={t("landing.sec.exp")} aside={t("landing.sec.expAside")} />
        <div className="space-y-10 md:space-y-12">
          {career.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.06}>
              <div className="grid gap-3 md:grid-cols-[180px_1fr] md:gap-8">
                <p className="pt-1 font-mono text-sm text-text-lo">
                  {c.start} — {c.end ?? t("landing.exp.now")}
                </p>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight">
                    {c.role[lang]}{" "}
                    <span className="font-normal text-text-lo">· {c.company}</span>
                  </h3>
                  <p className="mt-1 text-xs text-text-lo">{c.location}</p>
                  <p className="mt-3 max-w-prose text-sm leading-relaxed text-text-lo">{c.summary[lang]}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.stack.map((s) => (
                      <Chip key={s}>{s}</Chip>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}

          {/* Formação acadêmica, no mesmo ritmo visual da timeline */}
          <Reveal>
            <div className="grid gap-3 border-t border-line pt-10 md:grid-cols-[180px_1fr] md:gap-8">
              <p className="pt-1 font-mono text-sm text-text-lo">
                {education.start} — {education.end}
              </p>
              <div>
                <p className="font-mono text-[11px] tracking-[0.2em] text-text-lo uppercase">
                  {t("landing.sec.edu")}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
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

// ————— 05 · Sobre —————

export function AboutSection() {
  const { t } = useI18n();
  return (
    <section id="sobre" className="scroll-mt-24 py-20 md:py-28">
      <Container>
        <SectionHeading num="05" title={t("landing.sec.about")} />
        <div className="grid items-start gap-8 md:grid-cols-[200px_1fr] md:gap-12">
          <Reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={AVATAR_URL}
              alt="Guilherme Carvalho"
              width={200}
              height={200}
              loading="lazy"
              className="aspect-square w-40 rounded-3xl border border-line object-cover md:w-full"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="space-y-4 text-[15px] leading-relaxed text-text-lo md:text-base">
              <p>{t("landing.about.p1")}</p>
              <p>{t("landing.about.p2")}</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

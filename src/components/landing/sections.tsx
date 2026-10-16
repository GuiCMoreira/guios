"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import type { Project } from "@/lib/types";
import { useI18n } from "@/lib/i18n";
import { career, education } from "@/data/career";
import { projects, PHOTO_9X16, GITHUB_URL } from "@/data/projects";
import { GuiOSShowcase } from "./GuiOSShowcase";
import { Magnetic, SplitWords } from "./fx/bits";
import { GlareImage, Gradient, PromptCommand, SectionCrosshair, StarButton } from "./fx/rb";
import {
  PinnedHorizontal,
  ScrollRows,
  SlideCounter,
  StackCards,
  WordReveal,
  useMediaQuery,
} from "./fx/scroll";

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
  className = "mb-12 md:mb-16",
}: {
  command: string;
  title: string;
  aside?: string;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <div className="flex items-end justify-between gap-4 border-b border-line pb-5">
        <div>
          <p className="font-mono text-xs text-text-lo md:text-sm">
            <span className="text-fx-ink">gui@os</span>:<PromptCommand text={command} />
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

// ————— Projetos —————

function WipBadge() {
  const { t } = useI18n();
  return (
    <span className="rounded-full bg-fx/15 px-2 py-0.5 font-mono text-[10px] tracking-wide text-fx-ink uppercase">
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

  // Telas baixas (notebook 768px de altura): texto um degrau menor para tudo caber sem rolar.
  const short = "[@media(max-height:820px)]";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm md:p-8"
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
        // lg+: imagem à esquerda, informações à direita, sem rolagem; no celular empilha
        className="relative max-h-full w-full max-w-3xl overflow-y-auto rounded-3xl border border-line bg-(--landing-card) shadow-2xl shadow-black/30 lg:grid lg:max-h-[92dvh] lg:w-[min(1360px,96vw)] lg:max-w-none lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:overflow-hidden xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] 2xl:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          data-cursor="hover"
          aria-label={t("landing.projects.close")}
          className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition-transform hover:scale-105"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        {project.image && (
          <div className="flex items-center justify-center border-b border-line bg-[#0b0c10] lg:border-r lg:border-b-0 lg:p-5 xl:p-8">
            <div className="relative aspect-video w-full overflow-hidden lg:rounded-xl lg:shadow-2xl lg:shadow-black/50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={`${project.name} — ${project.tagline[lang]}`}
                className="absolute inset-0 h-full w-full object-contain"
              />
            </div>
          </div>
        )}

        <div className={`flex flex-col p-6 md:p-8 lg:min-h-0 lg:px-7 lg:py-8 lg:pr-12 xl:py-9 ${short}:lg:py-5`}>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] tracking-[0.15em] text-text-lo uppercase">
            <span>
              {project.year} · {project.category === "web" ? "Web" : "Mobile"}
            </span>
            {project.status === "wip" && <WipBadge />}
          </div>
          <h3 className={`mt-3 font-display text-3xl font-semibold tracking-tight lg:text-4xl ${short}:lg:text-3xl`}>
            {project.name}
          </h3>
          <p className="mt-1 text-sm text-text-lo">{project.tagline[lang]}</p>

          <p className={`mt-5 leading-relaxed text-text-lo lg:text-[15px] ${short}:lg:mt-3 ${short}:lg:text-sm ${short}:lg:leading-normal`}>
            {project.description[lang]}
          </p>

          {project.highlights && (
            <ul className={`mt-5 space-y-2 ${short}:lg:mt-3 ${short}:lg:space-y-1`}>
              {project.highlights.map((h, i) => (
                <li key={i} className={`flex gap-2.5 text-sm leading-relaxed text-text-lo ${short}:lg:text-[13px] ${short}:lg:leading-snug`}>
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-fx" aria-hidden />
                  <span>{h[lang]}</span>
                </li>
              ))}
            </ul>
          )}

          <div className={`mt-5 flex flex-wrap gap-1.5 ${short}:lg:mt-3`}>
            {project.stack.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>

          <div className={`mt-6 flex flex-wrap items-center gap-4 border-t border-line pt-5 lg:mt-auto ${short}:lg:pt-3`}>
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

/** Card da grade vertical (mobile, tablet e reduced-motion). */
function ProjectCard({ p, onOpen }: { p: Project; onOpen: () => void }) {
  const { lang, t } = useI18n();
  return (
    <button
      type="button"
      onClick={onOpen}
      data-cursor="hover"
      data-cursor-label={t("landing.cursor.open")}
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-(--landing-card) text-left transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-xl hover:shadow-black/5"
    >
      {p.image && (
        <div className="relative aspect-video w-full overflow-hidden border-b border-line bg-fill-1">
          <GlareImage className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.image}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-contain"
            />
          </GlareImage>
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex h-5 items-center justify-between gap-3 font-mono text-[11px] tracking-[0.15em] text-text-lo uppercase">
          <span className="flex items-center gap-2">
            {p.year} · {p.category === "web" ? "Web" : "Mobile"}
            {p.status === "wip" && <WipBadge />}
          </span>
          <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
        <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{p.name}</h3>
        <span className="sr-only">— {t("landing.projects.details")}</span>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-text-lo">{p.tagline[lang]}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {p.stack.slice(0, 4).map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
          {p.stack.length > 4 && <Chip>+{p.stack.length - 4}</Chip>}
        </div>
      </div>
    </button>
  );
}

/**
 * Slide da trilha horizontal: imagem grande com parallax próprio (a captura
 * desliza dentro da moldura no sentido contrário ao da trilha).
 */
function ProjectSlide({
  p,
  index,
  onOpen,
}: {
  p: Project;
  index: number;
  onOpen: () => void;
}) {
  const { lang, t } = useI18n();
  return (
    <button
      type="button"
      onClick={onOpen}
      data-cursor="hover"
      data-cursor-label={t("landing.cursor.open")}
      className="group flex w-[min(58vw,1040px,calc(52vh*16/9))] shrink-0 flex-col overflow-hidden rounded-[28px] border border-line bg-(--landing-card) text-left transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-2xl hover:shadow-black/10"
    >
      {/* capturas em Full HD (16:9): moldura na mesma proporção, imagem sempre inteira */}
      <div className="relative aspect-video w-full overflow-hidden border-b border-line bg-fill-1">
        {p.image && (
          <GlareImage className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-contain" />
          </GlareImage>
        )}
        <span className="absolute top-4 left-4 rounded-full bg-black/55 px-3 py-1 font-mono text-[11px] text-white backdrop-blur">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="flex items-end justify-between gap-6 p-6 md:p-7">
        <div className="min-w-0">
          <div className="flex h-5 items-center gap-2 font-mono text-[11px] tracking-[0.15em] text-text-lo uppercase">
            {p.year} · {p.category === "web" ? "Web" : "Mobile"}
            {p.status === "wip" && <WipBadge />}
          </div>
          <h3 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">{p.name}</h3>
          <span className="sr-only">— {t("landing.projects.details")}</span>
          <p className="mt-2 line-clamp-2 min-h-[2lh] max-w-xl text-sm leading-relaxed text-text-lo md:text-base">{p.tagline[lang]}</p>
        </div>
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line transition-all duration-300 group-hover:border-fx group-hover:bg-fx group-hover:text-black">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>
    </button>
  );
}

function HorizontalProjects({ onOpen }: { onOpen: (id: string) => void }) {
  const { t } = useI18n();
  return (
    <PinnedHorizontal
      footer={(progress) => (
        <div className="mt-8 flex items-center gap-6 px-[clamp(20px,5vw,96px)]">
          <SlideCounter progress={progress} total={projects.length + 2} />
          <div className="h-px flex-1 bg-line">
            <motion.div style={{ scaleX: progress }} className="h-px origin-left bg-fx" />
          </div>
          <span className="flex items-center gap-2 font-mono text-xs text-text-lo">
            {t("landing.projects.scrollHint")}
            <ArrowRight className="h-3.5 w-3.5 animate-pulse" />
          </span>
        </div>
      )}
    >
      {() => (
        <>
          <div className="flex w-[min(34vw,560px)] shrink-0 flex-col justify-center pr-6">
            <p className="font-mono text-sm text-text-lo">
              <span className="text-fx-ink">gui@os</span>:<PromptCommand text="~/projetos$ ls --destaques" />
            </p>
            <h2 className="mt-4 font-display text-6xl leading-[0.95] font-bold tracking-[-0.04em] xl:text-8xl">
              <SplitWords text={t("landing.sec.projects")} />
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-text-lo">{t("landing.projects.intro")}</p>
          </div>
          {projects.map((p, i) => (
            <ProjectSlide
              key={p.id}
              p={p}
              index={i}
              onOpen={() => onOpen(p.id)}
            />
          ))}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            data-cursor-label="GitHub ↗"
            className="group flex aspect-square w-[min(28vw,420px)] shrink-0 flex-col justify-between rounded-[28px] border border-dashed border-line-strong p-8 transition-colors hover:border-fx"
          >
            <span className="font-mono text-sm text-text-lo">~/github$ ls -a</span>
            <span className="font-display text-4xl leading-tight font-bold tracking-tight">
              {t("landing.projects.all")}
            </span>
            <ArrowUpRight className="h-10 w-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </>
      )}
    </PinnedHorizontal>
  );
}

export function ProjectsSection() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const wide = useMediaQuery("(min-width: 1024px)");
  const [openId, setOpenId] = useState<string | null>(null);
  const open = projects.find((p) => p.id === openId) ?? null;
  const horizontal = wide && !reduced;

  return (
    <section id="projetos" className={horizontal ? "" : "scroll-mt-24 py-20 md:py-32"}>
      {horizontal ? (
        <HorizontalProjects onOpen={setOpenId} />
      ) : (
        <Container>
          <PromptHeading
            command="~/projetos$ ls --destaques"
            title={t("landing.sec.projects")}
            aside={t("landing.sec.projectsAside")}
          />
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal key={p.id} delay={Math.min(i % 2, 1) * 0.08}>
                <ProjectCard p={p} onOpen={() => setOpenId(p.id)} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="group inline-flex items-center gap-1.5 font-mono text-sm underline decoration-line underline-offset-4 transition-colors hover:decoration-fx"
            >
              {t("landing.projects.all")}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </Container>
      )}
      <AnimatePresence>
        {open && <ProjectModal project={open} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </section>
  );
}

// ————— GuiOS: a tela se levanta com o scroll —————

export function GuiOSSection() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // -88° = tampa deitada sobre o teclado; 0° = aberta, de pé
  const tilt = useTransform(scrollYProgress, [0.04, 0.6], [-88, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [0.78, 1]);
  // Texto e botão aparecem quando a tela termina de abrir e FICAM: só somem se o
  // visitante voltar a rolar para cima (histerese entre 0.4 e 0.6).
  const [ctaShown, setCtaShown] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > 0.6) setCtaShown(true);
    else if (v < 0.4) setCtaShown(false);
  });

  return (
    <section
      ref={ref}
      id="guios"
      className="relative scroll-mt-0 border-y border-line bg-fill-1 lg:h-[260vh]"
    >
      <div
        ref={stage}
        className="relative flex flex-col items-center px-[clamp(20px,5vw,96px)] py-20 lg:sticky lg:top-0 lg:h-screen lg:justify-center lg:overflow-hidden lg:pt-20 lg:pb-8"
      >
        <SectionCrosshair container={stage} />
        <div className="text-center">
          <p className="font-mono text-xs text-text-lo md:text-sm">
            <span className="text-fx-ink">gui@os</span>:<PromptCommand text="~/guios$ ./boot --preview" />
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] text-balance md:text-5xl">
            {t("landing.os.title.before")}
            <Gradient>{t("landing.os.title.mark")}</Gradient>
          </h2>
        </div>

        <motion.div
          style={reduced ? undefined : { scale }}
          className="mt-8 w-full max-w-[min(74vw,calc((100vh-400px)*1.6))] max-lg:max-w-full"
        >
          <Link
            href="/os"
            aria-label={t("landing.os.cta")}
            data-cursor="hover"
            data-cursor-label={t("landing.cursor.open")}
            className="block"
          >
            <GuiOSShowcase label={t("landing.os.preview")} tilt={reduced ? undefined : tilt} />
          </Link>
        </motion.div>

        <motion.div
          initial={false}
          animate={reduced || ctaShown ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex max-w-3xl flex-col items-center gap-5 text-center md:flex-row md:text-left"
        >
          <p className="text-sm leading-relaxed text-text-lo">{t("landing.os.body")}</p>
          <Magnetic strength={0.25} className="shrink-0">
            <StarButton as={Link} href="/os" data-cursor="hover">
              <span className="inline-flex items-center gap-2 text-sm font-semibold whitespace-nowrap">
                {t("landing.os.cta")}
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </StarButton>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}

// ————— Ferramentas: faixas que andam com o scroll —————

// Do README do perfil no GitHub + o que uso na Altec. Para incluir uma ferramenta,
// basta acrescentar o nome na linha certa.
const STACK_ROWS = [
  {
    key: "landing.stack.frontend",
    items: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "Vue.js", "Flutter", "Motion", "Zustand"],
  },
  {
    key: "landing.stack.backend",
    items: ["PHP", "Node.js", "NestJS", "C#", "MySQL", "PostgreSQL", "Supabase", "Prisma", "Redis", "RabbitMQ", "Socket.IO"],
  },
  {
    key: "landing.stack.tools",
    items: ["Docker", "Nginx", "Vercel", "GitHub Actions", "Git", "Vitest", "Playwright", "PHPUnit", "PHPStan", "Figma"],
  },
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
      </Container>
      <ScrollRows rows={STACK_ROWS.map((r) => ({ label: t(r.key).toLowerCase(), items: r.items }))} />
    </section>
  );
}

// ————— Experiência: cartões que empilham —————

export function ExperienceSection() {
  const { lang, t } = useI18n();
  const job = career.find((c) => c.kind === "job");
  const personal = career.find((c) => c.kind === "personal");

  const entryCard = (c: (typeof career)[number], soft = false) => (
    <div className="grid min-h-[min(56vh,460px)] gap-6 p-8 md:grid-cols-[1fr_1.4fr] md:p-12">
      <div className="flex flex-col justify-between gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-mono text-sm text-fx-ink">
            {c.start} — {c.end ?? t("landing.exp.now")}
          </p>
          {soft && (
            <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-text-lo">
              {t("landing.exp.personalTag")}
            </span>
          )}
        </div>
        <div>
          <h3 className="font-display text-4xl leading-[1.02] font-bold tracking-[-0.03em] md:text-6xl">{c.role[lang]}</h3>
          <p className="mt-3 text-lg text-text-lo">
            {c.company} <span className="font-mono text-xs">· {c.location}</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-end gap-6">
        <p className="text-base leading-relaxed text-text-lo md:text-lg">{c.summary[lang]}</p>
        <div className="flex flex-wrap gap-1.5">
          {c.stack.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
      </div>
    </div>
  );

  const cards = [
    ...(job ? [{ key: job.id, node: entryCard(job) }] : []),
    {
      key: "edu",
      node: (
        <div className="grid min-h-[min(56vh,460px)] gap-6 p-8 md:grid-cols-[1fr_1.4fr] md:p-12">
          <div className="flex flex-col justify-between gap-6">
            <p className="font-mono text-sm text-fx-ink">
              {education.start} — {education.end}
            </p>
            <div>
              <p className="font-mono text-xs text-text-lo">
                <span className="text-fx-ink">tag</span> {t("landing.sec.edu").toLowerCase()}
              </p>
              <h3 className="mt-2 font-display text-4xl leading-[1.02] font-bold tracking-[-0.03em] md:text-6xl">
                {education.institution}
              </h3>
            </div>
          </div>
          <div className="flex flex-col justify-end">
            <p className="font-display text-2xl leading-snug font-semibold text-text-lo md:text-3xl">
              {education.degree[lang]}
            </p>
          </div>
        </div>
      ),
    },
    ...(personal ? [{ key: personal.id, node: entryCard(personal, true), tone: "soft" as const }] : []),
  ];

  return (
    <section id="experiencia" className="scroll-mt-24 border-y border-line bg-fill-1 py-20 md:py-32">
      <Container>
        <PromptHeading
          command="~/experiencia$ git log --oneline"
          title={t("landing.sec.exp")}
          aside={t("landing.sec.expAside")}
        />
        <StackCards cards={cards} />
      </Container>
    </section>
  );
}

// ————— Sobre: o texto acende conforme a leitura —————

export function AboutSection() {
  const { t } = useI18n();
  return (
    <section id="sobre" className="scroll-mt-24 py-20 md:py-32">
      <Container>
        <PromptHeading command="~/sobre$ cat bio.md" title={t("landing.sec.about")} />
        <div className="grid items-start gap-10 lg:grid-cols-[300px_1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PHOTO_9X16}
              alt="Guilherme Carvalho"
              width={720}
              height={1280}
              loading="lazy"
              className="aspect-[9/16] w-48 rounded-3xl border border-line object-cover lg:w-full"
            />
          </div>
          <div className="max-w-5xl space-y-10">
            <WordReveal
              text={t("landing.about.p1")}
              className="font-display text-2xl leading-[1.3] font-semibold tracking-tight md:text-4xl"
            />
            <WordReveal
              text={t("landing.about.p2")}
              className="font-display text-2xl leading-[1.3] font-semibold tracking-tight md:text-4xl"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}


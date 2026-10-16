"use client";

import Link from "next/link";
import { useReducedMotionSafe } from "./fx/useReducedMotionSafe";
import { MotionConfig, motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, Moon, Sun } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { GitHubIcon, InstagramIcon, LinkedInIcon } from "@/components/ui/icons";
import {
  PHOTO_3X4,
  EMAIL,
  GITHUB_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
} from "@/data/projects";
import { mainStack } from "@/data/career";
import { ContactForm } from "./ContactForm";
import { LandingContextMenu } from "./fx/LandingContextMenu";
import {
  Magnetic,
  ScrollProgress,
  TiltPhoto,
  VelocityMarquee,
} from "./fx/bits";
import {
  ContactThreads,
  CursorLayer,
  Gradient,
  HeroDots,
  HeroName,
  PromptCommand,
  RoleRotator,
  Shiny,
  StarButton,
} from "./fx/rb";
import { ZoomIn } from "./fx/scroll";
import {
  AboutSection,
  Container,
  ExperienceSection,
  GuiOSSection,
  ProjectsSection,
  Reveal,
  StackSection,
} from "./sections";

const NAV = [
  { href: "#projetos", key: "landing.nav.projects", path: "projetos" },
  { href: "#experiencia", key: "landing.nav.experience", path: "experiencia" },
  { href: "#sobre", key: "landing.nav.about", path: "sobre" },
  { href: "#contato", key: "landing.nav.contact", path: "contato" },
];

function Header() {
  const { lang, setLang, t } = useI18n();
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-(--landing-bg)/75 backdrop-blur-xl">
      <Container className="flex h-14 items-center justify-between">
        <a
          href="#top"
          data-cursor="hover"
          className="font-mono text-sm font-semibold tracking-tight"
        >
          GuiCMoreira
        </a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Seções">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-cursor="hover"
              className="group relative font-mono text-[13px] text-text-lo transition-colors hover:text-text-hi"
            >
              <span className="text-fx-ink/0 transition-colors group-hover:text-fx-ink">
                ./
              </span>
              {t(item.key)}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            data-cursor="hover"
            onClick={() => setLang(lang === "pt" ? "en" : "pt")}
            className="flex h-8 items-center rounded-full border border-line px-3 font-mono text-[11px] text-text-lo transition-colors hover:border-line-strong hover:text-text-hi"
            aria-label={`${lang.toUpperCase()}: ${lang === "pt" ? "switch to English" : "mudar para português"}`}
          >
            {lang.toUpperCase()}
          </button>
          <button
            type="button"
            data-cursor="hover"
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-text-lo transition-colors hover:border-line-strong hover:text-text-hi"
            aria-label={theme === "dark" ? "Modo claro" : "Modo escuro"}
          >
            {theme === "dark" ? (
              <Sun className="h-3.5 w-3.5" />
            ) : (
              <Moon className="h-3.5 w-3.5" />
            )}
          </button>
          <Magnetic strength={0.35}>
            <Link
              href="/os"
              data-cursor="hover"
              className="hidden h-8 items-center gap-1.5 rounded-full bg-text-hi px-4 font-mono text-xs font-semibold text-(--landing-bg) sm:flex"
            >
              GuiOS
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Magnetic>
        </div>
      </Container>
    </header>
  );
}

function Hero() {
  const { t } = useI18n();
  const reduced = useReducedMotionSafe();
  const { scrollY } = useScroll();
  // parallax sutil: a foto sobe mais devagar que o texto ao rolar
  const photoY = useTransform(scrollY, [0, 600], [0, reduced ? 0 : 70]);
  // ao rolar, o hero se afasta: encolhe, desfoca e some - a página "entra" no conteúdo
  const exitScale = useTransform(scrollY, [0, 700], [1, 0.9]);
  const exitOpacity = useTransform(scrollY, [150, 700], [1, 0]);
  const exitBlur = useTransform(
    scrollY,
    [150, 700],
    ["blur(0px)", "blur(8px)"],
  );

  const enter = (delay: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="relative flex min-h-[max(100dvh,640px)] flex-col justify-center overflow-hidden pt-20 pb-16">
      <HeroDots />
      <motion.div
        style={
          reduced
            ? undefined
            : { scale: exitScale, opacity: exitOpacity, filter: exitBlur }
        }
        className="relative origin-top"
      >
        <Container className="relative">
          <motion.p {...enter(0)} className="font-mono text-sm text-text-lo">
            <span className="text-fx-ink">gui@os</span>:~${" "}
            <PromptCommand text="whoami" />
            <span className="blink ml-1 inline-block h-[1em] w-[0.55em] translate-y-[2px] bg-fx" />
          </motion.p>

          <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-20">
            <div>
              <motion.div {...enter(0.08)}>
                <HeroName first="Guilherme" last="Carvalho" />
              </motion.div>

              <motion.div
                {...enter(0.18)}
                className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2"
              >
                <RoleRotator
                  prefix={t("landing.hero.rolePrefix")}
                  roles={t("landing.hero.roles").split("|")}
                />
                <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-text-lo uppercase">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  {t("landing.open")}
                </p>
              </motion.div>

              <motion.p
                {...enter(0.26)}
                className="mt-5 max-w-xl leading-relaxed text-text-lo md:text-lg"
              >
                {t("landing.hero.sub")}
              </motion.p>

              <motion.div
                {...enter(0.34)}
                className="mt-9 flex flex-wrap items-center gap-4"
              >
                <Magnetic strength={0.3}>
                  <StarButton as="a" href="#projetos" data-cursor="hover">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold">
                      {t("welcome.cta")}
                      <ArrowDown className="h-4 w-4" />
                    </span>
                  </StarButton>
                </Magnetic>
                {[
                  {
                    label: "LinkedIn",
                    href: LINKEDIN_URL,
                    icon: <LinkedInIcon className="h-4 w-4" />,
                  },
                  {
                    label: "Instagram",
                    href: INSTAGRAM_URL,
                    icon: <InstagramIcon className="h-4 w-4" />,
                  },
                  {
                    label: "GitHub",
                    href: GITHUB_URL,
                    icon: <GitHubIcon className="h-4 w-4" />,
                  },
                ].map((l) => (
                  <Magnetic key={l.label} strength={0.35}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="hover"
                      aria-label={l.label}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-text-lo transition-colors hover:border-line-strong hover:text-text-hi"
                    >
                      {l.icon}
                    </a>
                  </Magnetic>
                ))}
                <Magnetic strength={0.35}>
                  <a
                    href="#contato"
                    data-cursor="hover"
                    className="group inline-flex items-center gap-1 font-mono text-sm underline decoration-line underline-offset-4 transition-colors hover:decoration-fx"
                  >
                    {t("landing.hero.talk")}
                    <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
                  </a>
                </Magnetic>
              </motion.div>
            </div>

            <motion.div
              {...enter(0.2)}
              style={{ y: photoY }}
              className="justify-self-start lg:justify-self-end"
            >
              <TiltPhoto
                src={PHOTO_3X4}
                alt="Foto de Guilherme Carvalho"
                className="aspect-[3/4] w-56 sm:w-64 lg:w-[clamp(17rem,24vw,27rem)]"
              />
            </motion.div>
          </div>

          <motion.div
            {...enter(0.5)}
            className="mt-14 flex items-center justify-between font-mono text-[11px] text-text-lo md:mt-20"
          >
            <span className="flex items-center gap-2">
              <ArrowDown className="h-3.5 w-3.5 animate-bounce motion-reduce:animate-none" />
              {t("landing.scroll")}
            </span>
            <span className="hidden items-center gap-2 md:flex">
              <Shiny text={t("landing.hint.rightClick")} />
              <span className="rounded border border-line px-1.5 py-0.5">
                btn 2
              </span>
            </span>
          </motion.div>
        </Container>
      </motion.div>
    </section>
  );
}

function StackMarquee() {
  return (
    <div
      aria-hidden
      className="border-y border-line bg-fill-1 py-5 select-none md:py-7"
    >
      <VelocityMarquee baseSpeed={0.6}>
        {mainStack.map((s) => (
          <span
            key={s}
            className="flex items-center font-display text-3xl font-bold tracking-tight whitespace-nowrap text-text-hi/80 md:text-5xl"
          >
            <span className="px-5">{s}</span>
            <span className="text-sm text-fx md:text-xl">✦</span>
          </span>
        ))}
      </VelocityMarquee>
    </div>
  );
}

function ContactSection() {
  const { t } = useI18n();
  const social = [
    {
      label: "LinkedIn",
      handle: "guilherme-de-carvalho-moreira",
      cta: t("landing.contact.linkedinCta"),
      href: LINKEDIN_URL,
      icon: <LinkedInIcon className="h-6 w-6" />,
      tint: "bg-[#0a66c2] text-white",
    },
    {
      label: "Instagram",
      handle: "@_guic_m",
      cta: t("landing.contact.instagramCta"),
      href: INSTAGRAM_URL,
      icon: <InstagramIcon className="h-6 w-6" />,
      tint: "bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white",
    },
  ];
  return (
    <section
      id="contato"
      className="relative scroll-mt-24 overflow-hidden border-t border-line bg-fill-1 py-24 md:py-36"
    >
      <ContactThreads />
      <Container className="relative grid gap-12 lg:grid-cols-[1fr_minmax(0,560px)] lg:gap-16">
        <div>
          <ZoomIn>
            <p className="font-mono text-sm text-text-lo">
              <span className="text-fx-ink">gui@os</span>:~${" "}
              <PromptCommand text="./contato --agora" />
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,5.5vw,5.5rem)] leading-[1.02] font-bold tracking-[-0.03em] text-balance">
              {t("landing.contact.title.before")}
              <Gradient>{t("landing.contact.title.mark")}</Gradient>
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-text-lo md:text-lg">
              {t("landing.contact.body")}
            </p>
          </ZoomIn>

          <Reveal delay={0.1} className="mt-10">
            <p className="mb-3 font-mono text-xs text-text-lo">
              {t("landing.contact.channels")}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {social.map((s) => (
                <Magnetic key={s.label} strength={0.12}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    data-cursor-label={`${s.label} ↗`}
                    className="group flex items-center gap-4 rounded-2xl border border-line bg-(--landing-card) p-4 transition-colors hover:border-line-strong"
                  >
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${s.tint}`}
                    >
                      {s.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-lg font-semibold">
                        {s.label}
                      </span>
                      <span className="block truncate font-mono text-xs text-text-lo">
                        {s.handle}
                      </span>
                      <span className="mt-0.5 flex items-center gap-1 text-xs text-fx-ink">
                        {s.cta}
                        <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </span>
                  </a>
                </Magnetic>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-text-lo">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="inline-flex items-center gap-2 transition-colors hover:text-text-hi"
              >
                <GitHubIcon className="h-4 w-4" />
                GuiCMoreira
              </a>
              <span aria-hidden>·</span>
              <span>
                {t("landing.contact.emailAlt")}{" "}
                <a
                  href={`mailto:${EMAIL}`}
                  data-cursor="hover"
                  className="font-mono underline decoration-line underline-offset-4 hover:text-text-hi"
                >
                  {EMAIL}
                </a>
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}

function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-line py-8">
      <Container className="flex flex-col items-start justify-between gap-3 font-mono text-xs text-text-lo sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Guilherme Carvalho</p>
        <p>{t("landing.footer.made")}</p>
        <a
          href="#top"
          data-cursor="hover"
          className="underline decoration-line underline-offset-4 transition-colors hover:text-text-hi"
        >
          {t("landing.footer.top")}
        </a>
      </Container>
    </footer>
  );
}

export function Landing() {
  return (
    // "user": para quem prefere menos movimento, o Motion corta deslocamentos e escalas
    // das entradas sem mudar o HTML (a estrutura continua igual à do servidor).
    <MotionConfig reducedMotion="user">
      <CursorLayer>
        <main id="top" className="min-h-dvh bg-(--landing-bg) text-text-hi">
          <ScrollProgress />
          <LandingContextMenu />
          <Header />
          <Hero />
          <StackMarquee />
          <ProjectsSection />
          <GuiOSSection />
          <StackSection />
          <ExperienceSection />
          <AboutSection />
          <ContactSection />
          <Footer />
        </main>
      </CursorLayer>
    </MotionConfig>
  );
}

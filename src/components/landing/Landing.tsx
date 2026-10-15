"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Moon, Sun } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { AVATAR_URL, EMAIL, GITHUB_URL, INSTAGRAM_URL, LINKEDIN_URL } from "@/data/projects";
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
  { href: "#projetos", key: "landing.nav.projects" },
  { href: "#experiencia", key: "landing.nav.experience" },
  { href: "#sobre", key: "landing.nav.about" },
  { href: "#contato", key: "landing.nav.contact" },
];

function Header() {
  const { lang, setLang, t } = useI18n();
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-(--landing-bg)/80 backdrop-blur-xl">
      <Container className="flex h-14 items-center justify-between">
        <a href="#top" className="font-display text-sm font-semibold tracking-tight">
          Guilherme Carvalho<span className="text-accent">.</span>
        </a>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Seções">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-text-lo transition-colors hover:text-text-hi"
            >
              {t(item.key)}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLang(lang === "pt" ? "en" : "pt")}
            className="flex h-8 items-center rounded-full border border-line px-3 font-mono text-[11px] text-text-lo transition-colors hover:text-text-hi"
            aria-label={`${lang.toUpperCase()} — ${lang === "pt" ? "switch to English" : "mudar para português"}`}
          >
            {lang.toUpperCase()}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-text-lo transition-colors hover:text-text-hi"
            aria-label={theme === "dark" ? "Modo claro" : "Modo escuro"}
          >
            {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>
          <Link
            href="/os"
            className="hidden h-8 items-center gap-1.5 rounded-full bg-text-hi px-4 text-xs font-semibold text-(--landing-bg) transition-transform hover:scale-[1.04] active:scale-95 sm:flex"
          >
            GuiOS
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Container>
    </header>
  );
}

function Hero() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  });
  return (
    <section className="pt-32 pb-20 md:pt-44 md:pb-28">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-[1fr_auto] md:gap-16">
          <div>
            <motion.p {...enter(0)} className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-text-lo uppercase">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {t("landing.open")}
            </motion.p>
            <motion.h1
              {...enter(0.08)}
              className="mt-6 font-display text-[2.6rem] leading-[1.06] font-semibold tracking-tight text-balance md:text-7xl"
            >
              {t("landing.hero.before")}
              <span className="mark">{t("landing.hero.mark")}</span>
            </motion.h1>
            <motion.p {...enter(0.16)} className="mt-6 max-w-xl leading-relaxed text-text-lo md:text-lg">
              {t("landing.hero.sub")}
            </motion.p>
            <motion.div {...enter(0.24)} className="mt-8 flex flex-wrap items-center gap-5">
              {[
                { label: "E-mail", href: `mailto:${EMAIL}` },
                { label: "LinkedIn", href: LINKEDIN_URL },
                { label: "GitHub", href: GITHUB_URL },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1 text-sm font-medium underline decoration-line underline-offset-4 transition-colors hover:decoration-text-hi"
                >
                  {l.label}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </motion.div>
          </div>
          <motion.div {...enter(0.18)} className="justify-self-start md:justify-self-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={AVATAR_URL}
              alt="Foto de Guilherme Carvalho"
              width={208}
              height={208}
              className="aspect-square w-32 rounded-full border border-line object-cover shadow-xl shadow-black/10 md:w-52"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function ContactSection() {
  const { t } = useI18n();
  return (
    <section id="contato" className="scroll-mt-24 border-t border-line bg-fill-1 py-24 md:py-36">
      <Container>
        <Reveal>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-balance md:text-6xl">
            {t("landing.contact.title.before")}
            <span className="mark">{t("landing.contact.title.mark")}</span>
          </h2>
          <p className="mt-6 max-w-xl leading-relaxed text-text-lo">{t("landing.contact.body")}</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 rounded-full bg-text-hi px-6 py-3 text-sm font-semibold text-(--landing-bg) transition-transform hover:scale-[1.03] active:scale-95"
          >
            {EMAIL}
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-text-lo transition-colors hover:text-text-hi"
            aria-label="GitHub"
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-text-lo transition-colors hover:text-text-hi"
            aria-label="LinkedIn"
          >
            <LinkedInIcon className="h-5 w-5" />
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="flex h-11 items-center rounded-full border border-line px-4 text-sm text-text-lo transition-colors hover:text-text-hi"
          >
            Instagram
          </a>
        </Reveal>
      </Container>
    </section>
  );
}

function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-line py-8">
      <Container className="flex flex-col items-start justify-between gap-3 text-xs text-text-lo sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Guilherme Carvalho</p>
        <p>{t("landing.footer.made")}</p>
        <a href="#top" className="underline decoration-line underline-offset-4 transition-colors hover:text-text-hi">
          {t("landing.footer.top")}
        </a>
      </Container>
    </footer>
  );
}

export function Landing() {
  return (
    <main id="top" className="min-h-dvh bg-(--landing-bg) text-text-hi">
      <Header />
      <Hero />
      <ProjectsSection />
      <GuiOSSection />
      <StackSection />
      <ExperienceSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

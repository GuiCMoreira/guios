"use client";

import { useEffect, useRef, useState, type ComponentProps, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { useTheme } from "@/lib/theme";
import { useMediaQuery } from "./scroll";

/*
 * Adaptadores dos efeitos do React Bits aprovados no /lab: cada um é carregado
 * sob demanda (chunk próprio, só no client) e já recebe cores do tema atual.
 * O fallback de cada dynamic() é a versão estática — sem JS ou sem WebGL,
 * o conteúdo continua lá.
 */

const DotGrid = dynamic(() => import("@/components/rb/DotGrid"), { ssr: false });
const TechText = dynamic(() => import("@/components/rb/TechText"), { ssr: false });
const DecryptedText = dynamic(() => import("@/components/rb/DecryptedText"), { ssr: false });
const RotatingText = dynamic(() => import("@/components/rb/RotatingText"), { ssr: false });
const TargetCursor = dynamic(() => import("@/components/rb/TargetCursor"), { ssr: false });
const Crosshair = dynamic(() => import("@/components/rb/Crosshair"), { ssr: false });
const ClickSpark = dynamic(() => import("@/components/rb/ClickSpark"), {
  ssr: false,
  loading: () => null,
});
const StarBorder = dynamic(() => import("@/components/rb/StarBorder"), { ssr: false });
const GlareHover = dynamic(() => import("@/components/rb/GlareHover"), { ssr: false });
const Threads = dynamic(() => import("@/components/rb/Threads"), { ssr: false });
const ShinyText = dynamic(() => import("@/components/rb/ShinyText"), { ssr: false });
const GradientText = dynamic(() => import("@/components/rb/GradientText"), { ssr: false });

export const SKY = "#7dd3fc";
export const SKY_DEEP = "#0ea5e9";

function useDark() {
  return useTheme().theme === "dark";
}

/** Só monta perto da tela (e desmonta ao sair): WebGL/canvas fora de vista não gastam GPU. */
export function NearView({ children, className, margin = "300px" }: { children: ReactNode; className?: string; margin?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: `${margin} 0px` });
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return (
    <div ref={ref} className={className}>
      {on ? children : null}
    </div>
  );
}

// ————— Hero —————

/** #01 — grade de pontos viva atrás do hero (substitui a grade CSS estática). */
export function HeroDots() {
  const dark = useDark();
  return (
    <div
      aria-hidden
      className="absolute inset-0 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_45%,black,transparent)]"
    >
      <DotGrid
        dotSize={3}
        gap={26}
        baseColor={dark ? "#262a33" : "#d6d6da"}
        activeColor={SKY_DEEP}
        proximity={140}
        shockRadius={280}
        shockStrength={5}
      />
    </div>
  );
}

/**
 * #02 — nome em TechText, uma instância por linha (o componente desenha uma
 * linha e encolhe para caber). O <h1> real fica no DOM para SEO e leitores de
 * tela; a versão estática aparece enquanto o canvas carrega.
 */
export function HeroName({ first, last }: { first: string; last: string }) {
  const dark = useDark();
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // o chunk do TechText chega depois da hidratação: troca a versão estática pela viva
    let alive = true;
    import("@/components/rb/TechText").then(() => alive && setReady(true));
    return () => {
      alive = false;
    };
  }, []);
  const line = "block text-[clamp(3rem,10vw,9.5rem)] leading-[0.95]";
  return (
    <h1 className="font-display font-bold tracking-[-0.04em]">
      <span className={ready ? "sr-only" : ""}>
        <span className={line}>{first}</span>{" "}
        <span className={`${line} text-outline`}>{last}</span>
      </span>
      {ready && (
        <span aria-hidden className="block">
          {[
            { text: first, color: dark ? "#f2f4f8" : "#1d1d1f" },
            { text: last, color: dark ? "#5b6170" : "#a1a1a8" },
          ].map((l) => (
            // o TechText guarda 5% de margem à esquerda: alarga o canvas e puxa de volta
            // para o nome alinhar com o resto da coluna
            <span key={l.text} className="block w-full max-w-[920px]">
              <span className="-ml-[5.55%] block h-[clamp(3.4rem,11.5vw,10.5rem)] w-[111.1%]">
              <TechText
                text={l.text}
                reach={90}
                reveal={fine ? "letter" : "off"}
                labels={fine}
                fontWeight={700}
                fontSize={170}
                letterSpacing={-0.04}
                color={l.color}
                accentColor={SKY_DEEP}
                align="left"
                intro="assemble"
              />
              </span>
            </span>
          ))}
        </span>
      )}
    </h1>
  );
}

/** #06 — cargo que alterna. */
export function RoleRotator({ prefix, roles }: { prefix: string; roles: string[] }) {
  const reduced = useReducedMotion();
  return (
    <span className="inline-flex items-center gap-2 font-mono text-sm text-text-lo md:text-base">
      {prefix}
      <RotatingText
        texts={roles}
        auto={!reduced}
        rotationInterval={2400}
        staggerDuration={0.02}
        mainClassName="overflow-hidden rounded-md bg-fx px-2 py-0.5 text-black"
      />
    </span>
  );
}

// ————— Prompts e textos —————

/** #05 — comando do prompt se descriptografa ao entrar na tela. */
export function PromptCommand({ text }: { text: string }) {
  return (
    <DecryptedText
      text={text}
      animateOn="view"
      sequential
      speed={30}
      className="text-text-lo"
      encryptedClassName="text-fx-ink/60"
    />
  );
}

/** #23 — reflexo que passa pelo texto de tempos em tempos (dicas discretas). */
export function Shiny({ text, className }: { text: string; className?: string }) {
  // o ShinyText converte a cor para RGB sozinho e não entende var(): cores literais por tema
  const dark = useDark();
  return (
    <ShinyText
      text={text}
      className={className}
      color={dark ? "#9ba3b5" : "#636368"}
      shineColor={dark ? SKY : "#0369a1"}
      speed={3}
      delay={2}
    />
  );
}

/** #23 — gradiente azul animado nas frases de destaque (no lugar do marca-texto). */
export function Gradient({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <GradientText colors={[SKY_DEEP, SKY, "#a5b4fc", SKY_DEEP]} animationSpeed={6} className={className}>
      {children}
    </GradientText>
  );
}

// ————— Cursor e clique —————

/**
 * #09 + #11 — mira que trava nos alvos ([data-cursor], com o rótulo de
 * data-cursor-label) e faíscas em cada clique. O TargetCursor se desliga
 * sozinho em touch; as faíscas funcionam em toque também.
 */
export function CursorLayer({ children }: { children: ReactNode }) {
  const dark = useDark();
  const reduced = useReducedMotion();
  return (
    <ClickSpark
      sparkColor={dark ? SKY : SKY_DEEP}
      sparkCount={10}
      sparkRadius={30}
      glow={0.5}
      disabled={!!reduced}
      className="min-h-dvh"
    >
      {children}
      <TargetCursor
        targetSelector="[data-cursor]"
        cursorColor={dark ? "#f2f4f8" : "#1d1d1f"}
        cursorColorOnTarget={dark ? SKY : SKY_DEEP}
        blendMode="normal"
        spinDuration={3}
      />
    </ClickSpark>
  );
}

/** #10 — mira com coordenadas, só dentro do container (seção do GuiOS). */
export function SectionCrosshair({ container }: { container: React.RefObject<HTMLElement | null> }) {
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const dark = useDark();
  if (!fine) return null;
  return (
    <Crosshair
      containerRef={container}
      color={dark ? SKY : SKY_DEEP}
      opacity={0.5}
      targetEffect="none"
      lineStyle="dashed"
    />
  );
}

// ————— Botões, cards, faixas e fundos —————

type StarProps = ComponentProps<typeof StarBorder>;

/** #13 — estrelas orbitando a borda dos botões principais (fundo cheio: continuam sendo o CTA). */
export function StarButton(props: StarProps) {
  const dark = useDark();
  return (
    <StarBorder
      color={dark ? SKY : SKY_DEEP}
      theme={dark ? "dark" : "light"}
      backgroundColor="var(--text-hi)"
      textColor="var(--landing-bg)"
      {...props}
    />
  );
}

/** #14 — reflexo de vidro atravessando a imagem do projeto no hover. */
export function GlareImage({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <GlareHover
      width="100%"
      height="100%"
      background="transparent"
      borderColor="transparent"
      borderRadius="0px"
      glareColor="#ffffff"
      glareOpacity={0.28}
      className={className}
    >
      {children}
    </GlareHover>
  );
}

/** #20 — fios ondulando atrás do contato. */
export function ContactThreads() {
  const dark = useDark();
  return (
    <NearView className="absolute inset-0" margin="200px">
      <div aria-hidden className="h-full w-full opacity-70">
        <Threads color={dark ? SKY : SKY_DEEP} amplitude={1.1} enableMouseInteraction />
      </div>
    </NearView>
  );
}

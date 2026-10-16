"use client";

import { useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { useReducedMotionSafe } from "./useReducedMotionSafe";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

/** Media query reativa sem setState em efeito (SSR sempre false). */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", onChange);
      return () => m.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/**
 * Seção que trava na tela e converte o scroll vertical em movimento horizontal.
 * A altura da seção = 100vh + largura excedente da trilha, então 1px rolado
 * para baixo anda exatamente 1px para o lado. `children` recebe o progresso
 * (0→1) para que cada slide faça o próprio parallax.
 */
export function PinnedHorizontal({
  children,
  footer,
}: {
  children: (progress: MotionValue<number>) => ReactNode;
  footer?: (progress: MotionValue<number>) => ReactNode;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // O ResizeObserver dispara uma vez ao observar: é a medição inicial.
    const ro = new ResizeObserver(() =>
      setDist(Math.max(0, track.offsetWidth - window.innerWidth)),
    );
    ro.observe(track);
    const onResize = () =>
      setDist(Math.max(0, track.offsetWidth - window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, (v) => -v * dist);

  return (
    <div
      ref={sectionRef}
      style={{ height: `calc(100vh + ${dist}px)` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-14">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex w-max items-center gap-8 px-[clamp(20px,5vw,96px)]"
        >
          {children(scrollYProgress)}
        </motion.div>
        {footer?.(scrollYProgress)}
      </div>
    </div>
  );
}

/** Contador "03 / 08" que acompanha o progresso de uma trilha horizontal. */
export function SlideCounter({
  progress,
  total,
}: {
  progress: MotionValue<number>;
  total: number;
}) {
  const [i, setI] = useState(1);
  useMotionValueEvent(progress, "change", (v) => {
    setI(Math.min(total, Math.max(1, Math.round(v * (total - 1)) + 1)));
  });
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <span className="font-mono text-sm tabular-nums text-text-lo">
      <span className="text-fx-ink">{pad(i)}</span> / {pad(total)}
    </span>
  );
}

/**
 * Faixas de palavras gigantes ligadas ao scroll: linhas pares vão para a
 * esquerda, ímpares para a direita. Quem rola controla a velocidade —
 * diferente do marquee automático, aqui dá para parar e ler.
 */
export function ScrollRows({
  rows,
}: {
  rows: { label: string; items: string[] }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return (
    <div ref={ref} className="space-y-4 overflow-hidden py-4 md:space-y-6">
      {rows.map((row, i) => (
        <ScrollRow
          key={row.label}
          row={row}
          progress={scrollYProgress}
          reverse={i % 2 === 1}
          still={!!reduced}
        />
      ))}
    </div>
  );
}

function ScrollRow({
  row,
  progress,
  reverse,
  still,
}: {
  row: { label: string; items: string[] };
  progress: MotionValue<number>;
  reverse: boolean;
  still: boolean;
}) {
  const x = useTransform(
    progress,
    [0, 1],
    reverse ? ["-32%", "4%"] : ["4%", "-32%"],
  );
  // repete para a faixa nunca acabar dentro da tela
  const items = [...row.items, ...row.items, ...row.items];
  return (
    <motion.div
      style={still ? undefined : { x }}
      className="flex w-max items-center gap-5 whitespace-nowrap md:gap-8"
    >
      <span className="font-mono text-xs text-fx-ink md:text-sm">
        {row.label}/
      </span>
      {items.map((it, k) => (
        <span key={k} className="flex items-center gap-5 md:gap-8">
          <span
            className={`font-display text-3xl font-bold tracking-[-0.03em] md:text-5xl ${
              k % 2 === 1 ? "text-outline" : "text-text-hi"
            }`}
          >
            {it}
          </span>
          <span className="text-sm text-fx md:text-lg" aria-hidden>
            ✦
          </span>
        </span>
      ))}
    </motion.div>
  );
}

/**
 * Pilha de cartões (ScrollStack, versão sticky + motion): cada cartão gruda
 * um pouco abaixo do anterior e os de trás encolhem/escurecem enquanto os
 * novos chegam por cima.
 */
export type StackCardItem = { key: string; node: ReactNode; tone?: "soft" };

export function StackCards({ cards }: { cards: StackCardItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const n = cards.length;
  return (
    <div ref={ref} className="relative">
      {cards.map((c, i) => (
        <StackCard
          key={c.key}
          index={i}
          total={n}
          progress={scrollYProgress}
          tone={c.tone}
        >
          {c.node}
        </StackCard>
      ))}
    </div>
  );
}

function StackCard({
  children,
  index,
  total,
  progress,
  tone,
}: {
  children: ReactNode;
  index: number;
  total: number;
  progress: MotionValue<number>;
  tone?: "soft";
}) {
  const reduced = useReducedMotionSafe();
  const start = index / total;
  const target = 1 - (total - 1 - index) * 0.05;
  const scale = useTransform(progress, [start, 1], [1, target]);
  const dim = useTransform(
    progress,
    [start, 1],
    [0, (total - 1 - index) * 0.12],
  );
  return (
    <div
      className="sticky mb-[12vh] last:mb-0"
      style={{ top: `calc(16vh + ${index * 28}px)` }}
    >
      <motion.div
        style={reduced ? undefined : { scale }}
        className={`relative origin-top overflow-hidden rounded-[28px] shadow-2xl shadow-black/10 ${
          // "soft": cartão mais leve, tracejado — projetos pessoais não são vínculo de trabalho
          tone === "soft"
            ? "border border-dashed border-fx/40 bg-[color-mix(in_oklab,var(--landing-card)_90%,var(--fx))]"
            : "border border-line bg-(--landing-card)"
        }`}
      >
        {children}
        <motion.span
          aria-hidden
          style={reduced ? undefined : { opacity: dim }}
          className="pointer-events-none absolute inset-0 bg-black"
        />
      </motion.div>
    </div>
  );
}

/**
 * Texto que acende palavra por palavra conforme a leitura avança
 * (ScrollReveal). O texto inteiro está no DOM desde o início: leitor de tela
 * e SEO leem normalmente — só a opacidade é coreografada.
 */
export function WordReveal({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  // A estrutura (e o ref do scroll) é sempre a mesma; com "reduzir movimento" as
  // palavras só não variam de opacidade. Trocar de árvore quebrava a hidratação.
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <RevealWord
          key={i}
          still={!!reduced}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
        >
          {w}
        </RevealWord>
      ))}
    </p>
  );
}

function RevealWord({
  children,
  progress,
  range,
  still,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  still: boolean;
}) {
  // 0.5 é o mínimo que mantém contraste ≥3:1 (texto grande) nos dois temas
  const opacity = useTransform(progress, range, [0.5, 1]);
  return (
    <>
      <motion.span style={still ? undefined : { opacity }}>
        {children}
      </motion.span>{" "}
    </>
  );
}

/** Bloco que cresce de longe até o tamanho final enquanto entra na tela. */
export function ZoomIn({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.3"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.7, 1]);
  const blur = useTransform(
    scrollYProgress,
    [0, 0.7],
    ["blur(10px)", "blur(0px)"],
  );
  return (
    <motion.div
      ref={ref}
      style={reduced ? undefined : { scale, filter: blur }}
      className={`origin-left ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}

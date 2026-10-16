"use client";

import { useRef, useState, type ReactNode, type PointerEvent as ReactPointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";

/** Barra de progresso de leitura — fio azul colado no topo. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[80] h-[3px] origin-left bg-fx"
    />
  );
}

/**
 * Título que entra palavra por palavra, cada uma subindo da própria linha
 * (SplitText do react-bits, versão caseira). Com reduced-motion vira fade.
 */
export function SplitWords({ text, className }: { text: string; className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) {
    return (
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={className}
      >
        {text}
      </motion.span>
    );
  }
  // O gatilho fica no PAI: os spans internos nascem 110% para baixo e são
  // clipados pelo overflow-hidden — clipado nunca "entra em view" para o
  // IntersectionObserver, então whileInView neles jamais dispararia.
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: 0.05 }}
    >
      {/* leitores de tela leem o texto inteiro; a cópia animada fica oculta deles */}
      <span className="sr-only">{text}</span>
      {text.split(" ").map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: "110%" }, show: { y: 0 } }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
            {" "}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Botão/elemento magnético: desliza suavemente na direção do mouse (Magnet). */
export function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 240, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 240, damping: 18, mass: 0.4 });

  const onMove = (e: ReactPointerEvent) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Foto com tilt 3D que acompanha o mouse e revela a cor (TiltedCard).
 * Em touch/reduced-motion fica parada e colorida.
 */
export function TiltPhoto({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });

  const onMove = (e: ReactPointerEvent) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = ref.current!.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 16);
    rx.set(-py * 16);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
    setHover(false);
  };

  return (
    <div ref={ref} style={{ perspective: 700 }} className={className}>
      <motion.img
        src={src}
        alt={alt}
        onPointerMove={onMove}
        onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
        onPointerLeave={reset}
        style={reduced ? undefined : { rotateX: srx, rotateY: sry }}
        animate={reduced ? undefined : { scale: hover ? 1.04 : 1 }}
        transition={{ duration: 0.3 }}
        data-cursor="hover"
        className={`h-full w-full rounded-[28px] border border-line object-cover shadow-2xl shadow-black/20 transition-[filter] duration-500 ${
          reduced ? "" : hover ? "grayscale-0" : "grayscale"
        }`}
        draggable={false}
      />
    </div>
  );
}


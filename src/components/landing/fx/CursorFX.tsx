"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

type Spark = { id: number; x: number; y: number };

/**
 * Cursor do sistema: ponto que segue o mouse na hora + anel com mola atrás.
 * Em mix-blend-difference, funciona sobre claro e escuro sem trocar de cor.
 * Elementos com [data-cursor="hover"] crescem o anel; [data-cursor-label]
 * mostra um rótulo dentro dele (ex.: "abrir ↗" nos cards de projeto).
 * Clique dispara faíscas (ClickSpark). Só existe em ponteiro fino e sem
 * prefers-reduced-motion — touch e leitores nunca veem nada disso.
 */
export function CursorFX() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);
  const [mode, setMode] = useState<"idle" | "hover">("idle");
  const [label, setLabel] = useState<string | null>(null);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const sparkId = useRef(0);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.7 });
  const ringY = useSpring(y, { stiffness: 260, damping: 28, mass: 0.7 });

  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches) return;
    // Gate de hidratação intencional: só liga no client com ponteiro fino.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActive(true);
    document.documentElement.classList.add("os-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.("[data-cursor]");
      if (el) {
        setMode("hover");
        setLabel(el.getAttribute("data-cursor-label"));
      } else {
        setMode("idle");
        setLabel(null);
      }
    };
    const down = (e: PointerEvent) => {
      const id = ++sparkId.current;
      setSparks((s) => [...s.slice(-4), { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => setSparks((s) => s.filter((k) => k.id !== id)), 520);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    return () => {
      document.documentElement.classList.remove("os-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
    };
  }, [reduced, x, y]);

  if (!active) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]">
      {/* ponto */}
      <motion.div
        style={{ x, y }}
        className="absolute top-0 left-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
      />
      {/* anel com mola */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute top-0 left-0"
      >
        <motion.div
          animate={
            label
              ? { width: 76, height: 76, opacity: 1 }
              : mode === "hover"
                ? { width: 56, height: 56, opacity: 1 }
                : { width: 34, height: 34, opacity: 0.85 }
          }
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white mix-blend-difference"
        >
          {label && (
            <span className="font-mono text-[10px] whitespace-nowrap text-white">{label}</span>
          )}
        </motion.div>
      </motion.div>
      {/* faíscas de clique */}
      {sparks.map((s) => (
        <span key={s.id} className="absolute" style={{ left: s.x, top: s.y }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="click-spark absolute block h-[2px] w-[9px] rounded-full bg-fx"
              style={{ transform: `rotate(${i * 45}deg)` }}
            />
          ))}
        </span>
      ))}
    </div>
  );
}

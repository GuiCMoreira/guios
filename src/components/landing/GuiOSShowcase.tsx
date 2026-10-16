"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type MotionValue } from "motion/react";

// Viewport interno do iframe: largo o bastante para o GuiOS entrar no modo
// desktop (useIsMobile olha o innerWidth DO IFRAME, não o da página).
const PREVIEW_W = 1280;
const PREVIEW_H = 800;

/**
 * Mockup de MacBook com o GuiOS REAL rodando em miniatura.
 * O iframe carrega /os?preview=1 (sem boot, Sobre aberto), é escalado por
 * transform para caber na moldura e só monta quando a seção se aproxima do
 * viewport — ninguém paga o custo do OS sem rolar até aqui.
 */
export function GuiOSShowcase({ label, tilt }: { label: string; tilt?: MotionValue<number> }) {
  const screenRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = screenRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => setScale(el.clientWidth / PREVIEW_W));
    ro.observe(el);

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    io.observe(el);

    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    // perspectiva vista de cima: com a tampa fechada sobre o teclado, aparece o lado de fora dela
    <div aria-hidden className="select-none" style={{ perspective: 1800, perspectiveOrigin: "50% -20%" }}>
      {/* Tampa com duas faces. Com `tilt`, gira na dobradiça (borda de baixo):
          começa deitada sobre o teclado e abre até ficar de pé. */}
      <motion.div
        style={tilt ? { rotateX: tilt, transformOrigin: "50% 100%", transformStyle: "preserve-3d" } : undefined}
        className="relative"
      >
        <div className="rounded-[18px] bg-gradient-to-b from-zinc-300 to-zinc-400 p-[3px] shadow-2xl shadow-black/30 [backface-visibility:hidden] md:rounded-[22px] dark:from-zinc-600 dark:to-zinc-800">
          <div className="rounded-[15px] bg-[#0a0a0c] p-2 md:rounded-[19px] md:p-2.5">
            <div
              ref={screenRef}
              className="relative aspect-[16/10] overflow-hidden rounded-[8px] bg-ink md:rounded-[10px]"
            >
              {mounted && scale > 0 && (
                <iframe
                  src="/os?preview=1"
                  title={label}
                  tabIndex={-1}
                  loading="lazy"
                  className="pointer-events-none absolute top-0 left-0 origin-top-left border-0"
                  style={{ width: PREVIEW_W, height: PREVIEW_H, transform: `scale(${scale})` }}
                />
              )}
            </div>
          </div>
        </div>
        {/* Lado de fora da tampa (alumínio + logo), visível enquanto está fechada */}
        <div className="absolute inset-0 flex items-center justify-center rounded-[18px] bg-gradient-to-b from-zinc-200 to-zinc-400 [backface-visibility:hidden] [transform:rotateX(180deg)] md:rounded-[22px] dark:from-zinc-500 dark:to-zinc-700">
          <span className="font-display text-5xl font-bold text-white/70 md:text-7xl dark:text-zinc-300/60">G</span>
        </div>
      </motion.div>
      {/* Base: mesma largura da tela, reta — só a tampa se move */}
      <div className="relative h-3 w-full rounded-b-[16px] bg-gradient-to-b from-zinc-200 to-zinc-400 shadow-xl shadow-black/25 md:h-4 dark:from-zinc-500 dark:to-zinc-800">
        <span className="absolute top-0 left-1/2 h-1.5 w-[14%] -translate-x-1/2 rounded-b-lg bg-zinc-400/80 dark:bg-zinc-700" />
      </div>
    </div>
  );
}

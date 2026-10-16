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
    <div aria-hidden className="select-none [perspective:1400px]">
      {/* Tampa: moldura de alumínio + bezel preto. Com `tilt`, gira a partir da
          dobradiça (borda de baixo) — a tela "se levanta" conforme o scroll. */}
      <motion.div
        style={tilt ? { rotateX: tilt, transformOrigin: "50% 100%" } : undefined}
        className="rounded-[18px] bg-gradient-to-b from-zinc-300 to-zinc-400 p-[3px] shadow-2xl shadow-black/30 md:rounded-[22px] dark:from-zinc-600 dark:to-zinc-800">
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
      </motion.div>
      {/* Base do MacBook */}
      <div className="mx-auto h-[7px] w-[96%] rounded-b-[10px] bg-gradient-to-b from-zinc-300 to-zinc-500 shadow-lg shadow-black/20 md:h-2 dark:from-zinc-500 dark:to-zinc-800" />
      <div className="mx-auto h-1 w-[14%] rounded-b-full bg-zinc-400/80 dark:bg-zinc-700" />
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

// Largura interna do iframe: larga o bastante para o GuiOS entrar no modo
// desktop (useIsMobile olha o innerWidth DO IFRAME, não o da página).
const PREVIEW_W = 1280;

/**
 * O GuiOS REAL rodando em miniatura, preenchendo o elemento pai.
 * O iframe carrega /os?preview=1 (sem boot, Sobre aberto) com 1280px de largura
 * e a altura que mantém a proporção do pai, e é escalado por transform para
 * caber. Só monta quando chega perto da tela: ninguém paga o custo do OS sem
 * rolar até aqui (e um pai com display:none nunca monta).
 */
export function GuiOSScreen({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ scale: 0, height: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // clientWidth/Height ignoram transforms do pai: a medida é a do layout
    const ro = new ResizeObserver(() => {
      const scale = el.clientWidth / PREVIEW_W;
      setBox({ scale, height: scale ? el.clientHeight / scale : 0 });
    });
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
    <div
      ref={ref}
      aria-hidden
      className="absolute inset-0 overflow-hidden bg-ink select-none"
    >
      {mounted && box.scale > 0 && (
        <iframe
          src="/os?preview=1"
          title={label}
          tabIndex={-1}
          loading="lazy"
          className="pointer-events-none absolute top-0 left-0 origin-top-left border-0"
          style={{
            width: PREVIEW_W,
            height: box.height,
            transform: `scale(${box.scale})`,
          }}
        />
      )}
    </div>
  );
}

/** Mockup estático de notebook aberto (celular e tablet, onde o MacbookScroll não cabe). */
export function GuiOSShowcase({ label }: { label: string }) {
  return (
    <div aria-hidden className="select-none">
      <div className="rounded-[18px] bg-gradient-to-b from-zinc-300 to-zinc-400 p-[3px] shadow-2xl shadow-black/30 md:rounded-[22px] dark:from-zinc-600 dark:to-zinc-800">
        <div className="rounded-[15px] bg-[#0a0a0c] p-2 md:rounded-[19px] md:p-2.5">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[8px] md:rounded-[10px]">
            <GuiOSScreen label={label} />
          </div>
        </div>
      </div>
      <div className="relative h-3 w-full rounded-b-[16px] bg-gradient-to-b from-zinc-200 to-zinc-400 shadow-xl shadow-black/25 md:h-4 dark:from-zinc-500 dark:to-zinc-800">
        <span className="absolute top-0 left-1/2 h-1.5 w-[14%] -translate-x-1/2 rounded-b-lg bg-zinc-400/80 dark:bg-zinc-700" />
      </div>
    </div>
  );
}

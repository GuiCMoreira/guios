import type { AppId } from "./types";

// Tamanho com que cada app abre (o usuário pode redimensionar depois).
export const DEFAULT_SIZE: Record<AppId, { w: number; h: number }> = {
  projects: { w: 860, h: 560 },
  safari: { w: 900, h: 600 },
  terminal: { w: 680, h: 440 },
  about: { w: 760, h: 560 },
  contact: { w: 520, h: 440 },
};

// Mínimos do resize em Window.tsx — a janela nunca nasce menor que isso.
const MIN_W = 320;
const MIN_H = 220;
const GAP = 24;
const CASCADE = 28;

/**
 * Onde (e com que tamanho) uma janela nova deve nascer: na área livre da mesa,
 * à direita do cartão de apresentação e sem cobrir o widget de clima.
 * Mede o DOM na hora; sem mesa (mobile) ou sem DOM (SSR), devolve null.
 * `cascade` = quantas janelas já estão abertas (cada uma desloca um pouco).
 */
export function placeWindow(
  id: AppId,
  cascade: number,
): {
  pos: { x: number; y: number };
  size: { w: number; h: number } | null;
} | null {
  if (typeof document === "undefined") return null;
  const layer = document.querySelector<HTMLElement>("[data-window-layer]");
  if (!layer) return null;
  const L = layer.getBoundingClientRect();
  const welcome = document
    .querySelector<HTMLElement>("[data-desktop-widget='welcome']")
    ?.getBoundingClientRect();
  const weather = document
    .querySelector<HTMLElement>("[data-desktop-widget='weather']")
    ?.getBoundingClientRect();

  const def = DEFAULT_SIZE[id];
  const offset = (cascade % 5) * CASCADE;

  // faixa livre horizontal: depois do cartão até a borda direita
  const left = welcome ? welcome.right - L.left + GAP : GAP;
  const right = L.width - GAP;
  // se o cartão ocupa quase tudo (tela estreita), desiste de evitá-lo
  const freeW = right - left;
  const startX = freeW >= MIN_W ? left : GAP;
  let w = Math.min(def.w, right - startX);
  w = Math.max(w, Math.min(MIN_W, L.width - 2 * GAP));

  let x = startX + offset;
  if (x + w > right) x = Math.max(startX, right - w);

  // vertical: começa no topo; se a janela alcança a coluna do clima, desce abaixo dele
  let y = 16 + offset;
  if (weather) {
    const weatherLeft = weather.left - L.left;
    const weatherBottom = weather.bottom - L.top;
    if (x + w > weatherLeft - GAP && y < weatherBottom + GAP)
      y = weatherBottom + GAP + offset;
  }
  const bottom = L.height - 12;
  let h = Math.min(def.h, bottom - y);
  if (h < MIN_H) {
    // pouca altura: sobe o que der e garante o mínimo
    y = Math.max(8, bottom - Math.max(MIN_H, Math.min(def.h, bottom - 8)));
    h = Math.min(def.h, bottom - y);
  }

  const resized = w !== def.w || h !== def.h;
  return {
    pos: { x: Math.round(x), y: Math.round(y) },
    size: resized ? { w: Math.round(w), h: Math.round(h) } : null,
  };
}

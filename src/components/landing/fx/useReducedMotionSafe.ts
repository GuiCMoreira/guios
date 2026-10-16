"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * "Prefere menos movimento?" sem quebrar a hidratação: o servidor não conhece a
 * preferência, então a primeira renderização responde false (igual ao HTML do
 * servidor) e o React re-renderiza com o valor real logo em seguida.
 * O useReducedMotion do Motion lê o valor real já na hidratação e gerava estruturas
 * e estilos diferentes dos do servidor.
 */
export function useReducedMotionSafe() {
  return useSyncExternalStore(
    (onChange) => {
      const m = window.matchMedia(QUERY);
      m.addEventListener("change", onChange);
      return () => m.removeEventListener("change", onChange);
    },
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

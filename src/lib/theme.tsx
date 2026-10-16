"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { flushSync } from "react-dom";
import { storageGet, storageSet } from "./safe-storage";

export type Theme = "light" | "dark";

const STORAGE_KEY = "guios.theme";

// Duração do fade entre os temas (o CSS lê --theme-fade em globals.css).
const FADE_MS = 3000;

/**
 * Troca o tema com um fade de verdade: o navegador fotografa a página no tema
 * antigo, aplica o novo por baixo e cruza as duas imagens (View Transitions API).
 * Funciona até com canvas e WebGL, que não obedecem `transition` de CSS.
 * Sem suporte ou com "reduzir movimento", troca na hora, como antes.
 * Rolar, tocar ou apertar uma tecla durante o fade encerra o fade: a foto
 * fica parada, e a página se mexendo por baixo pareceria travada.
 */
// o tema aplicado de fato é a classe no <html>; lida no clique, fora do render
const currentTheme = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

function fadeTheme(apply: () => void) {
  const root = document.documentElement;
  if (
    typeof document.startViewTransition !== "function" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    apply();
    return;
  }
  root.style.setProperty("--theme-fade", `${FADE_MS}ms`);
  root.classList.add("theme-fading");
  const transition = document.startViewTransition(apply);
  const skip = () => transition.skipTransition();
  const events = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
  // registrados depois do clique que disparou a troca, para ele não encerrar o fade
  requestAnimationFrame(() =>
    events.forEach((e) =>
      window.addEventListener(e, skip, { once: true, passive: true }),
    ),
  );
  transition.finished.finally(() => {
    root.classList.remove("theme-fading");
    events.forEach((e) => window.removeEventListener(e, skip));
  });
}

interface ThemeValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    // Hidratação única: escolha salva > preferência do sistema.
    const saved = storageGet("local", STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThemeState(
      saved === "light" || saved === "dark"
        ? saved
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
    );
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    if (t === currentTheme()) return;
    storageSet("local", STORAGE_KEY, t);
    fadeTheme(() => {
      // a View Transition exige o DOM já trocado quando o callback termina
      flushSync(() => setThemeState(t));
      document.documentElement.classList.toggle("dark", t === "dark");
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(currentTheme() === "dark" ? "light" : "dark");
  }, [setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme deve ser usado dentro de ThemeProvider");
  return ctx;
}

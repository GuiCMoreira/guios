"use client";

import { useEffect, useState } from "react";
import { useReducedMotionSafe } from "./useReducedMotionSafe";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Languages,
  Moon,
  Sun,
  TerminalSquare,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import {
  EMAIL,
  GITHUB_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
} from "@/data/projects";

type MenuState = { x: number; y: number } | null;

function Item({
  icon,
  children,
  onClick,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] text-text-hi transition-colors hover:bg-fill-2"
    >
      <span className="text-text-lo">{icon}</span>
      {children}
    </button>
  );
}

const MENU_W = 240;
const MENU_H = 308;

/**
 * Botão direito da landing: em vez do menu do Chrome, o menu do sistema.
 * Desktop com mouse apenas - no touch o long-press continua nativo.
 */
export function LandingContextMenu() {
  const { lang, setLang, t } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const reduced = useReducedMotionSafe();
  const router = useRouter();
  const [menu, setMenu] = useState<MenuState>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onCtx = (e: MouseEvent) => {
      // dentro de inputs/áreas editáveis, deixa o menu nativo
      const t = e.target as HTMLElement | null;
      if (t?.closest("input, textarea, [contenteditable]")) return;
      e.preventDefault();
      setMenu({
        x: Math.min(e.clientX, window.innerWidth - MENU_W - 12),
        y: Math.min(e.clientY, window.innerHeight - MENU_H - 12),
      });
    };
    const close = () => setMenu(null);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("contextmenu", onCtx);
    window.addEventListener("resize", close);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("contextmenu", onCtx);
      window.removeEventListener("resize", close);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => {
        setCopied(false);
        setMenu(null);
      }, 900);
    } catch {
      setMenu(null);
    }
  };

  return (
    <AnimatePresence>
      {menu && (
        <>
          <button
            type="button"
            aria-label={t("landing.ctx.close")}
            tabIndex={-1}
            className="fixed inset-0 z-[84] cursor-default"
            onClick={() => setMenu(null)}
            onContextMenu={(e) => {
              e.preventDefault();
              setMenu(null);
            }}
          />
          <motion.div
            role="menu"
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
            style={{ left: menu.x, top: menu.y, width: MENU_W }}
            className="glass-solid fixed z-[85] origin-top-left rounded-xl p-1.5 shadow-2xl shadow-black/30"
          >
            <p className="px-3 pt-1.5 pb-1 font-mono text-[10px] tracking-widest text-text-lo">
              gui@os:~$
            </p>
            <Item
              icon={<TerminalSquare className="h-4 w-4" />}
              onClick={() => {
                setMenu(null);
                router.push("/os");
              }}
            >
              {t("landing.nav.os")}
            </Item>
            <Item
              icon={<ArrowUpRight className="h-4 w-4" />}
              onClick={() => {
                setMenu(null);
                window.open(LINKEDIN_URL, "_blank", "noreferrer");
              }}
            >
              LinkedIn
            </Item>
            <Item
              icon={<ArrowUpRight className="h-4 w-4" />}
              onClick={() => {
                setMenu(null);
                window.open(INSTAGRAM_URL, "_blank", "noreferrer");
              }}
            >
              Instagram
            </Item>
            <div className="mx-2 my-1 h-px bg-line" aria-hidden />
            <Item
              icon={
                theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )
              }
              onClick={() => toggleTheme()}
            >
              {theme === "dark"
                ? t("landing.ctx.light")
                : t("landing.ctx.dark")}
            </Item>
            <Item
              icon={<Languages className="h-4 w-4" />}
              onClick={() => setLang(lang === "pt" ? "en" : "pt")}
            >
              {lang === "pt" ? "English" : "Português"}
            </Item>
            <div className="mx-2 my-1 h-px bg-line" aria-hidden />
            <Item
              icon={<ArrowUpRight className="h-4 w-4" />}
              onClick={() => {
                setMenu(null);
                window.open(GITHUB_URL, "_blank", "noreferrer");
              }}
            >
              GitHub
            </Item>
            <Item
              icon={
                copied ? (
                  <Check className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )
              }
              onClick={copyEmail}
            >
              {copied ? t("landing.ctx.copied") : t("landing.ctx.copyEmail")}
            </Item>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

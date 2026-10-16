import Link from "next/link";
import { FuzzyCode } from "@/components/landing/fx/FuzzyCode";

// 404 temático: kernel panic do GuiOS. Funciona sem JS (o "404" com interferência é só um bônus).
export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-[#07080c] p-8 text-center font-mono">
      <FuzzyCode />
      <h1 className="mt-6 text-xl font-bold text-white">KERNEL PANIC: 404</h1>
      <div className="mt-4 max-w-md space-y-1 text-[13px] leading-relaxed text-neutral-400">
        <p>panic: page_not_found at 0x00000194</p>
        <p>&gt; você encontrou uma tela que nem o GuiOS sabia que existia.</p>
        <p className="text-neutral-600">&gt; you found a screen not even GuiOS knew existed.</p>
      </div>
      <Link
        href="/"
        className="mt-8 rounded-xl border border-neutral-700 px-5 py-2.5 text-[13px] font-semibold text-neutral-300 transition-colors hover:border-neutral-400 hover:text-white"
      >
        ⏻ Reiniciar o sistema
      </Link>
    </main>
  );
}

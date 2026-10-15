"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { useOSStore } from "@/lib/store";
import { useIsMobile } from "@/lib/hooks";
import { storageGet, storageSet } from "@/lib/safe-storage";
import { BootScreen } from "./BootScreen";
import { Desktop } from "./Desktop";
import { PowerOverlay } from "./PowerOverlay";
import { SystemDialogs } from "./SystemDialogs";
import { ContactNotification } from "./DesktopExtras";
import { MobileShell } from "@/components/mobile/MobileShell";

const BOOT_FLAG = "guios.booted";

// preview: modo vitrine para o iframe da landing — sem boot, sem notificação,
// com o Sobre já aberto para a miniatura parecer viva.
export function GuiOS({ preview = false }: { preview?: boolean }) {
  const booted = useOSStore((s) => s.booted);
  const setBooted = useOSStore((s) => s.setBooted);
  const openApp = useOSStore((s) => s.openApp);
  // null = ainda não sabemos (SSR); evita flash do boot em quem já bootou na sessão.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (preview) {
      setBooted(true);
      openApp("about");
    } else if (storageGet("session", BOOT_FLAG) === "1") {
      setBooted(true);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true);
  }, [preview, setBooted, openApp]);

  const isMobile = useIsMobile();

  const finishBoot = () => {
    storageSet("session", BOOT_FLAG, "1");
    setBooted(true);
    // Primeiro boot da sessão: abre o Sobre para o visitante não cair numa
    // mesa vazia sem saber onde clicar (no mobile a grade já se explica).
    if (!isMobile) openApp("about");
  };

  if (!ready) return <div className="h-dvh w-full bg-ink" aria-hidden />;

  return (
    <>
      {isMobile ? <MobileShell /> : <Desktop />}
      <SystemDialogs />
      {!preview && <ContactNotification />}
      <AnimatePresence>{!booted && <BootScreen onDone={finishBoot} />}</AnimatePresence>
      <PowerOverlay />
    </>
  );
}

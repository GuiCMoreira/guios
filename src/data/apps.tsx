import type { AppId } from "@/lib/types";
import { DEFAULT_SIZE } from "@/lib/window-placement";
import {
  FinderIcon,
  MailIcon,
  NotesIcon,
  SafariIcon,
  TerminalMacIcon,
} from "@/components/ui/app-icons";
import { ProjectsApp } from "@/components/apps/projects/ProjectsApp";
import { SafariApp } from "@/components/apps/safari/SafariApp";
import { TerminalApp } from "@/components/apps/terminal/TerminalApp";
import { AboutApp } from "@/components/apps/about/AboutApp";
import { ContactApp } from "@/components/apps/contact/ContactApp";

export interface AppDefinition {
  id: AppId;
  titleKey: string;
  /** ícone completo estilo macOS (squircle colorido, SVG próprio) */
  icon: React.ComponentType<{ className?: string }>;
  component: React.ComponentType;
  defaultSize: { w: number; h: number };
}

export const APPS: AppDefinition[] = [
  {
    id: "projects",
    titleKey: "apps.projects",
    icon: FinderIcon,
    component: ProjectsApp,
    defaultSize: DEFAULT_SIZE.projects,
  },
  {
    id: "safari",
    titleKey: "apps.safari",
    icon: SafariIcon,
    component: SafariApp,
    defaultSize: DEFAULT_SIZE.safari,
  },
  {
    id: "terminal",
    titleKey: "apps.terminal",
    icon: TerminalMacIcon,
    component: TerminalApp,
    defaultSize: DEFAULT_SIZE.terminal,
  },
  {
    id: "about",
    titleKey: "apps.about",
    icon: NotesIcon,
    component: AboutApp,
    defaultSize: DEFAULT_SIZE.about,
  },
  {
    id: "contact",
    titleKey: "apps.contact",
    icon: MailIcon,
    component: ContactApp,
    defaultSize: DEFAULT_SIZE.contact,
  },
];

export function getApp(id: AppId): AppDefinition {
  const app = APPS.find((a) => a.id === id);
  if (!app) throw new Error(`App desconhecido: ${id}`);
  return app;
}

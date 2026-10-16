export type AppId = "projects" | "safari" | "terminal" | "about" | "contact";

export type Lang = "pt" | "en";

export interface LocalizedText {
  pt: string;
  en: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: LocalizedText;
  description: LocalizedText;
  category: "web" | "mobile";
  featured: boolean;
  stack: string[];
  github?: string;
  demo?: string;
  year: number;
  highlights?: LocalizedText[];
  /** Captura da página inicial, servida de /public/projects. */
  image?: string;
  /** "wip" = em desenvolvimento ativo, exibido com selo na vitrine. */
  status?: "wip";
  /** Explicação para quem não é da área (recrutadores, curiosos). */
  plain?: {
    what: LocalizedText;
    problem: LocalizedText;
    myPart: LocalizedText;
  };
}

export interface CareerEntry {
  id: string;
  /** "personal" = projetos próprios e estudos (não é vínculo de trabalho). */
  kind?: "job" | "personal";
  role: LocalizedText;
  company: string;
  location: string;
  start: string;
  end: string | null;
  summary: LocalizedText;
  stack: string[];
}

export interface WindowState {
  appId: AppId;
  open: boolean;
  minimized: boolean;
  maximized: boolean;
  z: number;
  pos: { x: number; y: number };
  /** tamanho definido pelo usuário via resize; null = tamanho padrão do app */
  size: { w: number; h: number } | null;
  payload?: string;
}

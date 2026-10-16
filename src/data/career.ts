import type { CareerEntry, LocalizedText } from "@/lib/types";

// Datas confirmadas pelo Guilherme em 15/10/2026.
export const career: CareerEntry[] = [
  {
    id: "altec",
    kind: "job",
    role: { pt: "Desenvolvedor Full Stack", en: "Full Stack Developer" },
    company: "Altec Sistemas",
    location: "Bragança Paulista, SP",
    start: "08/2026",
    end: null,
    summary: {
      pt: "Desenvolvimento e evolução do ecossistema de produtos para food service: ERP multi-tenant de retaguarda, frente de caixa, apps de PDV, totem e cozinha em Flutter e BI, do banco de dados à interface.",
      en: "Building and evolving a product ecosystem for the food service industry: a multi-tenant back-office ERP, point of sale, Flutter apps for POS, kiosk and kitchen, and BI, from database to UI.",
    },
    // levantado dos repositórios da Altec com commits do Guilherme (out/2026)
    stack: [
      "PHP",
      "MySQL",
      "JavaScript",
      "TypeScript",
      "React",
      "Vue.js",
      "Flutter",
      "Dart",
      "C#",
      "Node.js",
      "Redis",
      "Docker",
      "Nginx",
      "PHPUnit",
      "Playwright",
      "GitHub Actions",
    ],
  },
  {
    id: "pessoal",
    kind: "personal",
    role: {
      pt: "Projetos pessoais e estudos",
      en: "Personal projects & study",
    },
    company: "GitHub · GuiCMoreira",
    location: "Remoto",
    start: "2022",
    end: null,
    summary: {
      pt: "Projetos próprios para aprender e experimentar: microsserviços com filas, SaaS multi-tenant, PHP sem framework e até um sistema operacional no navegador. É onde testo arquitetura, testes automatizados e deploy de ponta a ponta.",
      en: "My own projects to learn and experiment: queue-driven microservices, multi-tenant SaaS, framework-free PHP and even an operating system in the browser. It's where I try out architecture, automated testing and end-to-end deployment.",
    },
    // do README do perfil no GitHub
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "NestJS",
      "Tailwind CSS",
      "PHP",
      "PostgreSQL",
      "Supabase",
      "Prisma",
      "Redis",
      "RabbitMQ",
      "Socket.IO",
      "Docker",
      "Vitest",
      "Vercel",
      "Figma",
    ],
  },
];

export const education = {
  institution: "FATEC Bragança Paulista",
  degree: {
    pt: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
    en: "Associate degree in Systems Analysis and Development",
  },
  start: "2023",
  end: "2025",
};

export const mainStack = [
  "Next.js",
  "React",
  "TypeScript",
  "PHP",
  "MySQL",
  "Node.js",
  "React Native",
  "Docker",
  "Tailwind CSS",
  "RabbitMQ",
];

// Ferramentas agrupadas - do README do perfil no GitHub + o que uso na Altec.
// Usado pela landing (faixas da seção Ferramentas) e pela nota "Stack & specs" do GuiOS.
// Para incluir uma ferramenta, basta acrescentar o nome no grupo certo.
export const toolGroups: {
  id: string;
  label: LocalizedText;
  items: string[];
}[] = [
  {
    id: "frontend",
    label: { pt: "Frontend", en: "Frontend" },
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Vue.js",
      "Flutter",
      "Motion",
      "Zustand",
    ],
  },
  {
    id: "backend",
    label: { pt: "Backend & dados", en: "Backend & data" },
    items: [
      "PHP",
      "Node.js",
      "NestJS",
      "C#",
      "MySQL",
      "PostgreSQL",
      "Supabase",
      "Prisma",
      "Redis",
      "RabbitMQ",
      "Socket.IO",
    ],
  },
  {
    id: "tools",
    label: { pt: "Infra & ferramentas", en: "Infra & tooling" },
    items: [
      "Docker",
      "Nginx",
      "Vercel",
      "GitHub Actions",
      "Git",
      "Vitest",
      "Playwright",
      "PHPUnit",
      "PHPStan",
      "Figma",
    ],
  },
];

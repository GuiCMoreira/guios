import type { Project } from "@/lib/types";

export const GITHUB_URL = "https://github.com/GuiCMoreira";
export const LINKEDIN_URL = "https://www.linkedin.com/in/guilherme-de-carvalho-moreira/";
export const INSTAGRAM_URL = "https://www.instagram.com/_guic_m/";
export const AVATAR_URL = "https://avatars.githubusercontent.com/u/142915547?v=4";
export const EMAIL = "gui0307carvalho@gmail.com";

export const projects: Project[] = [
  {
    id: "restaurant-digital",
    name: "restaurant-digital",
    year: 2026,
    category: "web",
    featured: true,
    stack: ["Next.js", "NestJS", "RabbitMQ", "Socket.IO", "Supabase", "Redis"],
    github: "https://github.com/GuiCMoreira/restaurant-digital",
    demo: "https://restaurant-digital-web.vercel.app",
    tagline: {
      pt: "Cardápio digital em microsserviços que conversam por filas",
      en: "Digital menu built on microservices that talk through queues",
    },
    description: {
      pt: "O cliente pede pela mesa, a cozinha recebe na hora e o garçom fecha a conta. Três apps Next.js e quatro serviços NestJS — pedido, cozinha, comanda e notificação —, cada um com o próprio banco, trocando eventos por um exchange do RabbitMQ.",
      en: "Customers order from their table, the kitchen sees it instantly and the waiter closes the bill. Three Next.js apps and four NestJS services — order, kitchen, billing and notification —, each with its own database, exchanging events through a RabbitMQ exchange.",
    },
    highlights: [
      {
        pt: "Um evento, vários consumidores: o pedido chega à cozinha e à comanda sem que um saiba do outro",
        en: "One event, many consumers: the order reaches kitchen and bill without either knowing about the other",
      },
      {
        pt: "Tempo real com rooms do Socket.IO: cada mesa só recebe o que é dela",
        en: "Real time with Socket.IO rooms: each table only gets its own updates",
      },
      {
        pt: "Contratos dos eventos num pacote compartilhado, checados pelo compilador",
        en: "Event contracts in a shared package, checked by the compiler",
      },
    ],
  },
  {
    id: "valorant-strathub",
    name: "valorant-strathub",
    year: 2025,
    category: "web",
    featured: true,
    stack: ["PHP 8", "PostgreSQL", "Supabase", "Tailwind CSS", "PHPUnit", "PHPStan"],
    github: "https://github.com/GuiCMoreira/valorant-strathub",
    demo: "https://valorantstrathub.vercel.app",
    tagline: {
      pt: "Estratégias de Valorant por agente e mapa, em PHP sem framework",
      en: "Valorant strategies by agent and map, in framework-free PHP",
    },
    description: {
      pt: "Plataforma colaborativa onde jogadores publicam, avaliam e encontram estratégias. Trabalho de conclusão de curso escrito sem framework — roteamento, sessão, CSRF e camada de dados feitos à mão — e revisado depois com foco em segurança.",
      en: "Collaborative platform where players publish, rate and find strategies. Final college project written without a framework — routing, sessions, CSRF and data layer by hand — and later reviewed with a security focus.",
    },
    highlights: [
      {
        pt: "Sessão persistente no padrão split-token, com revogação por dispositivo",
        en: "Persistent session using the split-token pattern, revocable per device",
      },
      {
        pt: "74 testes PHPUnit e PHPStan nível 6 na CI",
        en: "74 PHPUnit tests and PHPStan level 6 in CI",
      },
      {
        pt: "Roda sem conta em serviço nenhum: SQLite e disco local por padrão",
        en: "Runs without any cloud account: SQLite and local disk by default",
      },
    ],
  },
  {
    id: "financemy",
    name: "FinanceMy",
    year: 2026,
    category: "web",
    featured: true,
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Vitest", "Docker"],
    github: "https://github.com/GuiCMoreira/financemy",
    tagline: {
      pt: "Controle financeiro self-hosted que mostra em que dia o saldo fica negativo",
      en: "Self-hosted finance app that shows the day your balance goes negative",
    },
    description: {
      pt: "Fluxo de caixa por data, cartão com fechamento e vencimento de verdade, reembolsos de quem usa o seu cartão, parcelamentos, recorrências e relatórios. Cada pessoa sobe a própria instância, protegida por senha. As regras vivem numa camada pura, sem banco nem React, coberta por 85 testes.",
      en: "Cash flow by date, credit cards with real closing and due dates, reimbursements from people who use your card, installments, recurring entries and reports. Each person runs their own password-protected instance. Business rules live in a pure layer, with no database or React, covered by 85 tests.",
    },
    highlights: [
      {
        pt: "Uma tabela de lançamentos: parcelamento e recorrência são geradores, não tipos",
        en: "One entries table: installments and recurrences are generators, not types",
      },
      {
        pt: "Dinheiro em centavos inteiros e datas como YYYY-MM-DD: nada de float nem fuso",
        en: "Money as integer cents and dates as YYYY-MM-DD: no floats, no timezone bugs",
      },
      {
        pt: "Demo completa com um comando: docker compose sobe banco, app e dados fictícios",
        en: "Full demo in one command: docker compose brings up database, app and sample data",
      },
    ],
  },
  {
    id: "eliteh-protect",
    name: "Eliteh Protect",
    year: 2026,
    category: "web",
    featured: true,
    stack: ["Next.js", "TypeScript", "Supabase", "PL/pgSQL", "Vitest"],
    demo: "https://www.elitehprotect.com",
    tagline: {
      pt: "Site e sistema interno de uma empresa de segurança patrimonial",
      en: "Website and internal system for a property security company",
    },
    description: {
      pt: "Duas aplicações no mesmo projeto, em produção: o site institucional, com foco em SEO local, e o painel administrativo que a empresa usa no dia a dia — estoque, financeiro, RH e ordens de serviço. Repositório privado.",
      en: "Two applications in one project, in production: the company website, focused on local SEO, and the admin panel the team uses daily — inventory, finance, HR and service orders. Private repository.",
    },
    highlights: [
      {
        pt: "35 rotas de API e 33 telas no painel administrativo",
        en: "35 API routes and 33 screens in the admin panel",
      },
      {
        pt: "Regras críticas em funções PL/pgSQL, cobertas por 484 testes",
        en: "Critical rules in PL/pgSQL functions, covered by 484 tests",
      },
    ],
  },
];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

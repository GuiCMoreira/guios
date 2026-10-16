"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { career, education, toolGroups } from "@/data/career";
import {
  LINKEDIN_URL,
  INSTAGRAM_URL,
  GITHUB_URL,
  PHOTO_3X4,
  projects,
} from "@/data/projects";
import { cn } from "@/lib/utils";
import type { LocalizedText } from "@/lib/types";

/*
 * Notas no estilo do app Notas do Mac. Cada nota é uma lista de blocos -
 * título de seção, parágrafo, lista, etiquetas, entrada de linha do tempo,
 * pares chave/valor - para caber conteúdo detalhado sem virar um paredão de texto.
 */

type Block =
  | { kind: "h"; text: LocalizedText }
  | { kind: "p"; text: LocalizedText }
  | { kind: "list"; items: LocalizedText[] }
  | { kind: "chips"; items: string[] }
  | { kind: "kv"; rows: { k: LocalizedText; v: LocalizedText }[] }
  | {
      kind: "entry";
      period: string;
      title: LocalizedText;
      place: string;
      tag?: LocalizedText;
      body: LocalizedText;
      bullets?: LocalizedText[];
      chips?: string[];
    }
  | { kind: "links" };

interface Note {
  id: string;
  title: LocalizedText;
  preview: LocalizedText;
  blocks: Block[];
}

const NOTES_DATE = "16/10/2026";
const NOW = { pt: "atual", en: "present" };

function buildNotes(): Note[] {
  const job = career.find((c) => c.kind === "job");
  const personal = career.find((c) => c.kind === "personal");

  return [
    {
      id: "about",
      title: { pt: "Sobre", en: "About" },
      preview: {
        pt: "Desenvolvedor fullstack em Bragança Paulista",
        en: "Fullstack developer from Bragança Paulista",
      },
      blocks: [
        {
          kind: "p",
          text: {
            pt: "Sou o Guilherme Carvalho, desenvolvedor fullstack em Bragança Paulista, SP. Programo desde 2022, sou formado em Análise e Desenvolvimento de Sistemas pela FATEC e, desde agosto de 2026, trabalho na Altec Sistemas, empresa de software para o setor de food service.",
            en: "I'm Guilherme Carvalho, a fullstack developer from Bragança Paulista, Brazil. I've been coding since 2022, I hold a degree in Systems Analysis and Development from FATEC and, since August 2026, I've worked at Altec Sistemas, a software company for the food service industry.",
          },
        },
        { kind: "h", text: { pt: "O que eu faço", en: "What I do" } },
        {
          kind: "list",
          items: [
            {
              pt: "Sistemas web completos, do banco de dados à tela: regra de negócio, API e interface.",
              en: "Complete web systems, from database to screen: business rules, API and interface.",
            },
            {
              pt: "Evolução de produtos grandes que já estão em uso: ERP, frente de caixa, apps e BI na Altec.",
              en: "Evolving large products already in use: ERP, point of sale, apps and BI at Altec.",
            },
            {
              pt: "Produtos próprios do zero, como o NavalhaGo (agenda para barbearias) e o FinanceMy (finanças pessoais).",
              en: "My own products from scratch, like NavalhaGo (barbershop scheduling) and FinanceMy (personal finance).",
            },
            {
              pt: "Interfaces com cuidado de produto, como este GuiOS, construído do zero.",
              en: "Interfaces built with product care, like this GuiOS, built from scratch.",
            },
          ],
        },
        { kind: "h", text: { pt: "Como eu trabalho", en: "How I work" } },
        {
          kind: "list",
          items: [
            {
              pt: "Entendo o problema antes de escrever a primeira linha.",
              en: "I understand the problem before writing the first line.",
            },
            {
              pt: "Teste automatizado faz parte da entrega: os projetos da vitrine somam mais de 1.200 testes.",
              en: "Automated tests are part of the delivery: the showcased projects add up to more than 1,200 tests.",
            },
            {
              pt: "Segurança, acessibilidade e desempenho desde o começo: este site tem nota 100 de acessibilidade no Lighthouse.",
              en: "Security, accessibility and performance from the start: this site scores 100 for accessibility on Lighthouse.",
            },
            {
              pt: "Documento o que faço: cada projeto tem README com as decisões e como rodar.",
              en: "I document my work: every project has a README with the decisions and how to run it.",
            },
          ],
        },
        { kind: "h", text: { pt: "Agora", en: "Right now" } },
        {
          kind: "p",
          text: {
            pt: "Disponível para novas oportunidades. O jeito mais rápido de falar comigo é pelo LinkedIn ou pelo Instagram.",
            en: "Open to new opportunities. The fastest way to reach me is LinkedIn or Instagram.",
          },
        },
        { kind: "links" },
      ],
    },
    {
      id: "experience",
      title: { pt: "Experiência", en: "Experience" },
      preview: {
        pt: "Altec, FATEC e projetos próprios",
        en: "Altec, FATEC and side projects",
      },
      blocks: [
        ...(job
          ? [
              {
                kind: "entry" as const,
                period: `${job.start} - ${job.end ?? "%NOW%"}`,
                title: job.role,
                place: `${job.company} · ${job.location}`,
                body: job.summary,
                // levantado dos repositórios da Altec com commits do Guilherme
                bullets: [
                  {
                    pt: "Retaguarda: ERP multi-tenant em PHP e MySQL, com novas funcionalidades, correções e integrações.",
                    en: "Back office: multi-tenant ERP in PHP and MySQL: new features, fixes and integrations.",
                  },
                  {
                    pt: "Apps em Flutter para ponto de venda, totem de autoatendimento e tela da cozinha.",
                    en: "Flutter apps for point of sale, self-service kiosk and kitchen display.",
                  },
                  {
                    pt: "Frente de caixa em C# e comanda eletrônica em Vue.js.",
                    en: "Point-of-sale register in C# and electronic order pad in Vue.js.",
                  },
                  {
                    pt: "Painéis de BI com React e Node.js.",
                    en: "BI dashboards with React and Node.js.",
                  },
                ],
                chips: job.stack,
              },
            ]
          : []),
        {
          kind: "entry",
          period: `${education.start} - ${education.end}`,
          title: education.degree,
          place: education.institution,
          tag: { pt: "formação", en: "education" },
          body: {
            pt: "Tecnólogo em Análise e Desenvolvimento de Sistemas. O trabalho de conclusão foi o valorant-strathub, uma plataforma de estratégias de Valorant feita em equipe, em PHP sem framework.",
            en: "Associate degree in Systems Analysis and Development. The final project was valorant-strathub, a Valorant strategy platform built as a team in framework-free PHP.",
          },
        },
        ...(personal
          ? [
              {
                kind: "entry" as const,
                period: `${personal.start} - ${personal.end ?? "%NOW%"}`,
                title: personal.role,
                place: personal.company,
                tag: { pt: "por conta própria", en: "on my own" },
                body: personal.summary,
                bullets: projects.map((p) => ({
                  pt: `${p.name}: ${p.tagline.pt}`,
                  en: `${p.name}: ${p.tagline.en}`,
                })),
                chips: personal.stack,
              },
            ]
          : []),
      ],
    },
    {
      id: "stack",
      title: { pt: "Stack & specs", en: "Stack & specs" },
      preview: { pt: "Ferramentas e especificações", en: "Tools and specs" },
      blocks: [
        {
          kind: "p",
          text: {
            pt: "As ferramentas que uso no trabalho e nos meus projetos, agrupadas por área.",
            en: "The tools I use at work and in my own projects, grouped by area.",
          },
        },
        ...toolGroups.flatMap((g) => [
          { kind: "h" as const, text: g.label },
          { kind: "chips" as const, items: g.items },
        ]),
        { kind: "h", text: { pt: "Em números", en: "By the numbers" } },
        {
          kind: "kv",
          rows: [
            {
              k: { pt: "Programando desde", en: "Coding since" },
              v: { pt: "2022", en: "2022" },
            },
            {
              k: { pt: "Projetos na vitrine", en: "Showcased projects" },
              v: {
                pt: `${projects.length}, de SaaS a sistema operacional no navegador`,
                en: `${projects.length}, from SaaS to an OS in the browser`,
              },
            },
            {
              k: { pt: "Testes automatizados", en: "Automated tests" },
              v: {
                pt: "mais de 1.200 nos projetos da vitrine",
                en: "over 1,200 across the showcased projects",
              },
            },
            {
              k: {
                pt: "Acessibilidade deste site",
                en: "This site's accessibility",
              },
              v: { pt: "100 no Lighthouse", en: "100 on Lighthouse" },
            },
          ],
        },
        {
          kind: "h",
          text: { pt: "Specs desta máquina", en: "This machine's specs" },
        },
        {
          kind: "kv",
          rows: [
            {
              k: { pt: "Chip", en: "Chip" },
              v: {
                pt: "Cérebro G1 Pro, movido a café",
                en: "G1 Pro Brain, caffeine powered",
              },
            },
            {
              k: { pt: "Memória", en: "Memory" },
              v: {
                pt: "Next.js, React, PHP e SQL sempre carregados",
                en: "Next.js, React, PHP and SQL always loaded",
              },
            },
            {
              k: { pt: "Armazenamento", en: "Storage" },
              v: {
                pt: "anos de código, bugs resolvidos e lições aprendidas",
                en: "years of code, solved bugs and lessons learned",
              },
            },
            {
              k: { pt: "Gráficos", en: "Graphics" },
              v: {
                pt: "CSS artesanal integrado",
                en: "Integrated handcrafted CSS",
              },
            },
            {
              k: { pt: "Sistema", en: "OS" },
              v: { pt: "GuiOS 5.0", en: "GuiOS 5.0" },
            },
          ],
        },
      ],
    },
  ];
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((c) => (
        <span
          key={c}
          className="rounded-md border border-line bg-fill-1 px-2 py-0.5 font-mono text-[11px] text-text-hi/90"
        >
          {c}
        </span>
      ))}
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  const { tx, lang } = useI18n();
  const now = (s: string) => s.replace("%NOW%", NOW[lang]);
  switch (block.kind) {
    case "h":
      return (
        <h3 className="pt-2 text-[15px] font-bold text-text-hi">
          {tx(block.text)}
        </h3>
      );
    case "p":
      return (
        <p className="text-[13.5px] leading-relaxed text-text-hi/90">
          {tx(block.text)}
        </p>
      );
    case "list":
      return (
        <ul className="space-y-1.5">
          {block.items.map((it, i) => (
            <li
              key={i}
              className="flex gap-2 text-[13.5px] leading-relaxed text-text-hi/90"
            >
              <span
                className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-text-lo"
                aria-hidden
              />
              <span>{tx(it)}</span>
            </li>
          ))}
        </ul>
      );
    case "chips":
      return <Chips items={block.items} />;
    case "kv":
      return (
        <dl className="divide-y divide-line rounded-xl border border-line bg-inset">
          {block.rows.map((r, i) => (
            <div
              key={i}
              className="flex flex-wrap justify-between gap-x-4 gap-y-0.5 px-3.5 py-2 text-[13px]"
            >
              <dt className="text-text-lo">{tx(r.k)}</dt>
              <dd className="font-medium text-text-hi">{tx(r.v)}</dd>
            </div>
          ))}
        </dl>
      );
    case "entry":
      return (
        <article className="relative border-l-2 border-line pb-2 pl-4">
          <span
            className="absolute top-1.5 -left-[5px] h-2 w-2 rounded-full bg-accent"
            aria-hidden
          />
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] text-accent">
              {now(block.period)}
            </span>
            {block.tag && (
              <span className="rounded-full border border-line px-2 py-px font-mono text-[10px] text-text-lo">
                {tx(block.tag)}
              </span>
            )}
          </div>
          <h3 className="mt-1 text-[16px] font-bold text-text-hi">
            {tx(block.title)}
          </h3>
          <p className="text-[12px] text-text-lo">{block.place}</p>
          <p className="mt-2 text-[13.5px] leading-relaxed text-text-hi/90">
            {tx(block.body)}
          </p>
          {block.bullets && (
            <ul className="mt-2 space-y-1">
              {block.bullets.map((b, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-[13px] leading-relaxed text-text-hi/85"
                >
                  <span className="text-accent">▸</span>
                  <span>{tx(b)}</span>
                </li>
              ))}
            </ul>
          )}
          {block.chips && (
            <div className="mt-3">
              <Chips items={block.chips} />
            </div>
          )}
        </article>
      );
    case "links":
      return (
        <div className="flex flex-wrap gap-2">
          {[
            {
              label: "LinkedIn",
              href: LINKEDIN_URL,
              cls: "bg-[#0a66c2] text-white",
            },
            {
              label: "Instagram",
              href: INSTAGRAM_URL,
              cls: "bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white",
            },
            {
              label: "GitHub",
              href: GITHUB_URL,
              cls: "bg-fill-2 text-text-hi",
            },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-transform hover:scale-[1.03]",
                l.cls,
              )}
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      );
  }
}

export function AboutApp() {
  const { tx, lang } = useI18n();
  const notes = buildNotes();
  const [selectedId, setSelectedId] = useState(notes[0].id);
  const selected = notes.find((n) => n.id === selectedId) ?? notes[0];

  const fullDate = new Intl.DateTimeFormat(lang === "pt" ? "pt-BR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(2026, 9, 16, 9, 30));

  return (
    <div className="flex h-full flex-col md:flex-row">
      {/* Sidebar de notas, estilo Notes (vira lista horizontal em telas estreitas) */}
      <aside className="os-scroll flex shrink-0 gap-1 overflow-x-auto border-b border-line bg-inset p-2 md:w-52 md:flex-col md:space-y-1 md:overflow-x-visible md:overflow-y-auto md:border-r md:border-b-0">
        {notes.map((note) => {
          const isSel = note.id === selectedId;
          return (
            <button
              key={note.id}
              type="button"
              onClick={() => setSelectedId(note.id)}
              className={cn(
                "block w-44 shrink-0 rounded-lg px-3 py-2 text-left transition-colors md:w-full",
                isSel
                  ? "bg-[#f7cf4f] text-[#3a2f04] dark:bg-amber-400/90 dark:text-[#2b2304]"
                  : "hover:bg-fill-1",
              )}
            >
              <span
                className={cn(
                  "block text-[13px] font-semibold",
                  !isSel && "text-text-hi",
                )}
              >
                {tx(note.title)}
              </span>
              <span
                className={cn(
                  "block truncate text-[11px]",
                  isSel ? "text-[#6b5a10] dark:text-[#4a3d08]" : "text-text-lo",
                )}
              >
                {NOTES_DATE} · {tx(note.preview)}
              </span>
            </button>
          );
        })}
      </aside>

      {/* Corpo da nota */}
      <div className="os-scroll flex-1 overflow-y-auto p-6">
        <p className="text-center text-[11px] text-text-lo">{fullDate}</p>

        <div className="mt-4 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PHOTO_3X4}
            alt="Guilherme Carvalho"
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover object-top"
          />
          <h2 className="text-2xl font-bold tracking-tight text-text-hi">
            {tx(selected.title)}
          </h2>
        </div>

        <div className="mt-5 max-w-2xl space-y-3.5">
          {selected.blocks.map((b, i) => (
            <BlockView key={`${selected.id}-${i}`} block={b} />
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import {
  ArrowLeft,
  ExternalLink,
  Hammer,
  Info,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { GitHubIcon } from "@/components/ui/icons";
import type { Project } from "@/lib/types";
import { useI18n } from "@/lib/i18n";

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  const { t, tx } = useI18n();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-line px-5 py-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-[12px] text-text-lo transition-colors hover:bg-white/5 hover:text-text-hi"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {t("projects.back")}
        </button>
        <h2 className="font-mono text-[14px] font-semibold text-text-hi">
          {project.name}
        </h2>
        <span className="font-mono text-[11px] text-text-lo">
          {project.year}
        </span>
      </div>

      <div className="os-scroll @container flex-1 overflow-y-auto p-6">
        <div className="grid gap-6 @3xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] @3xl:items-start">
          <div className="space-y-4 @3xl:sticky @3xl:top-0">
            {project.image && (
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-line bg-fill-1 shadow-lg shadow-black/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={`${project.name}: ${tx(project.tagline)}`}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </div>
            )}
            <div>
              {project.status === "wip" && (
                <span className="mb-2 inline-block rounded-full bg-accent/15 px-2 py-0.5 font-mono text-[10px] tracking-wide text-accent uppercase">
                  {t("projects.wip")}
                </span>
              )}
              <p className="text-[16px] leading-relaxed font-semibold text-text-hi">
                {tx(project.tagline)}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Em linguagem simples: para recrutadores e quem não é da área */}
            {project.plain && (
              <div className="space-y-3">
                {[
                  {
                    icon: Info,
                    label: t("projects.plain.what"),
                    text: tx(project.plain.what),
                  },
                  {
                    icon: Lightbulb,
                    label: t("projects.plain.problem"),
                    text: tx(project.plain.problem),
                  },
                  {
                    icon: Hammer,
                    label: t("projects.plain.myPart"),
                    text: tx(project.plain.myPart),
                  },
                ].map(({ icon: Icon, label, text }) => (
                  <section
                    key={label}
                    className="rounded-xl border border-line bg-inset p-4"
                  >
                    <h3 className="mb-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-text-hi">
                      <Icon className="h-3.5 w-3.5 text-accent" />
                      {label}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-text-lo">
                      {text}
                    </p>
                  </section>
                ))}
              </div>
            )}

            <section>
              <h3 className="mb-2 font-mono text-[11px] tracking-widest text-text-lo uppercase">
                {t("projects.inside")}
              </h3>
              <p className="text-[13px] leading-relaxed text-text-lo">
                {tx(project.description)}
              </p>
            </section>

            {project.highlights && project.highlights.length > 0 && (
              <section>
                <h3 className="mb-2 flex items-center gap-1.5 font-mono text-[11px] tracking-widest text-text-lo uppercase">
                  <Sparkles className="h-3 w-3 text-accent" />
                  {t("projects.highlights")}
                </h3>
                <ul className="space-y-1.5">
                  {project.highlights.map((h) => (
                    <li
                      key={h.pt}
                      className="flex gap-2 text-[13px] text-text-hi/85"
                    >
                      <span className="text-accent">▸</span>
                      {tx(h)}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section>
              <h3 className="mb-2 font-mono text-[11px] tracking-widest text-text-lo uppercase">
                {t("projects.stack")}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-line bg-fill-1 px-2 py-1 font-mono text-[11px] text-text-hi/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            <section className="flex flex-wrap items-center gap-3 pt-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-fill-2 px-4 py-2 text-[13px] font-medium text-text-hi transition-colors hover:bg-fill-3"
                >
                  <GitHubIcon className="h-4 w-4" />
                  {t("projects.viewGithub")}
                </a>
              )}
              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-[13px] font-semibold text-white transition-transform hover:scale-[1.02]"
                >
                  <ExternalLink className="h-4 w-4" />
                  {t("projects.viewDemo")}
                </a>
              ) : (
                <span className="font-mono text-[11px] text-text-lo/70">
                  ({t("projects.noDemo")})
                </span>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

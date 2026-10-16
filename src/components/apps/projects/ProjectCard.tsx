"use client";

import type { Project } from "@/lib/types";
import { useI18n } from "@/lib/i18n";

interface ProjectCardProps {
  project: Project;
  onOpen: (id: string) => void;
}

// Reserva para projeto sem captura: monograma sobre gradiente derivado do nome.
const TILE_GRADIENTS = [
  "from-indigo-600/70 to-violet-800/70",
  "from-emerald-600/70 to-teal-800/70",
  "from-sky-600/70 to-blue-800/70",
  "from-rose-600/70 to-orange-700/70",
  "from-amber-600/70 to-red-800/70",
  "from-fuchsia-600/70 to-purple-800/70",
];

function tileGradient(id: string): string {
  const hash = [...id].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return TILE_GRADIENTS[hash % TILE_GRADIENTS.length];
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const { t, tx } = useI18n();

  return (
    <button
      type="button"
      onClick={() => onOpen(project.id)}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-inset text-left transition-all hover:border-line-strong hover:bg-fill-1"
    >
      {project.image ? (
        <div className="relative aspect-video w-full overflow-hidden border-b border-line bg-fill-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
          {project.status === "wip" && (
            <span className="absolute top-2 left-2 rounded-full bg-black/60 px-2 py-0.5 font-mono text-[9px] tracking-wide text-white uppercase backdrop-blur">
              {t("projects.wip")}
            </span>
          )}
        </div>
      ) : (
        <div
          className={`flex h-24 items-center justify-center bg-gradient-to-br ${tileGradient(project.id)}`}
        >
          <span className="font-display text-3xl font-bold text-white/80 transition-transform group-hover:scale-110">
            {project.name.slice(0, 2).toUpperCase()}
          </span>
        </div>
      )}
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-mono text-[13px] font-semibold text-text-hi">{project.name}</h3>
          <span className="font-mono text-[10px] text-text-lo">{project.year}</span>
        </div>
        <p className="text-[12px] leading-relaxed text-text-lo">{tx(project.tagline)}</p>
        <div className="mt-auto flex flex-wrap gap-1 pt-2">
          {project.stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded bg-fill-2 px-1.5 py-0.5 font-mono text-[10px] text-text-lo"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="px-1 font-mono text-[10px] text-text-lo/60">
              +{project.stack.length - 3}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

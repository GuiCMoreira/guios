"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { AVATAR_URL, projects } from "@/data/projects";
import { storageGet, storageSet } from "@/lib/safe-storage";

// Tudo client-only e carregado sob demanda: cada protótipo vira um chunk próprio.
const DotGrid = dynamic(() => import("@/components/rb/DotGrid"), { ssr: false });
const TechText = dynamic(() => import("@/components/rb/TechText"), { ssr: false });
const TextPressure = dynamic(() => import("@/components/rb/TextPressure"), { ssr: false });
const VariableProximity = dynamic(() => import("@/components/rb/VariableProximity"), { ssr: false });
const DecryptedText = dynamic(() => import("@/components/rb/DecryptedText"), { ssr: false });
const RotatingText = dynamic(() => import("@/components/rb/RotatingText"), { ssr: false });
const SplitFlapText = dynamic(() => import("@/components/rb/SplitFlapText"), { ssr: false });
const PixelTransition = dynamic(() => import("@/components/rb/PixelTransition"), { ssr: false });
const TargetCursor = dynamic(() => import("@/components/rb/TargetCursor"), { ssr: false });
const Crosshair = dynamic(() => import("@/components/rb/Crosshair"), { ssr: false });
const ClickSpark = dynamic(() => import("@/components/rb/ClickSpark"), { ssr: false });
const ElectricBorder = dynamic(() => import("@/components/rb/ElectricBorder"), { ssr: false });
const StarBorder = dynamic(() => import("@/components/rb/StarBorder"), { ssr: false });
const GlareHover = dynamic(() => import("@/components/rb/GlareHover"), { ssr: false });
const ChromaGrid = dynamic(() => import("@/components/rb/ChromaGrid"), { ssr: false });
const CircularGallery = dynamic(() => import("@/components/rb/CircularGallery"), { ssr: false });
const LogoLoop = dynamic(() => import("@/components/rb/LogoLoop"), { ssr: false });
const FaultyTerminal = dynamic(() => import("@/components/rb/FaultyTerminal"), { ssr: false });
const LetterGlitch = dynamic(() => import("@/components/rb/LetterGlitch"), { ssr: false });
const Threads = dynamic(() => import("@/components/rb/Threads"), { ssr: false });
const LightRays = dynamic(() => import("@/components/rb/LightRays"), { ssr: false });
const CountUp = dynamic(() => import("@/components/rb/CountUp"), { ssr: false });
const ShinyText = dynamic(() => import("@/components/rb/ShinyText"), { ssr: false });
const GradientText = dynamic(() => import("@/components/rb/GradientText"), { ssr: false });
const FuzzyText = dynamic(() => import("@/components/rb/FuzzyText"), { ssr: false });

const SKY = "#7dd3fc";
const SKY_DEEP = "#0ea5e9";
const STORAGE_KEY = "guios.lab.aprovados";

/** Monta o filho só perto da tela e desmonta quando sai: ~24 demos sem fritar a GPU. */
function NearView({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: "300px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}>
      {on ? children : null}
    </div>
  );
}

type Proto = {
  id: string;
  title: string;
  component: string;
  slug: string;
  where: string;
  why: string;
  demo: (ctx: { dark: boolean; frame: React.RefObject<HTMLDivElement | null> }) => ReactNode;
  height?: string;
};

const NAME = "Guilherme Carvalho";

const GROUPS: { title: string; prompt: string; items: Proto[] }[] = [
  {
    title: "Hero e nome",
    prompt: "~/lab/hero$",
    items: [
      {
        id: "01",
        title: "Grade de pontos viva no fundo do hero",
        component: "DotGrid",
        slug: "backgrounds/dot-grid",
        where: "Fundo do hero (substitui a grade estática atual)",
        why: "Os pontos fogem do mouse e um clique solta uma onda de choque. Combina com a vibe de sistema.",
        demo: ({ dark }) => (
          <div className="relative h-full w-full">
            <div className="absolute inset-0">
              <DotGrid
                dotSize={4}
                gap={22}
                baseColor={dark ? "#2a2d36" : "#d4d4d8"}
                activeColor={SKY_DEEP}
                proximity={130}
                shockRadius={260}
              />
            </div>
            <div className="pointer-events-none relative flex h-full flex-col justify-center px-10">
              <p className="font-mono text-sm text-fx-ink">gui@os:~$ whoami</p>
              <p className="font-display text-6xl font-bold tracking-[-0.04em] md:text-8xl">Guilherme</p>
              <p className="text-outline font-display text-6xl font-bold tracking-[-0.04em] md:text-8xl">Carvalho</p>
            </div>
          </div>
        ),
      },
      {
        id: "02",
        title: "Nome em TechText",
        component: "TechText",
        slug: "text-animations/tech-text",
        where: "Seu nome no hero e títulos de seção",
        why: "As letras se montam em blocos e reagem ao mouse como uma peça técnica. Dá para arrastar letras.",
        demo: ({ dark }) => (
          <div className="flex h-full items-center px-6 font-display">
            {/* sem fontFamily: o canvas não resolve var(); o componente herda a fonte calculada do container */}
            <TechText
              text={NAME}
              fontWeight={700}
              fontSize={96}
              color={dark ? "#f2f4f8" : "#1d1d1f"}
              accentColor={SKY_DEEP}
              className="w-full"
            />
          </div>
        ),
      },
      {
        id: "03",
        title: "Nome em TextPressure",
        component: "TextPressure",
        slug: "text-animations/text-pressure",
        where: "Seu nome no hero (alternativa ao 02)",
        why: "Cada letra engorda e estica conforme o mouse passa perto: o nome 'respira'.",
        demo: ({ dark }) => (
          <div className="flex h-full items-center px-8">
            <TextPressure text="GUILHERME" textColor={dark ? "#f2f4f8" : "#1d1d1f"} minFontSize={48} />
          </div>
        ),
      },
      {
        id: "04",
        title: "Títulos com peso variável perto do mouse",
        component: "VariableProximity",
        slug: "text-animations/variable-proximity",
        where: "Títulos das seções (Projetos, Experiência, Sobre)",
        why: "As letras próximas do cursor ficam mais grossas, como uma lupa tipográfica.",
        demo: ({ frame }) => (
          <div className="flex h-full items-center px-10">
            <VariableProximity
              label="Projetos selecionados"
              fromFontVariationSettings="'wght' 300"
              toFontVariationSettings="'wght' 700"
              containerRef={frame}
              radius={160}
              className="font-display text-6xl tracking-tight"
            />
          </div>
        ),
      },
      {
        id: "05",
        title: "Prompts que se descriptografam",
        component: "DecryptedText",
        slug: "text-animations/decrypted-text",
        where: "Os prompts `gui@os:~$` e subtítulos ao entrar na tela",
        why: "O texto aparece embaralhado e se resolve letra a letra, perfeito para a voz de terminal.",
        demo: () => (
          <div className="flex h-full flex-col justify-center gap-4 px-10 font-mono">
            <DecryptedText
              text="gui@os:~/projetos$ ls --destaques"
              animateOn="view"
              sequential
              speed={40}
              className="text-xl text-fx-ink"
              encryptedClassName="text-xl text-text-lo"
            />
            <DecryptedText
              text="passe o mouse aqui para descriptografar de novo"
              animateOn="hover"
              speed={35}
              className="text-base"
              encryptedClassName="text-base text-text-lo"
            />
          </div>
        ),
      },
      {
        id: "06",
        title: "Cargo que alterna",
        component: "RotatingText",
        slug: "text-animations/rotating-text",
        where: "Linha `// desenvolvedor fullstack` do hero",
        why: "Mostra mais de um ângulo do seu perfil sem ocupar espaço.",
        demo: () => (
          <div className="flex h-full items-center gap-3 px-10 font-display text-4xl font-bold md:text-5xl">
            <span>desenvolvedor</span>
            <RotatingText
              texts={["fullstack", "backend", "frontend", "de sistemas"]}
              mainClassName="rounded-xl bg-fx px-3 py-1 text-black overflow-hidden"
              rotationInterval={2200}
              staggerDuration={0.025}
            />
          </div>
        ),
      },
      {
        id: "07",
        title: "Painel de aeroporto",
        component: "SplitFlapText",
        slug: "text-animations/split-flap-text",
        where: "Selo 'disponível para novas oportunidades'",
        why: "As placas giram até formar a frase e chamam atenção para o que mais importa ao recrutador.",
        demo: () => (
          <div className="flex h-full items-center justify-center px-6">
            <SplitFlapText words={["DISPONIVEL", "FULLSTACK", "CONTRATE"]} fontSize={44} textColor={SKY} />
          </div>
        ),
      },
    ],
  },
  {
    title: "Foto e cursor",
    prompt: "~/lab/cursor$",
    items: [
      {
        id: "08",
        title: "Foto que se desfaz em pixels",
        component: "PixelTransition",
        slug: "animations/pixel-transition",
        where: "Sua foto no hero (no lugar do tilt atual, ou junto)",
        why: "No hover a foto se dissolve em pixels e revela um cartão 'olá, eu sou o Gui'.",
        demo: () => (
          <div className="flex h-full items-center justify-center">
            <div className="w-64">
              <PixelTransition
                firstContent={
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={AVATAR_URL} alt="" className="h-full w-full object-cover grayscale" />
                }
                secondContent={
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-fx text-black">
                    <span className="text-4xl">👋</span>
                    <span className="font-display text-2xl font-bold">olá, eu sou o Gui</span>
                  </div>
                }
                gridSize={14}
                pixelColor={SKY}
                animationStepDuration={0.4}
                className="overflow-hidden rounded-3xl"
              />
            </div>
          </div>
        ),
      },
      {
        id: "09",
        title: "Cursor que mira nos alvos",
        component: "TargetCursor",
        slug: "animations/target-cursor",
        where: "Cursor da página inteira (alternativa ao anel atual)",
        why: "Uma mira giratória que trava com cantos em volta de cada botão quando passa por cima.",
        demo: ({ frame }) => (
          <div className="flex h-full flex-wrap items-center justify-center gap-6">
            <TargetCursor container={frame} targetSelector=".lab-target" cursorColor={SKY} spinDuration={2} />
            {["Ver projetos", "GitHub", "Entrar no GuiOS"].map((l) => (
              <button key={l} type="button" className="lab-target rounded-full border border-line px-6 py-3 font-medium">
                {l}
              </button>
            ))}
          </div>
        ),
      },
      {
        id: "10",
        title: "Mira com coordenadas",
        component: "Crosshair",
        slug: "animations/crosshair",
        where: "Hero ou seção do GuiOS",
        why: "Linhas que cruzam a tela seguindo o mouse, com X/Y ao vivo. Bem 'ferramenta de dev'.",
        demo: ({ frame }) => (
          <div className="relative flex h-full items-center justify-center">
            <Crosshair containerRef={frame} color={SKY} />
            <a href="#" className="rounded-full border border-line px-6 py-3" onClick={(e) => e.preventDefault()}>
              mire em mim
            </a>
          </div>
        ),
      },
      {
        id: "11",
        title: "Faíscas de clique (versão canvas)",
        component: "ClickSpark",
        slug: "animations/click-spark",
        where: "Página inteira (substitui as faíscas atuais)",
        why: "Mais faíscas, com gravidade e brilho. Clique em qualquer lugar deste quadro.",
        demo: () => (
          <ClickSpark sparkColor={SKY} sparkCount={12} sparkRadius={34} glow={0.6} className="h-full w-full">
            <div className="flex h-full items-center justify-center font-mono text-text-lo">clique em qualquer lugar ✦</div>
          </ClickSpark>
        ),
      },
    ],
  },
  {
    title: "Botões e projetos",
    prompt: "~/lab/ui$",
    items: [
      {
        id: "12",
        title: "Borda elétrica no botão do GuiOS",
        component: "ElectricBorder",
        slug: "animations/electric-border",
        where: "Botão 'Entrar no GuiOS'",
        why: "Raios correndo pela borda: o botão mais importante da página vira o mais vivo.",
        demo: ({ dark }) => (
          <div className="flex h-full items-center justify-center">
            <ElectricBorder color={SKY} borderRadius={999} theme={dark ? "dark" : "light"}>
              <span className="block px-10 py-4 font-semibold">Entrar no GuiOS ↗</span>
            </ElectricBorder>
          </div>
        ),
      },
      {
        id: "13",
        title: "Estrelas orbitando os botões",
        component: "StarBorder",
        slug: "animations/star-border",
        where: "Botões principais (Ver projetos, e-mail)",
        why: "Um brilho que dá a volta na borda, discreto até o hover.",
        demo: ({ dark }) => (
          <div className="flex h-full items-center justify-center gap-6">
            <StarBorder color={SKY} theme={dark ? "dark" : "light"}>Ver projetos</StarBorder>
            <StarBorder color={SKY} theme={dark ? "dark" : "light"}>gui0307carvalho@gmail.com</StarBorder>
          </div>
        ),
      },
      {
        id: "14",
        title: "Reflexo nos cards de projeto",
        component: "GlareHover",
        slug: "animations/glare-hover",
        where: "Cards dos projetos",
        why: "Um reflexo de vidro atravessa o card no hover, como luz passando numa tela.",
        demo: () => (
          <div className="flex h-full items-center justify-center gap-6 px-6">
            {projects.slice(0, 2).map((p) => (
              <GlareHover key={p.id} width="320px" height="200px" borderRadius="20px" glareColor="#ffffff" glareOpacity={0.35}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.name} className="h-full w-full object-cover object-top" />
              </GlareHover>
            ))}
          </div>
        ),
      },
      {
        id: "15",
        title: "Grade com holofote colorido",
        component: "ChromaGrid",
        slug: "components/chroma-grid",
        where: "Seção de projetos (alternativa à trilha horizontal no mobile)",
        why: "Tudo em P&B; onde o mouse passa, a cor volta. Projetos 'acendem' ao serem explorados.",
        height: "h-[640px]",
        demo: ({ dark }) => (
          <div className="h-full overflow-auto p-6">
            <ChromaGrid
              items={projects.map((p) => ({ image: p.image ?? "", title: p.name, subtitle: p.stack.slice(0, 3).join(" · "), accent: SKY }))}
              theme={dark ? "dark" : "light"}
              columns={3}
            />
          </div>
        ),
      },
      {
        id: "16",
        title: "Galeria circular 3D",
        component: "CircularGallery",
        slug: "components/circular-gallery",
        where: "Projetos (alternativa) ou uma seção 'bastidores' com prints",
        why: "Os projetos giram numa curva 3D; arraste ou role para navegar.",
        demo: ({ dark }) => (
          <CircularGallery
            items={projects.map((p) => ({ image: p.image ?? "", text: p.name }))}
            textColor={dark ? "#f2f4f8" : "#1d1d1f"}
            bend={2}
          />
        ),
      },
      {
        id: "17",
        title: "Stack em arco",
        component: "LogoLoop",
        slug: "animations/logo-loop",
        where: "Carrossel da stack (no lugar do marquee de texto)",
        why: "As tecnologias passam num arco, com a do centro ampliada. Pausa no hover, dá para arrastar.",
        demo: () => (
          <div className="flex h-full items-center">
            <LogoLoop
              logos={["Next.js", "React", "TypeScript", "PHP", "MySQL", "PostgreSQL", "Docker", "RabbitMQ", "Tailwind", "Node.js"].map((s) => ({
                node: <span className="font-display text-3xl font-bold whitespace-nowrap">{s}</span>,
                title: s,
              }))}
              speed={60}
              gap={56}
              logoHeight={44}
              layout="arc"
              magnify={1.4}
              pauseOnHover
              draggable
              fadeOut
            />
          </div>
        ),
      },
    ],
  },
  {
    title: "Fundos",
    prompt: "~/lab/bg$",
    items: [
      {
        id: "18",
        title: "Terminal com defeito",
        component: "FaultyTerminal",
        slug: "backgrounds/faulty-terminal",
        where: "Fundo da seção do GuiOS ou do contato",
        why: "Um monitor CRT cheio de glifos, com glitch e reação ao mouse. É o GuiOS 'vazando' para a página.",
        demo: () => (
          <div className="relative h-full w-full bg-black">
            <FaultyTerminal tint={SKY} scale={1.4} brightness={0.7} mouseReact />
            <p className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-5xl font-bold text-white">
              ./boot --preview
            </p>
          </div>
        ),
      },
      {
        id: "19",
        title: "Chuva de letras com glitch",
        component: "LetterGlitch",
        slug: "backgrounds/letter-glitch",
        where: "Fundo da página 404 ou do contato",
        why: "Uma parede de caracteres trocando de cor: o 'Matrix' do GuiOS em versão página.",
        demo: ({ dark }) => (
          <LetterGlitch glitchColors={[SKY, SKY_DEEP, "#1e3a5f"]} lightMode={!dark} interactive />
        ),
      },
      {
        id: "20",
        title: "Fios ondulando",
        component: "Threads",
        slug: "backgrounds/threads",
        where: "Fundo da seção de contato",
        why: "Linhas finas que ondulam e se afastam do mouse. Elegante, sem roubar a cena.",
        demo: () => (
          <div className="relative h-full w-full">
            <Threads color={SKY} amplitude={1.2} enableMouseInteraction />
            <p className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-5xl font-bold">
              Vamos construir algo juntos?
            </p>
          </div>
        ),
      },
      {
        id: "21",
        title: "Raios de luz",
        component: "LightRays",
        slug: "backgrounds/light-rays",
        where: "Topo do hero, caindo sobre o seu nome",
        why: "Feixes de luz azul descendo do topo, seguindo o mouse, dá um ar de 'palco'.",
        demo: ({ dark }) => (
          <div className="relative h-full w-full">
            <LightRays raysColor={SKY} followMouse lightMode={!dark} />
            <p className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-7xl font-bold">
              Guilherme
            </p>
          </div>
        ),
      },
    ],
  },
  {
    title: "Números e detalhes",
    prompt: "~/lab/extras$",
    items: [
      {
        id: "22",
        title: "Números que contam",
        component: "CountUp",
        slug: "text-animations/count-up",
        where: "Nova faixa de números entre o hero e os projetos",
        why: "Dados reais contando ao aparecer: testes que você escreveu nos projetos, anos programando etc.",
        demo: () => (
          <div className="grid h-full grid-cols-2 place-content-center gap-8 px-10 md:grid-cols-4">
            {[
              { to: 643, label: "testes automatizados nos projetos" },
              { to: 6, label: "projetos na vitrine" },
              { to: 4, label: "anos programando" },
              { to: 1, label: "sistema operacional no navegador" },
            ].map((s) => (
              <div key={s.label}>
                <CountUp to={s.to} duration={2} className="font-display text-6xl font-bold text-fx-ink" />
                <p className="mt-2 text-sm text-text-lo">{s.label}</p>
              </div>
            ))}
          </div>
        ),
      },
      {
        id: "23",
        title: "Brilho e gradiente em destaques",
        component: "ShinyText + GradientText",
        slug: "text-animations/shiny-text",
        where: "Selo 'disponível', marca-texto dos títulos",
        why: "Um reflexo que passa pelo texto de tempos em tempos e um gradiente azul animado.",
        demo: () => (
          <div className="flex h-full flex-col items-center justify-center gap-6">
            <ShinyText text="● disponível para novas oportunidades" className="font-mono text-lg" />
            <GradientText colors={[SKY, SKY_DEEP, "#a5b4fc", SKY]} className="font-display text-5xl font-bold">
              sistema operacional.
            </GradientText>
          </div>
        ),
      },
      {
        id: "24",
        title: "404 com texto 'com interferência'",
        component: "FuzzyText",
        slug: "text-animations/fuzzy-text",
        where: "Página 404 (hoje é o kernel panic)",
        why: "O '404' treme como sinal ruim de TV e piora no hover.",
        demo: ({ dark }) => (
          <div className="flex h-full items-center justify-center">
            <FuzzyText fontSize="9rem" color={dark ? "#f2f4f8" : "#1d1d1f"} enableHover baseIntensity={0.2}>
              404
            </FuzzyText>
          </div>
        ),
      },
    ],
  },
];

const ALL_IDS = GROUPS.flatMap((g) => g.items.map((i) => i.id));

function ProtoCard({ p, approved, onToggle, dark }: { p: Proto; approved: boolean; onToggle: () => void; dark: boolean }) {
  const frame = useRef<HTMLDivElement>(null);
  return (
    <article
      data-proto={p.id}
      className={`overflow-hidden rounded-[28px] border bg-(--landing-card) transition-colors ${
        approved ? "border-fx shadow-[0_0_0_1px_var(--fx)]" : "border-line"
      }`}
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-line p-6">
        <div className="max-w-2xl">
          <p className="font-mono text-xs text-text-lo">
            <span className="text-fx-ink">#{p.id}</span> ·{" "}
            <a
              href={`https://reactbits.dev/${p.slug}`}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-line underline-offset-4 hover:decoration-fx"
            >
              {p.component}
            </a>
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">{p.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-text-lo">{p.why}</p>
          <p className="mt-2 font-mono text-xs text-text-lo">
            <span className="text-fx-ink">onde:</span> {p.where}
          </p>
        </div>
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={approved}
          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
            approved ? "border-fx bg-fx text-black" : "border-line hover:border-line-strong"
          }`}
        >
          <Check className="h-4 w-4" />
          {approved ? "Aprovado" : "Aprovar"}
        </button>
      </header>
      <div ref={frame} className={`relative overflow-hidden ${p.height ?? "h-[420px]"}`}>
        <NearView className="h-full w-full">{p.demo({ dark, frame })}</NearView>
      </div>
    </article>
  );
}

export function Lab() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const [approved, setApproved] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // estado salvo no navegador de quem está avaliando (conveniência, não dado oficial)
    const saved = storageGet("local", STORAGE_KEY);
    if (!saved) return;
    try {
      const ids = (JSON.parse(saved) as string[]).filter((i) => ALL_IDS.includes(i));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setApproved(ids);
    } catch {
      /* JSON corrompido: começa do zero */
    }
  }, []);

  const toggle = (id: string) =>
    setApproved((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id].sort();
      storageSet("local", STORAGE_KEY, JSON.stringify(next));
      return next;
    });

  const summary = () => {
    const names = GROUPS.flatMap((g) => g.items).filter((i) => approved.includes(i.id));
    return `Aprovados no lab: ${names.map((n) => `#${n.id} ${n.component}`).join(", ")}`;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard bloqueado: o resumo continua visível na barra */
    }
  };

  return (
    <main className="min-h-dvh bg-(--landing-bg) pb-40 text-text-hi">
      <div className="px-[clamp(20px,5vw,96px)] pt-16 pb-10">
        <Link href="/" className="font-mono text-sm text-text-lo hover:text-text-hi">
          ← voltar ao portfólio
        </Link>
        <p className="mt-10 font-mono text-sm text-text-lo">
          <span className="text-fx-ink">gui@os</span>:~/lab$ ls prototipos/
        </p>
        <h1 className="mt-3 font-display text-6xl font-bold tracking-[-0.04em] md:text-8xl">Laboratório</h1>
        <p className="mt-6 max-w-2xl leading-relaxed text-text-lo md:text-lg">
          Cada bloco abaixo é um componente do React Bits rodando de verdade, já com as cores e o conteúdo do
          portfólio. Mexa, passe o mouse, clique. Aprove os que você quer no site e me mande a lista pelo botão
          lá embaixo.
        </p>
      </div>

      <div className="space-y-20 px-[clamp(20px,5vw,96px)]">
        {GROUPS.map((g) => (
          <section key={g.title}>
            <p className="font-mono text-sm text-text-lo">
              <span className="text-fx-ink">gui@os</span>:{g.prompt}
            </p>
            <h2 className="mt-2 mb-8 border-b border-line pb-4 font-display text-4xl font-bold tracking-tight">
              {g.title}
            </h2>
            <div className="grid gap-6 xl:grid-cols-2">
              {g.items.map((p) => (
                <ProtoCard key={p.id} p={p} approved={approved.includes(p.id)} onToggle={() => toggle(p.id)} dark={dark} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="glass-solid fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 rounded-2xl px-5 py-3 shadow-2xl shadow-black/30">
        <p className="font-mono text-sm">
          <span className="text-fx-ink">{approved.length}</span> / {ALL_IDS.length} aprovados
          {approved.length > 0 && <span className="text-text-lo">: {approved.map((i) => `#${i}`).join(" ")}</span>}
        </p>
        <button
          type="button"
          onClick={copy}
          disabled={approved.length === 0}
          className="flex items-center gap-2 rounded-full bg-text-hi px-4 py-2 text-sm font-semibold text-(--landing-bg) disabled:opacity-40"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copiado!" : "Copiar lista para mandar"}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import { GuiOS } from "@/components/os/GuiOS";

export const metadata: Metadata = {
  title: "GuiOS | o sistema operacional do portfólio",
  description:
    "Um mini-macOS construído do zero dentro do portfólio de Guilherme Carvalho: janelas, dock, terminal interativo, Safari com buscador próprio e command palette.",
  alternates: { canonical: "/os" },
};

export default async function OSPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  return <GuiOS preview={params.preview === "1"} />;
}

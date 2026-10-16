import type { Metadata } from "next";
import { Lab } from "@/components/lab/Lab";

export const metadata: Metadata = {
  title: "Laboratório | protótipos do portfólio",
  description: "Protótipos de efeitos do React Bits aplicados ao portfólio, para aprovação.",
  robots: { index: false, follow: false },
};

export default function LabPage() {
  return <Lab />;
}

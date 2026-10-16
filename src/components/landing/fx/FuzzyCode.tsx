"use client";

import dynamic from "next/dynamic";

// O "404" estático aparece na hora; o canvas com interferência assume quando carrega.
const FuzzyText = dynamic(() => import("@/components/rb/FuzzyText"), {
  ssr: false,
  loading: () => <span className="block font-mono text-[7rem] leading-none font-bold text-white">404</span>,
});

export function FuzzyCode() {
  return (
    <div aria-hidden className="flex min-h-[8rem] items-center justify-center">
      <FuzzyText fontSize="7rem" fontWeight={800} color="#f2f4f8" enableHover baseIntensity={0.18} hoverIntensity={0.55}>
        404
      </FuzzyText>
    </div>
  );
}

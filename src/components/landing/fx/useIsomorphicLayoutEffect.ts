import { useEffect, useLayoutEffect } from "react";

// useLayoutEffect no client (mede antes de pintar), useEffect no SSR (sem aviso).
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

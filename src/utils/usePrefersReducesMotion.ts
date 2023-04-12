import * as React from "react";

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setPrefersReducedMotion(prefersReducedMotion);
  }, []);

  return prefersReducedMotion;
}

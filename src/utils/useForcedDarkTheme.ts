import * as React from "react";
import { useColorMode, ColorMode } from "@docusaurus/theme-common";

export function useForcedDarkTheme() {
  const { setColorMode, colorMode } = useColorMode();
  //quick fix for updating color mode on page load breaking after theme upgrade
  React.useEffect(() => {
    const originalTheme =
      (localStorage.getItem("theme") as ColorMode) ?? colorMode;

    //@ts-expect-error - The second parameter exists, it's just not on the type :(
    setColorMode("dark", { persist: false });

    return () => {
      setColorMode(originalTheme);
    };
  }, []);
}

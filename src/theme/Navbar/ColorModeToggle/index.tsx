import React from "react";
import clsx from "clsx";
import { useColorMode, useThemeConfig } from "@docusaurus/theme-common";
import ColorModeToggle from "@theme/ColorModeToggle";
import type { Props } from "@theme/Navbar/ColorModeToggle";

export default function NavbarColorModeToggle({
  className,
}: Props): JSX.Element | null {
  const { colorMode, setColorMode } = useColorMode();

  return (
    <ColorModeToggle
      className={clsx(className, "theme-color-toggle")}
      value={colorMode}
      onChange={setColorMode}
    />
  );
}

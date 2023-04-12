import React from "react";
import { useColorMode } from "@docusaurus/theme-common";
import ColorModeToggle from "@theme/ColorModeToggle";

export default function NavbarColorModeToggle({ className }) {
  const { colorMode, setColorMode } = useColorMode();
  return (
    <ColorModeToggle
      className={className}
      value={colorMode}
      onChange={setColorMode}
    />
  );
}

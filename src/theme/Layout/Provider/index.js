import React, { useEffect } from "react";
import { composeProviders, useColorMode } from "@docusaurus/theme-common";
import { useLocation } from "@docusaurus/router";
import {
  ColorModeProvider,
  AnnouncementBarProvider,
  DocsPreferredVersionContextProvider,
  ScrollControllerProvider,
  NavbarProvider,
  PluginHtmlClassNameProvider,
} from "@docusaurus/theme-common/internal";
const Provider = composeProviders([
  ColorModeProvider,
  AnnouncementBarProvider,
  ScrollControllerProvider,
  DocsPreferredVersionContextProvider,
  PluginHtmlClassNameProvider,
  NavbarProvider,
]);

function RestoreTheme() {
  const { setColorMode } = useColorMode();
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setColorMode(storedTheme);
  }, []);
  return <></>;
}

export default function LayoutProvider({ children }) {
  const location = useLocation();
  let isDocsPage = location.pathname.includes("/docs/");

  return (
    <Provider>
      {isDocsPage ? <RestoreTheme></RestoreTheme> : null}
      {children}
    </Provider>
  );
}

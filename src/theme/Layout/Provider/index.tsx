import React, { useEffect } from "react";
import {
  composeProviders,
  useColorMode,
  ColorMode,
} from "@docusaurus/theme-common";
import { useLocation } from "@docusaurus/router";
import {
  ColorModeProvider,
  AnnouncementBarProvider,
  ScrollControllerProvider,
  NavbarProvider,
  PluginHtmlClassNameProvider,
} from "@docusaurus/theme-common/internal";
import { DocsPreferredVersionContextProvider } from "@docusaurus/plugin-content-docs/client";
import { CustomTagsContextProvider } from "@site/src/components/CustomTags/CustomTagsContext";

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
    const storedTheme = localStorage.getItem("theme") as ColorMode;
    setColorMode(storedTheme);
  }, []);
  return <></>;
}

export default function LayoutProvider({ children }) {
  const location = useLocation();
  const isDocsPage = location.pathname.includes("/docs/");

  return (
    <Provider>
      <CustomTagsContextProvider>
        {isDocsPage ? <RestoreTheme></RestoreTheme> : null}
        {children}
      </CustomTagsContextProvider>
    </Provider>
  );
}

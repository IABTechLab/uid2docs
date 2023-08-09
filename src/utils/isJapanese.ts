import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export function useIsJapanese() {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === "ja";
}

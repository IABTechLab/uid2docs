import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export function useGetCurrentLocale() {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale;
}

import { useGetCurrentLocale } from "@site/src/utils/useGetCurrentLocale";

export function useIsJapanese() {
  const currentLocale = useGetCurrentLocale();
  return currentLocale === "ja";
}

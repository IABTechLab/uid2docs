export type LanguageThemeType = {
  [key in "en" | "ja"]: {
    formId: number;
  };
};

export const languageData: LanguageThemeType = {
  en: {
    formId: 2753,
  },
  ja: {
    formId: 3688,
  },
};

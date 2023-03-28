import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";

export const defaultNS = "common";

export const resources = {
  en: en,
} as const;

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources: resources,
  lng: "en",
  fallbackLng: "en",
  defaultNS: defaultNS,
  interpolation: {
    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  },
});

export type Translations = typeof en;

export default i18n;

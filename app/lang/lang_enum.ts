import { useTranslation } from "react-i18next";
import { LocaleKeys } from ".";

export enum LANG {
  ES = "es",
  EN = "en",
  QU = "qu",
}

export const useLanguageHelper = () => {
  const { t } = useTranslation();

  const getLangLocaleKey = (lang: LANG): string => {
    switch (lang) {
      case LANG.ES:
        return t(LocaleKeys.lang_es);
      case LANG.EN:
        return t(LocaleKeys.lang_en);
      case LANG.QU:
        return t(LocaleKeys.lang_qu);
      default:
        return "Idioma desconocido";
    }
  };

  return { getLangLocaleKey };
};

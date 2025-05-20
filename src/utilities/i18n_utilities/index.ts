import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import englishContent from "~/assets/lang/en.json";
import spanishContent from "~/assets/lang/es.json";
import quechuaContent from "~/assets/lang/qu.json";

const initI18n = () => {
  i18n.use(initReactI18next).init({
    resources: {
      en: englishContent,
      es: spanishContent,
      qu: quechuaContent,
    },
    fallbackLng: "es",
    interpolation: {
      escapeValue: false,
    },
  });

  return i18n;
};

export default initI18n;

import {
  FooterInfo,
  Header,
  HeroImage,
  LanguageSelector,
} from "~/modules/auth/components/molecules";
import { RegisterForm } from "../organisms";
import { useTranslation } from "react-i18next";
import { LocaleKeys } from "~/lang";

export function meta() {
  return [{ title: "Registrarse - Arxatec" }];
}

export default function RegisterPage() {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 h-screen p-2 rounded-md lg:grid-cols-2">
      <div className="h-full items-center flex flex-col justify-between px-4 py-0 sm:px-6 lg:flex-none lg:px-20 xl:px-24 order-2 lg:order-1">
        <LanguageSelector />
        <div className="mx-auto w-full max-w-[480px]">
          <Header
            title={t(LocaleKeys.pages_auth_register_title)}
            text={t(LocaleKeys.pages_auth_register_text)}
          />
          <RegisterForm />
        </div>
        <FooterInfo />
      </div>
      <HeroImage
        image="https://images.pexels.com/photos/8353840/pexels-photo-8353840.jpeg"
        title={t(LocaleKeys.pages_auth_register_testimonial_title)}
        text={t(LocaleKeys.pages_auth_register_testimonial_text)}
        author={t(LocaleKeys.pages_auth_register_testimonial_author)}
      />
    </div>
  );
}

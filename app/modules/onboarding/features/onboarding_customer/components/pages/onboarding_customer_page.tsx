import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { PrimaryButton } from "~/components/atoms";
import { useTitle } from "~/hooks";
import { LocaleKeys } from "~/lang";
import { Header, HeroImage } from "~/modules/onboarding/components/molecules";
import { ROUTES } from "~/routes/routes";
import { bannerOnboardingGeneral, logo } from "~/utilities/assets_utilities";
import { ClientProfileStep, LegalPreferencesStep } from "../organisms";

const steps = [
  {
    id: 1,
    title: LocaleKeys.pages_onboarding_customer_client_profile_title,
    description:
      LocaleKeys.pages_onboarding_customer_client_profile_description,
    component: <ClientProfileStep />,
  },
  {
    id: 2,
    title: LocaleKeys.pages_onboarding_customer_legal_preferences_title,
    description:
      LocaleKeys.pages_onboarding_customer_legal_preferences_description,
    component: <LegalPreferencesStep />,
  },
];

export default function OnboardingCustomer() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { changeTitle } = useTitle();
  const navigate = useNavigate();

  const navigateToOnboarding = () => navigate(`/${ROUTES.ONBOARDING}`);
  const navigateToDashboard = () => navigate(`/${ROUTES.DASHBOARD}`);

  const handleNextStep = () => {
    if (steps.length == step + 1) {
      navigateToDashboard();
      return;
    }
    setStep(step + 1);
  };

  const handleBackStep = () => {
    if (0 == step) return;
    setStep(step - 1);
  };

  useEffect(() => {
    changeTitle("Introducción - Arxatec");
  }, []);
  return (
    <div className="grid grid-cols-1 h-screen p-2 rounded-md lg:grid-cols-2">
      <div className="h-full items-center flex flex-col justify-between px-4 py-0 sm:px-6 lg:flex-none lg:px-20 xl:px-24 order-2 lg:order-1 w-full max-w-[720px] mx-auto gap-10">
        {/* Header Form */}
        <Header value={step + 1} maxValue={steps.length} />

        {/* Content Form */}
        <div className="mx-auto w-full ">
          <h1 className="text-2xl font-bold text-gray-900">
            {t(steps[step].title)}
          </h1>
          <p className="text-gray-500 text-base mt-2">
            {t(steps[step].description)}
          </p>
          <div className="w-full mt-8 gap-4 grid">{steps[step].component}</div>
        </div>

        {/* Actions Form */}
        <div className="w-full py-10">
          {error && (
            <p className="text-sm text-red-500 text-left mb-4">{error}</p>
          )}
          <PrimaryButton onClick={handleNextStep} className="w-full py-2">
            {t(LocaleKeys.shared_next)}
          </PrimaryButton>
          <PrimaryButton
            onClick={step !== 0 ? handleBackStep : navigateToOnboarding}
            className="rounded-md gap-3 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50  text-center flex items-center justify-center w-full mt-2"
          >
            <p className="text-gray-900">
              {step !== 0
                ? t(LocaleKeys.shared_back)
                : t(LocaleKeys.pages_onboarding_button_back_choice_role)}
            </p>
          </PrimaryButton>
        </div>
      </div>

      {/* Image Form */}
      <HeroImage image={bannerOnboardingGeneral} />
    </div>
  );
}

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { FormProvider, useForm } from "react-hook-form";
import { PrimaryButton } from "~/components/atoms";
import { useTitle } from "~/hooks";
import { LocaleKeys } from "~/lang";
import { Header, HeroImage } from "~/modules/onboarding/components/molecules";
import { APP_PATHS } from "~/routes/routes";
import { bannerOnboardingGeneral } from "~/utilities/assets_utilities";
import { ClientProfileStep, LegalPreferencesStep } from "../organisms";
import avatarDefault from "~/assets/images/avatar_default.png";

// Datos para los selectores (exportados para reutilizar en los componentes)
export const rangeAgesData = [
  {
    id: 0,
    name: LocaleKeys.pages_onboarding_customer_client_profile_questions_question_4_answer_1,
  },
  {
    id: 1,
    name: LocaleKeys.pages_onboarding_customer_client_profile_questions_question_4_answer_2,
  },
  {
    id: 2,
    name: LocaleKeys.pages_onboarding_customer_client_profile_questions_question_4_answer_3,
  },
  {
    id: 3,
    name: LocaleKeys.pages_onboarding_customer_client_profile_questions_question_4_answer_4,
  },
  {
    id: 4,
    name: LocaleKeys.pages_onboarding_customer_client_profile_questions_question_4_answer_5,
  },
  {
    id: 5,
    name: LocaleKeys.pages_onboarding_customer_client_profile_questions_question_4_answer_6,
  },
];

export const communicationPreferencesData = [
  {
    id: 1,
    name: LocaleKeys.pages_onboarding_customer_legal_preferences_questions_question_3_answer_1,
  },
  {
    id: 2,
    name: LocaleKeys.pages_onboarding_customer_legal_preferences_questions_question_3_answer_2,
  },
  {
    id: 3,
    name: LocaleKeys.pages_onboarding_customer_legal_preferences_questions_question_3_answer_3,
  },
];

export const urgenciesData = [
  {
    id: 1,
    name: LocaleKeys.pages_onboarding_customer_legal_preferences_questions_question_2_answer_1,
  },
  {
    id: 2,
    name: LocaleKeys.pages_onboarding_customer_legal_preferences_questions_question_2_answer_2,
  },
  {
    id: 3,
    name: LocaleKeys.pages_onboarding_customer_legal_preferences_questions_question_2_answer_3,
  },
];

// Definición de las interfaces para el formulario
export interface ClientProfileFormData {
  profilePicture: string;
  location: string;
  occupation: string;
  ageRange: {
    id: number;
    name: string;
  };
}

export interface LegalPreferencesFormData {
  budgetRange: number;
  urgency: {
    id: number;
    name: string;
  };
  communicationPreference: {
    id: number;
    name: string;
  };
}

export interface CustomerOnboardingFormData {
  clientProfile: ClientProfileFormData;
  legalPreferences: LegalPreferencesFormData;
}

export default function OnboardingCustomer() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { changeTitle } = useTitle();
  const navigate = useNavigate();

  // Preparar valores iniciales traducidos para selectores
  const initialAgeRange = {
    id: rangeAgesData[0].id,
    name: t(rangeAgesData[0].name),
  };

  const initialUrgency = {
    id: urgenciesData[0].id,
    name: t(urgenciesData[0].name),
  };

  const initialCommunicationPreference = {
    id: communicationPreferencesData[0].id,
    name: t(communicationPreferencesData[0].name),
  };

  // Valores por defecto para el formulario
  const defaultValues: CustomerOnboardingFormData = {
    clientProfile: {
      profilePicture: avatarDefault,
      location: "",
      occupation: "",
      ageRange: initialAgeRange,
    },
    legalPreferences: {
      budgetRange: 100,
      urgency: initialUrgency,
      communicationPreference: initialCommunicationPreference,
    },
  };

  // Form setup
  const methods = useForm<CustomerOnboardingFormData>({
    defaultValues,
    mode: "onChange",
  });

  const navigateToOnboarding = () => navigate(APP_PATHS.ONBOARDING);
  const navigateToDashboard = () => navigate(APP_PATHS.DASHBOARD);

  const handleNextStep = async () => {
    const isValid = await validateCurrentStep();
    if (!isValid) return;

    if (steps.length === step + 1) {
      onSubmit(methods.getValues());
      return;
    }
    setStep(step + 1);
  };

  const validateCurrentStep = async () => {
    try {
      setError(null);
      if (step === 0) {
        await methods.trigger("clientProfile");
        return methods.getFieldState("clientProfile").invalid === false;
      } else if (step === 1) {
        await methods.trigger("legalPreferences");
        return methods.getFieldState("legalPreferences").invalid === false;
      }
      return true;
    } catch (error) {
      setError("Por favor, revisa los campos con errores");
      return false;
    }
  };

  const onSubmit = (data: CustomerOnboardingFormData) => {
    console.log("Formulario enviado:", data);
    navigateToDashboard();
  };

  const handleBackStep = () => {
    if (step === 0) return;
    setStep(step - 1);
  };

  useEffect(() => {
    changeTitle("Introducción - Arxatec");
  }, []);

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

  return (
    <FormProvider {...methods}>
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
            <div className="w-full mt-8 gap-4 grid">
              {steps[step].component}
            </div>
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
              className="rounded-md gap-3 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 text-center flex items-center justify-center w-full mt-2"
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
    </FormProvider>
  );
}

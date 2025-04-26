import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { PrimaryButton } from "~/components/atoms";
import { LocaleKeys } from "~/lang";
import { Header, HeroImage } from "~/modules/onboarding/components/molecules";
import { bannerOnboardingGeneral } from "~/utilities/assets_utilities";
import {
  AvailabilityStep,
  LawyerProfileStep,
  ProfessionalInfoStep,
  PreferencesStep,
} from "../organisms";
import { useTitle } from "~/hooks";
import { APP_PATHS } from "~/routes/routes";
import { useNavigate } from "react-router";
import avatarDefault from "~/assets/images/avatar_default.png";

// Datos para los selectores (exportados para reutilizar en los componentes)
export const specialitiesData = [
  {
    id: 1,
    name: LocaleKeys.pages_onboarding_lawyer_professional_info_questions_question_1_answer_1,
  },
  {
    id: 2,
    name: LocaleKeys.pages_onboarding_lawyer_professional_info_questions_question_1_answer_2,
  },
  {
    id: 3,
    name: LocaleKeys.pages_onboarding_lawyer_professional_info_questions_question_1_answer_3,
  },
];

export const experiencesData = [
  {
    id: 1,
    name: LocaleKeys.pages_onboarding_lawyer_professional_info_questions_question_2_answer_1,
  },
  {
    id: 2,
    name: LocaleKeys.pages_onboarding_lawyer_professional_info_questions_question_2_answer_2,
  },
  {
    id: 3,
    name: LocaleKeys.pages_onboarding_lawyer_professional_info_questions_question_2_answer_3,
  },
  {
    id: 4,
    name: LocaleKeys.pages_onboarding_lawyer_professional_info_questions_question_2_answer_4,
  },
  {
    id: 5,
    name: LocaleKeys.pages_onboarding_lawyer_professional_info_questions_question_2_answer_5,
  },
  {
    id: 6,
    name: LocaleKeys.pages_onboarding_lawyer_professional_info_questions_question_2_answer_6,
  },
];

export const paymentMethodsData = [
  {
    id: 1,
    name: LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_1_answer_1,
  },
  {
    id: 2,
    name: LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_1_answer_2,
  },
  {
    id: 3,
    name: LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_1_answer_3,
  },
];

export const idealClientsData = [
  {
    id: 1,
    name: LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_2_answer_1,
  },
  {
    id: 2,
    name: LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_2_answer_2,
  },
  {
    id: 3,
    name: LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_2_answer_3,
  },
];

export const communicationPreferencesData = [
  {
    id: 1,
    name: LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_3_answer_1,
  },
  {
    id: 2,
    name: LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_3_answer_2,
  },
  {
    id: 3,
    name: LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_3_answer_3,
  },
];

// Definición de las interfaces para el formulario
export interface LawyerProfileFormData {
  profilePicture: string;
  bio: string;
  location: string;
}

export interface ProfessionalInfoFormData {
  speciality: {
    id: number;
    name: string;
  };
  experience: {
    id: number;
    name: string;
  };
  education: string;
}

export interface AvailabilityFormData {
  schedule: Record<string, { enabled: boolean; slots: string[] }>;
}

export interface PreferencesFormData {
  paymentMethod: {
    id: number;
    name: string;
  };
  idealClient: {
    id: number;
    name: string;
  };
  communicationPreference: {
    id: number;
    name: string;
  };
  virtualConsultations: boolean;
  proBonoWork: boolean;
}

export interface LawyerOnboardingFormData {
  lawyerProfile: LawyerProfileFormData;
  professionalInfo: ProfessionalInfoFormData;
  availability: AvailabilityFormData;
  preferences: PreferencesFormData;
}

export default function OnboardingLawyer() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { changeTitle } = useTitle();
  const navigate = useNavigate();

  // Preparar valores iniciales traducidos para selectores
  const initialSpecialty = {
    id: specialitiesData[0].id,
    name: t(specialitiesData[0].name),
  };

  const initialExperience = {
    id: experiencesData[0].id,
    name: t(experiencesData[0].name),
  };

  const initialPaymentMethod = {
    id: paymentMethodsData[0].id,
    name: t(paymentMethodsData[0].name),
  };

  const initialIdealClient = {
    id: idealClientsData[0].id,
    name: t(idealClientsData[0].name),
  };

  const initialCommunicationPreference = {
    id: communicationPreferencesData[0].id,
    name: t(communicationPreferencesData[0].name),
  };

  // Valores por defecto para el formulario
  const defaultValues: LawyerOnboardingFormData = {
    lawyerProfile: {
      profilePicture: avatarDefault,
      bio: "",
      location: "",
    },
    professionalInfo: {
      speciality: initialSpecialty,
      experience: initialExperience,
      education: "",
    },
    availability: {
      schedule: {},
    },
    preferences: {
      paymentMethod: initialPaymentMethod,
      idealClient: initialIdealClient,
      communicationPreference: initialCommunicationPreference,
      virtualConsultations: false,
      proBonoWork: false,
    },
  };

  // Configuración del formulario con React Hook Form
  const methods = useForm<LawyerOnboardingFormData>({
    defaultValues,
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isValid, isDirty },
  } = methods;

  const navigateToOnboarding = () => navigate(APP_PATHS.ONBOARDING);

  const handleNextStep = async () => {
    const isLastStep = step === steps.length - 1;

    if (isLastStep) {
      // Enviar todos los datos del formulario
      handleSubmit(onSubmit)();
    } else {
      // Validar solo el paso actual antes de avanzar
      try {
        await validateCurrentStep();
        setError(null); // Limpiar el error al avanzar exitosamente
        setStep(step + 1);
      } catch (err) {
        setError(t("Por favor, completa todos los campos requeridos."));
      }
    }
  };

  const validateCurrentStep = async () => {
    let isValid = true;

    switch (step) {
      case 0: // LawyerProfileStep
        isValid = await methods.trigger("lawyerProfile");
        break;
      case 1: // ProfessionalInfoStep
        isValid = await methods.trigger("professionalInfo");
        break;
      case 2: // AvailabilityStep
        isValid = await methods.trigger("availability");
        break;
      case 3: // PreferencesStep
        isValid = await methods.trigger("preferences");
        break;
    }

    if (!isValid) {
      throw new Error("Validation failed");
    }
  };

  const onSubmit = (data: LawyerOnboardingFormData) => {
    console.log("Datos del formulario completo:", data);
    // Aquí puedes enviar los datos al backend
    alert("Formulario enviado correctamente");
    navigate(APP_PATHS.DASHBOARD);
  };

  const handleBackStep = () => {
    if (step === 0) return;
    setError(null); // Limpiar el error al retroceder
    setStep(step - 1);
  };

  useEffect(() => {
    changeTitle("Introducción - Arxatec");
  }, []);

  // Limpiar el error cada vez que cambia el paso
  useEffect(() => {
    setError(null);
  }, [step]);

  const steps = [
    {
      id: 1,
      title: LocaleKeys.pages_onboarding_lawyer_lawyer_profile_title,
      description:
        LocaleKeys.pages_onboarding_lawyer_lawyer_profile_description,
      component: <LawyerProfileStep />,
    },
    {
      id: 2,
      title: LocaleKeys.pages_onboarding_lawyer_professional_info_title,
      description:
        LocaleKeys.pages_onboarding_lawyer_professional_info_description,
      component: <ProfessionalInfoStep />,
    },
    {
      id: 3,
      title: LocaleKeys.pages_onboarding_lawyer_availability_title,
      description: LocaleKeys.pages_onboarding_lawyer_availability_description,
      component: <AvailabilityStep />,
    },
    {
      id: 4,
      title: LocaleKeys.pages_onboarding_lawyer_preferences_title,
      description: LocaleKeys.pages_onboarding_lawyer_preferences_description,
      component: <PreferencesStep />,
    },
  ];

  const isLastStep = step === steps.length - 1;

  return (
    <FormProvider {...methods}>
      <div className="grid grid-cols-1 h-screen p-2 rounded-md lg:grid-cols-2">
        <div className="h-full items-center flex flex-col justify-between px-4 py-0 sm:px-6 lg:flex-none lg:px-20 xl:px-24 order-2 lg:order-1 w-full max-w-[720px] mx-auto gap-10">
          {/* Header Form */}
          <Header maxValue={steps.length} value={step + 1} />

          {/* Content Form */}
          <div className="mx-auto w-full">
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
              {isLastStep
                ? t("Finalizar y guardar")
                : t(LocaleKeys.shared_next)}
            </PrimaryButton>
            <PrimaryButton
              onClick={step !== 0 ? handleBackStep : navigateToOnboarding}
              className="rounded-md gap-3 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 text-center flex items-center justify-center w-full mt-2"
            >
              <p className="text-gray-900">
                {step !== 0 ? t("Anterior") : t("Volver a elegir mi rol")}
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

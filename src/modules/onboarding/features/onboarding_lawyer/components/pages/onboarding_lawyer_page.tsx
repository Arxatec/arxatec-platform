import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { PrimaryButton } from "~/components/atoms";
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
import { useLocation } from "wouter";
import avatarDefault from "~/assets/images/avatar_default.png";
import {
  specialitiesData,
  experiencesData,
  paymentMethodsData,
  idealClientsData,
  communicationPreferencesData,
} from "../../constants/form_data";
import type { LawyerOnboardingFormData } from "../../types";
import { useUserStore } from "~/store";

export default function OnboardingLawyer() {
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { changeTitle } = useTitle();
  const [, setLocation] = useLocation();
  const user = useUserStore((state) => state.user);

  // Preparar valores iniciales
  const initialSpecialty = {
    id: specialitiesData[0].id,
    name: specialitiesData[0].name,
  };

  const initialExperience = {
    id: experiencesData[0].id,
    name: experiencesData[0].name,
  };

  const initialPaymentMethod = {
    id: paymentMethodsData[0].id,
    name: paymentMethodsData[0].name,
  };

  const initialIdealClient = {
    id: idealClientsData[0].id,
    name: idealClientsData[0].name,
  };

  const initialCommunicationPreference = {
    id: communicationPreferencesData[0].id,
    name: communicationPreferencesData[0].name,
  };

  // Valores por defecto para el formulario
  const defaultValues: LawyerOnboardingFormData = {
    lawyerProfile: {
      profilePicture: avatarDefault,
      bio: "",
      location: "",
      gender: "male",
      birthDate: null,
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

  const { handleSubmit } = methods;

  const navigateToOnboarding = () => setLocation(APP_PATHS.ONBOARDING);

  const handleNextStep = async () => {
    const isLastStep = step === steps.length - 1;

    if (isLastStep) {
      // Enviar todos los datos del formulario
      handleSubmit(onSubmit)();
    } else {
      // Validar solo el paso actual antes de avanzar
      try {
        await validateCurrentStep();
        setError(null);
        setStep(step + 1);
      } catch {
        setError("Por favor, completa todos los campos requeridos.");
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
    setLocation(APP_PATHS.DASHBOARD);
  };

  const handleBackStep = () => {
    if (step === 0) return;
    setError(null);
    setStep(step - 1);
  };

  useEffect(() => {
    changeTitle("Introducción - Arxatec");
    // TODO: Change in the future is smell code
    if (!user) {
      setLocation("iniciar-sesion");
    }
  }, []);

  useEffect(() => {
    setError(null);
  }, [step]);

  const steps = [
    {
      id: 1,
      title: "Presenta tu identidad profesional",
      description:
        "Agrega tu biografía, una foto de perfil y tu ubicación para que los clientes puedan conocerte y generar confianza desde el primer contacto.",
      component: <LawyerProfileStep />,
    },
    {
      id: 2,
      title: "Destaca tu experiencia y especialización",
      description:
        "Agrega tu información profesional para que los clientes puedan conocerte y generar confianza desde el primer contacto.",
      component: <ProfessionalInfoStep />,
    },
    {
      id: 3,
      title: "Configura tu disponibilidad",
      description:
        "Establece tu horario de trabajo y disponibilidad para consultas.",
      component: <AvailabilityStep />,
    },
    {
      id: 4,
      title: "Preferencias y métodos de trabajo",
      description: "Define tus preferencias de trabajo y métodos de pago.",
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
              {steps[step].title}
            </h1>
            <p className="text-gray-500 text-base mt-2">
              {steps[step].description}
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
              {isLastStep ? "Finalizar y guardar" : "Siguiente"}
            </PrimaryButton>
            <PrimaryButton
              onClick={step !== 0 ? handleBackStep : navigateToOnboarding}
              className="rounded-md gap-3 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 text-center flex items-center justify-center w-full mt-2"
            >
              <p className="text-gray-900">
                {step !== 0 ? "Anterior" : "Volver a elegir mi rol"}
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

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { PrimaryButton } from "~/components/atoms";
import {
  Header,
  HeroImage,
} from "~/modules/shared/onboarding/components/molecules";
import { bannerOnboardingGeneral } from "~/utilities/assets_utilities";
import {
  AvailabilityStep,
  LawyerProfileStep,
  ProfessionalInfoStep,
  PreferencesStep,
} from "../organisms";
import { useTitle } from "~/hooks";
import { useNavigate } from "react-router-dom";
import avatarDefault from "~/assets/images/avatar_default.png";
import {
  specialitiesData,
  experiencesData,
  paymentMethodsData,
  idealClientsData,
  communicationPreferencesData,
  currencyData,
} from "../../constants/form_data";
import type { LawyerOnboardingFormData } from "../../types";
import { useUserStore } from "~/store";
import { useMutation } from "@tanstack/react-query";
import { createLawyer } from "../../services";
import { ToastManager } from "~/components/molecules/toast_manager";
import { ROUTES } from "~/routes/routes";

const SCHEDULE_STORAGE_KEY = "lawyer_schedule";

export default function OnboardingLawyer() {
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { changeTitle } = useTitle();
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  const mutation = useMutation({
    mutationFn: createLawyer,
    onSuccess: () => {
      navigateToDashboard();
    },
    onError: (error) => {
      ToastManager.error(
        "Sucedio un error al crear el abogado",
        "Sucedio un error inesperado porfavor, vuelve a intentarlo dentro de unos minutos."
      );
      setError(error.message || "Error al crear el abogado");
    },
  });

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

  const initialCurrency = {
    id: currencyData[0].id,
    name: currencyData[0].name,
  };

  // Intentar cargar el horario guardado
  const storedSchedule = (() => {
    try {
      const stored = localStorage.getItem(SCHEDULE_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error("Error loading stored schedule:", error);
      return {};
    }
  })();

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
      linkedin: "",
      identificationNumber: "",
    },
    availability: {
      schedule: storedSchedule,
    },
    preferences: {
      paymentMethod: initialPaymentMethod,
      idealClient: initialIdealClient,
      communicationPreference: initialCommunicationPreference,
      currency: initialCurrency,
    },
  };

  // Configuración del formulario con React Hook Form
  const methods = useForm<LawyerOnboardingFormData>({
    defaultValues,
    mode: "onChange",
  });

  const { handleSubmit } = methods;

  const navigateToOnboarding = () =>
    navigate(ROUTES.AuthRoutes.OnboardingGeneral);
  const navigateToDashboard = () => navigate(ROUTES.AppRoutes.LawyerCases);

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
    const formData = new FormData();

    // Foto de perfil
    if (
      data.lawyerProfile.profilePicture &&
      data.lawyerProfile.profilePicture !== avatarDefault
    ) {
      const byteString = atob(data.lawyerProfile.profilePicture.split(",")[1]);
      const mimeString = data.lawyerProfile.profilePicture
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      const file = new File([blob], "profile-picture.jpg", {
        type: mimeString,
      });
      formData.append("photo", file);
    }

    // Datos básicos
    if (user?.id) {
      formData.append("id", user.id.toString());
    }
    formData.append(
      "license_number",
      data.professionalInfo.identificationNumber
    );
    formData.append("gender", data.lawyerProfile.gender);
    formData.append(
      "birth_date",
      data.lawyerProfile.birthDate
        ? data.lawyerProfile.birthDate.toISOString().split("T")[0]
        : ""
    );

    // Coordenadas
    const coordinates = {
      latitude: 19.3728,
      longitude: -99.1728,
    };
    formData.append("coordinates", JSON.stringify(coordinates));

    // Información profesional
    formData.append("specialty", data.professionalInfo.speciality.name);
    formData.append("experience", data.professionalInfo.experience.name);
    formData.append("biography", data.lawyerProfile.bio);
    formData.append("linkedin", data.professionalInfo.linkedin);
    formData.append("preferred_client", data.preferences.idealClient.name);
    formData.append("payment_methods", data.preferences.paymentMethod.name);
    formData.append("currency", data.preferences.currency.name);
    formData.append(
      "communication_preference",
      data.preferences.communicationPreference.name
    );
    formData.append("location", data.lawyerProfile.location);

    // Horarios de trabajo
    const workSchedules = Object.entries(data.availability.schedule)
      .filter(([, value]) => value.enabled)
      .flatMap(([day, value]) => {
        return value.timeSlots.map((slot) => ({
          day: day.toLowerCase(),
          open_time: slot.start,
          close_time: slot.end,
        }));
      });
    formData.append("workSchedules", JSON.stringify(workSchedules));

    // Tarifas
    const attorneyFees = [
      {
        service_category_id: 1,
        fee: 100,
      },
    ];
    formData.append("attorneyFees", JSON.stringify(attorneyFees));

    console.log("FormData preparado para enviar:");
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    mutation.mutate(formData);
  };

  const handleBackStep = () => {
    if (step === 0) return;
    setError(null);
    setStep(step - 1);
  };

  useEffect(() => {
    changeTitle("Introducción - Arxatec");
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

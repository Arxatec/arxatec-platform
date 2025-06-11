import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { PrimaryButton } from "~/components/atoms";
import { useTitle } from "~/hooks";
import {
  Header,
  HeroImage,
} from "~/modules/shared/onboarding/components/molecules";
import { bannerOnboardingGeneral } from "~/utilities/assets_utilities";
import { ClientProfileStep, LegalPreferencesStep } from "../organisms";
import {
  communicationPreferencesData,
  rangeAgesData,
  urgenciesData,
} from "../../constants/form_data";
import type { CustomerOnboardingFormData } from "../../types";
import { createCustomer, type CustomerResponse } from "../../services";
import { useUserStore } from "~/store";
import { ROUTES } from "~/routes/routes";

export default function OnboardingCustomer() {
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const user = useUserStore((state) => state.user);
  const { changeTitle } = useTitle();
  const [, setLocation] = useLocation();

  const initialAgeRange = {
    id: rangeAgesData[0].id,
    name: rangeAgesData[0].name,
  };

  const initialUrgency = {
    id: urgenciesData[0].id,
    name: urgenciesData[0].name,
  };

  const initialCommunicationPreference = {
    id: communicationPreferencesData[0].id,
    name: communicationPreferencesData[0].name,
  };

  const defaultValues: CustomerOnboardingFormData = {
    clientProfile: {
      profilePicture: null,
      location: "",
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
      occupation: "",
      ageRange: initialAgeRange,
      gender: "male",
      birthDate: null,
    },
    legalPreferences: {
      budgetRange: 100,
      urgency: initialUrgency,
      communicationPreference: initialCommunicationPreference,
    },
  };

  const methods = useForm<CustomerOnboardingFormData>({
    defaultValues,
    mode: "onChange",
  });

  const navigateToOnboarding = () =>
    setLocation(`~${ROUTES.Auth}${ROUTES.AuthRoutes.OnboardingGeneral}`);
  const navigateToDashboard = () =>
    setLocation(`~${ROUTES.App}${ROUTES.AppRoutes.LawyerCases}`);

  const mutation: UseMutationResult<CustomerResponse, Error, FormData> =
    useMutation({
      mutationFn: createCustomer,
      onSuccess: () => {
        navigateToDashboard();
      },
      onError: (error) => {
        setError(error.message || "Error al crear el cliente");
      },
    });

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
        const result = await methods.trigger(
          [
            "clientProfile.location",
            "clientProfile.coordinates",
            "clientProfile.occupation",
            "clientProfile.ageRange",
            "clientProfile.gender",
            "clientProfile.birthDate",
            "clientProfile.profilePicture",
          ],
          { shouldFocus: true }
        );

        if (!result) {
          setError("Por favor, completa todos los campos requeridos");
          return false;
        }
        return true;
      } else if (step === 1) {
        const result = await methods.trigger(
          [
            "legalPreferences.budgetRange",
            "legalPreferences.urgency",
            "legalPreferences.communicationPreference",
          ],
          { shouldFocus: true }
        );

        if (!result) {
          setError("Por favor, completa todos los campos requeridos");
          return false;
        }
        return true;
      }
      return true;
    } catch (error) {
      console.error(error);
      setError("Por favor, revisa los campos con errores");
      return false;
    }
  };

  const onSubmit = (data: CustomerOnboardingFormData) => {
    const formData = new FormData();

    // Datos del perfil del cliente
    formData.append("id", user.id.toString());
    formData.append("photo", data.clientProfile.profilePicture);
    formData.append("location", data.clientProfile.location);
    formData.append(
      "coordinates",
      JSON.stringify({
        latitude: data.clientProfile.coordinates.latitude,
        longitude: data.clientProfile.coordinates.longitude,
      })
    );
    formData.append("occupation", data.clientProfile.occupation);
    // In future remove age_range
    formData.append("age_range", "18");
    formData.append("gender", data.clientProfile.gender);
    formData.append(
      "birth_date",
      data.clientProfile.birthDate?.toISOString() || ""
    );

    // Preferencias legales
    formData.append("budget", data.legalPreferences.budgetRange.toString());
    formData.append("urgency_level", data.legalPreferences.urgency.name);
    formData.append(
      "communication_preference",
      data.legalPreferences.communicationPreference.name
    );

    mutation.mutate(formData);
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
      title: "Cuéntanos un poco sobre ti",
      description:
        "Cuéntanos un poco sobre ti para brindarte una mejor experiencia y recomendaciones personalizadas y abogados especializados en tu caso.",
      component: <ClientProfileStep />,
    },
    {
      id: 2,
      title: "Establece tus preferencias",
      description:
        "Establece tus preferencias para que podamos recomendarte abogados especializados en tu caso, y podamos contactarte cuando necesites.",
      component: <LegalPreferencesStep />,
    },
  ];

  return (
    <FormProvider {...methods}>
      <div className="grid grid-cols-1 h-screen p-2 rounded-md lg:grid-cols-2">
        <div className="h-full items-center flex flex-col justify-between px-4 py-0 sm:px-6 lg:flex-none lg:px-20 xl:px-24 order-2 lg:order-1 w-full max-w-[720px] mx-auto gap-10">
          <Header value={step + 1} maxValue={steps.length} />

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

          <div className="w-full py-10">
            {error && (
              <p className="text-sm text-red-500 text-left mb-4">{error}</p>
            )}
            <PrimaryButton
              onClick={handleNextStep}
              className="w-full py-2"
              loader={mutation.isPending}
              disabled={mutation.isPending}
            >
              {step === steps.length - 1 ? "Finalizar" : "Siguiente"}
            </PrimaryButton>
            <PrimaryButton
              onClick={step !== 0 ? handleBackStep : navigateToOnboarding}
              className="rounded-md gap-3 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 text-center flex items-center justify-center w-full mt-2"
            >
              <p className="text-gray-900">
                {step !== 0 ? "Atrás" : "Volver a selección de rol"}
              </p>
            </PrimaryButton>
          </div>
        </div>

        <HeroImage image={bannerOnboardingGeneral} />
      </div>
    </FormProvider>
  );
}

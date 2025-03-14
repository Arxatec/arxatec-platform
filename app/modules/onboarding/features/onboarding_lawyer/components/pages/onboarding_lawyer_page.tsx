import { use, useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { useTranslation } from "react-i18next";
import { PrimaryButton } from "~/components/atoms";
import { LocaleKeys } from "~/lang";
import { Header, HeroImage } from "~/modules/onboarding/components/molecules";
import { bannerOnboardingGeneral, logo } from "~/utilities/assets_utilities";
import {
  AvailabilityStep,
  LawyerProfileStep,
  ProfessionalInfoStep,
  PreferencesStep,
} from "../organisms";
import { useTitle } from "~/hooks";
import { ROUTES } from "~/routes/routes";
import { useNavigate } from "react-router";

const steps = [
  {
    id: 1,
    title: "Presenta tu identidad profesional",
    description:
      "Agrega tu biografía, una foto de perfil y tu ubicación para que los clientes te conozcan y generes confianza desde el primer contacto.",
    component: <LawyerProfileStep />,
  },
  {
    id: 4,
    title: "Destaca tu experiencia y especialización",
    description:
      "Indica tu especialidad, vincula tu perfil de LinkedIn y comparte tus años de experiencia para demostrar tu trayectoria profesional.",
    component: <ProfessionalInfoStep />,
  },
  {
    id: 3,
    title: "Organiza tu disponibilidad",
    description:
      "Establece tus horarios de atención de manera flexible para optimizar tu tiempo y brindar un mejor servicio.",
    component: <AvailabilityStep />,
  },
  {
    id: 2,
    title: "Personaliza tu experiencia",
    description:
      "Configura tus preferencias y criterios para recibir consultas alineadas con tu especialidad y estilo de trabajo.",
    component: <PreferencesStep />,
  },
];

export default function OnboardingLawyer() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { changeTitle } = useTitle();
  const navigate = useNavigate();

  const navigateToOnboarding = () => navigate(`/${ROUTES.ONBOARDING}`);

  const handleNextStep = () => {
    if (steps.length == step) return;
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
        <Header maxValue={steps.length} value={step + 1} />

        {/* Content Form */}
        <div className="mx-auto w-full ">
          <h1 className="text-2xl font-bold text-gray-900">
            {steps[step].title}
          </h1>
          <p className="text-gray-500 text-base mt-2">
            {steps[step].description}
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
              {step !== 0 ? "Anterior" : "Volver a elegir mi rol"}
            </p>
          </PrimaryButton>
        </div>
      </div>

      {/* Image Form */}
      <HeroImage image={bannerOnboardingGeneral} />
    </div>
  );
}

import { Button, Logo } from "@/components/ui";
import { StepAbout, StepContact } from "../components";
import { useEffect, useState } from "react";
import { useTitle } from "@/hooks";

export default function LawyerOnboardingPage() {
  const [step, setStep] = useState(1);
  const { changeTitle } = useTitle();

  const handleNextStep = () => setStep(step + 1);
  const handlePreviousStep = () => setStep(step - 1);

  useEffect(() => {
    changeTitle("Introducción - Arxatec");
  }, []);
  return (
    <div className="w-full min-h-svh flex items-center justify-center">
      <div className="w-full p-8 mx-auto max-w-md">
        <div className="bg-accent rounded p-2">
          <Logo className="w-24 h-8 text-primary mx-auto" />
        </div>
        <h1 className="text-xl font-bold font-serif text-center mt-8">
          Bienvenido Harvey Vasquez
        </h1>
        <p className="text-sm text-center mt-2 text-muted-foreground">
          Por favor, completa tu perfil es opcional pero ayudara a otros
          usuarios a conocerte y personalizar tu experiencia.
        </p>
        {step === 1 && <StepAbout handleNextStep={handleNextStep} />}
        {step === 2 && <StepContact handlePreviousStep={handlePreviousStep} />}
        <Button className="w-full mt-2" variant="ghost">
          Omitir
        </Button>
      </div>
    </div>
  );
}

import { Button, Logo } from "@/components/ui";
import { StepAbout, StepContact } from "../components";
import { useEffect, useState } from "react";
import { useTitle } from "@/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { lawyerOnboardingSchema } from "../schemas";
import type { LawyerOnboardingSchemaType } from "../types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";

export default function LawyerOnboardingPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { changeTitle } = useTitle();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    // getValues,
    formState: { errors },
  } = useForm<LawyerOnboardingSchemaType>({
    resolver: zodResolver(lawyerOnboardingSchema),
    defaultValues: {
      experience: 3,
      phone: "",
      linkedin: "",
    },
    mode: "onChange",
  });

  const handleNextStep = async () => {
    const fieldsToValidate: (keyof LawyerOnboardingSchemaType)[] = [
      "license",
      "bio",
      "experience",
    ];
    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => setStep(step - 1);

  const handleSkip = () => {
    navigate(ROUTES.Lawyer.ViewCases);
    toast.info("Perfil omitido", {
      description:
        "Puedes completar tu perfil más tarde desde la configuración.",
    });
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    // const data = getValues();

    // console.log("Datos del formulario:", data);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Perfil completado", {
        description: "Tu perfil ha sido actualizado correctamente.",
      });

      // navigate(ROUTES.Lawyer.ViewCases);
    } catch {
      toast.error("Error al completar perfil", {
        description:
          "Ocurrió un error al guardar tu información. Inténtalo de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = () => {
    handleSubmit(onSubmit)();
  };

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

        <form>
          {step === 1 && (
            <StepAbout
              handleNextStep={handleNextStep}
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
            />
          )}
          {step === 2 && (
            <StepContact
              handlePreviousStep={handlePreviousStep}
              onSubmit={handleFormSubmit}
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              isSubmitting={isSubmitting}
            />
          )}
        </form>

        <Button
          className="w-full mt-2"
          variant="ghost"
          onClick={handleSkip}
          disabled={isSubmitting}
        >
          Omitir
        </Button>
      </div>
    </div>
  );
}

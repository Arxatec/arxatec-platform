import {
  Button,
  FormInput,
  FormTextarea,
  Label,
  Slider,
} from "@/components/ui";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import type { LawyerOnboardingSchemaType } from "../../types";

interface Props {
  handleNextStep: () => void;
  register: UseFormRegister<LawyerOnboardingSchemaType>;
  errors: FieldErrors<LawyerOnboardingSchemaType>;
  watch: UseFormWatch<LawyerOnboardingSchemaType>;
  setValue: UseFormSetValue<LawyerOnboardingSchemaType>;
}

export const StepAbout: React.FC<Props> = ({
  handleNextStep,
  register,
  errors,
  watch,
  setValue,
}) => {
  const experience = watch("experience") || 3;

  const handleExperienceChange = (value: number[]) => {
    setValue("experience", value[0]);
  };

  return (
    <>
      <div className="mt-8 space-y-4">
        <FormInput
          label="Licencia"
          name="license"
          placeholder="Ej. CAL-2024-12345"
          register={register}
          errors={errors}
          className="w-full"
        />

        <FormTextarea
          label="Cuéntanos un poco sobre ti"
          name="bio"
          placeholder="Ej. Abogado experto en derecho laboral..."
          register={register}
          errors={errors}
          className="w-full"
        />

        <div>
          <Label className="mb-2 block">Experiencia</Label>
          <Slider
            value={[experience]}
            max={50}
            min={1}
            step={1}
            onValueChange={handleExperienceChange}
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
            <span>
              {experience} año{experience !== 1 ? "s" : ""}
            </span>
            <span>50 años</span>
          </div>
          {errors.experience && (
            <p className="text-sm text-rose-500 mt-2">
              {errors.experience.message}
            </p>
          )}
        </div>
      </div>

      <Button className="w-full mt-8" type="button" onClick={handleNextStep}>
        Continuar
      </Button>
    </>
  );
};

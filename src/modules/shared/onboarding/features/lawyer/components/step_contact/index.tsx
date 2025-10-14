import { Button, FormInput, type LocationData } from "@/components/ui";
import { ArrowLeftIcon, Loader2 } from "lucide-react";
import { LocationInput } from "../location_input";
import { ProfileImage } from "../profile_image";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import type { LawyerOnboardingSchemaType } from "../../types";

interface Props {
  handlePreviousStep: () => void;
  onSubmit: () => void;
  register: UseFormRegister<LawyerOnboardingSchemaType>;
  errors: FieldErrors<LawyerOnboardingSchemaType>;
  watch: UseFormWatch<LawyerOnboardingSchemaType>;
  setValue: UseFormSetValue<LawyerOnboardingSchemaType>;
  isSubmitting?: boolean;
}

export const StepContact: React.FC<Props> = ({
  handlePreviousStep,
  onSubmit,
  register,
  errors,
  watch,
  setValue,
  isSubmitting = false,
}) => {
  const location = watch("location");
  const avatar = watch("avatar");

  const handleLocationChange = (newLocation: LocationData | undefined) => {
    setValue("location", newLocation as LocationData | undefined);
  };

  const handleAvatarChange = (file: File | undefined) => {
    setValue("avatar", file);
  };

  return (
    <div className="mt-8 space-y-4">
      <ProfileImage
        value={avatar}
        onChange={handleAvatarChange}
        fallbackText="HV"
      />

      <FormInput
        label="Número de celular"
        name="phone"
        placeholder="Ej. +51 999999999"
        register={register}
        errors={errors}
        className="w-full"
        optional
      />

      <FormInput
        label="LinkedIn"
        name="linkedin"
        placeholder="Ej. https://linkedin.com/in/carlos-rodriguez-abogado"
        register={register}
        errors={errors}
        className="w-full"
        optional
      />

      <LocationInput value={location} onChange={handleLocationChange} />

      <div className="flex items-center justify-between gap-2 mt-8">
        <Button type="button" variant="outline" onClick={handlePreviousStep}>
          <ArrowLeftIcon className="size-4" />
        </Button>
        <Button
          type="button"
          className="flex-1"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          {isSubmitting ? "Completando..." : "Completar perfil"}
        </Button>
      </div>
    </div>
  );
};

import { UserIcon } from "@heroicons/react/16/solid";
import { Controller, useFormContext } from "react-hook-form";
import { useRef } from "react";
import { CustomTextArea, PrimaryButton } from "~/components/atoms";
import avatarDefault from "~/assets/images/avatar_default.png";
import type { LawyerOnboardingFormData } from "../../../types";
import { LocationSelector } from "~/modules/onboarding/components/molecules/location_selector";
import { GenderSelector } from "~/modules/onboarding/components/molecules/gender_selector";
import { BirthDateSelector } from "~/modules/onboarding/components/molecules/birth_date_selector";

export const LawyerProfileStep = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<LawyerOnboardingFormData>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Foto de perfil
        </label>
        <Controller
          control={control}
          name="lawyerProfile.profilePicture"
          rules={{ required: "La foto de perfil es requerida" }}
          render={({ field }) => (
            <>
              <div className="flex items-center gap-4">
                <img
                  className="size-16 object-cover rounded-xl border border-gray-200"
                  src={field.value || avatarDefault}
                  alt="Avatar de perfil"
                  onError={() => {
                    field.onChange(avatarDefault);
                  }}
                />
                <PrimaryButton
                  type="button"
                  onClick={handleButtonClick}
                  className="rounded-md gap-3 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 text-center flex items-center justify-center"
                  aria-label="Seleccionar imagen de perfil"
                >
                  <p className="text-gray-900">Subir una foto</p>
                </PrimaryButton>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg,image/png"
                  className="hidden"
                  onChange={(e) => handleFileInputChange(e, field.onChange)}
                  aria-label="Subir imagen de perfil"
                />
              </div>
              {errors.lawyerProfile?.profilePicture && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.lawyerProfile.profilePicture.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      <div>
        <CustomTextArea
          {...register("lawyerProfile.bio", {
            required: "La biografía es requerida",
            minLength: {
              value: 50,
              message: "La biografía debe tener al menos 50 caracteres",
            },
          })}
          startAdornment={<UserIcon className="size-5 text-gray-400" />}
          label="Biografía"
          placeholder="Ej. Soy un abogado especializado en derecho laboral, con más de 10 años de experiencia en el campo."
          required
        />
        {errors.lawyerProfile?.bio && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.lawyerProfile.bio.message}
          </p>
        )}
      </div>

      <LocationSelector<LawyerOnboardingFormData>
        control={control}
        name="lawyerProfile.location"
      />

      <GenderSelector<LawyerOnboardingFormData>
        control={control}
        name="lawyerProfile.gender"
      />
      <BirthDateSelector<LawyerOnboardingFormData>
        control={control}
        name="lawyerProfile.birthDate"
      />
    </>
  );
};

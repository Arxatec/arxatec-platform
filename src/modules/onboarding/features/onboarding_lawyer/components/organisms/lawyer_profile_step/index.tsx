import { MapPinIcon, UserIcon } from "@heroicons/react/16/solid";
import { Controller, useFormContext } from "react-hook-form";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { CustomInput, CustomTextArea, PrimaryButton } from "~/components/atoms";
import { LocaleKeys } from "~/lang";
import avatarDefault from "~/assets/images/avatar_default.png";

type FormValues = {
  lawyerProfile: {
    profilePicture: string;
    bio: string;
    location: string;
  };
};

export const LawyerProfileStep = () => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FormValues>();

  const handleFileInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) => {
    const file = e.target.files?.[0];
    setImageError(null);

    if (!file) return;

    // Validar tipo de archivo
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setImageError(t("Solo se permiten archivos JPG o PNG"));
      return;
    }

    // Validar tamaño (5MB = 5 * 1024 * 1024 bytes)
    if (file.size > 5 * 1024 * 1024) {
      setImageError(t("El archivo debe ser menor a 5MB"));
      return;
    }

    // Crear URL para la vista previa
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const result = e.target?.result as string;
      onChange(result);
    };
    fileReader.readAsDataURL(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {t(
            LocaleKeys.pages_onboarding_lawyer_lawyer_profile_questions_question_1_label
          )}
        </label>
        <Controller
          control={control}
          name="lawyerProfile.profilePicture"
          rules={{ required: t("La foto de perfil es requerida") }}
          render={({ field }) => (
            <>
              <div className="flex items-center gap-4">
                <img
                  className="size-16 object-cover rounded-xl border border-gray-200"
                  src={field.value || avatarDefault}
                  alt={t("Avatar de perfil")}
                  onError={() => {
                    // Si la imagen falla, establece la imagen por defecto
                    field.onChange(avatarDefault);
                  }}
                />
                <PrimaryButton
                  type="button"
                  onClick={handleButtonClick}
                  className="rounded-md gap-3 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 text-center flex items-center justify-center"
                  aria-label={t("Seleccionar imagen de perfil")}
                >
                  <p className="text-gray-900">
                    {t(
                      LocaleKeys.pages_onboarding_lawyer_lawyer_profile_questions_question_1_placeholder
                    )}
                  </p>
                </PrimaryButton>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg,image/png"
                  className="hidden"
                  onChange={(e) => handleFileInputChange(e, field.onChange)}
                  aria-label={t("Subir imagen de perfil")}
                />
              </div>
              {imageError && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {imageError}
                </p>
              )}
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
            required: t("Este campo es requerido"),
          })}
          startAdornment={<UserIcon className="size-5 text-gray-400" />}
          label={t(
            LocaleKeys.pages_onboarding_lawyer_lawyer_profile_questions_question_2_label
          )}
          placeholder={t(
            LocaleKeys.pages_onboarding_lawyer_lawyer_profile_questions_question_2_placeholder
          )}
          required
        />
        {errors.lawyerProfile?.bio && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.lawyerProfile.bio.message}
          </p>
        )}
      </div>

      <div>
        <CustomInput
          {...register("lawyerProfile.location", {
            required: t("Este campo es requerido"),
          })}
          startAdornment={<MapPinIcon className="size-5 text-gray-400" />}
          type="text"
          label={t(
            LocaleKeys.pages_onboarding_lawyer_lawyer_profile_questions_question_3_label
          )}
          placeholder={t(
            LocaleKeys.pages_onboarding_lawyer_lawyer_profile_questions_question_3_placeholder
          )}
          required
        />
        {errors.lawyerProfile?.location && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.lawyerProfile.location.message}
          </p>
        )}
      </div>
    </>
  );
};

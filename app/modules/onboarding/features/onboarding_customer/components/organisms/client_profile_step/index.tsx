import { AcademicCapIcon, MapPinIcon } from "@heroicons/react/16/solid";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CustomInput, CustomSelector, PrimaryButton } from "~/components/atoms";
import { LocaleKeys } from "~/lang";
import { rangeAgesData } from "../../pages/onboarding_customer_page";
import { useRef, useState } from "react";
import avatarDefault from "~/assets/images/avatar_default.png";

type FormValues = {
  clientProfile: {
    profilePicture: string;
    location: string;
    occupation: string;
    ageRange: {
      id: number;
      name: string;
    };
  };
};

export const ClientProfileStep = () => {
  const { t } = useTranslation();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FormValues>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const rangeAges = rangeAgesData.map((item) => {
    return {
      id: item.id,
      name: t(item.name),
    };
  });

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
            LocaleKeys.pages_onboarding_customer_client_profile_questions_question_1_label
          )}
        </label>
        <Controller
          control={control}
          name="clientProfile.profilePicture"
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
                      LocaleKeys.pages_onboarding_customer_client_profile_questions_question_1_placeholder
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
              {errors.clientProfile?.profilePicture && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.clientProfile.profilePicture.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      <CustomInput
        {...register("clientProfile.location", {
          required: t("Este campo es requerido"),
        })}
        startAdornment={<MapPinIcon className="size-5 text-gray-400" />}
        type="text"
        label={t(
          LocaleKeys.pages_onboarding_customer_client_profile_questions_question_2_label
        )}
        placeholder={t(
          LocaleKeys.pages_onboarding_customer_client_profile_questions_question_2_placeholder
        )}
        required
      />
      {errors.clientProfile?.location && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {errors.clientProfile.location.message}
        </p>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <CustomInput
            {...register("clientProfile.occupation", {
              required: t("Este campo es requerido"),
            })}
            startAdornment={
              <AcademicCapIcon className="size-5 text-gray-400" />
            }
            type="text"
            label={t(
              LocaleKeys.pages_onboarding_customer_client_profile_questions_question_3_label
            )}
            placeholder={t(
              LocaleKeys.pages_onboarding_customer_client_profile_questions_question_3_placeholder
            )}
            required
          />
          {errors.clientProfile?.occupation && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.clientProfile.occupation.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor={"age"}
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            {t(
              LocaleKeys.pages_onboarding_customer_client_profile_questions_question_4_label
            )}
          </label>
          <Controller
            control={control}
            name="clientProfile.ageRange"
            rules={{ required: t("Debes seleccionar un rango de edad") }}
            render={({ field }) => (
              <CustomSelector
                options={rangeAges}
                selected={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.clientProfile?.ageRange && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.clientProfile.ageRange.message}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

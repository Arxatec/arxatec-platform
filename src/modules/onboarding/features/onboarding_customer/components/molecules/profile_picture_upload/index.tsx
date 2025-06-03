import { useRef, useState } from "react";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { PrimaryButton } from "~/components/atoms";
import avatarDefault from "~/assets/images/avatar_default.png";
import type { CustomerOnboardingFormData } from "../../../types";

interface Props {
  control: Control<CustomerOnboardingFormData>;
}

export const ProfilePictureUpload: React.FC<Props> = ({ control }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const handleFileInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: File) => void
  ) => {
    const file = e.target.files?.[0];
    setImageError(null);

    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setImageError("Solo se permiten archivos JPG o PNG");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError("El archivo debe ser menor a 5MB");
      return;
    }

    onChange(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-900 mb-2">
        Foto de perfil
      </label>
      <Controller
        control={control}
        name="clientProfile.profilePicture"
        rules={{ required: "La foto de perfil es requerida" }}
        render={({ field, fieldState: { error } }) => (
          <>
            <div className="flex items-center gap-4">
              <img
                className="size-16 object-cover rounded-xl border border-gray-200"
                src={
                  field.value ? URL.createObjectURL(field.value) : avatarDefault
                }
                alt="Avatar de perfil"
              />
              <PrimaryButton
                type="button"
                onClick={handleButtonClick}
                className="rounded-md gap-3 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 text-center flex items-center justify-center"
                aria-label="Seleccionar imagen de perfil"
              >
                <p className="text-gray-900">Subir foto</p>
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
            {imageError && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {imageError}
              </p>
            )}
            {error && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
};

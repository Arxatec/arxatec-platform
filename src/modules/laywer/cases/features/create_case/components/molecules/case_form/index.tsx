import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { CustomInput, CustomSelector } from "~/components/atoms";
import { TextRich } from "~/components/organisms";
import { CustomAvatar } from "~/components/atoms/custom_avatar";
import type { FormValues, User } from "../../../interface";
import type { LegalCategoryModel } from "../../../models";

interface Props {
  onOpenUserSelector: () => void;
  selectedUser?: User;
  categories: LegalCategoryModel[];
}

export const CaseForm = ({
  onOpenUserSelector,
  selectedUser,
  categories,
}: Props) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      category: categories[0],
    },
  });

  useEffect(() => {
    if (selectedUser) {
      setValue("client", selectedUser);
    }
  }, [selectedUser, setValue]);

  const onSubmit = (data: FormValues) => {
    console.log("Datos del formulario:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all"
    >
      <div className="grid grid-cols-1 gap-2">
        <div className="w-full">
          <Controller
            name="title"
            control={control}
            rules={{ required: "El título es requerido" }}
            render={({ field }) => (
              <div>
                <CustomInput
                  {...field}
                  placeholder="Ej. Reclamación de daños por incumplimiento contractual"
                  label="Título del caso"
                  className="w-full"
                />
                {errors.title && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.title.message}
                  </span>
                )}
              </div>
            )}
          />
        </div>
      </div>
      <div className="mt-4">
        <Controller
          name="category"
          control={control}
          rules={{ required: "La categoría es requerida" }}
          render={({ field }) => (
            <div>
              <CustomSelector
                label="Categoría"
                options={categories}
                selected={field.value}
                onChange={field.onChange}
              />
              {errors.category && (
                <span className="text-xs text-red-500 mt-1">
                  {errors.category.message}
                </span>
              )}
            </div>
          )}
        />
      </div>
      <div className="mt-4">
        <label className="text-sm font-medium text-gray-900">
          Seleccionar cliente
        </label>
        <Controller
          name="client"
          control={control}
          rules={{ required: "El cliente es requerido" }}
          render={() => (
            <>
              {selectedUser ? (
                <div
                  onClick={onOpenUserSelector}
                  className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 mt-2 cursor-pointer hover:bg-gray-50"
                >
                  <CustomAvatar
                    avatar={selectedUser.avatar || ""}
                    size="32px"
                    altText={selectedUser.name}
                    username={selectedUser.name}
                  />
                  <span className="text-sm text-gray-700">
                    {selectedUser.name}
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={onOpenUserSelector}
                  className="text-left text-sm text-gray-400 block border border-gray-300 w-full rounded-md px-4 py-1.5 mt-2 hover:bg-gray-50"
                >
                  Seleccionar...
                </button>
              )}
              {errors.client && (
                <span className="text-xs text-red-500 mt-1">
                  {errors.client.message}
                </span>
              )}
            </>
          )}
        />
      </div>
      <div className="mt-4">
        <label className="text-sm font-medium text-gray-900">
          Descripción del caso
        </label>
        <Controller
          name="description"
          control={control}
          rules={{ required: "La descripción es requerida" }}
          render={({ field }) => (
            <>
              <TextRich
                value={field.value}
                onChange={field.onChange}
                minHeight="250px"
                maxHeight="600px"
                className="mt-2"
                showImageMenu={false}
                showTableMenu={false}
                showYoutubeMenu={false}
                showFontSelector={false}
              />
              {errors.description && (
                <span className="text-xs text-red-500 mt-1">
                  {errors.description.message}
                </span>
              )}
            </>
          )}
        />
      </div>
    </form>
  );
};

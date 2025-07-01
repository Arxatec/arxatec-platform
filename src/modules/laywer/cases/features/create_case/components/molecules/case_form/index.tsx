import { Controller } from "react-hook-form";
import type {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormWatch,
} from "react-hook-form";
import { forwardRef } from "react";
import { CustomInput, CustomSelector } from "~/components/atoms";
import { CustomAvatar } from "~/components/atoms/custom_avatar";
import type { FormValues } from "../../../interface";
import type { ClientModel, LegalCategoryModel } from "../../../models";

interface Props {
  onOpenUserSelector: () => void;
  selectedUser?: ClientModel;
  categories: LegalCategoryModel[];
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  watch: UseFormWatch<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  onSubmit: (data: FormValues) => void;
}

export const CaseForm = forwardRef<HTMLFormElement, Props>(
  (
    {
      onOpenUserSelector,
      selectedUser,
      categories,
      control,
      errors,
      handleSubmit,
      onSubmit,
    },
    ref
  ) => {
    return (
      <form
        ref={ref}
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
            name="clientId"
            control={control}
            rules={{
              required: "El cliente es requerido",
            }}
            render={() => (
              <>
                {selectedUser ? (
                  <div
                    onClick={onOpenUserSelector}
                    className="flex items-center gap-2 border border-gray-300 rounded-md px-1 py-1 mt-2 cursor-pointer hover:bg-gray-50"
                  >
                    <CustomAvatar
                      avatar={selectedUser.avatar || ""}
                      size="28px"
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
                    Seleccionar cliente...
                  </button>
                )}
                {errors.clientId && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.clientId.message}
                  </span>
                )}
              </>
            )}
          />
        </div>
      </form>
    );
  }
);

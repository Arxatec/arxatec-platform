import { CustomInput, CustomSelector } from "~/components/atoms";
import { TextRich } from "~/components/organisms";
import { useForm, Controller } from "react-hook-form";
import { CustomAvatar } from "~/components/atoms/custom_avatar";
import React, { useEffect } from "react";
import type { Category } from "../../../types";
import { useCaseStore } from "../../../store/case.store";
import { useCasesStore } from "../../../../../store/cases.store";

interface User {
  id: number;
  name: string;
  avatar?: string;
}

interface CaseFormProps {
  onOpenUserSelector: () => void;
  selectedUser?: User;
  categories: Category[];
}

interface FormValues {
  title: string;
  category: Category;
  client?: User;
  description: string;
}

export const CaseForm = ({
  onOpenUserSelector,
  selectedUser,
  categories,
}: CaseFormProps) => {
  const {
    title,
    category,
    description,
    files,
    setTitle,
    setCategory,
    setDescription,
    reset: resetCaseStore,
  } = useCaseStore();

  const addCase = useCasesStore((state) => state.addCase);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: title || "",
      category: category ||
        categories[0] || {
          id: 0,
          name: "Cargando...",
          description: "",
        },
      description: description || "",
    },
  });

  // Actualizar el cliente cuando se selecciona
  useEffect(() => {
    if (selectedUser) {
      setValue("client", selectedUser);
    }
  }, [selectedUser, setValue]);

  // Actualizar la categoría por defecto cuando se cargan las categorías
  useEffect(() => {
    if (categories.length > 0 && !category) {
      setValue("category", categories[0]);
      setCategory(categories[0]);
    }
  }, [categories, setValue, category, setCategory]);

  const onSubmit = (data: FormValues) => {
    if (!data.client) {
      alert("Por favor selecciona un cliente");
      return;
    }

    // Guardar en el store de casos
    addCase({
      title: data.title,
      category: data.category,
      description: data.description,
      client: {
        id: data.client.id,
        name: data.client.name,
        phone: "",
        email: "",
        role: "client",
        url: "",
        imageUrl: data.client.avatar || "",
      },
      files: files,
    });

    // Resetear el store temporal
    resetCaseStore();

    // Redirigir hacia atrás
    window.history.back();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-4 rounded-lg  "
    >
      <div>
        <Controller
          name="title"
          control={control}
          rules={{ required: "El título es requerido" }}
          render={({ field }) => (
            <>
              <CustomInput
                {...field}
                label="Título del caso"
                placeholder="Ej: Demanda por incumplimiento de contrato"
                onChange={(e) => {
                  field.onChange(e);
                  setTitle(e.target.value);
                }}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.title.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      <div>
        <Controller
          name="category"
          control={control}
          rules={{ required: "La categoría es requerida" }}
          render={({ field }) => (
            <>
              <CustomSelector
                {...field}
                label="Categoría"
                options={categories}
                selected={field.value}
                onChange={(value: Category) => {
                  field.onChange(value);
                  setCategory(value);
                }}
              />
              {errors.category && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.category.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
          Cliente
        </label>
        <div className="flex items-center gap-4">
          {selectedUser ? (
            <div className="flex items-center gap-2">
              <CustomAvatar
                avatar={selectedUser.avatar}
                size="2rem"
                altText={selectedUser.name}
                username={selectedUser.name}
              />
              <span className="text-sm text-gray-900">{selectedUser.name}</span>
            </div>
          ) : (
            <span className="text-sm text-gray-500">
              No se ha seleccionado ningún cliente
            </span>
          )}
          <button
            type="button"
            onClick={onOpenUserSelector}
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            {selectedUser ? "Cambiar cliente" : "Seleccionar cliente"}
          </button>
        </div>
      </div>

      <div>
        <Controller
          name="description"
          control={control}
          rules={{ required: "La descripción es requerida" }}
          render={({ field }) => (
            <>
              <TextRich
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  setDescription(value);
                }}
                minHeight="250px"
                maxHeight="600px"
                className="mt-2"
                showImageMenu={false}
                showTableMenu={false}
                showYoutubeMenu={false}
                showFontSelector={false}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.description.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Guardar caso
        </button>
      </div>
    </form>
  );
};

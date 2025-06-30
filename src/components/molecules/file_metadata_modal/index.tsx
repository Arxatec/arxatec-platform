import { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  PrimaryButton,
  CustomInput,
  CustomSelector,
  CustomTextArea,
} from "~/components/atoms";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (fileInfo: {
    label: string;
    description: string;
    category_id: number;
  }) => void;
  fileName: string;
  categories?: { id: number; name: string }[];
}

type FormValues = {
  label: string;
  description: string;
  category_id: number;
};

const defaultCategories = [
  { id: 1, name: "Evidencia" },
  { id: 2, name: "Documento legal" },
  { id: 3, name: "Contrato" },
  { id: 4, name: "Identificación" },
  { id: 5, name: "Correspondencia" },
];

export const FileMetadataModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSave,
  fileName,
  categories = defaultCategories,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      label: fileName.replace(/\.[^/.]+$/, ""),
      description: "",
      category_id: categories[0].id,
    },
  });

  // Al abrir o cambiar fileName, resetear
  useEffect(() => {
    if (isOpen) {
      reset({
        label: fileName.replace(/\.[^/.]+$/, ""),
        description: "",
        category_id: categories[0].id,
      });
    }
  }, [isOpen, fileName, reset, categories]);

  // Valor seleccionado vía watch
  const selectedId = watch("category_id");
  const selectedOption =
    categories.find((c) => c.id === selectedId) ?? categories[0];

  const onSubmit = (data: FormValues) => {
    onSave(data);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-950/70" />
        </Transition.Child>

        {/* panel */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform rounded-lg bg-white text-left shadow-xl transition-all">
                <div className="flex items-center justify-between px-4 py-2 border-b">
                  <Dialog.Title className="text-base font-semibold text-gray-900">
                    Información del archivo
                  </Dialog.Title>
                  <button
                    type="button"
                    className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-blue-500 transition-all rounded-md"
                    onClick={() => {
                      onClose();
                      reset();
                    }}
                  >
                    <span className="sr-only">Cerrar</span>
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className=" py-4 space-y-4"
                >
                  <div className="px-4">
                    <div>
                      <CustomInput
                        label="Nombre del archivo"
                        placeholder="Ingresa el nombre de tu archivo"
                        {...register("label", {
                          required: "El nombre es obligatorio",
                          minLength: {
                            value: 3,
                            message: "Mínimo 3 caracteres",
                          },
                          maxLength: {
                            value: 100,
                            message: "Máximo 100 caracteres",
                          },
                        })}
                      />
                      {errors.label && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.label.message}
                        </p>
                      )}
                    </div>

                    <div className="mt-4">
                      <CustomTextArea
                        label="Descripción"
                        placeholder="Ingresa una descripción del archivo..."
                        isRequired={false}
                        {...register("description")}
                      />
                    </div>

                    <div className="mt-4">
                      <input
                        type="hidden"
                        {...register("category_id", {
                          required: "La categoría es obligatoria",
                          valueAsNumber: true,
                        })}
                      />
                      <CustomSelector
                        label="Categoría"
                        options={categories}
                        selected={selectedOption}
                        onChange={(option) =>
                          setValue("category_id", option.id, {
                            shouldValidate: true,
                          })
                        }
                      />
                      {errors.category_id && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.category_id.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 border-t pt-4 px-4">
                    <PrimaryButton
                      type="button"
                      className="bg-white text-gray-700 border hover:bg-gray-50"
                      onClick={() => {
                        onClose();
                        reset();
                      }}
                    >
                      Cancelar
                    </PrimaryButton>
                    <PrimaryButton type="submit" disabled={!isValid}>
                      Guardar
                    </PrimaryButton>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  PrimaryButton,
  CustomInput,
  CustomSelector,
  CustomTextArea,
} from "~/components/atoms";

interface FileInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (fileInfo: {
    label: string;
    description: string;
    category_id: string;
  }) => void;
  fileName: string;
}

const categories = [
  { id: 1, name: "Evidencia" },
  { id: 2, name: "Documento legal" },
  { id: 3, name: "Contrato" },
  { id: 4, name: "Identificación" },
  { id: 5, name: "Correspondencia" },
];

export const FileInfoModal = ({
  isOpen,
  onClose,
  onSave,
  fileName,
}: FileInfoModalProps) => {
  const [label, setLabel] = useState(fileName.replace(/\.[^/.]+$/, ""));
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handleSave = () => {
    onSave({
      label: label.trim(),
      description: description.trim(),
      category_id: selectedCategory.id,
    });
    onClose();
    // Reset form
    setLabel(fileName.replace(/\.[^/.]+$/, ""));
    setDescription("");
    setSelectedCategory(categories[0]);
  };

  const handleClose = () => {
    onClose();
    // Reset form
    setLabel(fileName.replace(/\.[^/.]+$/, ""));
    setDescription("");
    setSelectedCategory(categories[0]);
  };

  const isFormValid = label.trim().length > 0;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
                  <Dialog.Title
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    Información del archivo
                  </Dialog.Title>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                    onClick={handleClose}
                  >
                    <span className="sr-only">Cerrar</span>
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <div className="px-6 py-4 space-y-4">
                  <CustomInput
                    label="Nombre del archivo"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="Ingresa el nombre del archivo"
                    required
                  />

                  <CustomTextArea
                    label="Descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe el contenido del archivo (opcional)"
                  />

                  <CustomSelector
                    label="Categoría"
                    options={categories}
                    selected={selectedCategory}
                    onChange={setSelectedCategory}
                  />
                </div>

                <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
                  <PrimaryButton
                    className="border bg-white shadow-sm border-gray-200 text-gray-700 hover:bg-gray-50"
                    onClick={handleClose}
                  >
                    Cancelar
                  </PrimaryButton>
                  <PrimaryButton onClick={handleSave} disabled={!isFormValid}>
                    Guardar
                  </PrimaryButton>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

import { DocumentPlusIcon } from "@heroicons/react/24/solid";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { CustomInput, CustomTextArea, PrimaryButton } from "~/components/atoms";
import { useState, useRef } from "react";
import type { ChangeEvent } from "react";

export default function CreateArticlePage() {
  const [coverImage, setCoverImage] = useState<{
    preview: string;
    file: File | null;
  }>({ preview: "", file: null });
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB en bytes

  const handleFileChange = (file: File | null) => {
    if (!file) return;

    setError("");

    if (file.size > MAX_FILE_SIZE) {
      setError("La imagen no puede superar los 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setCoverImage({
        preview: reader.result as string,
        file: file,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileChange(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setCoverImage({ preview: "", file: null });
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 ">
      <div className="flex flex-col gap-2 bg-white rounded-lg p-4">
        <h1 className="text-lg font-bold">Crear artículo</h1>
      </div>
      <div className="bg-white rounded-lg p-4 mt-2 space-y-4">
        <div>
          <CustomInput
            label="Título del artículo"
            placeholder="Ej. Nuestros derechos laborales"
          />
        </div>
        <div>
          <CustomTextArea
            label="Resumen del artículo"
            placeholder="Ej. Resumen de los derechos laborales y como se deben cumplir"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Subir una portada</label>

          <input
            type="file"
            className="hidden"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileInput}
          />

          <div
            className={`relative mt-2 ${coverImage.preview ? "h-64" : ""}`}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDrop={handleDrop}
          >
            {coverImage.preview ? (
              <div className="relative w-full h-full">
                <img
                  src={coverImage.preview}
                  alt="Vista previa de portada"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-white/50 backdrop-blur-md rounded-full p-1.5 hover:bg-white/80 transition-all"
                  aria-label="Eliminar imagen"
                >
                  <XMarkIcon className="size-4 text-gray-700" strokeWidth={2} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleButtonClick}
                className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-hidden"
                aria-label="Subir portada del artículo"
                tabIndex={0}
              >
                <PhotoIcon
                  className="size-10 mx-auto text-gray-400"
                  strokeWidth={1.5}
                />
                <span className="mt-2 block text-sm font-medium text-gray-500">
                  Subir una portada del artículo
                </span>
                <span className=" text-xs text-gray-500">
                  Arrastra y suelta una imagen o haz clic para seleccionar (máx.
                  5MB)
                </span>
              </button>
            )}
          </div>

          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
        <div>
          <CustomTextArea
            label="Contenido del artículo"
            placeholder="Ej. Contenido del artículo"
          />
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <PrimaryButton>
          <DocumentPlusIcon className="size-4 mr-2 text-white" />
          Crear artículo
        </PrimaryButton>
      </div>
    </div>
  );
}

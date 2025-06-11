import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";

interface Props {
  value: File | string | null;
  onChange: (f: File | string | null) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
}
export const BannerUploader = ({
  value,
  onChange,
  onBlur,
  error,
  touched,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onChange(e.target.files[0]);
      onBlur();
    }
  };

  const handleButtonClick = () => fileInputRef.current?.click();
  const handleRemoveImage = () => onChange(null);

  return (
    <div>
      <label className="text-sm font-medium">Subir una portada</label>
      <input
        type="file"
        className="hidden"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileInput}
      />
      <div className={`relative mt-2 ${value ? "h-64" : ""}`}>
        {value ? (
          <div className="relative w-full h-full">
            <img
              src={
                typeof value === "string" ? value : URL.createObjectURL(value)
              }
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
      {touched && error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

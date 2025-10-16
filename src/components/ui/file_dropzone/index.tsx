import { FolderIcon } from "lucide-react";
import React, { useState, useCallback, useMemo, useRef } from "react";

export interface FileDropZoneProps {
  onFilesChange: (files: File[]) => void;
  files?: File[];
  acceptedTypes?: string[];
  maxFiles?: number;
  maxFileSize?: number;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const FileDropZone: React.FC<FileDropZoneProps> = ({
  onFilesChange,
  files = [],
  acceptedTypes = ["*"],
  maxFiles = 10,
  maxFileSize = 5 * 1024 * 1024, // 5MB por defecto
  multiple = true,
  disabled = false,
  className = "",
  children,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback(
    (file: File): string | null => {
      if (file.size > maxFileSize) {
        return `El archivo ${file.name} excede el tamaño máximo de ${(
          maxFileSize /
          (1024 * 1024)
        ).toFixed(1)}MB`;
      }

      if (!acceptedTypes.includes("*")) {
        const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
        const mimeType = file.type;

        const isValidType = acceptedTypes.some((type) => {
          if (type.startsWith(".")) {
            return fileExtension === type.toLowerCase();
          }
          return mimeType.startsWith(type.split("/")[0]) || mimeType === type;
        });

        if (!isValidType) {
          return `El archivo ${
            file.name
          } no es un tipo permitido. Tipos aceptados: ${acceptedTypes.join(
            ", "
          )}`;
        }
      }

      return null;
    },
    [acceptedTypes, maxFileSize]
  );

  const processFiles = useCallback(
    (fileList: FileList | File[]) => {
      setError(null);
      const newFiles = Array.from(fileList);

      const totalFiles = files.length + newFiles.length;
      if (totalFiles > maxFiles) {
        setError(
          `Solo puedes subir un máximo de ${maxFiles} archivo(s). Actualmente tienes ${files.length} archivo(s).`
        );
        return;
      }

      const validFiles: File[] = [];
      for (const file of newFiles) {
        const isDuplicate = files.some(
          (existingFile) =>
            existingFile.name === file.name && existingFile.size === file.size
        );

        if (isDuplicate) {
          setError(`El archivo ${file.name} ya ha sido agregado.`);
          return;
        }

        const error = validateFile(file);
        if (error) {
          setError(error);
          return;
        }
        validFiles.push(file);
      }

      const allFiles = [...files, ...validFiles];
      onFilesChange(allFiles);
    },
    [maxFiles, validateFile, onFilesChange, files]
  );

  const handleDragEnter = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        setIsDragOver(true);
      }
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setIsDragOver(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      if (disabled) return;

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        processFiles(files);
      }
    },
    [disabled, processFiles]
  );

  const handleClick = useCallback(() => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [disabled]);

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        processFiles(files);
      }
      e.target.value = "";
    },
    [processFiles]
  );

  const acceptAttribute = useMemo(() => {
    if (acceptedTypes.includes("*")) return undefined;
    return acceptedTypes.join(",");
  }, [acceptedTypes]);

  const buttonClasses = useMemo(() => {
    const baseClasses =
      "relative block w-full border bg-card border-dashed p-12 text-center transition-all duration-200 ease-in-out focus:outline-2 focus:outline-offset-2 focus:outline-ring rounded";
    const stateClasses = disabled
      ? "border-border bg-muted cursor-not-allowed opacity-50"
      : isDragOver
      ? "border-ring bg-accent transform"
      : "border-border hover:border-ring cursor-pointer";

    return `${baseClasses} ${stateClasses} ${className}`.trim();
  }, [disabled, isDragOver, className]);

  return (
    <div className="w-full">
      <button
        type="button"
        className={buttonClasses}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        disabled={disabled}
        aria-label="Zona para arrastrar y soltar archivos"
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={acceptAttribute}
          onChange={handleFileInputChange}
          className="hidden"
          disabled={disabled}
        />

        {children || (
          <>
            <FolderIcon
              className={`mx-auto size-12 transition-colors duration-200 ${
                isDragOver ? "text-foreground" : "text-muted-foreground"
              }`}
            />

            <span
              className={`mt-2 block text-sm transition-colors duration-200 ${
                isDragOver ? "text-foreground" : "text-foreground"
              }`}
            >
              {isDragOver
                ? "Suelta los archivos aquí"
                : "Arrastra y suelta archivos aquí o haz click para seleccionar"}
            </span>
            {acceptedTypes.length > 0 && !acceptedTypes.includes("*") && (
              <span className="mt-1 block text-xs text-muted-foreground">
                Tipos permitidos: {acceptedTypes.join(", ")}
              </span>
            )}
            <span className="mt-1 block text-xs text-muted-foreground">
              Máximo {maxFiles} archivo(s),{" "}
              {(maxFileSize / (1024 * 1024)).toFixed(1)}MB cada uno
            </span>
          </>
        )}
      </button>

      {error && (
        <div className="mt-2 py-2 px-4 rounded bg-destructive/10 border border-destructive/20">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
    </div>
  );
};

export default FileDropZone;

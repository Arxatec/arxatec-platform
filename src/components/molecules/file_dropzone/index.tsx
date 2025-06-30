import {
  useState,
  useRef,
  useCallback,
  type ReactNode,
  type ChangeEvent,
} from "react";

export interface UploadedFile {
  file: File;
  preview?: string;
  id: string;
}

interface FileDropzoneProps {
  children: (props: {
    files: UploadedFile[];
    error: string;
    openFileDialog: () => void;
    isDragging: boolean;
    removeFile: (id: string) => void;
    clearFiles: () => void;
  }) => ReactNode;
  accept?: string[];
  maxSizeMB?: number;
  onFilesChange?: (files: UploadedFile[]) => void;
  onError?: (message: string) => void;
  multiple?: boolean;
}

export const FileDropzone = ({
  children,
  accept,
  maxSizeMB = 5,
  onFilesChange,
  onError,
  multiple = false,
}: FileDropzoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const MAX_SIZE = maxSizeMB * 1024 * 1024;

  // Memoizar funciones para mejor performance
  const openFileDialog = useCallback((e?: React.MouseEvent) => {
    // Prevenir propagación del evento si viene de un clic
    e?.stopPropagation();
    inputRef.current?.click();
  }, []);

  const validateFile = useCallback(
    (file: File): string | null => {
      if (
        accept &&
        !accept.some((type) => file.type.match(type.replace("*", ".*")))
      ) {
        return `Tipo de archivo no permitido: ${file.type}`;
      }
      if (file.size > MAX_SIZE) {
        return `El archivo supera el límite de ${maxSizeMB}MB`;
      }
      return null;
    },
    [accept, MAX_SIZE, maxSizeMB]
  );

  const processFile = useCallback(
    (file: File): Promise<UploadedFile> => {
      return new Promise((resolve, reject) => {
        const validationError = validateFile(file);
        if (validationError) {
          reject(new Error(validationError));
          return;
        }

        // Solo crear preview para imágenes
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              file,
              id: crypto.randomUUID(),
              preview: reader.result as string,
            });
          };
          reader.onerror = () => reject(new Error("Error al leer el archivo"));
          reader.readAsDataURL(file);
        } else {
          resolve({
            file,
            id: crypto.randomUUID(),
          });
        }
      });
    },
    [validateFile]
  );

  const processFiles = useCallback(
    async (selectedFiles: FileList | null) => {
      if (!selectedFiles?.length) return;

      const fileArray = Array.from(selectedFiles);

      try {
        const processedFiles = await Promise.allSettled(
          fileArray.map(processFile)
        );

        const successfulFiles: UploadedFile[] = [];
        const errors: string[] = [];

        processedFiles.forEach((result, index) => {
          if (result.status === "fulfilled") {
            successfulFiles.push(result.value);
          } else {
            errors.push(`${fileArray[index].name}: ${result.reason.message}`);
          }
        });

        if (errors.length > 0) {
          const errorMsg = errors.join(", ");
          setError(errorMsg);
          onError?.(errorMsg);
        } else {
          setError("");
        }

        if (successfulFiles.length > 0) {
          const newFiles = multiple
            ? [...files, ...successfulFiles]
            : successfulFiles;
          setFiles(newFiles);
          onFilesChange?.(newFiles);
        }
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : "Error procesando archivos";
        setError(msg);
        onError?.(msg);
      }
    },
    [files, multiple, onFilesChange, onError, processFile]
  );

  const removeFile = useCallback(
    (id: string) => {
      const newFiles = files.filter((f) => f.id !== id);
      setFiles(newFiles);
      onFilesChange?.(newFiles);
    },
    [files, onFilesChange]
  );

  const clearFiles = useCallback(() => {
    setFiles([]);
    onFilesChange?.([]);
    setError("");
  }, [onFilesChange]);

  // Handlers de drag & drop
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      processFiles(e.dataTransfer.files);
    },
    [processFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Solo cambiar estado si realmente salimos del área
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  }, []);

  const handleFileInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      processFiles(e.target.files);
      // Limpiar input para permitir reseleccionar el mismo archivo
      e.target.value = "";
    },
    [processFiles]
  );

  const handleContainerClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Solo abrir el diálogo si el clic es directamente en el contenedor
      // y no viene de un elemento hijo
      if (e.target === e.currentTarget) {
        openFileDialog();
      }
    },
    [openFileDialog]
  );

  return (
    <>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleContainerClick}
        role="button"
        tabIndex={0}
        aria-label="Arrastrar archivos aquí o hacer clic para seleccionar"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openFileDialog();
          }
        }}
        className="h-full"
        style={{ outline: "none" }}
      >
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          onChange={handleFileInput}
          accept={accept?.join(",")}
          multiple={multiple}
          aria-hidden="true"
        />
        {children({
          files,
          error,
          openFileDialog,
          isDragging,
          removeFile,
          clearFiles,
        })}
      </div>
    </>
  );
};

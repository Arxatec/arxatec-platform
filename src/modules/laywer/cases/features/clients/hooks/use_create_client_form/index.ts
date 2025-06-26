import { useForm } from "react-hook-form";
import type { CreateClientRequest } from "../../types";

interface UseCreateClientFormReturn {
  register: ReturnType<typeof useForm<CreateClientRequest>>["register"];
  handleSubmit: ReturnType<typeof useForm<CreateClientRequest>>["handleSubmit"];
  errors: ReturnType<
    typeof useForm<CreateClientRequest>
  >["formState"]["errors"];
  isValid: boolean;
  reset: ReturnType<typeof useForm<CreateClientRequest>>["reset"];
  setValue: ReturnType<typeof useForm<CreateClientRequest>>["setValue"];
  watch: ReturnType<typeof useForm<CreateClientRequest>>["watch"];
  formState: ReturnType<typeof useForm<CreateClientRequest>>["formState"];
}

export const clientValidation = {
  full_name: {
    required: "El nombre completo es requerido",
    minLength: {
      value: 2,
      message: "El nombre debe tener al menos 2 caracteres",
    },
  },
  email: {
    required: "El email es requerido",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "El email no tiene un formato válido",
    },
  },
  phone: {
    required: "El teléfono es requerido",
    pattern: {
      value: /^[0-9]{8,15}$/,
      message: "El teléfono debe tener entre 8 y 15 dígitos",
    },
  },
  dni: {
    required: "El DNI es requerido",
    minLength: {
      value: 6,
      message: "El DNI debe tener entre 6 y 12 caracteres",
    },
    maxLength: {
      value: 12,
      message: "El DNI debe tener entre 6 y 12 caracteres",
    },
  },
  avatar: {
    validate: {
      fileSize: (files: FileList | undefined) => {
        if (!files || files.length === 0) return true;
        const file = files[0];
        return (
          file.size <= 5 * 1024 * 1024 || "El archivo debe ser menor a 5MB"
        );
      },
      fileType: (files: FileList | undefined) => {
        if (!files || files.length === 0) return true;
        const file = files[0];
        return (
          file.type.startsWith("image/") || "El archivo debe ser una imagen"
        );
      },
    },
  },
};

export const useCreateClientForm = (): UseCreateClientFormReturn => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
    formState,
  } = useForm<CreateClientRequest>({
    mode: "onChange",
    defaultValues: {
      full_name: "",
      phone: "",
      dni: "",
      email: "",
      avatar: undefined,
    },
  });

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    reset,
    setValue,
    watch,
    formState,
  };
};

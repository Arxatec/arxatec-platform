export const validation = {
  name: {
    required: "Este campo es obligatorio",
    minLength: {
      value: 2,
      message: "El nombre debe tener al menos 2 caracteres",
    },
  },
  lastname: {
    required: "Este campo es obligatorio",
    minLength: {
      value: 2,
      message: "El apellido debe tener al menos 2 caracteres",
    },
  },
  email: {
    required: "Este campo es obligatorio",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Ingrese un correo electrónico válido",
    },
  },
  password: {
    required: "Este campo es obligatorio",
    minLength: {
      value: 6,
      message: "La contraseña debe tener al menos 6 caracteres",
    },
  },
};

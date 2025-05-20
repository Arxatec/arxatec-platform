export const RequestPasswordResetMessages = {
  400: {
    title: "Información incorrecta",
    description:
      "Los datos que enviaste no son válidos o están incompletos. Revísalos y vuelve a intentarlo.",
  },
  401: {
    title: "No autorizado",
    description:
      "No tienes permiso para realizar esta acción. Asegúrate de que tu cuenta sea válida.",
  },
  404: {
    title: "Cuenta no encontrada",
    description:
      "No encontramos una cuenta asociada a ese correo. ¿Seguro que escribiste el correcto?",
  },
  409: {
    title: "Correo ya registrado",
    description:
      "El correo electrónico ya está en uso. Si ya tienes cuenta, inicia sesión o restablece tu contraseña.",
  },
  500: {
    title: "Problema en el servidor",
    description:
      "Tuvimos un problema al procesar tu solicitud. Por favor, inténtalo nuevamente en unos minutos.",
  },
};

export const VerifyResetCodeMessages = {
  400: {
    title: "Código inválido",
    description:
      "El código que ingresaste no es válido. Por favor, verifica e intenta nuevamente.",
  },
  401: {
    title: "No autorizado",
    description:
      "No tienes permiso para realizar esta acción. Asegúrate de que tu cuenta sea válida.",
  },
  404: {
    title: "Código no encontrado",
    description:
      "El código que ingresaste no existe. Por favor, solicita un nuevo código.",
  },
  410: {
    title: "Código expirado",
    description:
      "El código ha expirado. Por favor, solicita un nuevo código de verificación.",
  },
  500: {
    title: "Problema en el servidor",
    description:
      "Tuvimos un problema al procesar tu solicitud. Por favor, inténtalo nuevamente en unos minutos.",
  },
};

export const ResendCodeMessages = {
  400: {
    title: "Código inválido",
    description:
      "El código que ingresaste no es válido o ha expirado. Solicita uno nuevo para continuar.",
  },
  401: {
    title: "No autorizado",
    description:
      "Tu sesión no es válida o expiró. Vuelve a iniciar sesión para solicitar un nuevo código.",
  },
  404: {
    title: "Usuario no encontrado",
    description:
      "No pudimos encontrar un usuario asociado a esta solicitud. Revisa tus datos o crea una cuenta.",
  },
  429: {
    title: "Demasiados intentos",
    description:
      "Has solicitado muchos códigos en poco tiempo. Por favor, espera unos minutos antes de intentarlo nuevamente.",
  },
  500: {
    title: "Error en el servidor",
    description:
      "Ocurrió un problema al enviar el nuevo código. Intenta nuevamente en unos minutos.",
  },
};

export const ResetPasswordMessages = {
  400: {
    title: "Información incorrecta",
    description:
      "Los datos que enviaste no son válidos o están incompletos. Revísalos y vuelve a intentarlo.",
  },
  401: {
    title: "No autorizado",
    description:
      "No tienes permiso para realizar esta acción. Asegúrate de que tu cuenta sea válida.",
  },
  404: {
    title: "Usuario no encontrado",
    description:
      "No encontramos un usuario asociado a ese correo. Por favor, intenta nuevamente.",
  },
  422: {
    title: "Contraseña inválida",
    description:
      "La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una minúscula y un número.",
  },
  500: {
    title: "Problema en el servidor",
    description:
      "Tuvimos un problema al procesar tu solicitud. Por favor, inténtalo nuevamente en unos minutos.",
  },
};

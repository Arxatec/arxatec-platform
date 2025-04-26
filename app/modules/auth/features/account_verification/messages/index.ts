export const verifyCodeMessages = {
  400: {
    title: "Código expirado",
    description:
      "Oops, parece que tu código expiró. Vuelve a intentarlo para generar uno nuevo.",
  },
  401: {
    title: "Código inválido",
    description:
      "Tu código no es válido. Asegúrate de ingresarlo correctamente o solicita uno nuevo.",
  },
  404: {
    title: "Registro expirado",
    description:
      "Oops, parece que tu registro expiró. Vuelve a intentarlo para generar uno nuevo.",
  },
  500: {
    title: "Algo salió mal",
    description:
      "Tuvimos un problema al verificar tu código. Por favor, inténtalo otra vez en unos minutos.",
  },
};

export const resendCodeMessages = {
  400: {
    title: "Solicitud inválida",
    description:
      "No pudimos procesar tu solicitud. Por favor, revisa tus datos y vuelve a intentarlo.",
  },
  401: {
    title: "Código incorrecto",
    description:
      "El código ingresado no es válido o expiró. Te hemos enviado uno nuevo a tu correo electrónico.",
  },
  404: {
    title: "Correo no registrado",
    description:
      "No encontramos una cuenta asociada. Verifica tu correo o regístrate de nuevo.",
  },
  500: {
    title: "Error del servidor",
    description:
      "Tuvimos un problema al enviarte el nuevo código. Intenta otra vez en unos minutos.",
  },
};

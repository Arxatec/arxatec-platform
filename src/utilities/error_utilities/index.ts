import { AxiosError } from "axios";
import type { ErrorResponse } from "~/types/services";

export function getErrorMessageByStatus(
  status?: number,
  error?: AxiosError<ErrorResponse>
) {
  if (!status) return "Error de red, no se pudo contactar con el servidor.";

  const messages: Record<number, string> = {
    400: "Solicitud incorrecta. Los datos enviados no cumplen con los requisitos esperados.",
    401: "No autorizado. Tu sesión ha expirado o no tienes credenciales válidas.",
    402: "Pago requerido. Esta funcionalidad puede estar limitada sin suscripción.",
    403: "Acceso prohibido. No tienes los permisos necesarios para acceder aquí.",
    404: "No encontrado. El recurso solicitado no existe o fue eliminado.",
    405: "Método no permitido. La operación no es válida para esta ruta.",
    406: "No aceptable. El servidor no puede entregar contenido en el formato solicitado.",
    407: "Se requiere autenticación de proxy. Esto rara vez ocurre, pero podría ser un proxy corporativo.",
    408: "Tiempo de espera agotado. El servidor tardó demasiado en responder.",
    409: "Conflicto. La operación no se pudo completar por un estado inconsistente.",
    410: "Recurso eliminado permanentemente.",
    411: "Falta la longitud del contenido. Esto se da en solicitudes mal formadas.",
    412: "Precondición fallida. Alguna condición no se cumplió.",
    413: "Carga demasiado grande. Reduce el tamaño del archivo o contenido.",
    414: "La URL es demasiado larga. Evita incluir datos sensibles en la URL.",
    415: "Tipo de contenido no soportado. Verifica que estás enviando el formato correcto.",
    416: "Rango no satisfacible. El archivo solicitado no puede ser entregado.",
    417: "Fallo en la expectativa. El servidor no pudo cumplir con lo solicitado.",
    418: "Soy una tetera ☕. Error de prueba (sí, es un código real).",
    421: "Solicitud mal dirigida. El servidor no sabe cómo manejarla.",
    422: "Entidad no procesable. Los datos parecen válidos pero el servidor no los puede manejar.",
    423: "Recurso bloqueado. Puede estar en uso o restringido.",
    424: "Dependencia fallida. Algo que se esperaba no funcionó.",
    425: "Demasiado temprano. Intenta de nuevo más tarde.",
    426: "Actualización requerida. Necesitas usar una versión más segura del protocolo.",
    428: "Precondición requerida. Faltan datos para ejecutar esta solicitud.",
    429: "Demasiadas solicitudes. Has superado el límite, espera unos segundos.",
    431: "Encabezados demasiado grandes. Revisa el tamaño de la petición.",
    451: "No disponible por razones legales. El acceso está restringido por ley.",

    // 5xx
    500: "Error interno del servidor. Algo falló en nuestros servidores, intenta más tarde.",
    501: "No implementado. Esta funcionalidad aún no está disponible.",
    502: "Puerta de enlace inválida. Recibimos una mala respuesta de otro servidor.",
    503: "Servicio no disponible. El servidor está en mantenimiento o saturado.",
    504: "Tiempo de espera agotado (Gateway Timeout). El servidor no respondió a tiempo.",
    505: "Versión HTTP no soportada.",
    506: "La variante también negocia. Error raro de configuración del servidor.",
    507: "Almacenamiento insuficiente. El servidor no puede guardar más datos.",
    508: "Bucle detectado. Hay una referencia cíclica en la petición.",
    510: "Extensión no soportada.",
    511: "Autenticación de red requerida. Necesitas conectarte primero.",
  };

  const fallbackMessage =
    error?.response?.data?.message || "Error desconocido del servidor.";

  return messages[status] || fallbackMessage;
}

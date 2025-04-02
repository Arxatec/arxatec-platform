import { useState } from "react";
import { DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { NotificationFeed } from "./components/molecules";
import type { NotificationGroup } from "./types";
import { DrawerHorizontal } from "~/components/layouts";

const notificationGroups: NotificationGroup[] = [
  {
    title: "Hoy",
    items: [
      {
        id: "1",
        type: "document",
        title: "Pago de nómina pendiente",
        description: "Pago de nómina: Procesa #pyr422240932 a la brevedad.",
        timestamp: "2025-03-27T12:10:00",
        timeAgo: "hace 3 minutos",
        isNew: true,
      },
      {
        id: "2",
        type: "user",
        title: "Allen Draken",
        description: "Comentó en la comunidad de Abogados Practicantes",
        timestamp: "2025-03-27T11:43:00",
        timeAgo: "hace 1 hora",
        avatar:
          "https://images.pexels.com/photos/3966293/pexels-photo-3966293.jpeg",
        isNew: true,
      },
      {
        id: "3",
        type: "document",
        title: "Aprobación de documento",
        description: "Nuevo documento pendiente de revisión: contrato_dec.pdf",
        timestamp: "2025-03-26T15:43:00",
        timeAgo: "hace 21 horas",
        isNew: true,
      },
      {
        id: "4",
        type: "meeting",
        title: "Nueva reunión",
        description:
          "Angela ha programado una reunión para el 30 de julio: Informe mensual.",
        timestamp: "2025-03-27T10:43:00",
        timeAgo: "hace 2 horas",
        isNew: true,
      },
    ],
  },
  {
    title: "Anteriores",
    items: [
      {
        id: "5",
        type: "user",
        title: "Atikah Cahya",
        description: "Envió un archivo adjunto",
        timestamp: "2025-03-26T19:43:00",
        timeAgo: "hace 17 horas",
        avatar:
          "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg ",
      },
      {
        id: "6",
        type: "timeoff",
        title: "Solicitud de permiso",
        description:
          "Salem Ahmed solicitó permiso para el 2 de agosto: 'Cita médica'.",
        timestamp: "2025-03-26T17:43:00",
        timeAgo: "hace 19 horas",
      },
      {
        id: "7",
        type: "user",
        title: "Atikah Cahya",
        description: "Comentó en",
        timestamp: "2025-03-26T17:43:00",
        timeAgo: "hace 19 horas",
        avatar: "https://images.unsplash.com/photo-1520975916090-3105956dac38",
      },
      {
        id: "8",
        type: "user",
        title: "Kafka Martinez",
        description: "Creó una nueva publicación",
        timestamp: "2025-03-26T19:43:00",
        timeAgo: "hace 17 horas",
        avatar: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
      },
      {
        id: "9",
        type: "meeting",
        title: "Nueva reunión",
        description:
          "Mark Sein ha programado una reunión para el 28 de julio: Actualización de proyecto.",
        timestamp: "2025-03-26T12:00:00",
        timeAgo: "Ayer",
      },
      {
        id: "10",
        type: "performance",
        title: "Evaluación de desempeño lista",
        description:
          "Tu evaluación de desempeño ha sido finalizada. Revisa los detalles en tu perfil.",
        timestamp: "2025-03-26T10:00:00",
        timeAgo: "Ayer",
      },
    ],
  },
];

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const NotificationDrawer: React.FC<Props> = ({ open, setOpen }) => {
  const handleNotificationClick = (notification: any) => {
    console.log("Notification clicked:", notification);
  };
  return (
    <DrawerHorizontal open={open} setOpen={setOpen}>
      <>
        <div className="px-4 sm:px-6 mt-6">
          <div className="flex items-start justify-between">
            <DialogTitle className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-gray-900">
                Notificaciones
              </h2>
              <div className="p-[2px] bg-gray-100 text-gray-900 rounded-full text-xs  grid place-items-center">
                {notificationGroups.reduce((total, group) => {
                  return total + group.items.length;
                }, 0)}
              </div>
            </DialogTitle>
            <div className="ml-3 flex h-7 items-center">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative rounded-full bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-50 p-1 focus:ring-offset-2"
              >
                <span className="absolute -inset-2.5" />
                <span className="sr-only">Close panel</span>
                <XMarkIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="relative mt-6 flex-1">
          <NotificationFeed
            groups={notificationGroups}
            onNotificationClick={handleNotificationClick}
          />
        </div>
      </>
    </DrawerHorizontal>
  );
};

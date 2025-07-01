import {
  ArchiveBoxIcon,
  EllipsisVerticalIcon,
  EnvelopeIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { PrimaryButton, CustomImage, CustomDropdown } from "~/components/atoms";
import { useArchiveClient } from "../../../hooks/use_archive_client";

interface Client {
  id: number;
  user_detail_id: number;
  profile_image: string;
  full_name: string;
  email: string;
  phone: string;
  dni: string;
  created_at: string;
  archived: boolean;
}

export const CardClient = ({ client }: { client: Client | undefined }) => {
  const { mutate: archiveClient } = useArchiveClient();

  // Si client es undefined, no renderizar nada o mostrar un placeholder
  if (!client) {
    return (
      <div className="bg-white rounded-lg p-4 shadow-sm w-full">
        <div className="text-center text-gray-500">
          No hay información del cliente disponible
        </div>
      </div>
    );
  }

  // Función para abrir Gmail con el email del cliente
  const handleSendEmail = () => {
    const subject = `Consulta para ${client.full_name}`;
    const body = `Hola ${client.full_name},\n\nEspero que te encuentres bien.\n\n`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(
      client.email
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, "_blank");
  };

  return (
    <div className="bg-white rounded-lg py-4 shadow-sm hover:shadow-md transition-all w-full  relative">
      <div className="absolute top-2 right-2">
        <CustomDropdown
          sections={[
            {
              items: [
                {
                  id: "delete",
                  label: "Archivar",
                  onClick: () => {
                    archiveClient(client.id.toString());
                  },
                  icon: <ArchiveBoxIcon className="size-4 text-gray-500" />,
                },
              ],
            },
          ]}
          buttonClassName="p-2 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50"
          buttonIcon={<EllipsisVerticalIcon className="size-5 text-gray-500" />}
        />
      </div>

      <div className="flex gap-2 px-4">
        <CustomImage
          src={client.profile_image}
          alt="client"
          className="size-28 rounded-md object-cover overflow-hidden"
        />
      </div>
      <div className="divide-y divide-gray-100 ">
        <div className="py-2 px-4">
          <h2 className="text-base font-bold">{client.full_name}</h2>
          <span className="text-sm text-gray-500">DNI: {client.dni}</span>
          <div className="flex gap-2 my-2">
            <PrimaryButton
              onClick={handleSendEmail}
              className="py-1 px-3 text-blue-600 text-sm font-medium bg-blue-100 hover:bg-blue-200 flex gap-2 items-center"
            >
              <EnvelopeIcon className="size-4 text-blue-600" />
              Mensaje
            </PrimaryButton>
          </div>
        </div>
        <div className="py-2 px-4">
          <span className="text-sm text-gray-500 mt-2 block">
            <span className="text-gray-700 font-medium block">
              Fecha de registro:
            </span>
            {new Date(client.created_at).toLocaleDateString("es-ES")}
          </span>
          <span className="text-sm text-gray-500 mt-2 block">
            <span className="text-gray-700 font-medium block">Contacto:</span>
            Celular: {client.phone}
            <br />
            Email: {client.email}
          </span>
          <span className="text-sm text-gray-500 mt-2 block">
            <span className="text-gray-700 font-medium block">ID Usuario:</span>
            {client.user_detail_id}
          </span>
        </div>
      </div>
    </div>
  );
};

import { CustomAvatar } from "~/components/atoms";
import type { Client } from "../../../../create_case/store/clients.store";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

interface ClientCardProps {
  client: Client;
}

export const ClientCard = ({ client }: ClientCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-4 border border-gray-100">
      <div className="flex items-start gap-4">
        <CustomAvatar
          avatar={client.imageUrl}
          size="3rem"
          altText={client.name}
          username={client.name}
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
          <p className="text-sm text-gray-500">{client.role}</p>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <PhoneIcon className="size-4" />
              <span>{client.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <EnvelopeIcon className="size-4" />
              <span>{client.email}</span>
            </div>
            {client.url && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPinIcon className="size-4" />
                <span>{client.url}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

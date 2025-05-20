import {
  ChatBubbleBottomCenterTextIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";
import { PrimaryButton, CustomImage } from "~/components/atoms";

export const CardClient = () => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all w-full  ">
      <div className="flex gap-2">
        <CustomImage
          src="https://images.pexels.com/photos/832998/pexels-photo-832998.jpeg"
          alt="client"
          className="size-28 rounded-md object-cover overflow-hidden"
        />
      </div>
      <div className="divide-y divide-gray-100">
        <div className="py-2">
          <h2 className="text-base font-bold">Juan Perez</h2>
          <span className="text-sm text-gray-500">Hombre - 24 años</span>
          <div className="flex gap-2 my-2">
            <PrimaryButton className="py-1 px-3 text-blue-600 text-sm font-medium bg-blue-100 hover:bg-blue-200 flex gap-2 items-center">
              <ChatBubbleBottomCenterTextIcon className="size-4 text-blue-600" />
              Mensaje
            </PrimaryButton>
            <PrimaryButton className="py-1 px-3 text-blue-600 text-sm font-medium bg-blue-100 hover:bg-blue-200 flex gap-2 items-center">
              <EnvelopeIcon className="size-4 text-blue-600" />
              Email
            </PrimaryButton>
          </div>
        </div>
        <div className="py-2">
          <span className="text-sm text-gray-500 mt-2 block">
            <span className="text-gray-700 font-medium block">
              Fecha de nacimiento:
            </span>
            24/01/1990
          </span>
          <span className="text-sm text-gray-500 mt-2 block">
            <span className="text-gray-700 font-medium block">Contacto:</span>
            Celular: +51 911 125 251
            <br />
            Email: juanperez@gmail.com
          </span>
          <span className="text-sm text-gray-500 mt-2 block">
            <span className="text-gray-700 font-medium block">Direccion:</span>
            Calle 123, Lima - Peru
          </span>
        </div>
      </div>
    </div>
  );
};

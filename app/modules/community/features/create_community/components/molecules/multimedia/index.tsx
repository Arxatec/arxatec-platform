import { DocumentPlusIcon } from "@heroicons/react/24/outline";

export const Multimedia = () => {
  return (
    <>
      <label
        htmlFor=""
        className="block text-sm/6 font-medium text-gray-900 mb-2"
      >
        Archivos multimedia
      </label>
      <button
        type="button"
        className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <DocumentPlusIcon className="mx-auto size-12 text-gray-400" />
        <span className="mt-2 block text-sm font-semibold text-gray-900">
          Arrastra y suelta archivos multimedia o haz clic para subir
        </span>
      </button>
    </>
  );
};

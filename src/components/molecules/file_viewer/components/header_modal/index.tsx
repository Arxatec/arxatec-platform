import { XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  label: string;
  onClose: () => void;
}
export const HeaderModal: React.FC<Props> = ({ label, onClose }) => (
  <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 w-full">
    <div className="text-base font-semibold leading-6 text-gray-900 truncate">
      {label}
    </div>
    <button
      type="button"
      className="inline-flex transition-all items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
      onClick={onClose}
    >
      <span className="sr-only">Cerrar</span>
      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
    </button>
  </div>
);

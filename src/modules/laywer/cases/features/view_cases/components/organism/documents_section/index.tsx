import { DocumentsList } from "../../molecules";

export const DocumentsSection = () => {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-[18px] w-96 mt-2">
        <h2 className="font-bold text-lg text-gray-900">Tus documentos</h2>
      </div>
      <DocumentsList />
    </div>
  );
};

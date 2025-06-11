import { DocumentCard } from "../../atoms";

export const DocumentsList = () => {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <DocumentCard
          key={index}
          title="Documento 1"
          lastUpdate="10/03/2025"
          onClick={() => console.log(`Documento ${index + 1} clicked`)}
        />
      ))}
    </div>
  );
};

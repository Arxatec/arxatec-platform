import { Editor } from "@tiptap/react";
import { Button } from "../../ui/button";
import { TableCellsIcon } from "@heroicons/react/24/outline";

interface TableMenuProps {
  editor: Editor | null;
}

// Menú para insertar una tabla en el editor
export const TableMenu = ({ editor }: TableMenuProps) => {
  if (!editor) return null; // No renderiza si no hay editor

  // Inserta una tabla de 3x3 con encabezado
  const insertTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  return (
    <Button
      variant="ghost"
      onClick={insertTable} // Inserta la tabla al hacer clic
      className={`size-10 flex items-center justify-center hover:bg-gray-100 transition-all rounded-md ${
        editor.isActive("table") ? "bg-gray-100" : ""
      }`}
    >
      <TableCellsIcon className="h-5 w-5" />
    </Button>
  );
};

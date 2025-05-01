import { Editor } from "@tiptap/react";
import { Button } from "../../../editorRich/ui/button";
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
      className={`h-9 px-2 ${editor.isActive("table") ? "bg-gray-200" : ""}`}
    >
      <TableCellsIcon className="h-5 w-5" />
    </Button>
  );
};

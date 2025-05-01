import { Editor } from "@tiptap/react";
import { Button } from "../../../editorRich/ui/button";
import { ListBulletIcon, Bars3Icon } from "@heroicons/react/24/outline";

interface ListMenuProps {
  editor: Editor | null;
}

export const ListMenu = ({ editor }: ListMenuProps) => {
  if (!editor) return null; // No renderiza si no hay editor

  // Alterna lista con viñetas
  const toggleBulletList = () => {
    editor.chain().focus().toggleBulletList().run();
  };

  // Alterna lista numerada
  const toggleOrderedList = () => {
    editor.chain().focus().toggleOrderedList().run();
  };

  return (
    <>
      {/* Botón para lista con viñetas */}
      <Button
        variant="ghost"
        onClick={toggleBulletList}
        className={`h-9 px-2 ${
          editor.isActive("bulletList") ? "bg-gray-200" : ""
        }`}
        title="Lista con viñetas"
      >
        <ListBulletIcon className="h-5 w-5" />
      </Button>
      {/* Botón para lista numerada */}
      <Button
        variant="ghost"
        onClick={toggleOrderedList}
        className={`h-9 px-2 ${
          editor.isActive("orderedList") ? "bg-gray-200" : ""
        }`}
        title="Lista numerada"
      >
        <Bars3Icon className="h-5 w-5" />
      </Button>
    </>
  );
};

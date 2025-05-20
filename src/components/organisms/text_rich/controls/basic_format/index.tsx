import { Editor } from "@tiptap/react";
import { Button } from "../../ui/button";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
} from "@heroicons/react/24/outline";

interface BasicFormatMenuProps {
  editor: Editor | null;
}

// Menú de formato básico para TipTap
export const BasicFormatMenu = ({ editor }: BasicFormatMenuProps) => {
  if (!editor) return null; // No renderiza si no hay editor

  return (
    <>
      {/* Botón para negrita */}
      <Button
        variant="ghost"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`size-10 flex items-center justify-center hover:bg-gray-100 transition-all rounded-md ${
          editor.isActive("bold") ? "bg-gray-100" : ""
        }`}
      >
        <BoldIcon className="h-4 w-4" />
      </Button>
      {/* Botón para cursiva */}
      <Button
        variant="ghost"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`size-10 flex items-center justify-center hover:bg-gray-100 transition-all rounded-md ${
          editor.isActive("italic") ? "bg-gray-100" : ""
        }`}
      >
        <ItalicIcon className="h-4 w-4" />
      </Button>
      {/* Botón para subrayado */}
      <Button
        variant="ghost"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`size-10 flex items-center justify-center hover:bg-gray-100 transition-all rounded-md ${
          editor.isActive("underline") ? "bg-gray-100" : ""
        }`}
      >
        <UnderlineIcon className="h-4 w-4" />
      </Button>
    </>
  );
};

import { Editor } from "@tiptap/react";
import { Button } from "../../../editorRich/ui/button";
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
        className={`h-8 px-1.5 ${editor.isActive("bold") ? "bg-gray-200" : ""}`}
      >
        <BoldIcon className="h-4 w-4" />
      </Button>
      {/* Botón para cursiva */}
      <Button
        variant="ghost"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`h-8 px-1.5 ${
          editor.isActive("italic") ? "bg-gray-200" : ""
        }`}
      >
        <ItalicIcon className="h-4 w-4" />
      </Button>
      {/* Botón para subrayado */}
      <Button
        variant="ghost"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`h-8 px-1.5 ${
          editor.isActive("underline") ? "bg-gray-200" : ""
        }`}
      >
        <UnderlineIcon className="h-4 w-4" />
      </Button>
    </>
  );
};

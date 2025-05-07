import { Editor } from "@tiptap/react";
import { Button } from "../../ui/button";
import { CodeBracketIcon } from "@heroicons/react/24/outline";

interface CodeBlockMenuProps {
  editor: Editor | null;
}
// Menú para insertar o quitar bloque de código en TipTa
export const CodeBlockMenu = ({ editor }: CodeBlockMenuProps) => {
  if (!editor) return null; // No renderiza si no hay editor

  return (
    <Button
      variant="ghost"
      onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      className={`size-10 flex items-center justify-center hover:bg-gray-100 transition-all rounded-md ${
        editor.isActive("codeBlock") ? "bg-gray-100" : ""
      }`}
    >
      <CodeBracketIcon strokeWidth={2} className="h-5 w-5" />
    </Button>
  );
};

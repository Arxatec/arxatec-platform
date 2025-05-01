import { Editor } from "@tiptap/react";
import { Button } from "../../../editorRich/ui/button";
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
      className={`h-9 px-2 ${
        editor.isActive("codeBlock") ? "bg-gray-200" : ""
      }`}
    >
      <CodeBracketIcon className="h-5 w-5" />
    </Button>
  );
};

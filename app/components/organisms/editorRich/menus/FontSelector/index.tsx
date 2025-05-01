import { Editor } from "@tiptap/react";

interface FontSelectorProps {
  editor: Editor | null;
}

// Selector de fuente para el editor
export const FontSelector = ({ editor }: FontSelectorProps) => {
  if (!editor) return null; // No renderiza si no hay editor

  const fonts = [
    "Arial",
    "Times New Roman",
    "Courier New",
    "Georgia",
    "Verdana",
    "Helvetica",
    "Montserrat",
    "Open Sans",
  ];

  return (
    <select
      className="bg-transparent  w-[82px] focus:outline-none text-sm border border-input rounded px-2 py-1"
      onChange={(event) => {
        editor.chain().focus().setFontFamily(event.target.value).run(); // Cambia la fuente del texto
      }}
      value={editor.getAttributes("textStyle").fontFamily || ""} // Fuente actual seleccionada
    >
      <option value="">Fuente</option>
      {fonts.map((font) => (
        <option key={font} value={font}>
          {font}
        </option>
      ))}
    </select>
  );
};

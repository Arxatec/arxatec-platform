import { useMemo, useCallback } from "react";
import { Editor } from "@tiptap/react";

const HEADING_LEVELS = [1, 2, 3, 4] as const;
type Heading = "p" | `h${(typeof HEADING_LEVELS)[number]}`;

interface HeadingSelectorProps {
  editor: Editor | null;
}

// Selector de tipo de encabezado o párrafo
export const HeadingSelector = ({ editor }: HeadingSelectorProps) => {
  const options = useMemo(
    () => [
      { value: "p", label: "Párrafo" }, // Opción para párrafo
      { value: "h1", label: "Heading 1" }, // Opción para h1
      { value: "h2", label: "Heading 2" }, // Opción para h2
      { value: "h3", label: "Heading 3" }, // Opción para h3
      { value: "h4", label: "Heading 4" }, // Opción para h4
    ],
    []
  );

  // Determina el tipo actual seleccionado
  const current: Heading = editor?.isActive("paragraph")
    ? "p"
    : (HEADING_LEVELS.map((level) =>
        editor?.isActive("heading", { level }) ? `h${level}` : null
      ).find(Boolean) as Heading) || "p";

  // Cambia el tipo de bloque según la selección
  const onSelect = useCallback(
    (value: Heading) => {
      if (!editor) return;
      if (value.startsWith("h")) {
        editor
          .chain()
          .focus()
          .setHeading({ level: +value[1] as 1 | 2 | 3 | 4 })
          .run();
      } else {
        editor.chain().focus().setParagraph().run();
      }
    },
    [editor]
  );

  if (!editor) return null; // No renderiza si no hay editor

  return (
    <select
      className="bg-transparent focus:outline-none text-sm border border-input rounded px-2 py-1"
      value={current}
      onChange={(e) => onSelect(e.target.value as Heading)} // Cambia el tipo al seleccionar
      disabled={!editor.isEditable}
      title="Estilo de texto"
    >
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

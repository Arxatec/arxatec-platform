import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@tiptap/react";
import { HexColorPicker } from "react-colorful";

// Utilidad para combinar clases condicionalmente
const combineClassNames = (
  ...classes: (string | undefined | Record<string, boolean>)[]
): string => {
  return classes
    .flatMap((cls) => {
      if (!cls) return [];
      if (typeof cls === "string") return [cls];
      return Object.entries(cls)
        .filter(([, value]) => Boolean(value))
        .map(([key]) => key);
    })
    .join(" ");
};

// Colores predefinidos para resaltar
const DEFAULT_HIGHLIGHTS: string[] = [
  "#FFF176",
  "#81D4FA",
  "#A5D6A7",
  "#FFAB91",
  "#F48FB1",
  "#B39DDB",
  "#90CAF9",
  "#FFE0B2",
  "#E1BEE7",
  "#C5E1A5",
];

interface HighlightButtonProps {
  color: string;
  active?: boolean;
  onClick: (color: string) => void;
  tooltip?: boolean;
}

interface HighlightMenuProps {
  editor: Editor;
}

// Botón para seleccionar color de resaltado
const HighlightButton: React.FC<HighlightButtonProps> = ({
  color,
  active = false,
  onClick,
  tooltip = true,
}) => {
  return (
    <button
      type="button"
      className={combineClassNames(
        "w-6 h-6 rounded-sm border transition-all hover:scale-110",
        { "ring-2 ring-offset-1 ring-blue-500": active }
      )}
      style={{ backgroundColor: color }}
      onClick={() => onClick(color)}
      title={tooltip ? color : undefined}
    />
  );
};

// Menú para seleccionar y aplicar color de resaltado
const HighlightMenu: React.FC<HighlightMenuProps> = ({ editor }) => {
  const [selectedColor, setSelectedColor] = useState<string>("#FFF176"); // Color seleccionado
  const [previewColor, setPreviewColor] = useState<string>("#FFF176"); // Color en vista previa
  const [activeTab, setActiveTab] = useState<"swatches" | "custom">("swatches"); // Tab activo
  const [isOpen, setIsOpen] = useState<boolean>(false); // Estado del popover
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  // Cierra el popover si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        event.target instanceof Node &&
        !popoverRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setPreviewColor(selectedColor); // Restaurar el color previamente seleccionado
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedColor]);

  // Selecciona un color de la paleta
  const handleColorSelect = (color: string) => {
    if (!color) return;
    const normalizedColor = color.startsWith("#") ? color : `#${color}`;
    setPreviewColor(normalizedColor);
  };

  // Aplica el resaltado al texto
  const applyHighlight = () => {
    if (!previewColor) return;
    setSelectedColor(previewColor);
    editor.chain().focus().setHighlight({ color: previewColor }).run();
    setIsOpen(false);
  };

  // Quita el resaltado del texto
  const removeHighlight = () => {
    editor.chain().focus().unsetHighlight().run();
    setSelectedColor("#FFF176");
    setPreviewColor("#FFF176");
    setIsOpen(false);
  };

  // Verifica si un color está activo
  const isActive = (c: string): boolean =>
    previewColor.toLowerCase() === c.toLowerCase();

  // Abre o cierra el popover
  const togglePopover = (): void => {
    setIsOpen(!isOpen);
    setPreviewColor(selectedColor); // Restaurar el color previamente seleccionado al abrir
  };

  return (
    <div className="relative">
      {/* Botón principal para abrir el menú de resaltado */}
      <button
        ref={triggerRef}
        className={combineClassNames("editor-toolbar-btn", {
          active: editor.isActive("highlight"),
        })}
        title="Highlight Text"
        onClick={togglePopover}
      >
        {/* Ícono de cubeta de pintura */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            color: editor.isActive("highlight")
              ? selectedColor
              : "currentColor",
          }}
          className="lucide lucide-paint-bucket-icon lucide-paint-bucket"
        >
          <path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z" />
          <path d="m5 2 5 5" />
          <path d="M2 13h15" />
          <path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z" />
        </svg>
      </button>

      {/* Popover de selección de color */}
      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute top-full mt-1 left-0 z-50 w-64 rounded-md shadow-lg bg-white border p-2"
        >
          {/* Tabs para cambiar entre paleta y selector personalizado */}
          <div className="flex gap-2 mb-2 border-b pb-2">
            <button
              className={combineClassNames("flex-1 p-2 text-sm rounded", {
                "bg-gray-100": activeTab === "swatches",
              })}
              onClick={() => setActiveTab("swatches")}
              disabled={activeTab === "swatches"}
            >
              Swatches
            </button>
            <button
              className={combineClassNames("flex-1 p-2 text-sm rounded", {
                "bg-gray-100": activeTab === "custom",
              })}
              onClick={() => setActiveTab("custom")}
              disabled={activeTab === "custom"}
            >
              Custom
            </button>
          </div>

          {/* Paleta de colores predefinidos */}
          {activeTab === "swatches" && (
            <div>
              <div className="text-xs font-medium text-gray-500 mb-1">
                Highlight Colors
              </div>
              <div className="grid grid-cols-5 gap-1">
                {DEFAULT_HIGHLIGHTS.map((color) => (
                  <HighlightButton
                    key={color}
                    color={color}
                    active={isActive(color)}
                    onClick={handleColorSelect}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Selector de color personalizado */}
          {activeTab === "custom" && (
            <div className="flex flex-col gap-2 items-center">
              <HexColorPicker color={previewColor} onChange={setPreviewColor} />
              <div className="flex items-center gap-2 mt-2 w-full">
                <HighlightButton
                  color={previewColor}
                  active={false}
                  onClick={handleColorSelect}
                  tooltip={false}
                />
                <input
                  className="border px-2 py-1 text-sm rounded w-full"
                  value={previewColor}
                  onChange={(e) => setPreviewColor(e.target.value)}
                  placeholder="#FFF176"
                  style={{ textTransform: "uppercase" }}
                />
              </div>
            </div>
          )}

          {/* Acciones para aplicar o quitar el resaltado */}
          <div className="flex justify-between mt-3 gap-2 pt-2 border-t">
            <button
              className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
              onClick={removeHighlight} // Quita el resaltado
            >
              Remove
            </button>
            <button
              className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 flex-1"
              onClick={applyHighlight} // Aplica el color seleccionado
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HighlightMenu;

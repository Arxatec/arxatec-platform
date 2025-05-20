import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@tiptap/react";
import { HexColorPicker } from "react-colorful";
import { LightBulbIcon } from "@heroicons/react/24/outline";

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
        "w-6 h-6 rounded-md border transition-all hover:scale-110",
        { "ring-1 ring-offset-1 ring-blue-500": active }
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
        className={combineClassNames(
          "editor-toolbar-btn size-10 flex items-center justify-center hover:bg-gray-100 transition-all rounded-md",
          {
            active: editor.isActive("highlight"),
          }
        )}
        title="Highlight Text"
        onClick={togglePopover}
      >
        <LightBulbIcon className="size-5" />
      </button>

      {/* Popover de selección de color */}
      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute top-full mt-1 left-0 z-50 w-64 rounded-md shadow-lg bg-white border py-2"
        >
          {/* Tabs para cambiar entre paleta y selector personalizado */}
          <div className="flex gap-2 mb-2 border-b pb-2 px-2">
            <button
              className={combineClassNames(
                "flex-1 p-2 text-xs rounded transition-all font-medium hover:bg-gray-200",
                {
                  "bg-gray-100": activeTab === "swatches",
                }
              )}
              onClick={() => setActiveTab("swatches")}
              disabled={activeTab === "swatches"}
            >
              Colores
            </button>
            <button
              className={combineClassNames(
                "flex-1 p-2 text-xs rounded transition-all font-medium hover:bg-gray-200",
                {
                  "bg-gray-100": activeTab === "custom",
                }
              )}
              onClick={() => setActiveTab("custom")}
              disabled={activeTab === "custom"}
            >
              Personalizado
            </button>
          </div>

          <div className="px-2">
            {/* Paleta de colores predefinidos */}
            {activeTab === "swatches" && (
              <div>
                <div className="text-xs font-medium text-gray-500 mb-1">
                  Colores de resaltado
                </div>
                <div className="grid grid-cols-9 gap-2">
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
                <HexColorPicker
                  color={previewColor}
                  onChange={setPreviewColor}
                  className="w-full"
                  style={{
                    width: "100%",
                    borderRadius: "0px",
                  }}
                />
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
          </div>

          {/* Acciones para aplicar o quitar el resaltado */}
          <div className="flex justify-between mt-3 gap-2 pt-2 border-t px-2">
            <button
              className="px-4 py-2 text-xs bg-gray-100 rounded hover:bg-gray-200 transition-all font-medium"
              onClick={removeHighlight} // Quita el resaltado
            >
              Quitar
            </button>
            <button
              className="px-4 py-2 text-xs bg-blue-600 text-white rounded transition-all hover:bg-blue-700 flex-1 font-medium"
              onClick={applyHighlight} // Aplica el color seleccionado
            >
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HighlightMenu;

import React, { useState, useRef, useEffect, type ChangeEvent } from "react";
import { Editor } from "@tiptap/react";
import { HexColorPicker } from "react-colorful";
import { SwatchIcon } from "@heroicons/react/24/outline";

const combineClassNames = (...classes: (string | undefined)[]): string => {
  return classes.filter(Boolean).join(" ");
};

// Paleta de colores por defecto
const DEFAULT_COLORS: string[] = [
  "#B12318",
  "#EB3323",
  "#F6C143",
  "#FFFE55",
  "#A0CD63",
  "#4FAD5B",
  "#4CAFEA",
  "#2D70BA",
  "#68389B",
];

// Paleta de colores adicionales
const MORE_COLORS: string[] = [
  "#FFFFFF",
  "#000000",
  "#3B74EC",
  "#45A2EF",
  "#529867",
  "#CD4A3F",
  "#EA8D40",
  "#EEC543",
  "#8E45D0",
  "#F2F2F2",
  "#7F7F7F",
];

// Props para el botón de color individual
interface ColorButtonProps {
  color: string;
  active?: boolean;
  onClick: (color: string) => void;
  tooltip?: boolean;
}

// Props para el menú de color principal
interface ColorMenuProps {
  editor: Editor;
}

// Muestra un círculo de color y resalta si está activo.

const ColorButton: React.FC<ColorButtonProps> = ({
  color,
  active = false,
  onClick,
  tooltip = true,
}) => {
  const button = (
    <button
      type="button"
      className={combineClassNames(
        "w-6 h-6 rounded-md border transition-all hover:scale-110",
        active ? "ring-1 ring-offset-1 ring-blue-600" : ""
      )}
      style={{ backgroundColor: color }}
      onClick={() => onClick(color)}
      title={tooltip ? color : undefined}
    />
  );

  return button;
};

const ColorMenu: React.FC<ColorMenuProps> = ({ editor }) => {
  const [selectedColor, setSelectedColor] = useState<string>("#000000");
  const [previewColor, setPreviewColor] = useState<string>("#000000");
  const [activeTab, setActiveTab] = useState<"swatches" | "custom">("swatches");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  // Cierra el popover si se hace clic fuera de él
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
        setPreviewColor(selectedColor); // Restaura el color seleccionado
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedColor]);

  //Selecciona un color de la paleta.

  const handleColorSelect = (color: string) => {
    const normalizedColor = color.startsWith("#") ? color : `#${color}`;
    setPreviewColor(normalizedColor);
  };

  //Aplica el color seleccionado al texto.

  const applyColor = () => {
    if (!previewColor) return;
    setSelectedColor(previewColor);
    editor.chain().focus().setColor(previewColor).run();
    setIsOpen(false);
  };

  // Resetea el color del texto a negro.

  const resetColor = (): void => {
    setSelectedColor("#000000");
    setPreviewColor("#000000");
    editor.chain().focus().unsetColor().run();
    setIsOpen(false);
  };

  //Maneja el cambio en el input de color personalizado.
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPreviewColor(e.target.value);
  };

  const isActive = (c: string): boolean =>
    previewColor.toLowerCase() === c.toLowerCase();

  const togglePopover = (): void => {
    setIsOpen(!isOpen);
    setPreviewColor(selectedColor); // Restaura el color seleccionado al abrir
  };

  return (
    <div className="relative">
      {/* Botón principal para abrir el menú de color */}
      <button
        ref={triggerRef}
        className={combineClassNames(
          "editor-toolbar-btn size-10 flex items-center justify-center hover:bg-gray-100 transition-all rounded-md",
          editor.isActive("textStyle") ? "active" : ""
        )}
        title="Text Color"
        onClick={togglePopover}
      >
        <SwatchIcon className="size-5" />
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
                activeTab === "swatches" ? "bg-gray-100" : ""
              )}
              onClick={() => setActiveTab("swatches")}
              disabled={activeTab === "swatches"}
            >
              Colores
            </button>
            <button
              className={combineClassNames(
                "flex-1 p-2 text-xs rounded transition-all font-medium hover:bg-gray-200",
                activeTab === "custom" ? "bg-gray-100" : ""
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
                  Colores predefinidos
                </div>
                <div className="grid grid-cols-8 gap-2">
                  {DEFAULT_COLORS.map((color) => (
                    <ColorButton
                      key={color}
                      color={color}
                      active={isActive(color)}
                      onClick={handleColorSelect}
                    />
                  ))}
                </div>

                <div className="text-xs font-medium text-gray-500 mb-1 mt-2">
                  Más colores
                </div>
                <div className="grid grid-cols-8 gap-2">
                  {MORE_COLORS.slice(0, 10).map((color) => (
                    <ColorButton
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
                <div className="w-full">
                  <HexColorPicker
                    color={previewColor}
                    onChange={setPreviewColor}
                    className="w-full"
                    style={{
                      width: "100%",
                      borderRadius: "0px",
                    }}
                  />
                </div>
                <div className="flex items-center gap-2 mt-2 w-full">
                  <ColorButton
                    color={previewColor}
                    active={false}
                    onClick={handleColorSelect}
                    tooltip={false}
                  />
                  <input
                    className="border px-2 py-1 text-sm rounded w-full"
                    value={previewColor}
                    onChange={handleInputChange}
                    placeholder="#000000"
                    style={{ textTransform: "uppercase" }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Acciones para aplicar o resetear el color */}
          <div className="flex justify-between mt-3 gap-2 pt-2 border-t px-2">
            <button
              className="px-4 py-2 text-xs bg-gray-100 rounded hover:bg-gray-200 transition-all font-medium"
              onClick={resetColor} // Botón para restablecer el color a negro
            >
              Restablecer
            </button>
            <button
              className="px-4 py-2 text-xs bg-blue-600 text-white rounded transition-all hover:bg-blue-700 flex-1 font-medium"
              onClick={applyColor} // Botón para aplicar el color seleccionado
            >
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorMenu;

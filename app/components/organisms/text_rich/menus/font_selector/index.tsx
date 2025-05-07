import { useMemo } from "react";
import { Editor } from "@tiptap/react";
import { CustomSelector } from "~/components/atoms/custom_selector";

interface FontSelectorProps {
  editor: Editor | null;
}

interface FontOption {
  id: string;
  value: string;
  name: string;
}

// Font selector for the editor
export const FontSelector = ({ editor }: FontSelectorProps) => {
  if (!editor) return null; // Doesn't render if there's no editor

  const fonts = useMemo<FontOption[]>(
    () => [
      { id: "default", value: "DM Sans", name: "DM Sans" },
      { id: "arial", value: "Arial", name: "Arial" },
      { id: "times", value: "Times New Roman", name: "Times New Roman" },
      { id: "courier", value: "Courier New", name: "Courier New" },
      { id: "georgia", value: "Georgia", name: "Georgia" },
      { id: "verdana", value: "Verdana", name: "Verdana" },
      { id: "helvetica", value: "Helvetica", name: "Helvetica" },
      { id: "montserrat", value: "Montserrat", name: "Montserrat" },
      { id: "open-sans", value: "Open Sans", name: "Open Sans" },
    ],
    []
  );

  const currentFont = editor.getAttributes("textStyle").fontFamily || "";
  const selectedOption = useMemo(
    () => fonts.find((font) => font.value === currentFont) || fonts[0],
    [currentFont, fonts]
  );

  const handleFontChange = (option: FontOption) => {
    editor.chain().focus().setFontFamily(option.value).run();
  };

  return (
    <CustomSelector
      options={fonts}
      selected={selectedOption}
      onChange={handleFontChange}
      displayKey="name"
      buttonWidth="w-40"
      buttonCustomStyles="text-sm"
    />
  );
};

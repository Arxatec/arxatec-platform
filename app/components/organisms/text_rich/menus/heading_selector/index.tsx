import { useMemo, useCallback } from "react";
import { Editor } from "@tiptap/react";
import { CustomSelector } from "~/components/atoms/";

const HEADING_LEVELS = [1, 2, 3, 4] as const;
type Heading = "p" | `h${(typeof HEADING_LEVELS)[number]}`;

interface HeadingSelectorProps {
  editor: Editor | null;
}

interface HeadingOption {
  id: string;
  value: Heading;
  name: string;
}

// Heading or paragraph type selector
export const HeadingSelector = ({ editor }: HeadingSelectorProps) => {
  const options = useMemo<HeadingOption[]>(
    () => [
      { id: "p", value: "p", name: "Paragraph" },
      { id: "h1", value: "h1", name: "Heading 1" },
      { id: "h2", value: "h2", name: "Heading 2" },
      { id: "h3", value: "h3", name: "Heading 3" },
      { id: "h4", value: "h4", name: "Heading 4" },
    ],
    []
  );

  // Determines the currently selected type
  const current: Heading = editor?.isActive("paragraph")
    ? "p"
    : (HEADING_LEVELS.map((level) =>
        editor?.isActive("heading", { level }) ? `h${level}` : null
      ).find(Boolean) as Heading) || "p";

  const selectedOption = useMemo(
    () => options.find((opt) => opt.value === current) || options[0],
    [current, options]
  );

  // Changes the block type based on selection
  const onSelect = useCallback(
    (option: HeadingOption) => {
      if (!editor) return;
      if (option.value.startsWith("h")) {
        editor
          .chain()
          .focus()
          .setHeading({ level: +option.value[1] as 1 | 2 | 3 | 4 })
          .run();
      } else {
        editor.chain().focus().setParagraph().run();
      }
    },
    [editor]
  );

  if (!editor) return null; // Doesn't render if there's no editor

  return (
    <CustomSelector
      options={options}
      selected={selectedOption}
      onChange={onSelect}
      displayKey="name"
      buttonWidth="w-40"
      buttonCustomStyles="text-sm"
    />
  );
};

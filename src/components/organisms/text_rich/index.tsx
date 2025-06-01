import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
import { CustomInput } from "../../atoms/custom_input";
import { Card } from "./ui/card";
import { HeadingSelector } from "./menus/heading_selector";
import ColorMenu from "./menus/color_selector";
import { FontSelector } from "./menus/font_selector";
import { BasicFormatMenu } from "./controls/basic_format";
import { AlignmentMenu } from "./menus/alignment";
import { ListMenu } from "./controls/list_format";
import { CodeBlockMenu } from "./controls/code_block";
import { ImageMenu } from "./menus/image_menu";
import { LinkMenu } from "./menus/link_menu";
import { TableMenu } from "./menus/table_menu";
import { YoutubeMenu } from "./controls/youtube_format";
import HighlightMenu from "./menus/highlight_selector";
import { extensions } from "./config/extensions";
import { editorStyles } from "../../../styles/editor_rich";
import ResetFormattingOnEnterExtension from "./controls/reset_format";
import { HistoryMenu } from "./controls/history";

// Blog editor props
interface BlogEditorProps {
  className?: string; // Classes for the main container
  showTitle?: boolean; // Whether to show the title field
  containerClassName?: string; // Classes for the external container
  minHeight?: string; // Minimum editor height
  maxHeight?: string; // Maximum editor height
  value?: string; // Initial content in HTML
  onChange?: (content: string) => void; // Callback when content changes
  isPreview?: boolean; // Whether in preview mode
  // New props to control component visibility
  showHeadingSelector?: boolean;
  showFontSelector?: boolean;
  showBasicFormat?: boolean;
  showAlignmentMenu?: boolean;
  showColorMenu?: boolean;
  showHighlightMenu?: boolean;
  showListMenu?: boolean;
  showCodeBlockMenu?: boolean;
  showImageMenu?: boolean;
  showLinkMenu?: boolean;
  showTableMenu?: boolean;
  showYoutubeMenu?: boolean;
  showHistoryMenu?: boolean;
}

// Main blog editor component
export const TextRich = ({
  className = "",
  showTitle = false,
  containerClassName = "",
  minHeight = "300px",
  maxHeight = "500px",
  value = "",
  onChange,
  // Default values for new props
  showHeadingSelector = true,
  showFontSelector = false,
  showBasicFormat = true,
  showAlignmentMenu = true,
  showColorMenu = true,
  showHighlightMenu = true,
  showListMenu = true,
  showCodeBlockMenu = true,
  showImageMenu = false,
  showLinkMenu = true,
  showTableMenu = false,
  showYoutubeMenu = false,
  showHistoryMenu = true,
}: BlogEditorProps) => {
  // State for blog title
  const [title, setTitle] = useState("");
  // State to toggle between edit and preview mode
  const [previewMode, setPreviewMode] = useState(false);
  // State for word count
  const [wordCount, setWordCount] = useState(0);
  // State for character count
  const [charCount, setCharCount] = useState(0);
  // Link functionality disabled for now
  // const [linkUrl, setLinkUrl] = useState("");
  // const [linkText, setLinkText] = useState("");

  // Flag para evitar onChange durante inicialización
  const [hasInitialized, setHasInitialized] = useState(false);

  // TipTap editor instance with extensions and configuration
  const editor = useEditor({
    extensions: [...extensions, ResetFormattingOnEnterExtension], // Editor extensions
    content: value, // Initial content
    onUpdate: ({ editor }) => {
      // Update counters and notify changes
      const text = editor.getText();
      setCharCount(text.length);
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      setWordCount(words);

      const newContent = editor.getHTML();
      console.log("🎯 TextRich onUpdate ejecutándose:", {
        newContentLength: newContent.length,
        newContentStart: newContent.substring(0, 100) + "...",
        hasInitialized,
        timestamp: new Date().toISOString(),
      });

      // SOLO llamar onChange si ya se inicializó completamente
      if (hasInitialized) {
        console.log("✅ Llamando onChange porque ya está inicializado");
        onChange?.(newContent);
      } else {
        console.log("🚫 BLOQUEANDO onChange - aún no inicializado");
      }
    },
    onCreate: ({ editor }) => {
      // Align text to left when creating editor
      editor.commands.setTextAlign("left");
      console.log("🎯 TextRich onCreate ejecutado:", {
        initialContent: editor.getHTML().substring(0, 100) + "...",
        timestamp: new Date().toISOString(),
      });
    },
  });

  // Actualizar el contenido del editor cuando cambie el value prop
  useEffect(() => {
    console.log("🔄 TextRich useEffect ejecutándose", {
      hasEditor: !!editor,
      valueLength: value?.length || 0,
      valueStart: value?.substring(0, 50) + "...",
      hasInitialized,
    });

    // Reset del flag cuando cambia el value (nuevo contenido llegando)
    if (value && value.length > 10) {
      console.log("🔄 Reseteando flag de inicialización (nuevo contenido)");
      setHasInitialized(false);
    }

    if (editor && value !== undefined) {
      const currentContent = editor.getHTML();

      console.log("🔍 TextRich: Comparando contenidos", {
        valueIsEmpty: value === "",
        currentIsEmpty: currentContent === "<p></p>",
        areEqual: value === currentContent,
        newValueStart: value.substring(0, 100),
        currentStart: currentContent.substring(0, 100),
      });

      // Solo actualizar si el contenido es diferente
      if (value !== currentContent) {
        // Si el nuevo valor está vacío y el actual es el default de TipTap, no actualizar
        if (value === "" && currentContent === "<p></p>") {
          console.log("❌ TextRich: Evitando actualización de contenido vacío");
          return;
        }

        console.log("✅ TextRich: Actualizando contenido del editor");
        editor.commands.setContent(value, false); // false para no triggear el onUpdate

        // Marcar como inicializado DESPUÉS de cargar el contenido
        setTimeout(() => {
          console.log("🎯 Marcando editor como inicializado");
          setHasInitialized(true);
        }, 100); // Pequeño delay para asegurar que TipTap terminó
      } else {
        console.log("⏸️ TextRich: Contenido igual, no actualizando");
        // Si el contenido es igual y tiene contenido válido, marcar como inicializado
        if (value.length > 10) {
          console.log("🎯 Marcando como inicializado (contenido igual)");
          setHasInitialized(true);
        }
      }
    }
  }, [value, editor]);

  // Handles link insertion from dialog (not currently used)
  // const handleLinkSubmit = useCallback(() => {
  //   if (!editor) return;
  //   if (linkUrl) {
  //     const url = linkUrl.startsWith("http") ? linkUrl : `https://${linkUrl}`;
  //     const text = linkText || url;
  //     if (editor.isActive("link")) {
  //       editor.chain().focus().unsetLink().run();
  //     }
  //     editor.chain().focus().insertContent(text).setLink({ href: url }).run();
  //   }
  //   setLinkUrl("");
  //   setLinkText("");
  // }, [editor, linkUrl, linkText]);

  return (
    <div className={`${containerClassName}`}>
      {/* Global editor styles */}
      <style>{editorStyles}</style>

      <div className={`space-y-4 ${className}`}>
        {/* Optional title field */}
        {showTitle && (
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title
            </label>
            <CustomInput
              id="title"
              placeholder="Enter title..."
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              className="w-full text-xl font-medium"
            />
          </div>
        )}

        <div>
          {/* If not in preview mode, show editor */}
          {!previewMode ? (
            <Card className="overflow-hidden">
              {/* Editor toolbar */}
              <div className="toolbar flex flex-wrap gap-0.5 p-1 border-b  items-center">
                {showHistoryMenu && <HistoryMenu editor={editor} />}
                {showHistoryMenu && <div className="border-l mx-0.5 h-5" />}
                {showHeadingSelector && <HeadingSelector editor={editor} />}
                {showFontSelector && <FontSelector editor={editor} />}
                <div className="flex items-center gap-0.5">
                  {showBasicFormat && <BasicFormatMenu editor={editor} />}
                  {showBasicFormat && <div className="border-l mx-0.5 h-5" />}
                  {showAlignmentMenu && <AlignmentMenu editor={editor} />}
                  {showAlignmentMenu && <div className="border-l mx-0.5 h-5" />}
                  {showColorMenu && editor && <ColorMenu editor={editor} />}
                  {showColorMenu && <div className="border-l mx-0.5 h-5" />}
                  {showHighlightMenu && editor && (
                    <HighlightMenu editor={editor} />
                  )}
                  {showHighlightMenu && <div className="border-l mx-0.5 h-5" />}
                  {showListMenu && <ListMenu editor={editor} />}
                  {showListMenu && <div className="border-l mx-0.5 h-5" />}
                  {showCodeBlockMenu && <CodeBlockMenu editor={editor} />}
                  {showImageMenu && <ImageMenu editor={editor} />}
                  {showLinkMenu && <LinkMenu editor={editor} />}
                  {showTableMenu && <TableMenu editor={editor} />}
                  {showYoutubeMenu && <YoutubeMenu editor={editor} />}
                </div>
              </div>

              {/* Content editing area */}
              <div
                className="editor-content p-4 bg-white"
                style={{
                  minHeight,
                  maxHeight,
                  overflowY: "auto",
                }}
              >
                <EditorContent editor={editor} />
              </div>
            </Card>
          ) : (
            // If in preview mode, show rendered content
            <Card
              className="p-4 bg-white"
              style={{
                minHeight,
                maxHeight,
                overflowY: "auto",
              }}
            >
              <div
                className="prose font-sans prose-lg max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-600 prose-a:text-blue-600 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-ul:list-disc prose-ol:list-decimal"
                dangerouslySetInnerHTML={{ __html: editor?.getHTML() || "" }}
              />
            </Card>
          )}
          {/* Bottom bar with word/character count and preview button */}
          <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
            <div>
              {wordCount} palabras · {charCount} caracteres
            </div>
            <Button
              variant="outline"
              onClick={() => setPreviewMode(!previewMode)}
              className="h-8 px-3"
            >
              <EyeIcon className="h-4 w-4 mr-2" />
              {previewMode ? "Editar" : "Vista previa"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

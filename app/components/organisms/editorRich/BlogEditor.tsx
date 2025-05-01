import { useState, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
import { CustomInput } from "../../atoms/custom_input";
import { Card } from "./ui/card";
import { HeadingSelector } from "./menus/HeadingSelector";
import ColorMenu from "./menus/ColorSelector";
import { FontSelector } from "./menus/FontSelector";
import { BasicFormatMenu } from "./controls/BasicFormat";
import { AlignmentMenu } from "./menus/Alignment";
import { ListMenu } from "./controls/ListFormat";
import { CodeBlockMenu } from "./controls/CodeBlock";
import { ImageMenu } from "./menus/ImageMenu";
import { LinkMenu } from "./menus/LinkMenu";
import { TableMenu } from "./menus/TableMenu";
import { YoutubeMenu } from "./controls/YoutubeFormat";
import { HistoryMenu } from "./controls/History/History";
import HighlightMenu from "./menus/HighlightSelector";
import { extensions } from "./config/extensions";
import { editorStyles } from "../../../styles/editorRich";
import ResetFormattingOnEnterExtension from "./controls/ResetFormat";

// Props del editor de blog
interface BlogEditorProps {
  className?: string; // Clases para el contenedor principal
  showTitle?: boolean; // Si muestra el campo de título
  containerClassName?: string; // Clases para el contenedor externo
  minHeight?: string; // Altura mínima del editor
  maxHeight?: string; // Altura máxima del editor
  value?: string; // Contenido inicial en HTML
  onChange?: (content: string) => void; // Callback al cambiar el contenido
}

// Componente principal del editor de blogs
const BlogEditor = ({
  className = "",
  showTitle = false,
  containerClassName = "",
  minHeight = "300px",
  maxHeight = "500px",
  value = "",
  onChange,
}: BlogEditorProps) => {
  // Estado para el título del blog
  const [title, setTitle] = useState("");
  // Estado para alternar entre edición y previsualización
  const [previewMode, setPreviewMode] = useState(false);
  // Estado para el contador de palabras
  const [wordCount, setWordCount] = useState(0);
  // Estado para el contador de caracteres
  const [charCount, setCharCount] = useState(0);
  // Estado para la URL del enlace a insertar
  const [linkUrl, setLinkUrl] = useState("");
  // Estado para el texto del enlace a insertar
  const [linkText, setLinkText] = useState("");
  // Estado para mostrar/ocultar el diálogo de enlace
  const [showLinkDialog, setShowLinkDialog] = useState(false);

  // Instancia del editor TipTap con extensiones y configuración
  const editor = useEditor({
    extensions: [...extensions, ResetFormattingOnEnterExtension], // Extensiones del editor
    content: value, // Contenido inicial
    onUpdate: ({ editor }) => {
      // Actualiza contadores y notifica cambios
      const text = editor.getText();
      setCharCount(text.length);
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      setWordCount(words);
      onChange?.(editor.getHTML());
    },
    onCreate: ({ editor }) => {
      // Alinea el texto a la izquierda al crear el editor
      editor.commands.setTextAlign("left");
    },
  });

  // Maneja la inserción de enlaces desde el diálogo
  const handleLinkSubmit = useCallback(() => {
    if (!editor) return;

    if (linkUrl) {
      const url = linkUrl.startsWith("http") ? linkUrl : `https://${linkUrl}`;
      const text = linkText || url;

      // Si ya hay un enlace activo, lo elimina antes de insertar el nuevo
      if (editor.isActive("link")) {
        editor.chain().focus().unsetLink().run();
      }

      // Inserta el texto y aplica el enlace
      editor.chain().focus().insertContent(text).setLink({ href: url }).run();
    }

    setShowLinkDialog(false);
    setLinkUrl("");
    setLinkText("");
  }, [editor, linkUrl, linkText]);

  return (
    <div className={`${containerClassName}`}>
      {/* Estilos globales del editor */}
      <style>{editorStyles}</style>

      <div className={`space-y-4 ${className}`}>
        {/* Campo de título opcional */}
        {showTitle && (
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Título
            </label>
            <CustomInput
              id="title"
              placeholder="Introduce el título..."
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              className="w-full text-xl font-medium"
            />
          </div>
        )}

        <div>
          {/* Si no está en modo previsualización, muestra el editor */}
          {!previewMode ? (
            <Card className="overflow-hidden">
              {/* Barra de herramientas del editor */}
              <div className="toolbar flex flex-wrap gap-0.5 p-1 border-b bg-gray-100/50">
                <div className="border-l mx-0.5 h-5" />
                <HistoryMenu editor={editor} /> {/* Deshacer/rehacer */}
                <div className="border-l mx-0.5 h-5" />
                <HeadingSelector editor={editor} /> {/* Encabezados */}
                <FontSelector editor={editor} /> {/* Selector de fuente */}
                <div className="flex items-center gap-0.5">
                  <BasicFormatMenu editor={editor} />{" "}
                  {/* Negrita, cursiva, subrayado */}
                  <div className="border-l mx-0.5 h-5" />
                  <AlignmentMenu editor={editor} /> {/* Alineación */}
                  <div className="border-l mx-0.5 h-5" />
                  {editor && <ColorMenu editor={editor} />}{" "}
                  {/* Color de texto */}
                  <div className="border-l mx-0.5 h-5" />
                  {editor && <HighlightMenu editor={editor} />}{" "}
                  {/* Resaltado */}
                  <div className="border-l mx-0.5 h-5" />
                  <ListMenu editor={editor} /> {/* Listas */}
                  <div className="border-l mx-0.5 h-5" />
                  <CodeBlockMenu editor={editor} /> {/* Bloque de código */}
                  <ImageMenu editor={editor} /> {/* Imágenes */}
                  <LinkMenu editor={editor} /> {/* Enlaces */}
                  <TableMenu editor={editor} /> {/* Tablas */}
                  <YoutubeMenu editor={editor} /> {/* Videos de YouTube */}
                </div>
              </div>

              {/* Área de edición de contenido */}
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
            // Si está en modo previsualización, muestra el contenido renderizado
            <Card
              className="p-4 bg-white"
              style={{
                minHeight,
                maxHeight,
                overflowY: "auto",
              }}
            >
              <div
                className="prose prose-lg max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-600 prose-a:text-blue-600 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-ul:list-disc prose-ol:list-decimal"
                dangerouslySetInnerHTML={{ __html: editor?.getHTML() || "" }}
              />
            </Card>
          )}
          {/* Barra inferior con contador de palabras/caracteres y botón de previsualización */}
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
              {previewMode ? "Editar" : "Previsualizar"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;

import { Editor } from "@tiptap/react";
import { Button } from "../../ui/button";
import { LinkIcon } from "@heroicons/react/24/outline";

interface LinkMenuProps {
  editor: Editor | null;
}

export const LinkMenu = ({ editor }: LinkMenuProps) => {
  if (!editor) return null;

  const validateUrl = (url: string) => {
    try {
      // Si la URL no empieza con http o https, añadimos https://
      const finalUrl = url.match(/^https?:\/\//) ? url : `https://${url}`;
      new URL(finalUrl);
      return finalUrl;
    } catch {
      return false;
    }
  };

  const handleLink = () => {
    // Obtener el texto seleccionado actual
    const selection = editor.state.selection;
    const selectedText = selection.empty
      ? ""
      : editor.state.doc.textBetween(selection.from, selection.to);

    // Primero pedimos la URL
    const url = prompt("Ingresa la URL del enlace:");
    if (!url) return;

    // Validamos y formateamos la URL
    const validUrl = validateUrl(url);
    if (!validUrl) {
      alert("Por favor ingresa una URL válida");
      return;
    }

    // Si no hay texto seleccionado, pedimos el texto del enlace
    let linkText = selectedText;
    if (!selectedText) {
      linkText =
        prompt("Ingresa el texto que se mostrará (opcional):", url) || url;
    }

    // Si hay texto seleccionado o el usuario proporcionó texto
    if (selectedText) {
      // Si hay texto seleccionado, convertimos ese texto en un enlace
      editor.chain().focus().setLink({ href: validUrl }).run();
    } else {
      // Si no hay texto seleccionado, insertamos el nuevo texto con el enlace
      editor
        .chain()
        .focus()
        .insertContent({
          type: "text",
          text: linkText,
          marks: [
            {
              type: "link",
              attrs: {
                href: validUrl,
                target: "_blank",
                rel: "noopener noreferrer",
              },
            },
          ],
        })
        .run();
    }

    // Verificamos si el enlace se insertó correctamente
    const isActive = editor.isActive("link");
    if (!isActive) {
      // Si no se activó el enlace, intentamos de nuevo con otro método
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({
          href: validUrl,
          target: "_blank",
          rel: "noopener noreferrer",
        })
        .run();
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLink}
      className="size-10 flex items-center justify-center hover:bg-gray-100 transition-all rounded-md"
      title="Insertar enlace"
    >
      <LinkIcon strokeWidth={2} className="h-5 w-5" />
    </Button>
  );
};

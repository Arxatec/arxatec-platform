import { Editor } from "@tiptap/react";
import { Button } from "../../ui/button";

interface YoutubeMenuProps {
  editor: Editor | null;
}

// Menú para insertar un video de YouTube en el editor
export const YoutubeMenu = ({ editor }: YoutubeMenuProps) => {
  if (!editor) return null; // No renderiza si no hay editor

  // Solicita la URL y la inserta si es válida
  const addYoutubeVideo = () => {
    const url = prompt("Ingresa la URL del vídeo de YouTube:");
    if (
      url &&
      url.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/)
    ) {
      const defaultWidth = 600;
      const defaultHeight = 320;

      editor
        .chain()
        .focus()
        .setYoutubeVideo({
          src: url,
          width: defaultWidth,
          height: defaultHeight,
        })
        .run();
    } else {
      alert("Por favor ingresa una URL válida de YouTube");
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={addYoutubeVideo}
      className="size-10 hover:bg-gray-100 transition-all"
    >
      {/* Ícono de YouTube */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18" // Ancho del ícono SVG de YouTube
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
      </svg>
    </Button>
  );
};

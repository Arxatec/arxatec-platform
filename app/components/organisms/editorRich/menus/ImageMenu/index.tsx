import { Editor } from "@tiptap/react";
import { Button } from "../../../editorRich/ui/button";
import { PhotoIcon } from "@heroicons/react/24/outline";

interface ImageMenuProps {
  editor: Editor | null;
}

export const ImageMenu = ({ editor }: ImageMenuProps) => {
  if (!editor) return null;

  const validateImageUrl = async (url: string) => {
    try {
      // Intentamos cargar la imagen directamente
      const img = new Image();
      const imageLoadPromise = new Promise((resolve, reject) => {
        img.onload = () => resolve(true);
        img.onerror = () => reject(false);
        // Aumentamos el timeout para URLs de redirección
        setTimeout(() => reject(false), 10000); // 10 segundos de timeout
      });

      // Agregamos credentials y otros headers necesarios
      img.crossOrigin = "anonymous";
      img.src = url;

      const isValid = await imageLoadPromise;
      return isValid;
    } catch {
      // Si falla la carga directa, intentamos con fetch
      try {
        const response = await fetch(url, {
          method: "HEAD",
          mode: "no-cors", // Esto permite URLs de otros dominios
        });
        // En modo no-cors no podemos ver los headers, así que si no hay error, asumimos que es válida
        return true;
      } catch {
        // Si ambos métodos fallan, hacemos un último intento con GET
        try {
          const response = await fetch(url, {
            mode: "no-cors",
          });
          return true;
        } catch {
          return false;
        }
      }
    }
  };

  const handleImage = async () => {
    const url = prompt("Ingresa la URL de la imagen:");
    if (!url) return;

    try {
      const isValidImage = await validateImageUrl(url);
      if (isValidImage) {
        editor
          .chain()
          .focus()
          .setImage({
            src: url,
            alt: "Imagen",
            title: url,
          })
          .run();
      } else {
        alert(
          "No se pudo cargar la imagen. Por favor verifica que:\n\n- La URL sea accesible\n- La URL corresponda a una imagen\n- La imagen no esté protegida o bloqueada"
        );
      }
    } catch {
      // Si hay algún error, intentamos insertar la imagen de todos modos falta mensakes de erorr
      editor
        .chain()
        .focus()
        .setImage({
          src: url,
          alt: "Imagen",
          title: url,
        })
        .run();
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleImage}
      className="h-9 px-2"
      title="Insertar imagen"
    >
      <PhotoIcon className="h-5 w-5" />
    </Button>
  );
};

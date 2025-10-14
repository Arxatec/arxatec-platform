import { useState, useRef, useCallback } from "react";
import ReactCrop, { type Crop, type PixelCrop } from "react-image-crop";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Button,
} from "@/components/ui";
import { CheckIcon, Loader2, XIcon } from "lucide-react";
import "react-image-crop/dist/ReactCrop.css";
import { canvasToFile, centerAspectCrop, getCroppedImg } from "@/utilities";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  onCropComplete: (croppedImageFile: File) => void;
}

export const ImageCropDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  imageSrc,
  onCropComplete,
}) => {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [isProcessing, setIsProcessing] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, 1));
    },
    []
  );

  const handleCropComplete = async () => {
    if (!completedCrop || !imgRef.current) return;

    setIsProcessing(true);
    try {
      const canvas = getCroppedImg(imgRef.current, completedCrop);
      const croppedImageFile = await canvasToFile(canvas, "avatar.jpg");
      onCropComplete(croppedImageFile);
      onClose();
    } catch (error) {
      console.error("Error al procesar la imagen:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    setCrop(undefined);
    setCompletedCrop(undefined);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Recortar imagen de perfil</DialogTitle>
          <DialogDescription>
            Ajusta el área de recorte para tu foto de perfil. La imagen será
            cuadrada.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 relative rounded overflow-hidden">
          <img
            src={imageSrc}
            alt="Imagen a recortar"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/50 backdrop-blur-lg"></div>
          <div className="flex justify-center">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
              minWidth={100}
              minHeight={100}
              circularCrop={false}
            >
              <img
                ref={imgRef}
                alt="Imagen a recortar"
                src={imageSrc}
                style={{ maxHeight: "400px", maxWidth: "100%" }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isProcessing}
          >
            <XIcon className="size-4 " />
            Cancelar
          </Button>
          <Button
            onClick={handleCropComplete}
            disabled={!completedCrop || isProcessing}
          >
            {isProcessing ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <CheckIcon className="size-4 " />
            )}
            {isProcessing ? "Procesando..." : "Confirmar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Label,
} from "@/components/ui";
import { PlusIcon } from "lucide-react";
import { ImageCropDialog } from "../image_crop_dialog";
import { useRef, useState, useEffect } from "react";

interface Props {
  value?: File;
  onChange?: (file: File | undefined) => void;
  label?: string;
  optional?: boolean;
  fallbackText?: string;
}

export const ProfileImage: React.FC<Props> = ({
  value,
  onChange,
  label = "Foto de perfil",
  optional = true,
  fallbackText = "HV",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [selectedImageSrc, setSelectedImageSrc] = useState<string | null>(null);
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);

  useEffect(() => {
    if (value && value instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(value);
    } else if (!value) {
      setAvatarPreview(null);
    }
  }, [value]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImageSrc(e.target?.result as string);
        setIsCropDialogOpen(true);
      };
      reader.readAsDataURL(file);
    }
    event.target.value = "";
  };

  const handleCropComplete = (croppedImageFile: File) => {
    onChange?.(croppedImageFile);
    setIsCropDialogOpen(false);
    setSelectedImageSrc(null);
  };

  const handleCropCancel = () => {
    setIsCropDialogOpen(false);
    setSelectedImageSrc(null);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <Label className="mb-2 block">
        {label}
        {optional && (
          <span className="text-xs text-muted-foreground"> (Opcional)</span>
        )}
      </Label>
      <div className="flex items-center gap-2">
        <Avatar className="size-20">
          {avatarPreview ? (
            <AvatarImage src={avatarPreview} alt="Avatar preview" />
          ) : (
            <AvatarFallback>{fallbackText}</AvatarFallback>
          )}
        </Avatar>
        <Button
          type="button"
          className="border-none bg-card hover:bg-accent/80"
          variant="outline"
          onClick={handleAvatarClick}
        >
          <PlusIcon className="size-4" />
          Cambiar foto
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="hidden"
        />
      </div>

      {selectedImageSrc && (
        <ImageCropDialog
          isOpen={isCropDialogOpen}
          onClose={handleCropCancel}
          imageSrc={selectedImageSrc}
          onCropComplete={handleCropComplete}
        />
      )}
    </div>
  );
};

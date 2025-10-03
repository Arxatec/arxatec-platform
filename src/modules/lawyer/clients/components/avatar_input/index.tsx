import { Button, Label } from "@/components/ui";
import { PencilIcon, PlusIcon, X } from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";

interface Props {
  fullName: string;
  onAvatarChange: (file: File | undefined) => void;
  className?: string;
  defaultAvatar?: string;
}

export const AvatarInput: React.FC<Props> = ({
  fullName,
  onAvatarChange,
  className = "",
  defaultAvatar,
}) => {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (defaultAvatar) {
      setAvatarPreview(defaultAvatar);
    }
  }, [defaultAvatar]);

  const getInitials = useMemo(() => {
    if (!fullName || fullName.trim() === "") return "MD";

    const names = fullName.trim().split(" ");
    if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase();
    }

    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  }, [fullName]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setAvatarError("Por favor selecciona un archivo de imagen válido");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        setAvatarError("La imagen debe ser menor a 2MB");
        return;
      }

      setAvatarError(null);
      setAvatarFile(file);
      onAvatarChange(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setAvatarError(null);
    }
  };

  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

  const removeAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
    setAvatarError(null);
    onAvatarChange(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={className}>
      <Label className="flex items-center gap-2">
        Foto de perfil
        <span className="text-xs text-muted-foreground">(Opcional)</span>
      </Label>
      <div className="mt-2 flex items-center gap-4">
        <div className="relative size-20 bg-accent rounded-sm flex items-center justify-center border">
          {avatarPreview ? (
            <>
              <img
                src={avatarPreview}
                alt="Vista previa del avatar"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={removeAvatar}
                className="absolute -top-1 -right-1 bg-primary/20 backdrop-blur-lg text-destructive-foreground rounded-full p-1 hover:bg-primary/40 transition-colors"
              >
                <X className="size-3" />
              </button>
            </>
          ) : (
            <span className="text-sm font-medium text-muted-foreground">
              {getInitials}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            className="border-none bg-accent hover:bg-accent/80 w-fit"
            onClick={openFileSelector}
          >
            {avatarPreview ? (
              <PencilIcon className="w-4 h-4" />
            ) : (
              <PlusIcon className="w-4 h-4" />
            )}
            <span>{avatarPreview ? "Cambiar foto" : "Agregar foto"}</span>
          </Button>
          {avatarFile && (
            <p className="text-xs text-muted-foreground">{avatarFile.name}</p>
          )}
        </div>
      </div>
      {avatarError && (
        <p className="text-sm text-destructive mt-2">{avatarError}</p>
      )}
    </div>
  );
};

export default AvatarInput;

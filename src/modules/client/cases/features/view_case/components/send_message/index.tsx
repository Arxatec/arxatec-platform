import { Button, Input } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, SendIcon, SmilePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { sendMessageSchema } from "../../schemas";
import type { SendMessageRequest } from "../../types";
import { toast } from "sonner";
import { sendMessage } from "../../services";
import { useMutation } from "@tanstack/react-query";
import { twMerge } from "tailwind-merge";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import type { EmojiClickData } from "emoji-picker-react";
import { useState } from "react";
import { EMOJI_CATEGORIES } from "@/constants";

interface Props {
  id: string;
}

export const SendMessage: React.FC<Props> = ({ id }) => {
  const [onFocus, setOnFocus] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SendMessageRequest>({
    resolver: zodResolver(sendMessageSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (message: string) => sendMessage(id, message),
  });

  const onSuccess = () => {
    toast.success("Mensaje enviado correctamente");
    reset();
  };
  const onError = (error: Error) => {
    toast.error("Error al enviar el mensaje", {
      description: error.message,
    });
  };

  const onSubmit = (data: SendMessageRequest) => {
    mutate(data.content, {
      onSuccess,
      onError,
    });
  };

  const onEmojiClick = (emoji: EmojiClickData) => {
    const prevContent = watch("content");
    setValue("content", prevContent + emoji.emoji);
  };

  return (
    <div className="relative">
      <form
        className={twMerge(
          "flex items-center gap-2 bg-accent transition-all border rounded py-1 px-1",
          errors.content && "border-rose-500/10",
          onFocus && "ring-ring/50 ring-[3px]"
        )}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          placeholder="Escribe un mensaje"
          className="bg-transparent! outline-none focus-visible:ring-0 border-none shadow-none"
          {...register("content")}
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
        />
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          type="button"
          onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
        >
          <SmilePlus className="w-4 h-4" />
        </Button>
        {isEmojiPickerOpen && (
          <div className="absolute top-12 right-0">
            <EmojiPicker
              searchPlaceholder="Buscar emoji..."
              onEmojiClick={onEmojiClick}
              skinTonesDisabled
              lazyLoadEmojis
              categories={EMOJI_CATEGORIES}
              emojiStyle={EmojiStyle.NATIVE}
            />
          </div>
        )}
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2Icon className="w-4 h-4 animate-spin" />
          ) : (
            <SendIcon />
          )}
          {isPending ? "Enviando..." : "Enviar"}
        </Button>
      </form>
      {errors.content && (
        <p className="text-sm text-rose-500 mt-2">{errors.content.message}</p>
      )}
    </div>
  );
};

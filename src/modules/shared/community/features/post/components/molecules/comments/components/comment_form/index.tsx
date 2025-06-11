import { useState } from "react";
import { CustomAvatar, PrimaryButton } from "~/components/atoms";

export const CommentForm = ({
  onSubmit,
  onClose,
  placeholder = "Escribe un comentario...",
  buttonText = "Comentar",
}: {
  onSubmit: (text: string) => void;
  onClose: () => void;
  placeholder?: string;
  buttonText?: string;
}) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text);
      setText("");
    }
  };

  return (
    <div className="flex gap-2  border border-gray-200 rounded-lg overflow-hidden">
      <div className="flex-1">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          className="w-full m-50px] text-sm p-2.5 outline-none "
        />
        <div className="flex justify-end items-center gap-2 mb-2 mr-2">
          <PrimaryButton
            className="px-4 py-1.5 text-sm font-medium rounded-md bg-gray-100 cursor-pointer hover:bg-gray-200 text-gray-600"
            onClick={onClose}
          >
            Cancelar
          </PrimaryButton>
          <PrimaryButton
            className={`px-4 py-1.5 text-sm font-medium rounded-md ${
              text.trim()
                ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                : "cursor-not-allowed"
            }`}
            onClick={handleSubmit}
            disabled={!text.trim()}
          >
            {buttonText}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

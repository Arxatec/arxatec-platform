import {
  ChatBubbleOvalLeftIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  ShareIcon,
} from "@heroicons/react/16/solid";
import { useState } from "react";
import { ModalShare } from "../../molecules/modal_share";

interface Props {
  likes: number;
  comments: number;
}

export const PostFooter: React.FC<Props> = ({ likes, comments }) => {
  const [openShareModal, setOpenShareModal] = useState(false);

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setOpenShareModal(true);
  };

  return (
    <>
      <div className="flex items-center justify-start gap-2 mt-4 ">
        <div className="bg-slate-50 flex items-center rounded-lg overflow-hidden">
          <button
            className="p-2 hover:bg-slate-100 group transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <HandThumbUpIcon className="size-4 text-gray-400 group-hover:text-blue-600" />
          </button>
          <p className="text-sm text-gray-700 px-1">{likes}</p>
          <button
            className="p-2 hover:bg-slate-100 group transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <HandThumbDownIcon className="size-4 text-gray-400 group-hover:text-cyan-600" />
          </button>
        </div>
        <button
          className="flex items-center justify-start bg-slate-50 rounded-lg py-1.5 px-3 gap-2 text-sm hover:bg-slate-100 text-gray-600 transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          <ChatBubbleOvalLeftIcon className="size-4 text-gray-400" />
          {comments}
        </button>
        <button
          onClick={handleShareClick}
          className="flex items-center justify-start bg-slate-50 rounded-lg py-1.5 px-3 gap-2 text-sm hover:bg-slate-100 text-gray-600 transition-all"
          aria-label="Compartir publicación"
        >
          <ShareIcon className="size-4 text-gray-400" />
          Compartir
        </button>
      </div>
      <ModalShare open={openShareModal} setOpen={setOpenShareModal} />
    </>
  );
};

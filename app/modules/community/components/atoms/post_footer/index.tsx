import {
  ChatBubbleOvalLeftIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  ShareIcon,
} from "@heroicons/react/16/solid";

interface Props {
  likes: number;
  comments: number;
}

export const PostFooter: React.FC<Props> = ({ likes, comments }) => {
  return (
    <div className="flex items-center justify-start gap-4 mt-4">
      <div className="bg-slate-200 flex items-center rounded-lg overflow-hidden">
        <button className="p-2 hover:bg-slate-300 group transition-all">
          <HandThumbUpIcon className="size-4 text-gray-400 group-hover:text-blue-600" />
        </button>
        <p className="text-sm text-gray-700 px-1">{likes}</p>
        <button className="p-2 hover:bg-slate-300 group transition-all">
          <HandThumbDownIcon className="size-4 text-gray-400 group-hover:text-sky-500" />
        </button>
      </div>
      <button className="flex items-center justify-start bg-slate-200  rounded-lg  py-1.5 px-3 gap-2 text-sm  hover:bg-slate-300 text-gray-600">
        <ChatBubbleOvalLeftIcon className="size-4 text-gray-400" />
        {comments}
      </button>
      <button className="flex items-center justify-start bg-slate-200  rounded-lg  py-1.5 px-3 gap-2 text-sm  hover:bg-slate-300 text-gray-600">
        <ShareIcon className="size-4 text-gray-400" />
        Compartir
      </button>
    </div>
  );
};

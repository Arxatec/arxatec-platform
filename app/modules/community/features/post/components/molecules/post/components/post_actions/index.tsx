import {
  ChatBubbleOvalLeftIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  ShareIcon,
} from "@heroicons/react/20/solid";

interface Props {
  upvotes: number;
  commentCount: number;
  onUpvote: () => void;
  onDownvote: () => void;
}

export const PostActions: React.FC<Props> = ({
  upvotes,
  commentCount,
  onUpvote,
  onDownvote,
}) => {
  const formatUpvotes = (value: number) => {
    if (value >= 1) {
      return `${value.toFixed(1)} mil`;
    }
    return value.toString();
  };

  return (
    <div className="flex px-3 py-2 gap-4">
      <div className="bg-slate-200 flex items-center rounded-lg overflow-hidden">
        <button
          onClick={onUpvote}
          className="p-2 hover:bg-slate-300 group transition-all"
        >
          <HandThumbUpIcon className="size-4 text-gray-400 group-hover:text-indigo-600" />
        </button>
        <span className="text-sm font-medium px-1 text-gray-700">
          {formatUpvotes(upvotes)}
        </span>
        <button
          onClick={onDownvote}
          className="p-2 hover:bg-slate-300 group transition-all"
        >
          <HandThumbDownIcon className="size-4 text-gray-400 group-hover:text-orange-600" />
        </button>
      </div>

      <button className="flex items-center justify-start bg-slate-200  rounded-lg  py-1.5 px-3 gap-2 text-sm  hover:bg-slate-300 text-gray-600">
        <ChatBubbleOvalLeftIcon className="size-4 text-gray-400" />
        {commentCount}
      </button>
      <button className="flex items-center justify-start bg-slate-200  rounded-lg  py-1.5 px-3 gap-2 text-sm  hover:bg-slate-300 text-gray-600">
        <ShareIcon className="size-4 text-gray-400" />
        Compartir
      </button>
    </div>
  );
};

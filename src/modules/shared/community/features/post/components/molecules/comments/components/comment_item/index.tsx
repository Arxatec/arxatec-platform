import {
  ChatBubbleOvalLeftIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { CommentForm } from "../comment_form";
import { CustomAvatar } from "~/components/atoms";
import { HandThumbDownIcon } from "@heroicons/react/20/solid";
import { twJoin, twMerge } from "tailwind-merge";
interface User {
  id: string;
  name: string;
  avatar?: string;
}

interface Comment {
  id: string;
  user: User;
  text: string;
  date: string;
  likes: number;
  dislikes: number;
  replies?: Comment[];
}

export const CommentItem = ({ comment }: { comment: Comment }) => {
  const [liked, setLiked] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [likes, setLikes] = useState(comment.likes);
  const [disliked, setDisliked] = useState(false);
  const [dislikes, setDislikes] = useState(comment.dislikes);

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    } else {
      setLikes(likes - 1);
      setLiked(false);
    }
  };

  const handleDislike = () => {
    if (!disliked) {
      setDislikes(dislikes + 1);
      setDisliked(true);
    } else {
      setDislikes(dislikes - 1);
      setDisliked(false);
    }
  };

  // TODO: Create one function in utils
  function timeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals = [
      { label: "año", seconds: 31536000 },
      { label: "mes", seconds: 2592000 },
      { label: "día", seconds: 86400 },
      { label: "hora", seconds: 3600 },
      { label: "minuto", seconds: 60 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `hace ${count} ${interval.label}${count !== 1 ? "s" : ""}`;
      }
    }

    return "hace un momento";
  }

  return (
    <div className="mb-4">
      <div className="flex gap-3">
        <CustomAvatar
          avatar={comment.user.avatar ?? "Avatar"}
          size="2rem"
          username={comment.user.name}
        />

        <div className="flex-1">
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="font-semibold text-gray-800 text-sm flex items-center gap-2">
              <p>{comment.user.name}</p>
              <span className="text-xs text-gray-500 font-normal">
                {timeAgo(comment.date)}
              </span>
            </div>
            <p className="text-sm mt-1 text-gray-600">{comment.text}</p>
          </div>
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
            <div className="bg-slate-50 flex items-center rounded-lg overflow-hidden">
              <button
                className={twMerge(
                  "p-2 hover:bg-slate-100 group transition-all",
                  liked ? "text-sky-500" : "text-gray-400"
                )}
                onClick={handleLike}
              >
                <HandThumbUpIcon
                  className={twJoin(
                    "size-4 text-gray-400 group-hover:text-sky-500",
                    liked ? "text-sky-500" : "text-gray-400"
                  )}
                />
              </button>
              <p className="text-sm text-gray-700 px-1">{likes}</p>
              <button
                className={twMerge(
                  "p-2 hover:bg-slate-100 group transition-all",
                  disliked ? "text-cyan-600" : "text-gray-400"
                )}
                onClick={handleDislike}
              >
                <HandThumbDownIcon
                  className={twJoin(
                    "size-4 text-gray-400 group-hover:text-cyan-600",
                    disliked ? "text-cyan-600" : "text-gray-400"
                  )}
                />
              </button>
            </div>
            <button
              className="flex items-center justify-start bg-slate-50  rounded-lg  py-1.5 px-3 gap-2 text-sm  hover:bg-slate-100 text-gray-600 transition-all"
              onClick={() => setShowReplyForm(!showReplyForm)}
            >
              <ChatBubbleOvalLeftIcon className="size-4 text-gray-400" />
              Responder
            </button>
          </div>

          {showReplyForm && (
            <div className="mt-2">
              <CommentForm
                onClose={() => setShowReplyForm(!showReplyForm)}
                onSubmit={(text) => {
                  console.log("Respuesta:", text);
                  setShowReplyForm(false);
                }}
                placeholder="Escribe una respuesta..."
                buttonText="Responder"
              />
            </div>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-3 pl-4 border-l-2 border-gray-200">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

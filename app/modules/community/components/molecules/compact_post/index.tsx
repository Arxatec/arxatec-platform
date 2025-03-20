import { CustomAvatar } from "~/components/atoms";

interface Props {
  idUser: string;
  avatar: string;
  username: string;
  idPost: string;
  likes: number;
  comments: number;
  post: string;
}

export const CompactPost: React.FC<Props> = ({
  avatar,
  username,
  idUser,
  idPost,
  likes,
  comments,
  post,
}) => {
  return (
    <div className="w-full px-4 py-4">
      <a href={idUser} className="flex items-center justify-start gap-2">
        <CustomAvatar avatar={avatar} size="1.75rem" />
        <p className="text-sm font-medium text-gray-700 hover:underline">
          {username}
        </p>
      </a>
      <div className="mt-2">
        <a
          href={idPost}
          className="text-sm block font-semibold text-gray-900 hover:underline cursor-pointer transition-all leading-[20px]"
        >
          {post}
        </a>
        <div className="flex items-center gap-2 mt-2">
          <p className="text-sm text-gray-500">{likes} me gusta</p>
          <span className="size-1 bg-slate-500 rounded-full" />
          <p className="text-sm text-gray-500">{comments} comentarios</p>
        </div>
      </div>
    </div>
  );
};

import { PostMenu } from "~/modules/community/components/atoms";

interface Props {
  avatar: string;
  username: string;
  datePosted: string;
}

export const PostHeader: React.FC<Props> = ({ avatar, username }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-start gap-2">
        <img
          alt="avatar"
          src={avatar}
          className="inline-block size-7 rounded-full object-cover"
        />
        <p className="text-sm font-medium text-gray-700">{username}</p>
        <span className="size-1 bg-slate-500 rounded-full" />
        <p className="text-xs text-gray-500">hace 3 días</p>
      </div>
      <PostMenu />
    </div>
  );
};

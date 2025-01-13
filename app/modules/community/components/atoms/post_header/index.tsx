import { PostMenu } from "../post_menu";

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
        <p className="text-sm font-semibold text-gray-900">{username}</p>
      </div>
      <PostMenu />
    </div>
  );
};

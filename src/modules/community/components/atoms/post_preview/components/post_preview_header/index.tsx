import { CustomAvatar } from "~/components/atoms";
import { PostMenu } from "~/modules/community/components/atoms";

interface Props {
  avatar: string;
  username: string;
  datePosted: string;
}

export const PostPreviewHeader: React.FC<Props> = ({ avatar, username }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-start gap-2">
        <CustomAvatar
          avatar={avatar}
          altText={username}
          size="1.5rem"
          username={username}
        />
        <p className="text-sm font-medium text-gray-700">{username}</p>
        <span className="size-1 bg-slate-500 rounded-full" />
        <p className="text-xs text-gray-500">hace 3 días</p>
      </div>
      <PostMenu />
    </div>
  );
};

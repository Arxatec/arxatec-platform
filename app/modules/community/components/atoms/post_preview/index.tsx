import { PostFooter } from "~/modules/community/components/atoms";
import { PostPreviewContent, PostPreviewHeader } from "./components";

interface Props {
  avatar: string;
  username: string;
  title: string;
  content: string;
  image?: string;
  datePosted: string;
  likes: number;
  comments: number;
}

export const PostPreview: React.FC<Props> = ({
  avatar,
  username,
  title,
  content,
  image,
  datePosted,
  likes,
  comments,
}) => {
  return (
    <a className="px-4 py-4 my-1  rounded-md block cursor-pointer hover:bg-slate-50 transition-all">
      <PostPreviewHeader
        avatar={avatar}
        username={username}
        datePosted={datePosted}
      />
      <PostPreviewContent title={title} text={content} image={image} />
      <PostFooter likes={likes} comments={comments} />
    </a>
  );
};

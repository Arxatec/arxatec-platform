import { PostFooter } from "~/modules/shared/community/components/atoms";
import { PostPreviewContent, PostPreviewHeader } from "./components";
import { Link } from "react-router-dom";

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
    <Link
      to="/"
      className="px-4 py-4 my-1  rounded-md block cursor-pointer hover:bg-slate-50 transition-all"
    >
      <PostPreviewHeader
        avatar={avatar}
        username={username}
        datePosted={datePosted}
      />
      <PostPreviewContent title={title} text={content} image={image} />
      <PostFooter likes={likes} comments={comments} />
    </Link>
  );
};

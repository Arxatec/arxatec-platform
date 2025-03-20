import { PostFooter } from "~/modules/community/components/atoms";
import { PostContent, PostHeader } from "./components";

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

export const Post: React.FC<Props> = ({
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
    <a className="px-4 py-4 my-1  rounded-md block cursor-pointer hover:bg-slate-100 transition-all">
      <PostHeader avatar={avatar} username={username} datePosted={datePosted} />
      <PostContent title={title} text={content} image={image} />
      <PostFooter likes={likes} comments={comments} />
    </a>
  );
};

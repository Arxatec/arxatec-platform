import { PostPreview } from "../../atoms";

interface Props {
  posts: any;
}

export const PostPreviewCollection: React.FC<Props> = ({ posts }) => {
  return (
    <div className="w-full bg-white px-4 py-3 rounded-lg shadow-sm transition-all hover:shadow-md">
      <div className="grid divide-y divide-gray-100">
        {posts.map((item: any) => (
          <div>
            <PostPreview
              avatar={item.avatar}
              username={item.username}
              title={item.title}
              content={item.content}
              datePosted={item.datePosted}
              likes={item.likes}
              image={item.image}
              comments={item.likes}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

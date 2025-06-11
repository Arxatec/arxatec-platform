interface Props {
  post: {
    title: string;
    content: string;
    edit?: string;
  };
}

export const PostContent: React.FC<Props> = ({ post }) => {
  return (
    <div className="px-3 pb-2">
      <h2 className="text-xl font-bold mb-2 text-gray-900">{post.title}</h2>
      <p className="text-sm text-gray-700 whitespace-pre-line mb-4">
        {post.content}
      </p>
      {post.edit && (
        <p className="text-sm text-gray-600 whitespace-pre-line italic">
          {post.edit}
        </p>
      )}
    </div>
  );
};

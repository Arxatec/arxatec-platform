interface Props {
  title: string;
  text: string;
  image?: string;
}
export const PostContent: React.FC<Props> = ({ title, text }) => {
  return (
    <div className="mt-2">
      <p className="text-lg font-bold text-gray-700">{title}</p>
      <p className="text-sm text-gray-500 mt-1">{text.slice(0, 400)}...</p>
    </div>
  );
};

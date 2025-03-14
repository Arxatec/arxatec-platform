interface Props {
  title: string;
  description: string;
}
export const Title: React.FC<Props> = ({ title, description }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="text-gray-500 text-base mt-2">{description}</p>
    </div>
  );
};

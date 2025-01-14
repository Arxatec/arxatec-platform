import { LoadingImage } from "~/components/atoms";

interface Props {
  title: string;
  text: string;
  image?: string;
}
export const PostContent: React.FC<Props> = ({ title, text, image }) => {
  return (
    <div className="mt-2">
      <p className="text-lg font-bold text-gray-700">{title}</p>
      {image != undefined ? (
        <LoadingImage
          image={image!}
          alt="post_image"
          classNames="w-full h-[300px] rounded-md object-cover mt-2"
        />
      ) : null}
      <p className="text-sm text-gray-500 mt-2">{text.slice(0, 400)}...</p>
    </div>
  );
};

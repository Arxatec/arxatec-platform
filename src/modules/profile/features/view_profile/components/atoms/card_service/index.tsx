import { CustomImage } from "~/components/atoms";
import communityError from "~/assets/images/error/avatar_error.png";

interface Props {
  src: string;
  alt: string;
  name: string;
  description: string;
  price: string;
}

export const CardService: React.FC<Props> = ({
  src,
  alt,
  name,
  description,
  price,
}) => (
  <div className="bg-white rounded-lg max-w-96 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden h-64">
    <CustomImage
      src={src}
      alt={alt}
      className="w-full h-32 object-cover"
      errorImage={communityError}
    />
    <div className="p-3 flex flex-col flex-1">
      <h4 className="text-sm font-bold text-gray-900 truncate">{name}</h4>
      <p className="text-xs text-gray-500 mt-1 flex-1 line-clamp-2">
        {description}
      </p>
      <p className="text-sm font-bold text-blue-600 mt-1">{price}</p>
    </div>
  </div>
);

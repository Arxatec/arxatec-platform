import { CustomImage } from "~/components/atoms";
import communityError from "~/assets/images/error/avatar_error.png";

interface Props {
  src: string;
  alt: string;
  nameInstitution: string;
  career: string;
  date: string;
}
export const CardEducation: React.FC<Props> = ({
  src,
  alt,
  nameInstitution,
  career,
  date,
}) => (
  <div className="flex items-center gap-2">
    <CustomImage
      src={src}
      alt={alt}
      className="size-14 rounded-md overflow-hidden block object-cover"
      errorImage={communityError}
    />
    <div>
      <h4 className="text-sm font-bold text-gray-900">{nameInstitution}</h4>
      <p className="text-sm text-gray-500">{career}</p>
      <p className="text-sm text-gray-400">{date}</p>
    </div>
  </div>
);

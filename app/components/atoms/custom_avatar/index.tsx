import { useState } from "react";
import { avatarError } from "~/utilities/assets_utilities";

interface Props {
  avatar: string;
  size: string;
  altText?: string;
}

export const CustomAvatar: React.FC<Props> = ({
  avatar,
  size,
  altText = "Avatar",
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => setIsLoading(false);
  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div
      style={{
        width: size,
        height: size,
      }}
      className="relative inline-block"
    >
      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-full"
          style={{ width: size, height: size }}
        >
          <span className="loader" />
        </div>
      )}

      {hasError ? (
        <img
          src={avatarError}
          alt="error"
          className="rounded-full object-cover"
          style={{ width: size, height: size }}
        />
      ) : (
        <img
          src={avatar}
          alt={altText}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`rounded-full object-cover transition-opacity ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          style={{ width: size, height: size }}
        />
      )}
    </div>
  );
};

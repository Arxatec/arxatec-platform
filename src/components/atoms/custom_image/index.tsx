import React, { useState } from "react";
import placeholderError from "~/assets/images/error/image_error.jpg";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  errorImage?: string;
  onImageError?: () => void;
  onImageLoaded?: () => void;
}

export const CustomImage: React.FC<Props> = ({
  src,
  alt = "",
  errorImage = placeholderError,
  onImageError,
  onImageLoaded,
  className = "",
  ...props
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    if (onImageError) {
      onImageError();
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
    if (onImageLoaded) {
      onImageLoaded();
    }
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
          <span className="sr-only">Cargando imagen...</span>
        </div>
      )}

      <img
        src={hasError ? errorImage : src}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        className={`transition-opacity duration-300 w-full h-full object-cover ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        {...props}
      />
    </div>
  );
};

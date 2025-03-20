import type React from "react";
import { useState } from "react";

interface Props {
  avatar: string;
  size: string;
  altText?: string;
  username?: string;
}

export const CustomAvatar: React.FC<Props> = ({
  avatar,
  size,
  altText = "Avatar",
  username = "Anonymous",
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => setIsLoading(false);
  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const getColorFromUsername = (username: string) => {
    const colors = [
      "bg-blue-500",
      "bg-gray-500",
      "bg-slate-500",
      "bg-sky-500",
      "bg-cyan-500",
      "bg-indigo-500",
    ];
    let sum = 0;
    for (let i = 0; i < username.length; i++) {
      sum += username.charCodeAt(i);
    }
    return colors[sum % colors.length];
  };

  const avatarColor = getColorFromUsername(username);
  const initials = username.charAt(0).toUpperCase();

  return (
    <div
      style={{ width: size, height: size }}
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
        <div
          className={`flex items-center justify-center rounded-full text-white font-medium ${avatarColor}`}
          style={{ width: size, height: size }}
        >
          {initials}
        </div>
      ) : (
        <img
          src={avatar || "/placeholder.svg"}
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

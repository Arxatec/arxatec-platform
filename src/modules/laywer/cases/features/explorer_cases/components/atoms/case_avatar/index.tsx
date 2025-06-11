interface CaseAvatarProps {
  imageUrl?: string;
  altText: string;
}

export const CaseAvatar = ({ imageUrl, altText }: CaseAvatarProps) => {
  return (
    <div className="relative size-8 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
      {imageUrl && (
        <img src={imageUrl} alt={altText} className="object-cover" />
      )}
    </div>
  );
};

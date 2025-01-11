interface Props {
  image: string;
  alt?: string;
  classNames?: string;
}

export const LoadingImage: React.FC<Props> = ({ image, alt, classNames }) => {
  return (
    <img alt={alt ?? image} src={image} loading="lazy" className={classNames} />
  );
};

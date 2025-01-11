import { LoadingImage } from "~/components/atoms";

export const HeroImage = () => (
  <div className="relative hidden w-0 flex-1 lg:block rounded-md overflow-hidden">
    <LoadingImage
      image="https://images.pexels.com/photos/7876087/pexels-photo-7876087.jpeg"
      alt="hero image"
      classNames="absolute inset-0 size-full object-cover"
    />
  </div>
);

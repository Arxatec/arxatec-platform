import { CustomImage } from "~/components/atoms";

interface Props {
  image: string;
}
export const HeroImage: React.FC<Props> = ({ image }) => (
  <div className="order-1 lg:order-2 lg:block hidden">
    <div />
    <div className="lg:fixed p-2 w-full h-full grid grid-cols-1 lg:grid-cols-2 top-0 left-0 pointer-events-none">
      <div />
      <div className="relative w-full lg:block rounded-md overflow-hidden h-[500px] lg:h-full">
        <CustomImage
          src={image}
          alt="hero image"
          className="absolute object-cover z-0 w-full h-full object-left-top"
        />
      </div>
    </div>
  </div>
);

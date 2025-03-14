import { LoadingImage } from "~/components/atoms";

interface Props {
  image: string;
  title: string;
  text: string;
  author: string;
}
export const HeroImage: React.FC<Props> = ({ image, title, text, author }) => (
  <div className="order-1 lg:order-2 lg:block hidden">
    <div />
    <div className="lg:fixed p-2 w-full h-full grid grid-cols-1 lg:grid-cols-2 top-0 left-0 pointer-events-none">
      <div />
      <div className="relative w-full lg:block rounded-md overflow-hidden h-[500px] lg:h-full">
        <LoadingImage
          image={image}
          alt="hero image"
          classNames="absolute object-cover z-0 w-full h-full"
        />
        <div className="absolute z-10 w-full h-full bg-black/40" />
        <div className="absolute z-20 bottom-0 w-full p-2">
          <div className="w-full px-4 py-6">
            <h1 className="text-white lg:text-2xl text-lg font-bold">
              {title}
            </h1>
            <p className="lg:text-base text-white mt-2 text-sm">{text}</p>
            <h2 className="lg:text-base text-white mt-6 text-sm">{author}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
);

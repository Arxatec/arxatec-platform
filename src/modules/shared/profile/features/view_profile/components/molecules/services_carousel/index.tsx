import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { CardService } from "../../atoms";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

import "swiper/css";

const servicesData = [
  {
    id: 1,
    name: "Asesoría legal",
    description:
      "Servicio completo de asesoría legal para empresas y particulares",
    price: "S/. 150.00",
    src: "https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg",
    alt: "Asesoría legal",
  },
  {
    id: 2,
    name: "Derecho penal",
    description:
      "Defensa en casos penales con experiencia en diferentes tipos de delitos",
    price: "S/. 250.00",
    src: "https://images.pexels.com/photos/5668770/pexels-photo-5668770.jpeg",
    alt: "Derecho penal",
  },
  {
    id: 3,
    name: "Derecho civil",
    description:
      "Representación en casos civiles, contratos y disputas patrimoniales",
    price: "S/. 200.00",
    src: "https://images.pexels.com/photos/5668739/pexels-photo-5668739.jpeg",
    alt: "Derecho civil",
  },
  {
    id: 4,
    name: "Derecho laboral",
    description:
      "Asesoría especializada en asuntos laborales y de recursos humanos",
    price: "S/. 180.00",
    src: "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg",
    alt: "Derecho laboral",
  },
  {
    id: 5,
    name: "Derecho de familia",
    description:
      "Apoyo en casos de divorcio, custodia y otros asuntos familiares",
    price: "S/. 220.00",
    src: "https://images.pexels.com/photos/8112141/pexels-photo-8112141.jpeg",
    alt: "Derecho de familia",
  },
];

export const ServicesCarousel = () => {
  const swiperRef = useRef<any>(null);

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <div className="relative overflow-hidden ">
      <div className="w-full relative">
        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          scrollbar={{ draggable: true }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {servicesData.map((service) => (
            <SwiperSlide key={service.id}>
              <CardService
                src={service.src}
                alt={service.alt}
                name={service.name}
                description={service.description}
                price={service.price}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 text-gray-700 hover:bg-gray-100 transition-all"
        aria-label="Anterior"
      >
        <ChevronLeftIcon className="size-5" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 text-gray-700 hover:bg-gray-100 transition-all"
        aria-label="Siguiente"
      >
        <ChevronRightIcon className="size-5" />
      </button>
    </div>
  );
};

import { useTitle } from "~/hooks/useTitle";
import { useEffect } from "react";
import { CustomImage, PrimaryButton } from "~/components/atoms";
import {
  CalendarDaysIcon,
  EnvelopeIcon,
  FolderIcon,
  IdentificationIcon,
  MapPinIcon,
  PhoneIcon,
  PlusIcon,
  SparklesIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import communityError from "~/assets/images/error/avatar_error.png";
import {
  CardTestimonial,
  CardValoration,
  ProfileHeader,
  ServicesCarousel,
} from "../molecules";
import { CardEducation, ProfileItemInfo } from "../atoms";

export default function ViewProfilePage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Perfil - Arxatec");
  }, []);
  return (
    <div className="max-w-7xl w-full mx-auto px-6  min-h-screen">
      <div className="grid grid-cols-[70%_>30%] gap-2">
        <div className="w-full">
          <ProfileHeader title="Harvey Vasquez" />

          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all space-y-4">
              <div>
                <h3 className="text-base font-bold text-gray-900">Sobre mí</h3>
                <p className="text-sm text-gray-500">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Asperiores sunt officiis ipsum iste, officia ratione facere ea
                  accusantium soluta? Aperiam vel provident, sunt tenetur
                  repellendus quo esse quis ipsum eveniet. Lorem ipsum dolor sit
                  amet consectetur adipisicing elit. Aspernatur tempora
                  perspiciatis quasi, ad enim molestiae explicabo eligendi
                  porro? Adipisci praesentium natus sint incidunt itaque
                  laboriosam possimus explicabo aspernatur sit commodi!
                </p>
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Educación</h3>
                <div className="mt-2 space-y-2">
                  <CardEducation
                    src="https://oai.usm.cl/wp-content/uploads/2023/09/Pontificia-Universidad-Catolica-del-Peru_logo.jpg"
                    alt="image"
                    nameInstitution="Universidad Católica del Perú"
                    career="Especialización en derecho penal"
                    date="ene. 2020 - ago. 2023"
                  />
                  <CardEducation
                    src="https://postulantes.ucontinental.edu.pe/www/wp-content/uploads/2020/07/movil-logo.png"
                    alt="image"
                    nameInstitution="Universidad Continental"
                    career="Derecho"
                    date="ene. 2015 - ago. 2020"
                  />

                  <PrimaryButton className="w-full  bg-gray-100 text-gray-700 gap-2 hover:bg-gray-200">
                    <PlusIcon className="size-4" />
                    Ver más
                  </PrimaryButton>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all ">
              <h3 className="text-base font-bold text-gray-900">Información</h3>
              <div className="divide-y divide-gray-100">
                <ProfileItemInfo
                  title="Colegiatura"
                  value="521"
                  icon={IdentificationIcon}
                />
                <ProfileItemInfo
                  title="Experiencia"
                  value="15 años"
                  icon={SparklesIcon}
                />
                <ProfileItemInfo
                  title="Casos atendidos"
                  value="150"
                  icon={FolderIcon}
                />
                <ProfileItemInfo
                  title="Número de celular"
                  value="+57 317 865 2342"
                  icon={PhoneIcon}
                />
                <ProfileItemInfo
                  title="Correo electrónico"
                  value="harvey.vasquez@gmail.com"
                  icon={EnvelopeIcon}
                />
                <ProfileItemInfo
                  title="Ubicación"
                  value="Bogotá, Colombia"
                  icon={MapPinIcon}
                />
                <ProfileItemInfo
                  title="Horario"
                  value="Lunes a viernes 9:00 AM - 5:00 PM"
                  icon={CalendarDaysIcon}
                />
              </div>
            </div>
          </div>

          <div className="mt-2 w-full overflow-hidden bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all space-y-4">
            <h3 className="text-base font-bold text-gray-900">Servicios</h3>
            <div className="w-full overflow-hidden">
              <ServicesCarousel />
            </div>
          </div>
        </div>
        <div>
          <CardValoration />
          <div className="mt-2 space-y-2">
            <CardTestimonial />
            <CardTestimonial />
            <CardTestimonial />
            <CardTestimonial />
            <CardTestimonial />
            <CardTestimonial />
          </div>
        </div>
      </div>
    </div>
  );
}

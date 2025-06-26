import { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "~/assets/images/logo.png";
import { CustomImage } from "~/components/atoms";
import { useTitle } from "~/hooks";
import { ROUTES } from "~/routes/routes";

export default function NotFoundPage() {
  const { changeTitle } = useTitle();
  useEffect(() => {
    changeTitle("Página no encontrada - Arxatec");
  }, []);

  return (
    <>
      <div className="grid min-h-screen grid-cols-1 grid-rows-[1fr_auto_1fr] bg-white lg:grid-cols-[max(50%,36rem)_1fr]">
        <header className="mx-auto w-full max-w-7xl px-6 pt-6 sm:pt-10 lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:px-8">
          <a href="#">
            <span className="sr-only">Arxatec</span>
            <img alt={logo} src={logo} className="h-10 w-auto " />
          </a>
        </header>
        <main className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8">
          <div className="max-w-lg">
            <p className="text-base/8 font-semibold text-blue-600">404</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
              Página no encontrada
            </h1>
            <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              Lo sentimos, no pudimos encontrar la página que estás buscando.
            </p>
            <div className="mt-10">
              <Link
                to={ROUTES.Lawyer.Cases}
                className="text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-all px-4 py-3 rounded-md"
              >
                <span aria-hidden="true">&larr;</span> Ir al inicio
              </Link>
            </div>
          </div>
        </main>
        <footer className="self-end lg:col-span-2 lg:col-start-1 lg:row-start-3">
          <div className=" py-10">
            <nav className="mx-auto flex w-full max-w-7xl items-center gap-x-4 px-6 text-sm/7 text-gray-600 lg:px-8">
              <a
                href="https://arxatec.net/support"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contáctanos
              </a>
              <svg
                viewBox="0 0 2 2"
                aria-hidden="true"
                className="size-0.5 fill-gray-300"
              >
                <circle r={1} cx={1} cy={1} />
              </svg>
              <a
                href="https://arxatec.net/terms"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terminos y condiciones
              </a>
            </nav>
          </div>
        </footer>
        <div className="hidden lg:relative lg:col-start-2 lg:row-start-1 lg:row-end-4 lg:block ">
          <div className="absolute inset-0 size-full p-2">
            <CustomImage
              alt="Página no encontrada"
              src="https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg"
              className="object-cover w-full h-full rounded-md"
            />
          </div>
        </div>
      </div>
    </>
  );
}

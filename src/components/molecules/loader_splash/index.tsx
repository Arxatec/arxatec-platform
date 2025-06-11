import { logoIcon } from "~/utilities/assets_utilities";

export const LoaderSplash = () => (
  <>
    <div className="flex flex-col items-center justify-center h-screen w-full p-4 bg-slate-100 text-center animate-pulse">
      <div className="flex flex-col items-center justify-center bg-white px-8 py-12 rounded-md mx-auto w-full max-w-md shadow-sm hover:shadow transition-all duration-300">
        <img
          src={logoIcon}
          alt="logo"
          className="w-auto h-12 object-cover rounded-full"
        />
        <h3 className="text-base font-bold text-center mt-4 text-gray-800">
          Estamos cargando tus datos
        </h3>
        <p className="text-sm text-gray-500 text-center mt-2">
          Si no te cargan tus datos, por favor, intenta nuevamente. Si el
          problema persiste, por favor, contacta al soporte.
        </p>
      </div>
    </div>
  </>
);

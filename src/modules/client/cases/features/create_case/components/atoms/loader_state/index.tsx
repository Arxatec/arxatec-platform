import { CustomHeader } from "~/components/molecules";
import { useNavigate } from "react-router-dom";

export const LoaderState = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-6xl mx-auto w-full px-6 min-h-screen">
      <CustomHeader
        title={"Crear caso"}
        onBack={() => navigate(-1)}
      ></CustomHeader>
      <div className="grid  md:grid-cols-2 gap-2 w-full md:h-[350px] mt-2">
        <div className="animate-pulse bg-slate-200 w-full rounded-lg h-full px-4 py-6">
          <div className="w-1/4 h-6 bg-slate-300 rounded-lg animate-pulse"></div>
          <div className="w-full h-8 bg-slate-300 rounded-lg animate-pulse mt-2"></div>
          <div className="w-1/4 h-6 bg-slate-300 rounded-lg animate-pulse mt-4"></div>
          <div className="w-full h-8 bg-slate-300 rounded-lg animate-pulse mt-2"></div>
        </div>
        <div className="animate-pulse bg-slate-200 w-full rounded-lg md:h-full h-[350px] px-4 py-6">
          <div className="w-1/4 h-6 bg-slate-300 rounded-lg animate-pulse"></div>
          <div className="w-full h-[270px] bg-slate-300 rounded-lg animate-pulse mt-2"></div>
        </div>
      </div>
      <div className="animate-pulse bg-slate-200 w-full rounded-lg mt-4 h-[450px] px-4 py-6">
        <div className="w-1/4 h-6 bg-slate-300 rounded-lg animate-pulse"></div>
        <div className="w-full h-[370px] bg-slate-300 rounded-lg animate-pulse mt-2"></div>
      </div>
    </div>
  );
};

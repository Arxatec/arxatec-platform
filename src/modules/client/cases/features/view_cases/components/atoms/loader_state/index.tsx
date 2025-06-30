import { CustomHeader } from "~/components/molecules";

export const LoaderState = () => (
  <div className="max-w-6xl mx-auto w-full px-6 min-h-screen">
    <CustomHeader title="Mis casos" />
    <div className="bg-slate-200 rounded-md animate-pulse py-5 mt-2">
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className=" px-6 py-2 rounded-md animate-pulse">
          <div className="flex space-x-4 items-center">
            <div className="w-8/12 h-8 bg-slate-300 rounded animate-pulse"></div>
            <div className="w-2/12 h-8 bg-slate-300 rounded animate-pulse"></div>
            <div className="w-2/12 h-8 bg-slate-300 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

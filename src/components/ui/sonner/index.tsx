import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "group toast p-4 transition-all duration-300 border-none shadow-none flex gap-2 rounded-lg",
          title: "text-lg font-extrabold font-serif ",
          description: "text-sm opacity-70",
          error: "text-rose-600 bg-rose-900/20",
          success: "text-green-600 bg-green-900/20",
          warning: "text-yellow-600 bg-yellow-900/20",
          loading: "text-stone-700 bg-stone-100 gap-2 pl-8",
          loader: " mt-[18px] text-stone-700 pl-6",
          info: "text-blue-600 bg-blue-900/20",
          icon: "text-sm mt-[5px]  self-start flex h-full",
          actionButton: "bg-white text-black font-medium rounded-lg px-2 py-1",
          cancelButton: "bg-transparent text-white underline",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

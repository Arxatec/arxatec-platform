import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "group toast p-4 transition-all duration-300 border-none shadow-none flex gap-2 rounded",
          title: "text-lg font-extrabold font-serif ",
          description: "text-sm opacity-70",
          error: "text-rose-600 bg-rose-500/20 backdrop-blur-sm",
          success: "text-green-600 bg-green-500/20 backdrop-blur-sm",
          warning: "text-yellow-600 bg-yellow-500/20 backdrop-blur-sm",
          loading:
            "text-stone-100 bg-stone-50/5 gap-2 pl-10 text-base px-10 backdrop-blur-sm",
          loader: " text-stone-50 absolute! left-4! top-[22px]!",
          info: "text-sky-600 bg-sky-500/20 backdrop-blur-lg",
          icon: "text-sm mt-[5px] self-start flex h-full",
          actionButton: "bg-white text-black font-medium rounded px-2 py-1",
          cancelButton: "bg-transparent text-white underline",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

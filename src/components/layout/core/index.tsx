import { QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createQueryClient } from "@/utilities";
import { Toaster } from "@/components/ui/";

interface Props {
  children: React.ReactNode;
}

export default function Core({ children }: Props) {
  return (
    <QueryClientProvider client={createQueryClient()}>
      {children}
      <Toaster
        richColors
        closeButton
        duration={5000}
        dir="auto"
        expand
        invert
        visibleToasts={1}
      />
    </QueryClientProvider>
  );
}

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
      <Toaster visibleToasts={2} duration={5000} dir="auto" expand />
    </QueryClientProvider>
  );
}

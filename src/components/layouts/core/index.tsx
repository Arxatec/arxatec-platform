import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Bounce } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { createQueryClient } from "../../../utilities/query_utilities";
import initI18n from "../../../utilities/i18n_utilities";
import { GOOGLE_CLIENT_ID, MODE } from "~/config";

interface Props {
  children: React.ReactNode;
}

initI18n();
export default function Core({ children }: Props) {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={createQueryClient()}>
        {children}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
          toastClassName="custom-toast-root"
        />
        {MODE && <ReactQueryDevtools />}
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

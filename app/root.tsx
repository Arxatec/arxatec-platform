import { Outlet, Scripts, ScrollRestoration } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useRedirection } from "./hooks";
import { createQueryClient } from "./utilities/query_utilities";
import initI18n from "./utilities/i18n_utilities";
import { Bounce } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "~/styles/index.css";
import "react-circular-progressbar/dist/styles.css";

initI18n();
const GOOGLE_CLIENT_ID =
  "16579426384-hcu4blgpob121572ud505r6bsl8csi0l.apps.googleusercontent.com";

export default function App() {
  useRedirection();
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="favicon.svg" type="image/x-icon" />
      </head>
      <body>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <QueryClientProvider client={createQueryClient()}>
            <Outlet />
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
            <ScrollRestoration />
            <Scripts />
            {import.meta.env.DEV && <ReactQueryDevtools />}
          </QueryClientProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}

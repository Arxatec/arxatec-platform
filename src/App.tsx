import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { createQueryClient } from "./utilities/query_utilities";
import initI18n from "./utilities/i18n_utilities";
import { Bounce } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-circular-progressbar/dist/styles.css";
import Routes from "./routes";

initI18n();
const GOOGLE_CLIENT_ID =
  "16579426384-hcu4blgpob121572ud505r6bsl8csi0l.apps.googleusercontent.com";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <QueryClientProvider client={createQueryClient()}>
          <Routes />
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
          {import.meta.env.DEV && <ReactQueryDevtools />}
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;

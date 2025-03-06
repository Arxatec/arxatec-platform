import { Outlet } from "react-router";
import { Bounce, ToastContainer } from "react-toastify";

export default function Root() {
  return (
    <>
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
    </>
  );
}

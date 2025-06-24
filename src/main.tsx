import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Core } from "./components/layouts";
import router from "./routes";
import "./styles/index.css";
import "react-circular-progressbar/dist/styles.css";

createRoot(document.getElementById("root")!).render(
  <Core>
    <RouterProvider router={router} />
  </Core>,
);

import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Core } from "./components/layout";
import router from "./routes";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <Core>
    <RouterProvider router={router} />
  </Core>
);

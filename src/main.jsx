import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import main_router from "./routers.jsx";
import { StrictMode } from "react";
import "./index.css";

const all_routers = createBrowserRouter(main_router);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={all_routers} />
  </StrictMode>
);

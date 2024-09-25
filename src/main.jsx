import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import main_router from "./routers.jsx";
import "./index.css";

const all_routers = createBrowserRouter(main_router);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={all_routers} />
  </StrictMode>
);

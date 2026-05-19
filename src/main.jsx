import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { TeamProvider } from "./context/TeamContext";
import { router } from "./router";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TeamProvider>
      <RouterProvider router={router} />
    </TeamProvider>
  </StrictMode>
);

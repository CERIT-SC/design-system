import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LayoutShowcase from "./layout-showcase.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LayoutShowcase />
  </StrictMode>
);

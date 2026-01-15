import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AboutUs } from "./AboutUs";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <AboutUs />
  </StrictMode>,
);

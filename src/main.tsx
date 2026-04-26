import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import CursorTrail from "./components/CursorTrail";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    {/* <CursorTrail /> */}
  </StrictMode>,
);

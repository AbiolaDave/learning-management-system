import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { RoomProvider } from "./context/RoomCotext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
    <RoomProvider>
      <App />
    </RoomProvider>
    </BrowserRouter>
  </StrictMode>
);

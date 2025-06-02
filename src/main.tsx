import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/Auth/AuthContext";


const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </StrictMode>
  );
} else {
  console.error("Root element not found!");
}

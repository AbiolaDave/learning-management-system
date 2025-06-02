import AgoraChat from "agora-chat";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Dashboard from "./components/Landing Page/Home";
import Login from "./components/Login/Login";
import SidebarItems from "./components/SidebarItems";
import SignUp from "./components/SignUP/SignUp";
import CreateSchool from "./pages/CreateSchool";
import About from "./shared/About/About";

// ✅ Correct way to create an Agora Chat client
const chatClient = new AgoraChat.connection({
  appKey: import.meta.env.VITE_APP_KEY,
});

function App() {
  useEffect(() => {
    // Open Agora chat client connection
    chatClient
      .open({
        user: "JohnDoe",
        agoraToken: import.meta.env.VITE_AGORA_KEY,
      })
      .then(() => console.log("Agora Chat Client Connected"))
      .catch((error) => console.error("Failed to open chat client:", error));
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/registerschool" element={<CreateSchool />} />
        <Route path="/dashboard" element={<SidebarItems />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;

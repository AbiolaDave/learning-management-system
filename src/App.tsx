import AgoraChat from "agora-chat"; // ✅ Correct import
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AgoraChatRoom from "./agora/agoraChat/AgoraChatRoom";
import AgoraCreateChat from "./agora/agoraChat/AgoraCreateChat";
import AgoraUser from "./agora/agoraChat/AgoraCreateChat";
import PeerChat from "./agora/agoraChat/PeerChat";
import VideoCalling from "./agora/agoraVideoCall";
import "./App.css";
import SidebarItems from "./components/SidebarItems";
import CreateSchool from "./pages/CreateSchool";
import Dashboard from "./pages/Dashboard";

// ✅ Correct way to create an Agora Chat client
const chatClient = new AgoraChat.connection({
  appKey: import.meta.env.VITE_APP_KEY,
});


function App() {
  useEffect(() => {
    // Open Agora chat client connection
    chatClient
      .open({
        user: "JohnDoe", // Replace with a valid username
        agoraToken:
          import.meta.env.VITE_AGORA_KEY, // Replace with a valid token
      })
      .then(() => console.log("Agora Chat Client Connected"))
      .catch((error) => console.error("Failed to open chat client:", error));
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/registerschool" element={<CreateSchool />} />
        <Route path="/side" element={<SidebarItems />} />
        <Route path="/agora" element={<VideoCalling />} />
        <Route path="/peer" element={<PeerChat />} />
        <Route path="/chat" element={<AgoraChatRoom />} />
        <Route path="/user" element={<AgoraUser chatClient={chatClient} />} />
        <Route
          path="/create"
          element={<AgoraCreateChat chatClient={chatClient} />}
        />
        ;
      </Routes>
    </>
  );
}

export default App;

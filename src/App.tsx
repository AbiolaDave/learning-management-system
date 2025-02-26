import { Route, Routes } from "react-router-dom";
import "./App.css";
import SidebarItems from "./components/SidebarItems";
import CreateSchool from "./pages/CreateSchool";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/registerschool" element={<CreateSchool />} />
        <Route path="/side" element={<SidebarItems />} />
      </Routes>
    </>
  );
}

export default App;

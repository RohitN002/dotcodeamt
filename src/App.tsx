import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import SideNav from "./components/SideNav";
import Dashboard from "./pages/Dashboard";

function Layout() {
  const location = useLocation();

  // Only render Navbar and SideNav if the current route is not '/login'
  const showNav = location.pathname !== "/";

  return (
    <>
      {showNav && <Navbar />}
      <div className="flex">
        {showNav && <SideNav />}
        <div className={`${showNav ? "ml-52 mt- w-full bg-gray-100" : ""}`}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

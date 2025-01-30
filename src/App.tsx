import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import SideNav from "./components/SideNav";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound"; // Import the 404 page

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const authUser = localStorage.getItem("refreshToken");

  // Redirect unauthenticated users to login page
  useEffect(() => {
    if (!authUser && location.pathname !== "/") {
      navigate("/");
    }
  }, [authUser, location.pathname, navigate]);

  const showNav = authUser && location.pathname !== "/";

  return (
    <>
      {showNav && <Navbar />}
      <div className="flex">
        {showNav && <SideNav />}
        <div className={`${showNav ? "ml-56 w-full bg-gray-100" : ""}`}>
          <Routes>
            <Route path="/" element={<Login />} />
            {authUser && <Route path="/dashboard" element={<Dashboard />} />}
            <Route path="*" element={<NotFound />} />
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

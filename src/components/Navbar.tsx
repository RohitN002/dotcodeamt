import { useState, useRef, useEffect } from "react";
import notification from "../assets/notification.png";
import profile from "../assets/profile.png";
import money from "../assets/money.png";
import Rewardify from "../assets/Rewardify.png";

import { getProfile } from "../redux/reducers/dashboard.reducer";
import { useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const profiledetails = useSelector((state: any) => state?.dashboard?.profile);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleProfileClick = () => {
    setIsDropdownOpen(true);
    dispatch(getProfile());
    console.log("profile", JSON.stringify(profiledetails));
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("deviceInfo");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    enqueueSnackbar("Logout sucessful", { variant: "success" });
    navigate("/");
  };
  /*  */
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex justify-between items-center bg-white px-6 py-4 shadow-sm relative">
      {/* Logo */}
      <div>
        <img src={Rewardify} alt="Rewardify Logo" className="h-5" />
      </div>

      {/* Welcome Message */}
      <div className="text-gray-800 font-medium text-lg">
        Welcome, <span className="font-bold">Rajesh</span> 👋
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Coin Balance */}
        <div className="flex items-center bg-green-100 px-3 py-1 rounded-lg text-gray-800 font-semibold">
          XCoins: 300 <span className="ml-1">🪙</span>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-5 me-10 relative">
          <img
            src={money}
            alt="Money Icon"
            className="h-6 w-6 cursor-pointer"
          />
          <img
            src={notification}
            alt="Notification Icon"
            className="h-6 w-6 cursor-pointer"
          />

          {/* Profile Icon */}
          <div className="relative">
            <img
              src={profile}
              alt="Profile Icon"
              className="h-6 w-6 cursor-pointer"
              onClick={handleProfileClick}
              //   onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />

            {/* Dropdown */}
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-48 bg-white shadow-sm  rounded-lg p-4 text-sm border-[#444c2b]  z-50"
              >
                <p className="font-semibold text-gray-600">
                  {profiledetails?.name}
                </p>
                <p className="text-gray-600">{profiledetails?.email}</p>
                <p className="text-gray-600">{profiledetails?.contactNo}</p>
                <hr className="my-2" />
                <button
                  className="w-full text-left font-bold font-2xl text-[#668D12] hover:text-[#444e30]"
                  onClick={handleLogoutClick}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

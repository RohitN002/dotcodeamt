import { useState, useRef, useEffect } from "react";
import notification from "../assets/notification.png";
import profile from "../assets/profile.png";
import money from "../assets/money.png";
import Rewardify from "../assets/Rewardify.png";

// Define User type
interface User {
  name: string;
  email: string;
  contactNo: string;
}

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const user: User = {
    name: "John Mat",
    email: "john@dotcod.in",
    contactNo: "7777777777",
  };

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
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />

            {/* Dropdown */}
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4 text-sm border z-50"
              >
                <p className="font-semibold text-gray-800">{user.name}</p>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-600">{user.contactNo}</p>
                <hr className="my-2" />
                <button
                  className="w-full text-left text-red-500 hover:text-red-700"
                  onClick={() => alert("Logging out...")}
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

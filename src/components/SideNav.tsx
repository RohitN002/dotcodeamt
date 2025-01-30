import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SideNav = () => {
  const store = useSelector((state: any) => state?.dashboard?.store);
  return (
    <div className="h-[calc(100vh-4rem)] w-52 shadow-md text-white  fixed top-16 flex flex-col">
      <nav className="flex-grow">
        {[store]?.map((store) => (
          <div className=" p-4   mx-auto mt-8 mb-4 w-48" key={store._id}>
            {/* Image Section */}
            <img
              src={store?.images[0]}
              alt="Store Image"
              className="w-24 h-24 object-cover mr-4"
            />

            {/* Store Details Section */}
            <div className="flex flex-col justify-between">
              {/* Store Name */}
              <h2 className="text-xl text-black font-semibold">{store.name}</h2>

              {/* Store ID */}
              <p className="text-sm text-gray-500">Shop Id: {store.storeId}</p>
            </div>
          </div>
        ))}
        <ul className="space-y-2 mx-auto">
          <li className="bg-[#D4E68A]  border-r-4 border-[#668D12]">
            <Link to="/" className="block px-4 py-2 text-black">
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/settings" className="block px-4 py-2  text-gray-400">
              Orders
            </Link>
          </li>
          <li>
            <Link to="/logout" className="block px-4 py-2 text-gray-400">
              My Products
            </Link>
          </li>
          <li>
            <Link to="/logout" className="block px-4 py-2 text-gray-400">
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;

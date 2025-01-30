import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import dashboard from "../assets/dashboard.png";
import myproducts from "../assets/myproducts.png";
import orders from "../assets/orders.png";
import profilepng from "../assets/profilelight.png";
const SideNav = () => {
  const store = useSelector((state: any) => state?.dashboard?.store);
  return (
    <div className="h-[calc(100vh-4rem)] w-56 shadow-md text-white  fixed top-16 flex flex-col">
      <nav className="flex-grow">
        {[store]?.map((store) => (
          <div className=" p-4   mx-auto mt-8 mb-4 w-48" key={store._id}>
            {/* Image Section */}
            <img
              src={store?.images}
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
          <li className="bg-[#F2F8DF]  border-r-4 border-[#668D12]">
            <Link
              to="/dashboard"
              className="flex px-4 py-2 font-bold text-black "
            >
              <img src={dashboard} alt="dashboard" className="me-2" />
              Dashboard
            </Link>
          </li>

          <li className="flex px-4 py-2   text-gray-400">
            <img src={orders} alt="orders" className="me-2" /> Orders
          </li>
          <li className="flex px-4 py-2  text-gray-400">
            {" "}
            <img src={myproducts} alt="profucts" className="me-2" /> My Products
          </li>
          <li className="flex px-4 py-2  text-gray-400">
            <img src={profilepng} alt="profile" className="me-2" /> Profile
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;

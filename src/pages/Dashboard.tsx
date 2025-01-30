import makepayment from "../assets/makepayment.png";
import settlement from "../assets/settlements.png";
import transactionhistory from "../assets/transactionhistory.png";
import giftcard from "../assets/giftcard.png";

const Dashboard = () => {
  const actions = [
    { name: "Make Payment", icon: makepayment },
    { name: "Settlements", icon: settlement },
    { name: "Transaction History", icon: transactionhistory },
    { name: "Gift Cards", icon: giftcard },
  ];
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex gap-6">
      {/* Left Section */}
      <div className="w-1/2  ">
        <div className="bg-white p-4 mb-10">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-3 mb-6">
            {actions.map((action, index) => (
              <div key={index} className="flex flex-col items-center">
                {/* Container for the image with background */}
                <div className="p-4 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                  <img
                    src={action.icon}
                    alt={action.name}
                    className="w-8 h-8"
                  />
                </div>
                {/* Text below the image */}
                <p className="text-sm font-medium">{action.name}</p>
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <div className="space-y-3">
          {[500, 800, 100, 500].map((amount, index) => (
            <div
              key={index}
              className="p-3 bg-gray-50 rounded-lg flex justify-between items-center shadow-sm"
            >
              <span className="text-gray-700">
                +919856598562 Send a Payment
              </span>
              <span className="text-green-600 font-semibold">
                +₹{amount}.00
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-white p-4 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">My Orders</h2>
        <div className="space-y-4">
          {[1, 2].map((order) => (
            <div key={order} className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <p className="text-green-600 font-semibold">Order ID: 12345</p>
              <p className="text-sm text-gray-600">Date: Apr 10, 2024</p>
              <p className="font-medium">Order for: Rajesh Kannan</p>
              <p className="text-sm text-gray-500">📍 R S Puram, Coimbatore</p>
              <div className="mt-2 text-gray-700">
                <p>1 x Ooty Apple - ₹100.00</p>
                <p>5 x White Egg - ₹50.00</p>
              </div>
              <p className="mt-2 font-bold">Total: ₹150.00</p>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 bg-red-100 text-red-600 py-2 rounded-lg font-semibold hover:bg-red-200">
                  Reject Order
                </button>
                <button className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700">
                  Confirm Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

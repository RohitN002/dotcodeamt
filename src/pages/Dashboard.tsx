import makepayment from "../assets/makepayment.png";
import settlement from "../assets/settlements.png";
import transactionhistory from "../assets/transactionhistory.png";
import giftcard from "../assets/giftcard.png";
import person from "../assets/person.png";
const Dashboard = () => {
  const transactions = [
    {
      name: "+91234563535",
      action: "sent a payment",
      date: "April 11",
      method: "paid via qr",
      amount: "+500",
    },
    {
      name: "+91234563536",
      action: "sent a payment",
      date: "April 12",
      method: "paid via card",
      amount: "+300",
    },
    {
      name: "+91234563537",
      action: "sent a payment",
      date: "April 13",
      method: "paid via bank transfer",
      amount: "+700",
    },
    {
      name: "+91234563538",
      action: "sent a payment",
      date: "April 14",
      method: "paid via cash",
      amount: "+400",
    },
  ];
  const actions = [
    { name: "Make Payment", icon: makepayment },
    { name: "Settlements", icon: settlement },
    { name: "Transaction History", icon: transactionhistory },
    { name: "Gift Cards", icon: giftcard },
  ];
  return (
    <div className="p-6 bg-gray-100 min-h-screen mx-auto flex gap-6">
      {/* Left Section */}
      <div className="w-1/2  ">
        <div className="bg-white p-4 mb-10">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-1 mb-6">
            {actions.map((action, index) => (
              <div key={index} className="flex flex-col items-center">
                {/* Container for the image with background */}
                <div className="p-4 bg-[#F2F8DF] rounded-lg flex items-center justify-center mb-2">
                  <img
                    src={action.icon}
                    alt={action.name}
                    className="w-5 h-5"
                  />
                </div>
                {/* Text below the image */}
                <p className="text-sm font-medium">{action.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-6">Recent Transactions</h2>
          <div className="space-y-4">
            <div className="flex text-gray-600">
              <span className="mr-5 font-bold">All transactions</span>
              <span className="text-gray-400"> settlements</span>
            </div>
            {transactions.map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg "
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={person}
                    alt="Person"
                    className="w-7 h-7 bg-[#F2F8DF]  rounded-full"
                  />
                  <div>
                    <p className="font-semibold">
                      {transaction.name} {transaction.action}
                    </p>
                    <p className="text-sm text-gray-500">
                      Paid on {transaction.date}
                    </p>
                    <p className="text-sm text-gray-500">
                      {transaction.method}
                    </p>
                  </div>
                </div>
                <div className="text-green-500 font-semibold">
                  {transaction.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/3 bg-white p-4 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">My Orders</h2>
        <div className="flex space-x-4 mb-5">
          <span className="font-bold">confirmation(6)</span>
          <span className="text-gray-400">preprocessing</span>
          <span className="text-gray-400">packed orders</span>
        </div>
        <div className="space-y-4">
          {[1, 2].map((order) => (
            <div key={order} className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <p className="text-[#ACC43F] font-semibold">Order ID: 12345</p>
              <p className="text-sm text-gray-600">Date: Apr 10, 2024</p>
              <p className="font-medium">Order for: Rajesh Kannan</p>
              <p className="text-sm text-gray-500">📍 R S Puram, Coimbatore</p>
              <div className="mt-2 text-gray-700">
                <p>1 x Ooty Apple - ₹100.00</p>
                <p>5 x White Egg - ₹50.00</p>
              </div>
              <hr className="my-4 border-t-2 border-gray-300" />{" "}
              <p className="mt-2 font-bold">Total: ₹150.00</p>
              <div className="flex justify-around mt-3">
                <button className="border-2 border-[#ACC43F] rounded-lg p-2 my-2 text-[#ACC43F]">
                  Reject Order
                </button>
                <button className="rounded-lg p-2 text-md my-2 text-white bg-gradient-to-r from-[#668D12] to-[#ACC43F]">
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

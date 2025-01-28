import React from "react";
import loginbg from "../assets/loginbg.png";

const Login = () => {
  const bgStyle = {
    backgroundImage: `url(${loginbg})`,
    backgroundSize: "cover", // Makes the image cover the entire div
    backgroundRepeat: "no-repeat", // Ensures no repetition
    backgroundPosition: "center", // Centers the image
    height: "100vh", // Full viewport height
    width: "100vw", // Full viewport width
    display: "flex", // Enables flexbox
    justifyContent: "center", // Horizontally centers content
    alignItems: "center", // Vertically centers content
  };

  return (
    <div style={bgStyle}>
      <div className="bg-white  rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

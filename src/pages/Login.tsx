import { ReactNode, useRef, useState, ChangeEvent, KeyboardEvent } from "react";
import loginbg from "../assets/loginbg.png";
import logo from "../assets/logo.png";
import useLoginFlow from "../hooks/useLogin";
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
  const [login, setLogin] = useState<boolean>(true);
  const [getStarted, setGetStarted] = useState<boolean>(false);
  const [getStartedVerify, setGetStartedVerify] = useState<boolean>(false);
  const [noStore, setNoStore] = useState<boolean>(false);
  const [selectStore, setSelectStore] = useState<boolean>(false);
  const handleButtonClick = () => {
    if (login) {
      setLogin(false), setGetStarted(true);
    }
  };
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const handleChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      // Allow only single digits
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus on the next input if a digit is entered
      if (value && index < otp.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && otp[index] === "") {
      // Move focus to the previous input on backspace
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: any) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, otp.length);

    if (/^\d+$/.test(pasteData)) {
      const newOtp = pasteData
        .split("")
        .concat(new Array(otp.length - pasteData.length).fill(""));
      setOtp(newOtp);

      // Focus the last non-empty box
      inputsRef.current[pasteData.length - 1]?.focus();
    }
  };
  return (
    <div style={bgStyle}>
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full flex flex-col justify-center items-center">
        <div className=" text-center p-5">
          {(login || getStarted || getStartedVerify) && (
            <img src={logo} alt="logo" className="mx-auto h-15 w-15 mt-4" />
          )}

          <p className="text-black text-3xl p-7 font-bold">
            {login
              ? "Grow your Business Exponentially!"
              : getStarted
              ? "Get started with REWARDIFY"
              : getStartedVerify
              ? "Verify your details"
              : ""}
          </p>
          <p className="text-gray-400  text-sm">
            {login
              ? " Pay less on each transaction you make with our App."
              : getStarted
              ? "Enter your mobile number or Shop ID to get started"
              : getStartedVerify
              ? "Enter OTP number below"
              : ""}
          </p>
          {login && (
            <>
              <div className="flex justify-center space-x-2 my-4">
                <div className="w-4 h-4 bg-black rounded-full"></div>
                <div className="w-4 h-4 bg-white rounded-full border border-gray-300"></div>
                <div className="w-4 h-4 bg-white rounded-full border border-gray-300"></div>
              </div>{" "}
            </>
          )}
          {(login || noStore || selectStore) && (
            <>
              <button
                className="rounded-lg p-2 text-xl my-2 text-white w-full bg-gradient-to-r from-[#668D12] to-[#ACC43F]"
                // optional if you want to set the text color as well
                onClick={handleButtonClick}
              >
                Login
              </button>
            </>
          )}
          {getStarted && (
            <input
              type="text"
              placeholder="Enter shop ID / Mobile Number"
              className="text-gray-400 rounded-md w-full p-3 border-2 border-gray-300 mt-5 "
            />
          )}
          {getStartedVerify && (
            <div className="flex gap-2 justify-center items-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  ref={(el) => (inputsRef.current[index] = el)}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(e.target.value, index)
                  }
                  onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                    handleKeyDown(e, index)
                  }
                  onPaste={(e: any) => handlePaste(e)}
                  className="w-12 h-12 text-center text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
          )}
          <button
            className={`p-2 w-full my-1 text-xl  rounded-lg  ${
              getStarted
                ? "bg-gray-200 font-bold text-gray-500 border-gray-300 mt-12"
                : noStore || login
                ? "border-2"
                : ""
            }`}
            style={{
              borderColor: login || noStore ? "#ACC43F" : "",
            }}
          >
            {login
              ? "Contact Us"
              : getStarted
              ? "Send OTP"
              : getStartedVerify
              ? "Verify and Continue"
              : "Login With Diffrent Account"}
          </button>

          {login || getStarted ? (
            <>
              <p className="text-sm m-3 p-3">
                By clicking, you agree to our{" "}
                <span className="font-bold">Terms & Conditions </span> and{" "}
                <span className="font-bold">Privacy Policy.</span>
              </p>
            </>
          ) : getStartedVerify ? (
            <>
              <h3>helo</h3>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

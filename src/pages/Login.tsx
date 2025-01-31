import { useRef, useState, ChangeEvent, KeyboardEvent, useEffect } from "react";
import loginbg from "../assets/loginbg.png";
import logo from "../assets/logo.png";

import {
  generateOtp,
  refreshToken,
  verifyOtp,
} from "../redux/reducers/auth.reducer";
import { useAppDispatch } from "../redux/store";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { getStore } from "../redux/reducers/dashboard.reducer";
import nostorepng from "../assets/nostore.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const bgStyle = {
    backgroundImage: `url(${loginbg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const [inputVal, setInputVal] = useState<{
    countryCode: string;
    mobNum: string;
    type: number;
    otp: number | null;
  }>({
    countryCode: "",
    mobNum: "",
    type: 1,
    otp: null,
  });
  const store = useSelector((state: any) => state?.dashboard?.store);

  const [timer, setTimer] = useState(60); //
  const [canResend, setCanResend] = useState(false);
  const [login, setLogin] = useState<boolean>(true);
  const [getStarted, setGetStarted] = useState<boolean>(false);
  const [getStartedVerify, setGetStartedVerify] = useState<boolean>(false);
  const [noStore, setNoStore] = useState<boolean>(false);
  const [selectStore, setSelectStore] = useState<boolean>(false);

  const OTP_LENGTH = 4; // Number of OTP boxes
  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(""));
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

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResendOtp = () => {
    setTimer(60);
    setCanResend(false);

    enqueueSnackbar("OTP sent", { variant: "success" });
    handleVerifyClick();
  };
  const handleCountryCodeChange = (e: any) => {
    setInputVal((prevState) => ({
      ...prevState,
      countryCode: e.target.value,
    }));
  };

  const handleMobileNumberChange = (e: any) => {
    setInputVal((prevState) => ({
      ...prevState,
      mobNum: e.target.value,
    }));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: any) => {
    /*  */
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, otp.length);

    if (/^\d+$/.test(pasteData)) {
      const newOtp = pasteData
        .split("")
        .concat(new Array(otp.length - pasteData.length).fill(""));
      setOtp(newOtp);

      inputsRef.current[pasteData.length - 1]?.focus();
    }
  };

  const handleVerifyClick = () => {
    console.log(
      "login:",
      login,
      "get started:",
      getStarted,

      "get started verify",
      getStartedVerify,
      "selectstore",
      selectStore,
      "nostore" /*  */,
      noStore
    );
    if (login) {
      setLogin(false), setGetStarted(true);
    }
    if (getStarted) {
      const res: any = dispatch(
        generateOtp({
          dialCode: Number(inputVal.countryCode),
          contactNo: inputVal.mobNum,
        })
      ).then((res: any) => {
        console.log("res", res);
        if (res.type == "login/getOTP/rejected") {
          console.log("rejected called");
          console.log("res", res.payload);
          let errormessge = null;
          if (res.payload?.message) {
            errormessge = res.payload.message;
          } else if (res?.payload) {
            errormessge = res.payload;
          } else {
            errormessge = "An error occured please try again";
          }
          enqueueSnackbar(errormessge, {
            variant: "error",
          });
        } else if (res.type == "login/getOTP/fulfilled") {
          console.log("sucess called");
          console.log("res", res.payload.message); /*  */
          enqueueSnackbar(res.payload.message, { variant: "success" });
          setGetStarted(false);
          setGetStartedVerify(true);
        }
      });
      console.log(res);
    }

    if (getStartedVerify) {
      console.log("getstaretedverify");
      const otpNumber = Number(otp.join(""));
      setInputVal((prev) => ({
        ...prev,
        otp: otpNumber,
      }));
      const res = dispatch(
        verifyOtp({
          dialCode: inputVal.countryCode,
          contactNo: inputVal.mobNum,
          type: inputVal.type,
          otp: otpNumber,
        })
      ).then((res: any) => {
        // console.log("otp res", res.payload);
        // console.log("token", res.payload.token);
        // console.log("refresh token", res.payload.refreshToken);
        localStorage.setItem("token", res?.payload?.token);
        localStorage.setItem("refreshToken", res?.payload?.refreshToken);
        dispatch(refreshToken()).then((res: any) => {
          // console.log("refreshtoken", res.payload.token);
          localStorage.setItem("refreshToken", res?.payload?.token);
          dispatch(getStore()).then((res: any) => {
            console.log("storeDetails", res.payload);

            if (res.type == "dashboard/getStore/fulfilled") {
              if (res && Object.keys(res).length > 0) {
                setGetStartedVerify(false);
                setSelectStore(true);
                enqueueSnackbar("Verification success", { variant: "success" });
              } else {
                setGetStartedVerify(false);
                setNoStore(true);
                enqueueSnackbar("No store found in your mobile number", {
                  variant: "error",
                });
              }
            } else if (res.type == "dashboard/getStore/rejected") {
              let errormessge = null;
              if (res.payload?.message) {
                errormessge = res.payload.message;
              } else if (res?.payload) {
                errormessge = res.payload;
              } else {
                errormessge = "An error occured please try again ";
              }
              enqueueSnackbar(errormessge, {
                variant: "error",
              });
            }
          });
        });
      });
      console.log(res);
    }
    if (selectStore) {
      console.log("store called");
      navigate("/dashboard");
    }
  };

  return (
    <div style={bgStyle}>
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full flex flex-col justify-center items-center">
        <div className=" text-center p-5">
          {(login || getStarted || getStartedVerify || noStore) && (
            <img
              src={noStore ? `${nostorepng}` : `${logo}`}
              alt="logo"
              className="mx-auto h-15 w-15 mt-4"
            />
          )}

          <p className="text-black text-3xl px-7 font-bold">
            {login
              ? "Grow your Business Exponentially!"
              : getStarted
              ? "Get started with REWARDIFY"
              : getStartedVerify
              ? "Verify your details"
              : noStore
              ? "No stores are linked to this account"
              : store
              ? "Select Your Store"
              : ""}
          </p>
          <p className="text-gray-400 my-4 px-20 text-sm">
            {login
              ? " Pay less on each transaction you make with our App."
              : getStarted
              ? "Enter your mobile number or Shop ID to get started"
              : getStartedVerify
              ? "Enter OTP number below"
              : noStore
              ? "Enter your account details correctly or register your store with us"
              : store
              ? "Your Number is connect with our store"
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
          {selectStore &&
            [store]?.map((store) => (
              <div
                className="flex p-4 border rounded-lg shadow-sm mx-auto mb-4 w-64"
                key={store._id}
              >
                {/* Image Section */}
                {store?.images?.[0] ? (
                  <img
                    src={store?.images}
                    alt="Store Image"
                    className="w-24 h-24 object-cover mr-4"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-300 mr-4" /> // Placeholder if image is unavailable
                )}

                {/* Store Details Section */}
                <div className="flex flex-col justify-between">
                  {/* Store Name */}
                  <h2 className="text-xl font-semibold">{store?.name}</h2>

                  {/* Location */}
                  <p className="text-sm text-gray-600">{store.location}</p>

                  {/* Store ID */}
                  <p className="text-sm text-gray-500">
                    Store ID: {store?.storeId}
                  </p>
                </div>
              </div>
            ))}

          {(login || noStore || selectStore) && (
            <>
              <button
                className="rounded-lg p-2 text-xl my-2 text-white w-full bg-gradient-to-r from-[#668D12] to-[#ACC43F]"
                // optional if you want to set the text color as well
                onClick={handleVerifyClick}
              >
                {login
                  ? "Login"
                  : noStore
                  ? "Register your Store with US"
                  : store
                  ? "Continue"
                  : ""}
              </button>
            </>
          )}
          {getStarted && (
            <div className="flex items-center">
              {/* Country Code Dropdown */}
              <select
                value={inputVal.countryCode}
                onChange={handleCountryCodeChange}
                className="p-3 border-2 border-gray-300 rounded-l-md bg-white text-gray-500 me-2"
              >
                <option value="" disabled>
                  country code
                </option>
                <option value="1">+1 (US)</option>
                <option value="44">+44 (UK)</option>
                <option value="91">+91 (India)</option>
                <option value="61">+61 (Australia)</option>
                <option value="81">+81 (Japan)</option>
              </select>

              {/* Mobile Number Input */}
              <input
                type="text"
                value={inputVal.mobNum}
                onChange={handleMobileNumberChange}
                placeholder="Enter Mobile Number"
                className="text-gray-400 rounded-r-md w-full p-3 border-2 border-gray-300"
              />
            </div>
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
          {(login || getStarted || getStartedVerify || noStore) && (
            <button
              className={`p-2 w-full my-1 text-xl  rounded-lg  ${
                getStarted || getStartedVerify
                  ? "bg-gray-200 font-bold w-full text-gray-500 border-gray-300 mt-12"
                  : noStore || login
                  ? "border-2"
                  : ""
              }`}
              onClick={handleVerifyClick}
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
          )}

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
              <p className="mt-2 text-sm text-gray-600">
                Didn't receive OTP?{" "}
                {canResend ? (
                  <span
                    onClick={handleResendOtp}
                    className="text-blue-500 cursor-pointer font-semibold"
                  >
                    Resend
                  </span>
                ) : (
                  `Resend in ${timer}s`
                )}
              </p>
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

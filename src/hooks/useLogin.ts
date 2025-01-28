import { useState, useEffect } from "react";

// Custom hook for login/otp handling
function useLoginFlow() {
  const [inputValue, setInputValue] = useState("");
  const [otp, setOtp] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [storedValues, setStoredValues] = useState({
    email: "",
    storeName: "",
  });

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;
    if (emailRegex.test(inputValue) || mobileRegex.test(inputValue)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [inputValue]);

  const handleInputChange = (e: any) => setInputValue(e.target.value);
  const handleOtpChange = (e: any) => setOtp(e.target.value);
  const handleSubmit = () => setOtpSent(true);

  const handleVerifyAndContinue = () => {
    // Simulate checking registration
    const registeredUsers = [
      { email: "user@example.com", storeName: "ABC Store" },
      { phone: "1234567890", storeName: "XYZ Store" },
    ];
    const user = registeredUsers.find(
      (user) => user.email === inputValue || user.phone === inputValue
    );
    if (user) {
      setIsRegistered(true);
      setStoredValues({ email: user.email || "", storeName: user.storeName });
    }
  };

  return {
    inputValue,
    otp,
    isValid,
    isOtpValid,
    otpSent,
    isRegistered,
    storedValues,
    handleInputChange,
    handleOtpChange,
    handleSubmit,
    handleVerifyAndContinue,
  };
}

export default useLoginFlow;

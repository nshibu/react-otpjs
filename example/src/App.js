import { useState } from "react";
import { OTPInput } from "react-otpjs";
import "./App.css";

export default function App() {
  const [value, setValue] = useState("");

  const handleChange = (otp) => {
    setValue(otp);
  };

  const filedSeperator = <span className="seperator">-</span>;
 

  const inputFocusStyle = {
    outline: "2px solid yellow",
    border: "none"
  };
  return (
    <div className="App">
      <h1>react-otpjs demo v0.0.2</h1>
      <OTPInput
        numOfInputs={6}
        isTypeNumber={false}
        inputFocusStyle={inputFocusStyle}
        fieldSeperator={filedSeperator}
        onChange={(otp) => handleChange(otp)}
      />
      <h2> The OTP value is - {value}</h2>
    </div>
  );
}

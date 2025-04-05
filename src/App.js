import { useEffect, useRef, useState } from "react";
import "./styles.css";
//OTP input -only number
const OPT_COUNT = 4;
export default function App() {
  const [inputArr, setInputArr] = useState(new Array(OPT_COUNT).fill(""));
  const refArr = useRef([]);

  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);
  const handleOnChange = (value, index) => {
    if (isNaN(value)) return;
    console.log(value);

    const newValue = value.trim();
    const newArr = [...inputArr];
    newArr[index] = newValue.slice(-1);
    setInputArr(newArr);
    newValue && refArr.current[index + 1]?.focus();
  };
  const handleOnKeyDown = (e, index) => {
    console.log(e);
    if (e.key === "Backspace" && !inputArr[index]) {
      refArr.current[index - 1]?.focus();
    }
  };
  return (
    <div className="App">
      <h1>Validate OTP</h1>
      <div className="otp-container">
        {inputArr.map((input, index) => {
          return (
            <input
              className="otp-input"
              key={index}
              type="text"
              value={inputArr[index]}
              ref={(input) => (refArr.current[index] = input)}
              onChange={(e) => handleOnChange(e.target.value, index)}
              onKeyDown={(e) => handleOnKeyDown(e, index)}
            />
          );
        })}
      </div>
      <button className="button">Verify</button>
    </div>
  );
}

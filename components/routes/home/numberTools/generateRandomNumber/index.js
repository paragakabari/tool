import react, { useEffect, useRef, useState } from "react";

function generate(n) {
  var add = 1,
    max = 12 - add;

  if (n > max) {
    return generate(max) + generate(n - max);
  }

  max = Math.pow(10, n + add);
  var min = max / 10; // Math.pow(10, n) basically
  var number = Math.floor(Math.random() * (max - min + 1)) + min;

  return ("" + number).substring(add);
}

const checkZeroRegex = /^(?!0+$)[a-zA-Z0-9]+$/;

export default function GenerateRandomNumber(Data) {
  const [copy, setCopy] = useState(false);
  const [count, setCount] = useState();
  const [digit, setDigit] = useState();
  const [answer, setAnswer] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    return () => {
      setCount();
      setDigit();
      setAnswer();
      setCopy(false);
    };
  }, [Data]);

  const handleOnClick = () => {
    if (validateForm()) {
      let x = Math.random() * digit;
      let y = Math.round(x);
      setCopy(false);
      let text = "";

      let ans = [];

      for (let y = 0; y < count; y++) {
        ans.push(generate(Number(digit)));
      }
      setAnswer(ans.join(" "));
    }
  };

  const handleCopy = (user) => {
    navigator.clipboard.writeText(user);
    if (navigator.clipboard.writeText(user)) {
      setCopy(true);
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let err = {};

    if (!digit) {
      err.digitsnumber = "* Please enter number";
      formIsValid = false;
    }
    if (!count) {
      err.countNumber = "* Please enter number";
      formIsValid = false;
    }

    setErrors(err);
    return formIsValid;
  };

  return (
    <>
      <div className="commom-box-new aritmetic-top-alignment">
        <div className="aritmetic-two-col-grid">
          <div className="aritmetic-two-col-grid-items">
            <div className="input-new">
              <label>How many digits in number</label>
              <input
                placeholder="Enter a number"
                type="number"
                name="digitsnumber"
                onChange={(e) => {
                  setDigit(e.target.value);
                  setCopy(false);
                  setAnswer("");
                  setErrors({ ...errors, [e.target.name]: "" });
                }}
                className={errors?.digitsnumber && "error-input"}
              />
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors?.digitsnumber}
              </span>
            </div>
          </div>
          <div className="aritmetic-two-col-grid-items">
            <div className="input-new">
              <label>Total count of random number (100)</label>
              <input
                placeholder="Enter a number"
                type="number"
                name="countNumber"
                onChange={(e) => {
                  setCount(e.target.value);
                  setCopy(false);
                  setErrors({ ...errors, [e.target.name]: "" });
                  setAnswer("");
                }}
                className={errors?.countNumber && "error-input"}
              />
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors?.countNumber}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="button arithmetic-button-center-alignment-new-one">
        <button onClick={handleOnClick}>Generate Now</button>
      </div>
      {answer &&
      <div className="commom-box-new">
       
        <div className="copy-textarea-icon-alignment">
          <i
            className="fa-solid fa-copy "
            title="Copy"
            onClick={() => handleCopy(answer)}
          ></i>

          {copy && (
            <div>
              {" "}
              <a>Copied</a>
            </div>
          )}
        </div>
        <div className="input-new">
          <textarea placeholder="Answer" value={answer} disabled style={{color:"black"}}></textarea>
        </div>
      </div>}
    </>
  );
}

import React, { useState } from "react";
import { handleCopy } from "../../../../common/commonFunction";

export default function PasswordGenerator() {
  const [length, setLength] = useState("");
  const [password, setPassword] = useState();
  const [copy, setCopy] = useState(false);
  const [errors, setErrors] = useState({});

  const [uppercaseCheckBox, setUppercaseCheckBox] = useState(true);
  const [lowercaseCheckBox, setLowercaseCheckBox] = useState(true);
  const [numberCheckBox, setNumberCheckBox] = useState(true);
  const [specialCheckBox, setSpecialCheckBox] = useState(true);

  const handleClick = () => {
    if (validate()) {
      if (lowercaseCheckBox || uppercaseCheckBox || numberCheckBox || specialCheckBox) {
        let len = length;
        len = Math.min(Math.max(parseInt(len), 0), len); //limits the length to 20
        let password = generatePassword(len);
        setPassword(password);
        setCopy(false);
      }
    }
  };
  const validate = () => {
    let isFormValid = true;
    let errors = {};
    if (length<1) {
      isFormValid = false;
      errors.psswordlength = "* Please enter password length";
    }
    setErrors(errors);
    return isFormValid;
  };

  function generatePassword(len) {
    let result = "";
    for (let i = 0; i < len; i++) {
      let curr;
      // get a 0 1 or 2 then preform switch case
      // switch 0 uppercase, 1 lowercase, 2 numbers, 3 special values (!@#$%^&*)
      let caseNum = getRandomInt(0, 4);
      switch (caseNum) {
        case 0:
          if (uppercaseCheckBox === true) {
            curr = getRandomInt(65, 90);
            result += String.fromCharCode(curr);
            break;
          }
        case 1:
          if (lowercaseCheckBox === true) {
            curr = getRandomInt(97, 122);
            result += String.fromCharCode(curr);
            break;
          }
        case 2:
          if (numberCheckBox === true) {
            curr = getRandomInt(48, 57);
            result += String.fromCharCode(curr);
            break;
          }
        case 3:
          if (specialCheckBox === true) {
            curr = getRandomInt(33, 38);
            result += String.fromCharCode(curr);
            break;
          }
        default:
          i--; // This makes sure that if no character is added then it will not count a letter
      }
    }
    return result;
  }
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  return (
    <>
      <div className="container">
        <div className="jumbotron mt-4 text-center ">
          <div className="main-globally-counter-box">
            <div className="new-all-checkbox-all-content-alignment-for-page">
              <div className="new-checkbox">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={lowercaseCheckBox}
                  onChange={(e) => setLowercaseCheckBox(e.target.checked)}
                />
                <label className="form-check-label">Lowercase</label>
              </div>
              <div className="new-checkbox">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={uppercaseCheckBox}
                  onChange={(e) => setUppercaseCheckBox(e.target.checked)}
                />
                <label className="form-check-label">Uppercase</label>
              </div>
              <div className="new-checkbox">
                <input type="checkbox" className="form-check-input" onChange={(e) => setNumberCheckBox(e.target.checked)} checked={numberCheckBox} />
                <label className="form-check-label">Numbers</label>
              </div>
              <div className="new-checkbox">
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={(e) => setSpecialCheckBox(e.target.checked)}
                  checked={specialCheckBox}
                />
                <label className="form-check-label">Special (!@#$...)</label>
              </div>
            </div>
            <div className="input-new">
              <label className="form-number-label">Password Length</label>
              <div className="input-hidden">
                <input
                  type="number"
                  name="psswordlength"
                  value={length}
                  onChange={(e) => {
                    setLength(e.target.value);
                    setPassword("");
                    setErrors({ ...errors, psswordlength: "" });
                  }}
                  className={errors?.psswordlength && "error-input"}
                />
                <span style={{ color: "red", fontSize: "15px" }}>{errors?.psswordlength}</span>
              </div>
            </div>
          </div>
          <div className="button generate-button-center-alignment">
            <button onClick={() => handleClick()}>Generate Password</button>
          </div>
          {password?.length > 0 &&
          <div className="main-globally-counter-box">
            <div className="genrate-password-new-all-algin">
              <p>{password}</p>
           
              <div className="new-copy-icon-text-style-alignment">
                <i className="fa-solid fa-copy" title="Copy" onClick={() => handleCopy(password, setCopy)}></i>
                {copy  && <a>Copied</a>}
              </div>
            </div>
          </div>}
        </div>
      </div>
    </>
  );
}

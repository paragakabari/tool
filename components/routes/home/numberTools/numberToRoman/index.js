import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function NumberToRoman() {
  const { stringify } = require("roman-numerals-convert");
  const [number, setNumber] = useState();
  const [value, setvalue] = useState();
  const [roman, setRoman] = useState("");
  const [err, setErr] = useState(false);
  const [copy, setCopy] = useState("");
  const [errors, setErrors] = useState("");

  const handleOnChange = (e) => {
    setErr(false);
    setCopy(false);
    setvalue(e.target.value);
    setRoman("");
    if (!e.target.value) return;
    try {
      let value = parseInt(e.target.value);
      setNumber(stringify(value));
    } catch (error) {
      setErr(error);
    }
    if (err) {
      toast.error(err.message);
    }
    setErrors("");
  };
  const handleOnSubmit = () => {
    if (validateForm()) {
      setRoman(number);
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

    if (!value) {
      setErrors("* Please enter number");

      formIsValid = false;
    }
    return formIsValid;
  };

  return (
    <>
      <ToastContainer />
      <div className="aritmetic-two-col-grid">
        <div className="commom-box-new">
          <div className="input-new">
            <input
              type="number"
              placeholder="Enter A  Number Between 0-3999"
              value={value}
              onChange={handleOnChange}
              className={errors && "error-input"}
            ></input>
            <span style={{ color: "red", fontSize: "15px" }}>{errors}</span>
          </div>
        </div>
        <div className="button lowercase-center-alignment">
          <button disabled={number === 0} onClick={handleOnSubmit}>
            Convert
          </button>
        </div>
        {roman &&
        <div className="commom-box-new">
         
          <div className="copy-textarea-icon-alignment">
            <i
              className="fa-solid fa-copy "  title="Copy" 
              onClick={() => handleCopy(roman)}
            ></i>
            {copy &&  (
              <div>
                <a>Copied</a>
              </div>
            )}
          </div>
          <div className="input-new">
            <input type="text" value={roman} disabled="true" style={{color:"black"}}></input>
          </div>
        </div>}
      </div>
    </>
  );
}

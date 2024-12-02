import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function RomanToNumber() {
  const { parse } = require("roman-numerals-convert");
  const [roman, setRoman] = useState("");
  const [number, setNumber] = useState("");
  const [err, setErr] = useState(false);
  const [copy, setCopy] = useState("");
  const [value, setvalue] = useState();
  const [errors, setErrors] = useState("");

  const handleOnChange = (e) => {
    setRoman("");
    setCopy(false);

    setErr(false);
    setvalue(e.target.value);

    setNumber("");
    if (!e.target.value) return;
    try {
      setRoman(parse(e.target.value));
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
      setNumber(roman);
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
      setErrors("* Please enter roman number");

      formIsValid = false;
    }
    return formIsValid;
  };

  return (
    <>
      <ToastContainer />

      <div className="commom-box-new">
        <div className="input-new">
          <input
            type="text"
            placeholder="Enter A Roman Number"
            value={value}
            onChange={handleOnChange}
            className={errors && "error-input"}
          ></input>
          <span style={{ color: "red", fontSize: "15px" }}>{errors}</span>
        </div>
      </div>

      <div className="button lowercase-center-alignment">
        <button onClick={handleOnSubmit}>
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
          {copy && (
            <div>
              <a>Copied</a>
            </div>
          )}
        </div>
        <div className="input-new">
          <input type="text" value={number} disabled="true" style={{color:"black"}}></input>
        </div>
      </div>}
    </>
  );
}

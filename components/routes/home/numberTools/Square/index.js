import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SquareAndSquareroot() {
  const [changeupSuare, setChangeupSuare] = useState("");
  const [text, setText] = useState();
  const [copy, setCopy] = useState(false);
  const [placeData, setPlaceData] = useState({
    input: "Ex. 12",
    output: "144",
  });
  const [errors, setErrors] = useState();

  const handleOnChange = (event) => {
    if (event.target.value !== "") {
      setPlaceData({});
    } else {
      setPlaceData({ input: "Ex. 12", output: "144" });
    }
    setCopy(false);
    setText(event.target.value);
    setErrors("");

    setChangeupSuare("");
  };

  const handleWhiteSpace = () => {
    if (validateForm()) {
      var e = document.getElementById("WhiteSpace");
      var value = e.value;

      if (value == "Square Root") {
        if (text < 0) {
          toast.error("Enter Positive value");
        } else {
          setChangeupSuare(Math.sqrt(text));
        }
      } else {
        setChangeupSuare(text * text);
      }
      setCopy(false);
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

    if (!text) {
      setErrors("* Please enter number");

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
            type="number"
            placeholder={placeData?.input}
            onChange={handleOnChange}
            className={errors && "error-input"}
          ></input>
          <span style={{ color: "red", fontSize: "15px" }}>{errors}</span>
        </div>
      </div>

      <div className="commom-box-new truncate-text-top-alignment">
        <div className="input-new">
          <select id="WhiteSpace">
            <option value="Square">Square</option>
            <option value="Square Root">Square Root</option>
          </select>
        </div>
      </div>
      <div className="button lowercase-center-alignment">
        <button onClick={handleWhiteSpace}>Convert</button>
      </div>
      {changeupSuare && 
      <div className="commom-box-new">
      
        <div className="copy-textarea-icon-alignment">
          <i
            className="fa-solid fa-copy "  title="Copy" 
            onClick={() => handleCopy(changeupSuare)}
          ></i>

          {copy && (
            <div>
              <a>Copied</a>
            </div>
          )}
        </div>
        <div className="input-new">
          <input
            type="number"
            value={changeupSuare}
            placeholder={placeData?.output}
            disabled="true"
            style={{color:"black"}}
          ></input>
        </div>
      </div>}
    </>
  );
}

export default SquareAndSquareroot;

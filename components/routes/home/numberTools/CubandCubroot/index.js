import React, { useState } from "react";

function CubeAndCuberoot() {
  const [changeup, setChangeup] = useState("");
  const [text, setText] = useState();
  const [copy, setCopy] = useState(false);
  const [placeData, setPlaceData] = useState({ input: "Ex. 5", output: "125" });
  const [errors, setErrors] = useState();

  const handleOnChange = (event) => {
    if (event.target.value !== "") {
      setPlaceData({});
    } else {
      setPlaceData({ input: "Ex. 5", output: "125" });
    }
    setCopy(false);
    setText(event.target.value);
    setChangeup("");
    setErrors("");
  };

  const handleWhiteSpace = () => {
    if (validateForm()) {
      var e = document.getElementById("WhiteSpace");
      var value = e.value;
      if (value == "Cube Root") {
        setChangeup(Math.cbrt(text));
      } else {
        setChangeup(text * text * text);
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
      <div className="commom-box-new">
        <div className="input-new">
          <input
            type="number"
            placeholder={placeData.input}
            value={text}
            onChange={handleOnChange}
            className={errors && "error-input"}
          ></input>{" "}
          <span style={{ color: "red", fontSize: "15px" }}>{errors}</span>
        </div>
      </div>

      <div className="commom-box-new truncate-text-top-alignment">
        <div className="input-new">
          <select id="WhiteSpace">
            <option value="Cube">Cube</option>
            <option value="Cube Root">Cube Root</option>
          </select>
        </div>
      </div>
      <div className="button lowercase-center-alignment">
        <button onClick={handleWhiteSpace}>
          Convert
        </button>
      </div>
      {changeup && 
      <div className="commom-box-new">
      
        <div className="copy-textarea-icon-alignment">
          <i
            className="fa-solid fa-copy "  title="Copy" 
            onClick={() => handleCopy(changeup)}
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
            value={changeup}
            placeholder={placeData.output}
            disabled="true"
            style={{color:"black"}}
          ></input>
        </div>
      </div>}
    </>
  );
}

export default CubeAndCuberoot;

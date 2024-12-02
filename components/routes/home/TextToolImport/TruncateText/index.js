import React, { useState } from "react";

function TruncateText() {
  const [text, setText] = useState("");
  const [copy, setCopy] = useState(false);
  const [changeupTrunc, setChangeupTrunc] = useState("");
  const [truncateln, setTruncateln] = useState();
  const [errors, setErrors] = useState("");

  const handleOnErase = () => {
    setText("");
    setChangeupTrunc("");
    setTruncateln("");
    setCopy(false);
  };

  const handleOnChange = (event) => {
    setErrors("");
    setChangeupTrunc("");
    setCopy(false);
    setText(event.target.value);
  };

  const handleCopy = (user) => {
    navigator.clipboard.writeText(user);
    if (navigator.clipboard.writeText(user)) {
      setCopy(true);
    }
  };

  const handleTruncateClick = () => {
    if (!text || text.trim() === "") return setErrors("* Please enter text.");
    if (text.length > truncateln) {
      setChangeupTrunc(text.slice(0, truncateln) + "...");
    } else {
      setChangeupTrunc(text);
    }
    setCopy(false);
  };

  return (
    <>
      <div className="main-globally-counter-box">
        {text?.length > 0 &&
        <div className="color-picker-icon">
          <i
            className="fa-solid fa-eraser"
            title="Clear"
            onClick={handleOnErase}
          ></i>
        </div>}
        <div className="counter-text-area">
          <textarea
            className={errors && "error-input"}
            placeholder="Type text to truncate here..."
            value={text}
            onChange={handleOnChange}
          />
          <span>{errors}</span>
        </div>
      </div>
      <div className="commom-box-new truncate-text-top-alignment">
        <div className="input-new">
          <input
            type="number"
            name="startNumber"
            value={truncateln}
            placeholder="Truncate length"
            onChange={(e) => {
              e.target.value > 0 && setChangeupTrunc("");
              setTruncateln(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="button lowercase-center-alignment">
        <button onClick={handleTruncateClick}>Truncate Text</button>
      </div>
      {changeupTrunc?.length >0 &&
      <div className="main-globally-counter-box">
     
        <div className="copy-textarea-icon-alignment">
          <i
            className="fa-solid fa-copy "
            title="Copy"
            onClick={() => handleCopy(changeupTrunc)}
          ></i>

          {copy && changeupTrunc && (
            <div>
              {" "}
              <a>Copied</a>
            </div>
          )}
        </div>
        <div className="counter-text-area">
          <textarea value={changeupTrunc} disabled="true" style={{color:"black"}}/>
        </div>
      </div>}
    </>
  );
}
export default TruncateText;

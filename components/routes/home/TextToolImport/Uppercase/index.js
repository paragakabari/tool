import React, { useEffect, useRef, useState } from "react";

function ToUpperCase() {
  const [changeup, setChangeup] = useState("");
  const [copy, setCopy] = useState(false);
  const [text, setText] = useState("");
  const [errors, setErrors] = useState("");

  const handleOnErase = () => {
    setText("");
    setChangeup("");
    setCopy(false);
  };

  const handleOnChange = (event) => {
    setErrors("");
    setCopy(false);
    setText(event.target.value);

    setChangeup("");
  };

  const handleUpClick = () => {
    if (!text || text.trim() === "") return setErrors("* Please enter text.");
    let newText = text.toUpperCase();
    setChangeup(newText);
    setCopy(false);
  };

  const handleCopy = (user) => {
    navigator.clipboard.writeText(user);
    if (navigator.clipboard.writeText(user)) {
      setCopy(true);
    }
  };
  return (
    <>
      <div className="main-globally-counter-box">
        {text?.length > 0 && (
          <div className="color-picker-icon">
            <i
              className="fa-solid fa-eraser"
              title="Clear"
              onClick={handleOnErase}
            ></i>
          </div>
        )}
        <div className="counter-text-area">
          <textarea
            className={errors && "error-input"}
            placeholder="Enter lowercase text"
            value={text}
            onChange={handleOnChange}
          />
          <span>{errors}</span>
        </div>
      </div>
      <div className="button lowercase-center-alignment">
        <button onClick={handleUpClick}>Convert To Uppercase</button>
      </div>
      {changeup?.length > 0 && (
        <div className="main-globally-counter-box">
          <div className="copy-textarea-icon-alignment">
            <i
              className="fa-solid fa-copy "
              title="Copy"
              onClick={() => handleCopy(changeup)}
            ></i>

            {copy && changeup && (
              <div>
                {" "}
                <a>Copied</a>
              </div>
            )}
          </div>
          <div className="counter-text-area">
            <textarea value={changeup} style={{color:"black"}}/>
          </div>
        </div>
      )}
    </>
  );
}
export default ToUpperCase;

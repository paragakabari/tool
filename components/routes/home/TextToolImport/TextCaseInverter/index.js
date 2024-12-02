import React, { useState } from "react";

function TextCaseInverter() {
  const [text, setText] = useState();
  const [answer, setAnswer] = useState("");
  const [errors, setErrors] = useState("");
  const [copy, setCopy] = useState(false);

  const handleOnErase = () => {
    setText("");
    setCopy(false);
    setAnswer("");
  };

  const handleOnChange = (e) => {
    setAnswer("");
    setErrors("");
    setCopy(false);
    setText(e.target.value);
  };

  const handleCopy = (user) => {
    navigator.clipboard.writeText(user);
    if (navigator.clipboard.writeText(user)) {
      setCopy(true);
    }
  };

  const handleCaseClick = () => {
    if (!text || text.trim() === "") return setErrors("* Please enter text.");
    let swapcase = function swapcase(str) {
      return str.replace(/([a-z]+)|([A-Z]+)/g, function (match, chr) {
        return chr ? match.toUpperCase() : match.toLowerCase();
      });
    };
    setAnswer(swapcase(text));
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
            placeholder="Enter your text"
            value={text}
            onChange={handleOnChange}
          />
          <span>{errors}</span>
        </div>
      </div>
      <div className="button lowercase-center-alignment-new">
        <button onClick={handleCaseClick}>Convert</button>
      </div>
      {answer?.length > 0 &&
      <div className="main-globally-counter-box">
        
        <div className="copy-textarea-icon-alignment">
          <i
            className="fa-solid fa-copy "
            title="Copy"
            onClick={() => handleCopy(answer)}
          ></i>
          {copy && answer && (
            <div>
              {" "}
              <a>Copied</a>
            </div>
          )}
        </div>
        <div className="counter-text-area">
          <textarea value={answer} style={{color:"black"}}/>
          <div
            className="new-copy-icon-text-style-alignment"
            style={{ position: "unset" }}
          ></div>
        </div>
      </div>}
    </>
  );
}

export default TextCaseInverter;

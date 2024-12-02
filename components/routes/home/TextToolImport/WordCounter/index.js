import React, { useState } from "react";

function WordCounter() {
  const [text, setText] = useState("");
  const [count, setCount] = useState();
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState("");

  const handleOnErase = () => {
    setText("");
    setCount("");
  };

  const handleOnChange = (event) => {
    setErrors("");
    setText(event.target.value);
    setCount();
  };

  const handleCountClick = () => {
    if(!text || text.trim() === "") return setErrors("* Please enter text.")
    let newText = text.toLowerCase();
    setCount(newText);
    setShow(true);
  };

  return (
    <>
      <div className="main-globally-counter-box">
      { (text?.length > 0) &&
        <div className="color-picker-icon">
          <i className="fa-solid fa-eraser"  title="Clear" onClick={handleOnErase}></i>
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

      <div className="button counter-word-center-align">
        <button onClick={handleCountClick}>Count word</button>
      </div>

      <div className="counter-details-box">
        <h3>BASIC WORDS COUNT STATISTICS</h3>
        <div className="all-text-content-alignment">
          <div className="text-align-style">
            <span>Total Words</span>
            {show && (
              <p>
                {" "}
                {
                  count?.split(" ").filter((element) => {
                    return element.length !== 0;
                  }).length
                }{" "}
              </p>
            )}
          </div>
          <div className="text-align-style">
            <span>Total Characters (with space)</span>
            {show && <p>{count?.length}</p>}
          </div>
          <div className="text-align-style">
            <span>Total Characters (without space)</span>
            {show && <p>{count?.replace(/\s/g, "").length}</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default WordCounter;

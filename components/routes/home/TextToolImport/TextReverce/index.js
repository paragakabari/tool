import React, { useState } from "react";

function TextReverce(Data) {
  const [text, setText] = useState("");
  const [copy, setCopy] = useState(false);
  const [changeNew, setChangeNew] = useState("");
  const [errors, setErrors] = useState("");

  const handleOnErase = () => {
    setText("");
    setCopy(false);
    setChangeNew("");
  };

  const handleOnChange = (event) => {
    setErrors("");
    setChangeNew("");
    setCopy(false);
    setText(event.target.value);
  };

  const handleCopy = (user) => {
    navigator.clipboard.writeText(user);
    if (navigator.clipboard.writeText(user)) {
      setCopy(true);
    }
  };

  const handleTRClick = () => {
    if (!text || text.trim() === "") return setErrors("* Please enter text.");
    const reverseString = (str) => {
      let newString = "";
      for (let i = str.length - 1; i >= 0; i--) {
        newString += str[i];
      }
      return newString;
    };
    let newText = reverseString(text);
    setChangeNew(newText);
    setCopy(false);
  };

  return (
    <>
      <div className="main-globally-counter-box">
        {text?.length > 0 &&
        <div className="color-picker-icon">
          <i className="fa-solid fa-eraser"  title="Clear" onClick={handleOnErase}></i>
        </div>}
        <div className="counter-text-area">
          <textarea
            className={errors && "error-input"}
            placeholder="Type a Text.   ( Ex. Input :- Convertor   ;   Output :- rotrevnoC)  "
            value={text}
            onChange={handleOnChange}
          />
          <span>{errors}</span>
        </div>
      </div>
      <div className="button lowercase-center-alignment">
        <button onClick={handleTRClick}>Reverse Text</button>
      </div>
      {changeNew?.length > 0 && 
      <div className="main-globally-counter-box">
        
        <div className="copy-textarea-icon-alignment">
          <i
            className="fa-solid fa-copy "  title="Copy" 
            onClick={() => handleCopy(changeNew)}
          ></i>

          {copy && changeNew && (
            <div>
              {" "}
              <a>Copied</a>
            </div>
          )}
        </div>
        <div className="counter-text-area">
          <textarea
            style={{color:"black"}}
            value={changeNew}
            disabled={true}
          />
        </div>
      </div>}
    </>
  );
}
export default TextReverce;

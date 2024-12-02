import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

function ToLowerCase({ Data }) {
  const [changelo, setChangelo] = useState("");
  const [copy, setCopy] = useState(false);
  const [text, setText] = useState("");
  const [errors, setErrors] = useState("");

  const location = useRouter();
  const Name = location.query.type;

  const handleOnErase = () => {
    setText("");
    setChangelo("");
    setCopy(false);
  };

  const handleOnChange = (event) => {
    setErrors("");
    setCopy(false);
    setText(event.target.value);

    setChangelo("");
  };

  const handleLoClick = () => {
    if (!text || text.trim() === "") return setErrors("* Please enter text.");
    let newText = text.toLowerCase();
    setChangelo(newText);
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
     { (text?.length > 0) &&
        <div className="color-picker-icon">
          <i className="fa-solid fa-eraser"  title="Clear" onClick={handleOnErase}></i>
        </div>}
        <div className="counter-text-area">
          <textarea className={errors && "error-input"}
            placeholder="Enter uppercase text"
            value={text}
            onChange={handleOnChange}
          />
          <span>{errors}</span>
        </div>
      </div>
      
      <div className="button lowercase-center-alignment-new">
        <button onClick={handleLoClick}>Convert To Lowercase</button>
      </div>
      {changelo?.length > 0 &&  
      <div className="main-globally-counter-box">

     
      <div className="copy-textarea-icon-alignment">
          <i
            className="fa-solid fa-copy "  title="Copy" 
            onClick={() => handleCopy(changelo)}
          ></i>
          {copy && changelo && (
            <div>
              {" "}
              <a>Copied</a>
            </div>
          )}
        </div>

        <div className="counter-text-area">
          <textarea  value={changelo} style={{color:"black"}} />
          <div
            className="new-copy-icon-text-style-alignment"
            style={{ position: "unset" }}
          ></div>
        </div>
      </div>}
    </>
  );
}
export default ToLowerCase;

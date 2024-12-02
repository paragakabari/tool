import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

function SplitText(Data) {
  const [text, setText] = useState("");
  const [changeup, setChangeup] = useState("");
  const [errors, setErrors] = useState("");
  const [copy, setCopy] = useState(false);

  const handleOnErase = () => {
    setText("")
    setChangeup("")
    setCopy(false);
  
  };


  const handleOnChange = (event) => {
    setErrors("")
    setCopy(false);
    setChangeup("")
    setText(event.target.value);
  };

  const handleCopy = (user) => {
    navigator.clipboard.writeText(user);
    if (navigator.clipboard.writeText(user)) {
      setCopy(true);
    }
  };

  

  const handleSplitClick = () => {
    if(!text || text.trim() === "") return setErrors("* Please enter text.")
    const words = text.split(" ");
    setChangeup(words);
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
          <textarea className={errors && "error-input"}
            placeholder="Type text to split here..."
            value={text}
            onChange={handleOnChange}
          />
           <span>{errors}</span>
        </div>
      </div>
      <div className="button lowercase-center-alignment">
        <button  onClick={handleSplitClick}>
          Split Text
        </button>
      </div>
      {changeup?.length > 0 &&
      <div className="main-globally-counter-box">
       
          <div className="copy-textarea-icon-alignment">
            <i
              className="fa-solid fa-copy "  title="Copy" 
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
          <textarea  value={changeup} disabled="true" style={{color:"black"}}/>
        </div>
      </div>}
    </>
  );
}
export default SplitText;

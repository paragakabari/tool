import React, { useState } from "react";

function RemoveSpace() {
  const [changeupWspace, setChangeupWspace] = useState("");
  const [copy, setCopy] = useState(false);
  const [text, setText] = useState("");
  const [errors, setErrors] = useState("");

  const handleOnErase = () => {
    setText("")
    setCopy(false);
    setChangeupWspace("")
  };


  const handleOnChange = (event) => {
    setErrors("")
    setChangeupWspace("");
    setCopy(false);
    setText(event.target.value);
  };

  const handleWhiteSpace = () => {
    if(!text || text.trim() === "") return setErrors("* Please enter text.")
    var e = document.getElementById("WhiteSpace");
    var value = e.value;
    if (value == "All") {
      setChangeupWspace(text.replace(/[ ]+/g, ""));
    } else {
      setChangeupWspace(text.replace(/\s{2,}/g, " ").trim());
    }
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
      {text?.length > 0 &&
        <div className="color-picker-icon">
          <i
            className="fa-solid fa-eraser"
            title="Clear"
            onClick={handleOnErase}
          ></i>
        </div>}
        <div className="counter-text-area">
          <textarea className={errors && "error-input"} placeholder="Enter text to remove white-spaces..." value={text} onChange={handleOnChange} />
          <span>{errors}</span>
        </div>
      </div>
      <div className="commom-box-new truncate-text-top-alignment">
        <div className="input-new">
          <select
            id="WhiteSpace"
            onChange={() => {
              setChangeupWspace("");
            }}
          >
            <option value="Extra">Extra WhiteSpaces Remove</option>
            <option value="All">All WhiteSpaces Remove</option>
          </select>
        </div>
      </div>
      <div className="button lowercase-center-alignment">
        <button  onClick={handleWhiteSpace}>
          Convert
        </button>
      </div>
      {changeupWspace?.length > 0 &&
      <div className="main-globally-counter-box">
       
        <div className="copy-textarea-icon-alignment">
          <i className="fa-solid fa-copy "  title="Copy"  onClick={() => handleCopy(changeupWspace)}></i>

          {copy && changeupWspace && (
            <div>
              <a>Copied</a>
            </div>
          )}
        </div>
        <div className="counter-text-area">
          <textarea  value={changeupWspace} disabled="true" style={{color:"black"}}/>

        </div>
      </div>}
    </>
  );
}
export default RemoveSpace;

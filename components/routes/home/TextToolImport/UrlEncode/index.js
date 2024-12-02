import React, {  useState } from "react";


function UrlEncode() {
  const [text, setText] = useState("");
  const [changeup, setChangeup] = useState("");
  const [copy, setCopy] = useState(false);
  const [errors, setErrors] = useState("");

  const handleOnErase = () => {
    setText("")
    setCopy(false);
    setChangeup("")
    
  };


  const handleOnChange = (event) => {
    setChangeup("");
    setErrors("")
    setCopy(false);
    setText(event.target.value);
  };

  const handleCopy = (user) => {
    navigator.clipboard.writeText(user);
    if (navigator.clipboard.writeText(user)) {
      setCopy(true);
    }
  };

  const handleEncodeClick = () => {
let regexUrl 
    if(text.search("https://") === -1 ){
     regexUrl =
     /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/}
   else{
     regexUrl =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g}
   
    if(!text || text.trim() === "" || regexUrl.test(text)===false ) return setErrors("* Please enter URL.")
    let encoded = encodeURIComponent(text);
    setChangeup(encoded);
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
          <textarea className={errors && "error-input"}
            placeholder="Enter url to encode here..."
            value={text}
            onChange={handleOnChange}
            
          />
           <span>{errors}</span>
        </div>
       
      </div>
      <div className="button lowercase-center-alignment">
        <button  onClick={handleEncodeClick}>
          Encode
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
export default UrlEncode;

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { sha256, sha224 } from "js-sha256";

function CryptoFormat({ Data }) {
  const [text, setText] = useState("");
  const [convert, setConvert] = useState("");
  const [copy, setCopy] = useState(false);
  const [errors, setErrors] = useState("");

  const rot13Cipher = require("rot13-cipher");
  var rot47 = require("rot47");

  const router = useRouter();
  const Name = router.query.type;
  const ref = useRef();

  useEffect(() => {
    setErrors("")
    setConvert("");
    setText("");
    setCopy(false);
  }, [Name]);

  const handleOnChange = (event) => {
    setErrors("")
    setText(event.target.value);
    setConvert("");
    setCopy(false);
  };

  const handleOnErase =() => {
    setText("");
    setCopy(false);
    setConvert("");
  }

  const handleOnClick = () => {
    if(!text || text.trim() === "") return setErrors("* Please enter text.")
    setConvert(rot13Cipher(text));
    setCopy(false);
  };

  const handleOnFoursevenClick = () => {
    if(!text || text.trim() === "") return setErrors("* Please enter text.")
    setConvert(rot47(text));
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
      {/* rot-13-encode-data */}
      {Name === "rot-13-encode-data" && (
       <>
        <div className="main-globally-counter-box">
          {text?.length > 0 &&
        <div className="color-picker-icon">
                <i className="fa-solid fa-eraser"  title="Clear" onClick={handleOnErase}></i>
              </div>}
          <div className="counter-text-area">
            <textarea className={errors && "error-input"}
              placeholder="Enter your text here..."
              value={text}
              onChange={handleOnChange}
            />
             <span>{errors}</span>
          </div>
         
        </div>
        <div className="button lowercase-center-alignment-new">
          <button onClick={handleOnClick}>
            Generate Now
          </button>
        </div>
        {convert &&
        <div className="main-globally-counter-box">
          
          <div className="copy-textarea-icon-alignment">
            <i
              className="fa-solid fa-copy "  title="Copy" 
              onClick={() => handleCopy(convert)}
            ></i>
            {copy  && (
              <div>
                {" "}
                <a>Copied</a>
              </div>
            )}
          </div>
          <div className="counter-text-area">
            <textarea  value={convert} />
            <div
              className="new-copy-icon-text-style-alignment"
              style={{ position: "unset" }}
            ></div>
          </div>
        </div>}
      </>
      )}

      {/* rot-13-decode-data */}
      {Name === "rot-13-decode-data" && (
         <>
         <div className="main-globally-counter-box">
         {text?.length > 0 &&
        <div className="color-picker-icon">
                <i className="fa-solid fa-eraser"  title="Clear" onClick={handleOnErase}></i>
              </div>}
           <div className="counter-text-area">
             <textarea className={errors && "error-input"}
               placeholder="Enter rot-13 text for decode"
               value={text}
               onChange={handleOnChange}
             />
              <span>{errors}</span>
           </div>
          
         </div>
         <div className="button lowercase-center-alignment-new">
         <button onClick={handleOnClick}>
            Generate Now
          </button>
         </div>
         {convert &&
         <div className="main-globally-counter-box">
     
          <div className="copy-textarea-icon-alignment">
            <i
              className="fa-solid fa-copy "  title="Copy" 
              onClick={() => handleCopy(convert)}
            ></i>
            {copy  && (
              <div>
                {" "}
                <a>Copied</a>
              </div>
            )}
          </div>
           <div className="counter-text-area">
             <textarea  value={convert} />
             <div
               className="new-copy-icon-text-style-alignment"
               style={{ position: "unset" }}
             ></div>
           </div>
         </div>}
       </>
      )}

      {/* rot-47-encode-data */}
      {Name === "rot-47-encode-data" && (
         <>
         <div className="main-globally-counter-box">
         {text?.length > 0 &&
        <div className="color-picker-icon">
                <i className="fa-solid fa-eraser"  title="Clear" onClick={handleOnErase}></i>
              </div>}
           <div className="counter-text-area">
             <textarea className={errors && "error-input"}
               placeholder="Enter your text here..."
               value={text}
               onChange={handleOnChange}
             />
              <span>{errors}</span>
           </div>
          
         </div>
         <div className="button lowercase-center-alignment-new">
         <button onClick={handleOnFoursevenClick}>
            Generate Now
          </button>
         </div>
         {convert &&
         <div className="main-globally-counter-box">
       
          <div className="copy-textarea-icon-alignment">
            <i
              className="fa-solid fa-copy "  title="Copy" 
              onClick={() => handleCopy(convert)}
            ></i>
            {copy  && (
              <div>
                {" "}
                <a>Copied</a>
              </div>
            )}
          </div>
           <div className="counter-text-area">
             <textarea  value={convert} />
             <div
               className="new-copy-icon-text-style-alignment"
               style={{ position: "unset" }}
             ></div>
           </div>
         </div>}
       </>
      )}

      {/* rot-47-decode-data */}
      {Name === "rot-47-decode-data" && (
         <>
         <div className="main-globally-counter-box">
         {text?.length > 0 &&
        <div className="color-picker-icon">
                <i className="fa-solid fa-eraser"  title="Clear" onClick={handleOnErase}></i>
              </div>}
           <div className="counter-text-area">
             <textarea className={errors && "error-input"}
               placeholder="Enter rot-47 text for decode"
               value={text}
               onChange={handleOnChange}
             />
              <span>{errors}</span>
           </div>
          
         </div>
         <div className="button lowercase-center-alignment-new">
         <button onClick={handleOnFoursevenClick}>
            Generate Now
          </button>
         </div>
         {convert &&
         <div className="main-globally-counter-box">
        
          <div className="copy-textarea-icon-alignment">
            <i
              className="fa-solid fa-copy "  title="Copy" 
              onClick={() => handleCopy(convert)}
            ></i>
            {copy && (
              <div>
                {" "}
                <a>Copied</a>
              </div>
            )}
          </div>
           <div className="counter-text-area">
             <textarea  value={convert} />
             <div
               className="new-copy-icon-text-style-alignment"
               style={{ position: "unset" }}
             ></div>
           </div>
         </div>}
       </>
      )}

      {/* sha224-hash-generator */}
      {Name === "sha224-hash-generator" && (
   

        <>
        <div className="main-globally-counter-box">
        {text?.length > 0 &&
        <div className="color-picker-icon">
                <i className="fa-solid fa-eraser"  title="Clear" onClick={handleOnErase}></i>
              </div>}
          <div className="counter-text-area">
            <textarea className={errors && "error-input"}
              placeholder="Enter text here for encode"
              value={text}
              onChange={handleOnChange}
            />
             <span>{errors}</span>
          </div>
         
        </div>
        <div className="button lowercase-center-alignment-new">
        <button
              onClick={() => {
                setConvert(sha224(text));
                setCopy(false);
              }}
            >
              Genrate Now
            </button>
        </div>
        {convert &&
        <div className="main-globally-counter-box">
       
          <div className="copy-textarea-icon-alignment">
            <i
              className="fa-solid fa-copy "  title="Copy" 
              onClick={() => handleCopy(convert)}
            ></i>
            {copy  && (
              <div>
                {" "}
                <a>Copied</a>
              </div>
            )}
          </div>
          <div className="counter-text-area">
            <textarea  value={convert} style={{color:"black"}}/>
            <div
              className="new-copy-icon-text-style-alignment"
              style={{ position: "unset" }}
            ></div>
          </div>
        </div>}
      </>
      )}

      {/* sha256-hash-generator */}
      {Name === "sha256-hash-generator" && (
       
        <>
        <div className="main-globally-counter-box">
        {text?.length > 0 &&
        <div className="color-picker-icon">
                <i className="fa-solid fa-eraser"  title="Clear" onClick={handleOnErase}></i>
              </div>}
          <div className="counter-text-area">
            <textarea className={errors && "error-input"}
              placeholder="Enter text here for encode"
              value={text}
              onChange={handleOnChange}
            />
             <span>{errors}</span>
          </div>
         
        </div>
        <div className="button lowercase-center-alignment-new">
        <button
              onClick={() => {
                setConvert(sha256(text));
                setCopy(false);
              }}
            >
              Genrate Now
            </button>
        </div>
        {convert &&
        <div className="main-globally-counter-box">
     
          <div className="copy-textarea-icon-alignment">
            <i
              className="fa-solid fa-copy "  title="Copy" 
              onClick={() => handleCopy(convert)}
            ></i>
            {copy  && (
              <div>
                {" "}
                <a>Copied</a>
              </div>
            )}
          </div>
          <div className="counter-text-area">
            <textarea  value={convert} style={{color:"black"}} />
            <div
              className="new-copy-icon-text-style-alignment"
              style={{ position: "unset" }}
            >

            </div>
          </div>
        </div>}
      </>
      )}
    </>
  );
}

export default CryptoFormat;

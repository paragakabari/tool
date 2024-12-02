import React, { useState } from "react";

function Md5() {
  var md5 = require("md5");
  var sha1 = require("sha1");
  var base64 = require("base-64");
  const [text, setText] = useState("");
  const [show, setShow] = useState("");
  const [base, setBase] = useState("");
  const [sha, setSha] = useState("");
  const [md, setMd] = useState("");
  const [copy, setCopy] = useState(false);
  const [baseCopy, setBaseCopy] = useState(false);
  const [shaCopy, setShaCopy] = useState(false);
  const [errors, setErrors] = useState("");

  const handleOnErase = () => {
    setText("");
    setMd("");
    setSha("");
    setBase("");
    setCopy(false);
    setShaCopy(false);
    setBaseCopy(false);
  };

  const handleOnChange = (event) => {
    setErrors("");
    setCopy(false);
    setText(event.target.value);

    setShow(false);
  };

  const handleMd5Click = () => {
    if (!text || text.trim() === "") return setErrors("* Please enter text.");
    setShow(true);
    let newMd = md5(text);
    let newSha = sha1(text);
    let newBase = base64.encode(text);
    setMd(newMd);
    setSha(newSha);
    setBase(newBase);
    setCopy(false);
    setShaCopy(false);
    setBaseCopy(false);
  };

  const handleCopy = (user) => {
    navigator.clipboard.writeText(user);
    if (navigator.clipboard.writeText(user)) {
      setCopy(true);
      setShaCopy(false);
      setBaseCopy(false);
    }
  };

  const handleCopyBase = (user) => {
    navigator.clipboard.writeText(user);
    if (navigator.clipboard.writeText(user)) {
      setBaseCopy(true);
      setCopy(false);
      setShaCopy(false);
    }
  };

  const handleCopySha = (user) => {
    navigator.clipboard.writeText(user);
    if (navigator.clipboard.writeText(user)) {
      setShaCopy(true);
      setCopy(false);

      setBaseCopy(false);
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
          <textarea
            className={errors && "error-input"}
            placeholder="Enter your text for encode"
            value={text}
            onChange={handleOnChange}
          />
          <span>{errors}</span>
        </div>
      </div>
      <div className="button bottom-text-align">
        <button onClick={handleMd5Click}>md5 convert</button>
      </div>
{show &&
      <div className="counter-details-box">
        <h3>ENCODE BY [Md5 , Sha1 , Base64]</h3>
        <div className="all-text-content-alignment">
          <div className="text-align-style">
         <div className="left_block" >
         <span>MD5 :</span>
            <div>{show && <p>{md}</p>}</div>
         </div>

         
         <div className="new-copy-icon-text-style-alignment">
              <i
                className="fa-sharp fa-solid fa-copy"
                onClick={() => handleCopy(md)}
              ></i>
              {copy && md && (
                <div>
                  {" "}
                  <a>Copied</a>
                </div>
              )}
            </div>
          </div>

          <div className="text-align-style">
            <div className="copied-text-alignment">
              <span>Base64 :</span>
   
              <div className="new-copy-icon-text-style-alignment">
                <i
                  className="fa-sharp fa-solid fa-copy"
                  onClick={() => handleCopyBase(base)}
                ></i>

                {baseCopy && base && (
                  <div>
                    {" "}
                    <a>Copied</a>
                  </div>
                )}
              </div>

            </div>

            <div>{show && <p>{base}</p>}</div>
          </div>

          <div className="text-align-style">
           <div > <span>Sha1 :</span>
            <div> {show && <p>{sha}</p>}</div></div>

            <div className="new-copy-icon-text-style-alignment">
              <i
                className="fa-sharp fa-solid fa-copy"
                onClick={() => handleCopySha(sha)}
              ></i>

              {shaCopy && sha && (
                <div>
                  {" "}
                  <a>Copied</a>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>}

    </>
  );
}
export default Md5;

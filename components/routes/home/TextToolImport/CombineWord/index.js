import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

function CombineWord(Data) {
  

  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [copy, setCopy] = useState(false);
  const [merge, setMerge] = useState("");
  const [errors, setErrors] = useState(false);
  const [errors2, setErrors2] = useState(false);
 

  const location = useRouter();
  const Name = location.query.type;

  useEffect(() => {
    setCopy(false);
  }, [Name]);

  useEffect(() => {
    setText2("");
    setText("");

    setCopy(false);
  }, [Data]);

  const handleOnErase = () => {
    setText("")
   setText2("")
   setMerge("")
    setCopy(false);
  };

  const handleOnChange = (event) => {
   setErrors(false)
    setCopy(false);
    setText(event.target.value);
    setMerge("");
  };

  const handleCombineClick = () => {
    if(!text || text.trim() === "" )  setErrors(true)
    if(!text2 || text2.trim() === "" ) setErrors2(true)
   else{let newText = text.concat(" ", text2);
    setMerge(newText);
    setCopy(false);}
  };

  const handleOn2Change = (event) => {
    setErrors2(false)
    setText2(event.target.value);
   
    setMerge("");
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
     
     {(text?.length > 0 || text2.length > 0) && <div className="color-picker-icon">
              <i className="fa-solid fa-eraser"  title="Clear" onClick={handleOnErase}></i>
            </div>}
        <div className="counter-text-area">
          <textarea className={errors && "error-input"}
            placeholder="Enter first paragraph"
            value={text}
            onChange={handleOnChange}
          />
         {errors &&  <span>* Please enter text.</span>}
    
        </div>
        <div className="counter-text-area">
          <textarea className={errors2 && "error-input"}
            placeholder="Enter second paragraph"
            value={text2}
            onChange={handleOn2Change}
          />
         {errors2 &&  <span>* Please enter text.</span>}
        </div>
      </div>
      <div className="button lowercase-center-alignment">
        <button  onClick={handleCombineClick}>
          Combine
        </button>
      </div>
      {merge?.length > 0 && 
      <div className="main-globally-counter-box">
    
          <div className="copy-textarea-icon-alignment">
            <i
              className="fa-solid fa-copy "  title="Copy" 
              onClick={() => handleCopy(merge)}
            ></i>

            {copy && merge && (
              <div>
                {" "}
                <a>Copied</a>
              </div>
            )}
          </div>
        <div className="counter-text-area">
          <textarea  value={merge} style={{color:"black"}}/>
        </div>
      </div>}
    </>
  );
}
export default CombineWord;

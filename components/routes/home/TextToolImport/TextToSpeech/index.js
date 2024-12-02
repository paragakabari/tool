import React,{useState} from 'react'

import { useSpeechSynthesis } from "react-speech-kit";


function TextToSpeech() {
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState("");
  const { speak } = useSpeechSynthesis();

  const handleOnErase = () => {
    setValue("")
   
  };


  const handleOnClick = () => {
    if(!value || value.trim() === "") return setErrors("* Please enter text.")
    speak({ text: value }) 
  }
 
    return(
      <>
        <div className="main-globally-counter-box">
        {value?.length > 0 &&
        <div className="color-picker-icon">
          <i
            className="fa-solid fa-eraser"
            title="Clear"
            onClick={handleOnErase}
          ></i>
        </div>}
            <div className="counter-text-area">
              <textarea className={errors && "error-input"}
                 placeholder="Enter your text"
                 value={value}
                 onChange={(e) => (setValue(e.target.value) ,
                   setErrors("") )}
              />
               <span>{errors}</span>
            </div>
          </div>
          <div className="button lowercase-center-alignment">
            <button  onClick={() =>handleOnClick() }> 
            Speech
            </button>
          </div>
        </>
  )
}

export default TextToSpeech


import React, { useState, useRef } from 'react';
import { useSpeechRecognition } from 'react-speech-kit';
import { copy } from 'clipboard';
import { useOnClickOutside } from '../../../../../hooks';

function SpeechToText() {
  const [copyText, setCopyText] = useState('');
  const [text, setText] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const mainDivRef = useRef(null);
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setCopyText(result);
    },
  });

  useOnClickOutside(mainDivRef, stop)

  const reset = () => {
    setCopyText("")

  }



  const handleCopyText = (e) => {
    setCopyText(e.target.value);

  }
  const copyToClipboard = () => {
    copy(copyText);
    setText('Copied');
    // setIsCopied(true)
    setTimeout(() => {
      setText('');
    }, 3000)
  }



  return (
    <>
      <div ref={mainDivRef}>
        <div className="main-globally-counter-box">
          <div className="counter-text-area">
            <textarea 
              disabled={true}
              value={copyText}
              onChange={handleCopyText}
            // onChange={(event) => setValue(event.target.value)}
            />
            <div className="speech-text-alignment">

              <div className="button">
                <button type="button" value="Reset" onClick={() => reset()} >Reset</button>
              </div>

              <div className="copy-icon-alignment">
                {text != "" ? <div>Copied</div> : <></>}
                {copyText && (
                  <i
                    className="fa-solid fa-copy "  title="Copy" 
                    onClick={copyToClipboard}
                  ></i>
                )}

              </div>
            </div>
          </div>
        </div>
        <div className="button lowercase-center-alignment">
          <button onMouseDown={listen} onMouseUp={stop}>
            🎤
          </button>
          {listening && <div className="listening-class">Go ahead I'm listening</div>}
        </div>
      </div>
    </>
  );
}

export default SpeechToText;
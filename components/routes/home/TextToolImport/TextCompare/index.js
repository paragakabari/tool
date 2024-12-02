import React, { useState } from "react";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";

function TextCompare() {
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");

  const newStyles = {
    variables: {
      light: {
        codeFoldGutterBackground: "#6F767E",
        codeFoldBackground: "#E2E4E5",
      },
    },
  };

  return (
    <>
      <div className="main-globally-counter-box two-col-text-grid">
      
        <div className="counter-text-area">
          <div className="text-copy-icon-content-alignment">
              <label>Paragraph A</label>
              {text?.length > 0 && (
          <div className="color-picker-icon">
            <i
              className="fa-solid fa-eraser"
              title="Clear"
              onClick={() => setText("")}
            ></i>
          </div>
        )}
          </div>
          <textarea
            name="before"
            placeholder="Type first text for compare..."
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </div>

      
        <div className="counter-text-area">
        <div className="text-copy-icon-content-alignment">
          <label>Paragraph B</label>
          {text2?.length > 0 && (
          <div className="color-picker-icon">
            <i
              className="fa-solid fa-eraser"
              title="Clear"
              onClick={() => setText2("")}
            ></i>
          </div>
        )}
          </div>
          <textarea
            name="after"
            placeholder="Type second text for compare..."
            onChange={(e) => setText2(e.target.value)}
            value={text2}
          />
        </div>
      </div>

      {(text?.length > 0 || text2?.length > 0) &&
        (text === text2 ? (
          <span style={{ color: "green" }}> * Both values are same.</span>
        ) : (
          <div className="main-globally-counter-box">
            <div className="counter-text-area">
              <ReactDiffViewer
                oldValue={text}
                newValue={text2}
                splitView={true}
                compareMethod={DiffMethod.CHARS}
                styles={newStyles}
                // leftTitle="Paragraph A"
                // rightTitle="Paragraph B"
              />
            </div>
          </div>
        ))}
    </>
  );
}
export default TextCompare;

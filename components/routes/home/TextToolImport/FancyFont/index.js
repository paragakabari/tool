import React, { useState } from "react";
import ConvertData from "./ConvertData";
import MapData from "./MapData";
import { ToastContainer, toast } from "react-toastify";

function FancyFont() {
  const [text, setText] = useState("");
  const [answer, setAnswer] = useState();
  const [show, setShow] = useState(false);

  const handleOnErase = () => {
    setShow(false);
    setAnswer("");
    setText("");
  };

  const handleOnClick = () => {
    setShow(false);

    let ans = [];
    ConvertData.map((item) => {
      let data = text
        .split("")
        .map((l) => {
          return item[l] ? item[l] : l;
        })
        .join("");

      ans.push(data);
    });
    setAnswer(ans);
  };

    const handleOnChange = (event) => {
    setShow(false);
    setText(event.target.value);
  };

  const clickToCopy = (id) => {
    const dataInput = document.getElementById(id);
    console.log("id", id);
    navigator.clipboard.writeText(dataInput?.value);
  };

  return (
    <>
    
      <div>
      {show && <ToastContainer />}
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n   .fixed {\n    position: fixed;\n    top:0; left:0;\n    width: 100%; \n    z-index:99; }\n  ",
          }}
        />

        {/* textarea */}
        <div className="main-globally-counter-box">
          {text?.length > 0 && (
            <div className="color-picker-icon">
              <i
                className="fa-solid fa-eraser"
                title="Clear"
                onClick={handleOnErase}
              ></i>
            </div>
          )}
          <div className="counter-text-area">
            <textarea
              type="text"
              className="form-control fancytext"
              style={{
                width: "100%",
                backgroundColor: "#333333 !important",
              }}
              onChange={(e) => handleOnChange(e)}
              name="text"
              value={text}
              placeholder="Type Here & Showdown 30+ Fancy Text"
            />
          </div>
        </div>

        <div className="button lowercase-center-alignment-new">
          <button onClick={handleOnClick}>Show</button>
        </div>

        <div id="result" className="result-text-alignment">
          {answer?.length > 0 &&
            answer?.map((item, indx) => (
              <>
                <p>{MapData[indx].name}</p>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control text-2"
                    placeholder={MapData[indx].placeholder}
                    id={indx}
                    readOnly="readonly"
                    value={item}
                  />
                  <div
                    className="copy-text-alignment"
                    onClick={() => {
                      clickToCopy(indx);
                      setShow(true);
                      toast.success("Copied");
                    }}
                  >
                    <span className="active">Copy</span>
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </>
  );
}
export default FancyFont;

import React from "react";
import { useState } from "react";

function TimestampToDate({ Data }) {
  const [text, setText] = useState("");
  const [gmtTime, setGtmTime] = useState("");
  const [istTime, setIstTime] = useState("");
  const [copygmtTime, setCopygmtTime] = useState(false);
  const [copyistTime, setCopyistTime] = useState(false);
  const [errors, setErrors] = useState();

  const handleOnChange = (e) => {
    setErrors();
    setGtmTime("");
    setIstTime("");
    setText(e.target.value);
  };

  const handleCopy = (user) => {
    if (user === gmtTime) {
      navigator.clipboard.writeText(user);
      if (navigator.clipboard.writeText(user)) {
        setCopygmtTime(true);
        setCopyistTime(false);
      }
    } else {
      navigator.clipboard.writeText(user);
      if (navigator.clipboard.writeText(user)) {
        setCopyistTime(true);
        setCopygmtTime(false);
      }
    }
  };

  const handleOnSubmit = () => {
    if (validateForm()) {
      setCopygmtTime(false);
      setCopyistTime(false);
      let timeStemp = text * 1000;
      var ts = new Date(timeStemp);
      setGtmTime(ts.toGMTString());
      setIstTime(ts.toString());
    }
  };
  const validateForm = () => {
    let formIsValid = true;
    if (!text) {
      setErrors("* Please enter timestamp value");
      formIsValid = false;
    }

    return formIsValid;
  };

  return (
    <>
      <div>
        <div className="children-box-alignment">
          <div className="main-globally-counter-box">
            <div className="timeStamp-text-area">
              <input
                type="number"
                placeholder="Timestamp Value "
                onChange={handleOnChange}
                value={text}
                className={errors && "error-input"}
              />
            </div>
            <span style={{ color: "red", fontSize: "15px" }}>{errors}</span>
          </div>
          <div className="button lowercase-center-alignment">
            <button onClick={handleOnSubmit}>Convert</button>
          </div>
          {gmtTime && (
            <div className="main-globally-counter-box">
              <div className="copy-textarea-icon-alignment">
                <div className="" onClick={() => handleCopy(gmtTime)}>
                  <i className="fa-solid fa-copy " title="Copy"></i>
                </div>

                {copygmtTime && (
                  <div>
                    {" "}
                    <a>Copied</a>
                  </div>
                )}
              </div>

              <div className="timeStamp-text-area">
                <input
                  value={gmtTime}
                  placeholder={"GMT Time & Date"}
                  disabled={true}
                />
              </div>

              <div className="copy-textarea-icon-alignment second-details">
                <div className="" onClick={() => handleCopy(istTime)}>
                  <i className="fa-solid fa-copy " title="Copy"></i>
                </div>
                {copyistTime && (
                  <div>
                    {" "}
                    <a>Copied</a>
                  </div>
                )}
              </div>
              <div className="timeStamp-text-area">
                <input
                  value={istTime}
                  placeholder={"IST Time & Date"}
                  disabled={true}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TimestampToDate;

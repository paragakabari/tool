import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";

function DateToTimestamp({ Data }) {
  const [text, setText] = useState();
  const [text2, setText2] = useState("");
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    let liveDateTime = moment(new Date()).format("YYYY-MM-DDTHH:mm:ss");

    setText(liveDateTime);

    const [dateComponents, timeComponents] = liveDateTime.split("T");
    const [year, month, day] = dateComponents.split("-");
    const [hours, minutes, seconds] = timeComponents?.split(":");

    const date = new Date(+year, month - 1, +day, +hours, +minutes, +seconds);
    const unixTimestamp = Math.floor(date.getTime() / 1000);

    setText2(unixTimestamp);
  }, []);

  const handleOnChange = (e) => {
    setText2("");
    setText(e.target.value);
  };

  const handleCopy = (user) => {
    navigator.clipboard.writeText(user);
    if (navigator.clipboard.writeText(user)) {
      setCopy(true);
    }
  };

  const handleOnSubmit = () => {
    if (text) {
      setCopy(false);

      const dateStr = text;
      const [dateComponents, timeComponents] = dateStr.split("T");
      const [year, month, day] = dateComponents.split("-");
      const [hours, minutes, seconds] = timeComponents?.split(":");

      const date = new Date(+year, month - 1, +day, +hours, +minutes, +seconds);
      const unixTimestamp = Math.floor(date.getTime() / 1000);

      setText2(unixTimestamp);
    }
  };

  return (
    <>
      <div>
        <div className="children-box-alignment">
          <div className="image-cropper-box-design-upload-two">
            <div className="timeStamp-text-area">
              <input type="datetime-local" step="2" value={text} onChange={handleOnChange} />
            </div>
          </div>
          <div className="instruction-image-Resize">
            <span>* Modify the date & time and click the convert button to see result.</span>
          </div>
          <div className="button lowercase-center-alignment">
            <button onClick={handleOnSubmit}>Convert</button>
          </div>
          <div className="main-globally-counter-box">
            {text?.length > 0 && (
              <div className="copy-textarea-icon-alignment">
                <div className="" onClick={() => handleCopy(text2)}>
                  <i className="fa-solid fa-copy " title="Copy"></i>
                </div>
                {copy && text2 && (
                  <div>
                    {" "}
                    <a>Copied</a>
                  </div>
                )}
              </div>
            )}
            <div className="timeStamp-text-area">
              <input value={text2} disabled={true} placeholder={"Timestamp Value "} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DateToTimestamp;

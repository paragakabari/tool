import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SeriesOrdering() {
  const [changeupSuare, setChangeupSuare] = useState("");
  const [text, setText] = useState();
  const [copy, setCopy] = useState(false);
  const [placeData, setPlaceData] = useState({
    input: "Ex. 17,23,15,2,7,99,49",
    output: "99,49,23,17,15,7,2",
  });
  const [errors, setErrors] = useState();
  function containsOnlyNumbers(str) {
    return /^[0-9,-/=]*$/.test(str);
  }

  const handleOnChange = (event) => {
    if (containsOnlyNumbers(event.target.value)) {
      if (event.target.value !== "") {
        setPlaceData({});
      } else {
        setPlaceData({
          input: "Ex. 17,23,15,2,7,99,49",
          output: "99,49,23,17,15,7,2",
        });
      }
      setCopy(false);
      setText(event.target.value);
      setErrors("");

      setChangeupSuare("");
    } else {
      setErrors("* Please enter vaild format  ex: 1,2,3,4,5,6,7,8,9,10");
    }
  };

  const handleWhiteSpace = () => {
    if (text) {
      var e = document.getElementById("WhiteSpace");
      var value = e.value;
      const ListItem = text?.split(",");
      if (ListItem) {
        ListItem?.sort(function (a, b) {
          return a - b;
        });

        if (value == "LTG") {
          setChangeupSuare(ListItem.toString());
        } else {
          ListItem.reverse();
          setChangeupSuare(ListItem.toString());
        }
        setCopy(false);
      } else {
        toast.error("Enter valid Formate series");
      }
    } else {
      setErrors("* Please enter number");
    }
  };

  const handleCopy = (user) => {
    navigator.clipboard.writeText(user);
    if (navigator.clipboard.writeText(user)) {
      setCopy(true);
    }
  };

  const handleOnErase = () => {
    setText("");
    setChangeupSuare("");
    setCopy(false);
  };

  return (
    <>
      <ToastContainer />
      <div>
        <div className="main-globally-counter-box">
          <div className="input-new">
            {text && (
              <div className="color-picker-icon">
                <i className="fa-solid fa-eraser" title="Clear" onClick={handleOnErase}></i>
              </div>
            )}

            <textarea className={errors && "error-input"} value={text} placeholder={placeData?.input} onChange={handleOnChange} />
            <span style={{ color: "red", fontSize: "15px" }}>{errors}</span>
          </div>
        </div>

        <div className="commom-box-new truncate-text-top-alignment">
          <div className="input-new">
            <select id="WhiteSpace">
              <option value="GTL">Greatest to Least Numbers</option>
              <option value="LTG">Least to Greatest Numbers</option>
            </select>
          </div>
        </div>
        <div className="button lowercase-center-alignment">
          <button onClick={handleWhiteSpace}>Convert</button>
        </div>
        {changeupSuare && (
        <div className="commom-box-new">
        
            <div className="copy-textarea-icon-alignment">
              <i className="fa-solid fa-copy " title="Copy" onClick={() => handleCopy(changeupSuare)}></i>

              {copy  && (
                <div>
                  <a>Copied</a>
                </div>
              )}
            </div>
         
          <div className="input-new">
            <textarea value={changeupSuare} placeholder={placeData?.output} disabled="true" style={{color:"black"}}/>
          </div>
        </div>)}
      </div> 
    </>
  );
}

export default SeriesOrdering;

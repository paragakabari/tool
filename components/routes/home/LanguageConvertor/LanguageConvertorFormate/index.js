import React, { use, useEffect, useRef, useState } from "react";
import translate from "translate";
import { LanguageData } from "./LanguageData";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { handleCopy } from "../../../../common/commonFunction";

function LanguageFormat() {
  const [text, setText] = useState("");
  const [answer, setAnswer] = useState("");
  const [copy, setCopy] = useState(false);
  const [select, setSelect] = useState("");
  const [errors, setErrors] = useState("");
  const [errorsBox, setErrorsBox] = useState("");

  translate.engine = "google";
  translate.key = process.env.GOOGLE_KEY;

  const handleOnErase = () => {
    setText("");
    setCopy(false);
    setAnswer("");
  };

  const handleOnChange = (e) => {
    setText(e.target.value);
    setCopy(false);
    setAnswer("");
    setErrors("");
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
      </>
    );
  };

  const handleOnSelect = async (item) => {
    setErrorsBox("");
    setCopy(false);
    setSelect(item?.languageCode);
  };

  const handleOnSubmit = async () => {
    if (isValidate()) {
      const textConverted = await translate(text, select);
      setAnswer(textConverted);
    }
  };

  const isValidate = () => {
    let formIsValid = true;
    if (!text || text.trim() === "") {
      setErrors("* Please enter text");
      formIsValid = false;
    }
    if (!select || select.trim() === "") {
      setErrorsBox("* Please select language");
      formIsValid = false;
    }
    return formIsValid;
  };

  const handleClearFun = () => {
    setSelect("");
    setCopy(false);
    setAnswer("");
  };

  return (
    <>
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
            className={errors && "error-input"}
            placeholder="Type in english here for convert"
            type="text"
            name="firstInput"
            value={text}
            onChange={(e) => handleOnChange(e)}
          />
          <span>{errors}</span>
        </div>
      </div>

      <div className="language-search-box react-search-auto-fill coverter-tools">
        <div className={errorsBox && "language-error-text"}>
          <ReactSearchAutocomplete
            placeholder="Search language. Ex - Russia(Russian)"
            items={LanguageData?.map((item) => {
              return {
                name: item?.name,
                languageCode: item?.code,
              };
            })}
            onSelect={handleOnSelect}
            autoFocus
            formatResult={formatResult}
            onClear={handleClearFun}
          />
        </div>
        <span style={{ color: "red" }}>{errorsBox}</span>
        <div className="button lowercase-center-alignment">
          <button onClick={handleOnSubmit}>Convert</button>
        </div>
      </div>
      {answer && (
        <div className="main-globally-counter-box">
          <div className="copy-textarea-icon-alignment">
            <i
              className="fa-solid fa-copy"
              title="Copy"
              onClick={() => handleCopy(answer, setCopy)}
            ></i>
            {copy && <a>Copied.</a>}
          </div>
          <div className="counter-text-area">
            <textarea
              disabled
              placeholder="First select language on search"
              type="text"
              name="firstInput"
              value={answer}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default LanguageFormat;

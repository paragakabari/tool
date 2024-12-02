import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
function CoderToolsFormat({ Data }) {
  const location = useRouter();
  const Name = location.query.type;
  const [image, setImage] = useState();
  const [copy, setCopy] = useState(false);

  const [text, setText] = useState();
  const [textForDecode, setTextForDecode] = useState();

  const [htmlEncode, setHtmlEncode] = useState("");
  const [htmlDecode, setHtmlDecode] = useState("");
  const [inputValue, setInputValue] = useState({});
  const [answer, setAnswer] = useState();

  const [selectFirst, setSelectFirst] = useState("rgb");
  const [selectSecond, setSelectSecond] = useState("hsl");
  const [colorShow, setColorShow] = useState("");

  const [errors, setErrors] = useState("");
  const [derrors, setDErrors] = useState("");
  const [ierrors, setIerrors] = useState("");

  useEffect(() => {
    setHtmlDecode("");
    setHtmlEncode("");
    setAnswer("");
    setInputValue("");
    setDErrors("");
    setErrors("");
    setColorShow("");
  }, [Name]);

  const handleOnErase = () => {
    setText("");
    setInputValue({ a: "", b: "", c: "", d: "" });
    setColorShow("");
    setAnswer("");
    setCopy(false);
    setHtmlEncode("");
    setHtmlDecode("");
  };

  const handleOnChangeE = (event) => {
    setCopy(false);
    setText(event.target.value);
    setErrors("");
    setHtmlEncode("");
  };
  const handleOnChangeD = (event) => {
    setCopy(false);
    setTextForDecode(event.target.value.trim());
    setDErrors("");
    setHtmlDecode("");
  };

  const handleCopy = (user) => {
    navigator.clipboard.writeText(user);
    if (navigator.clipboard.writeText(user)) {
      setCopy(true);
    }
  };

  function isValidHTML(str) {
    if (/<.+?>/g.test(str)) {
      return true;
    } else {
      return false;
    }
  }

  const htmlencode = () => {
    if (!text) return setErrors("* Please enter HTML Code");
    else if (isValidHTML(text)) {
      let encoded = encodeURIComponent(text)
        .replace(/'/g, "%27")
        .replace(/"/g, "%22");
      setHtmlEncode(encoded);
      setCopy(false);
      setErrors("");
    } else {
      return setErrors("Please enter valid HTML Code!");
    }
  };

  const htmldecode = () => {
    if (!text) return setDErrors("* Please enter HTML Encoded Code");
    let decoded = decodeURIComponent(text.replace(/\+/g, " "));
    setHtmlDecode(decoded);
    setCopy(false);
    setErrors("");
  };

  useEffect(() => {
    setIerrors("");
  }, [selectFirst]);

  const handleOnChanage = (e) => {
    setAnswer("")
    setCopy(false);
    const { name, value } = e.target;
    // validate(e, name, value);
    setInputValue({ ...inputValue, [name]: value });
  };

  // const handleOnClick = (e) => {
  //   setCopy(false);
  //   if (e) e.preventDefault();
  //   // if( Object.keys(inputValue).length !==0 ){
  //   if (
  //     selectFirst === "rgb" ||
  //     selectFirst === "hsl" ||
  //     selectFirst === "hsv" ||
  //     selectFirst === "hwb"
  //   ) {
  //     setAnswer(
  //       convert[selectFirst][selectSecond](
  //         inputValue.a,
  //         inputValue.b,
  //         inputValue.c
  //       )
  //     );
  //     if (selectSecond == "keyword") {
  //       setColorShow(
  //         convert[selectFirst][selectSecond](
  //           inputValue.a,
  //           inputValue.b,
  //           inputValue.c
  //         )
  //       );
  //     } else {
  //       setColorShow(
  //         convert[selectSecond].keyword(
  //           convert[selectFirst][selectSecond](
  //             inputValue?.a,
  //             inputValue?.b,
  //             inputValue?.c
  //           )
  //         )
  //       );
  //     }
  //   } else if (selectFirst === "cmyk") {
  //     setAnswer(
  //       convert[selectFirst][selectSecond](
  //         inputValue.a,
  //         inputValue.b,
  //         inputValue.c,
  //         inputValue.d
  //       )
  //     );
  //     if (selectSecond == "keyword") {
  //       setColorShow(
  //         convert[selectFirst][selectSecond](
  //           inputValue.a,
  //           inputValue.b,
  //           inputValue.c,
  //           inputValue.d
  //         )
  //       );
  //     } else {
  //       setColorShow(
  //         convert[selectSecond].keyword(
  //           convert[selectFirst][selectSecond](
  //             inputValue.a,
  //             inputValue.b,
  //             inputValue.c,
  //             inputValue.d
  //           )
  //         )
  //       );
  //     }
  //   } else {
  //     setAnswer(convert[selectFirst][selectSecond](inputValue.a));
  //     if (selectSecond == "keyword") {
  //       setColorShow(convert[selectFirst][selectSecond](inputValue.a));
  //     } else {
  //       setColorShow(
  //         convert[selectSecond].keyword(
  //           convert[selectFirst][selectSecond](inputValue.a)
  //         )
  //       );
  //     }
  //   }
  //   // }
  //   // else{
  //   //   toast.error("Input is required!");
  //   //   }
  // };

  return (
    <>
      <ToastContainer />
      {/* html-encode */}
      {Name === "html-encode" && (
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
                placeholder="Enter HTML Code to encode here... eg.<HTML> Hello </HTML>"
                value={text}
                onChange={handleOnChangeE}
              />
              {<span id="error">{errors}</span>}
              <br></br>
            </div>
          </div>
          <div className="button lowercase-center-alignment">
            <button onClick={htmlencode}>Encode</button>
          </div>
          {htmlEncode && (
            <div className="main-globally-counter-box">
              <div className="copy-textarea-icon-alignment">
                <i
                  className="fa-solid fa-copy "
                  title="Copy"
                  onClick={() => handleCopy(htmlEncode)}
                ></i>

                {copy && (
                  <div>
                    <a>Copied</a>
                  </div>
                )}
              </div>
              <div className="counter-text-area">
                <textarea value={htmlEncode} disabled="true" />
              </div>
            </div>
          )}
        </>
      )}

      {/* html-decode */}
      {Name === "html-decode" && (
        <>
          <div className="main-globally-counter-box">
            {textForDecode?.length > 0 && (
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
                className={derrors && "error-input"}
                placeholder="Enter HTML Encoded Code to decode here..."
                value={textForDecode}
                onChange={handleOnChangeD}
              />
              {<span id="error">{derrors}</span>}
              <br></br>
            </div>
          </div>
          <div className="button lowercase-center-alignment">
            <button onClick={htmldecode}>Decode</button>
          </div>
          {htmlDecode && (
            <div className="main-globally-counter-box">
              <div className="copy-textarea-icon-alignment">
                <i
                  className="fa-solid fa-copy "
                  title="Copy"
                  onClick={() => handleCopy(htmlDecode)}
                ></i>

                {copy && (
                  <div>
                    <a>Copied</a>
                  </div>
                )}
              </div>
              <div className="counter-text-area">
                <textarea value={htmlDecode} disabled="true" />
              </div>
            </div>
          )}
        </>
      )}

      {/* color-convertor */}
      {/* {Name === "color-convertor" && (
        <div>
          <div className="colorCovertor-box-design">
            {(inputValue?.a?.length ||
              inputValue?.b?.length ||
              inputValue?.c?.length ||
              inputValue?.d?.length) > 0 && (
              <div className="color-picker-icon">
                <i
                  className="fa-solid fa-eraser"
                  title="Clear"
                  onClick={handleOnErase}
                ></i>
              </div>
            )}

            <div className="colorCovertor-three-grid-input">
              {(selectFirst === "rgb" ||
                selectFirst === "hsl" ||
                selectFirst === "hsv" ||
                selectFirst === "hwb") && (
                <>
                  <div className="color-input-alignment">
                    <input
                      type="number"
                      placeholder="value between 0-255"
                      name="a"
                      onChange={(e) => handleOnChanage(e)}
                      value={inputValue?.a}
                    />
                  </div>
                  <div className="color-input-alignment">
                    <input
                      type="number"
                      placeholder="value between 0-255"
                      name="b"
                      onChange={(e) => handleOnChanage(e)}
                      value={inputValue?.b}
                    />
                  </div>
                  <div className="color-input-alignment">
                    <input
                      type="number"
                      placeholder="value between 0-255"
                      name="c"
                      onChange={(e) => handleOnChanage(e)}
                      value={inputValue?.c}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="colorCovertor-four-grid-input">
              {selectFirst === "cmyk" && (
                <>
                  <div className="color-input-alignment">
                    <input
                      type="number"
                      placeholder="value between 0-255"
                      name="cmyka"
                      onChange={(e) => handleOnChanage(e)}
                      value={inputValue?.a}
                    />
                  </div>
                  <div className="color-input-alignment">
                    <input
                      type="number"
                      placeholder="value between 0-255"
                      name="cmykb"
                      onChange={(e) => handleOnChanage(e)}
                      value={inputValue?.b}
                    />
                  </div>
                  <div className="color-input-alignment">
                    <input
                      type="number"
                      placeholder="value between 0-255"
                      name="cmykc"
                      onChange={(e) => handleOnChanage(e)}
                      value={inputValue?.c}
                    />
                  </div>
                  <div className="color-input-alignment">
                    <input
                      type="number"
                      placeholder="value between 0-255"
                      name="cmykd"
                      onChange={(e) => handleOnChanage(e)}
                      value={inputValue?.d}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="colorCovertor-one-grid-input">
              {(selectFirst === "hex" ||
                selectFirst === "ansi" ||
                selectFirst === "ansi16" ||
                selectFirst === "keyword") && (
                <>
                  <div className="color-input-alignment">
                    <input
                      type="text"
                      placeholder="Type Proper value hex=#FFC0CB, colorname=pink, ansi16=30"
                      name="a"
                      onChange={(e) => handleOnChanage(e)}
                      value={inputValue?.a}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="colorCovertor-two-grid-input">
              <div className="color-input-alignment">
                <select
                  id="firstSelect"
                  name="firstSelect"
                  onChange={(e) => {
                    setSelectFirst(e.target.value);
                    setCopy(false);
                  }}
                  // value={firstSelect}
                >
                  <option value="rgb" selected>
                    RGB
                  </option>

                  <option value="hsv">HSV</option>
                  <option value="hwb">HWB</option>
                  <option value="cmyk">CMYK</option>

                  <option value="ansi16">ANSI16</option>
                  <option value="hex">HEX</option>
                  <option value="keyword">COLOR NAME</option>
                </select>
              </div>

              <div className="color-input-alignment">
                <select
                  id="secondSelect"
                  name="secondSelect"
                  onChange={(e) => {
                    setSelectSecond(e.target.value);
                    setCopy(false);
                  }}
                  value={inputValue?.secondSelect}
                >
                  {selectFirst !== "rgb" && (
                    <option value="rgb" selected>
                      RGB
                    </option>
                  )}
                  {selectFirst !== "hsv" && (
                    <option value="hsv" selected>
                      HSV
                    </option>
                  )}
                  {selectFirst !== "hwb" && (
                    <option value="hwb" selected>
                      HWB
                    </option>
                  )}
                  {selectFirst !== "cmyk" && (
                    <option value="cmyk" selected>
                      CMYK
                    </option>
                  )}
                  {(selectFirst !== "hsl" || selectFirst !== "keyword") && (
                    <option value="hsl" selected>
                      HSL
                    </option>
                  )}

                  {selectFirst !== "ansi16" && (
                    <option value="ansi16" selected>
                      ANSI16
                    </option>
                  )}
                  {selectFirst !== "hex" && (
                    <option value="hex" selected>
                      HEX
                    </option>
                  )}
                  {selectFirst !== "keyword" && (
                    <option value="keyword" selected>
                      COLOR NAME
                    </option>
                  )}
                </select>
              </div>
            </div>
          </div>
          <div className="color-button-alignment">
            <div className="button">
              <button onClick={(e) => handleOnClick(e)}>convert</button>
            </div>
          </div>
          {answer && (
            <div className="colorCovertor-box-design">
              <div className="copy-text">
                <span>{selectSecond?.toUpperCase()}</span>

                <div className="copy-textarea-icon-alignment">
                  <i
                    className="fa-solid fa-copy "
                    title="Copy"
                    onClick={() => handleCopy(answer)}
                  ></i>

                  {copy && (
                    <div>
                      <a>Copied</a>
                    </div>
                  )}
                </div>
              </div>
              <div className="color-input-alignment">
                <input value={answer} disabled={true} />
              </div>
              <div
                className="color-box-style-alignment"
                style={{ backgroundColor: `${colorShow}` }}
              >
                <p>{colorShow}</p>
              </div>
            </div>
          )}
        </div>
      )} */}
    </>
  );
}

export default CoderToolsFormat;

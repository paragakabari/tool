import react, { useEffect, useState } from "react";

export default function ArithmeticProgression() {
  const [inputValue, setInputValue] = useState({});

  const [count, setCount] = useState([]);
  const [count1, setCount1] = useState([]);
  const [coma, setComa] = useState("  ");
  const [copy, setCopy] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [errors, setErrors] = useState({});

  const [placeHolder, setPlaceholder] = useState({
    startNumber: "1",
    increaseNumber: "2",
    totalNumber: "10",
    character: "+",
    output: "1 3 5 7 9 11 13 15 17 19",
  });

  const handleOnChange = (e) => {
    setTextValue("");
    if (e.target.value) {
      setPlaceholder({
        startNumber: "",
        increaseNumber: "",
        totalNumber: "",
        character: " ",
        output: "",
      });
    } else {
      setPlaceholder({
        startNumber: "1",
        increaseNumber: "2",
        totalNumber: "10",
        character: "+",
        output: "1 3 5 7 9 11 13 15 17 19",
      });
    }

    setCopy(false);
    const { name, value } = e.target;
    if (name === "character") {
      setComa(value);
    } else {
      setInputValue({ ...inputValue, [name]: value });
      setCount([]);
    }
    setErrors({ ...errors, [name]: "" });
  };

  useEffect(() => {
    let arrayToSting = count1?.toString();
    let addNewSign = arrayToSting.replace(/,/g, coma ? coma : " ");

    setTextValue(addNewSign);
  }, [count1, coma]);

  const handleOnSubmitArithmetic = () => {
    if (validateForm()) {
      setCopy(false);
      let increaseNumber = Number(inputValue.increaseNumber);
      let n = Number(inputValue.startNumber);
      let totalNumber = Number(inputValue.totalNumber);

      for (let i = 1; i <= totalNumber; i++) {
        count.push(n);
        n = n + increaseNumber;
      }
      setCount1(count);
    }
  };

  const handleCopy = (user) => {
    navigator.clipboard.writeText(user);
    if (navigator.clipboard.writeText(user)) {
      setCopy(true);
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let err = {};

    if (!inputValue || !inputValue?.startNumber) {
      err["startNumber"] = "* Please enter number";
      formIsValid = false;
    }
    if (!inputValue || !inputValue?.increaseNumber) {
      err.increaseNumber = "* Please enter number";
      formIsValid = false;
    }
    if (!inputValue || !inputValue?.totalNumber) {
      err.totalNumber = "* Please enter number";
      formIsValid = false;
    }
    setErrors(err);
    return formIsValid;
  };

  return (
    <>
      <div className="commom-box-new aritmetic-top-alignment">
        <div className="aritmetic-two-col-grid">
          <div className="aritmetic-two-col-grid-items">
            <div className="input-new"></div>

            <div className="input-new">
              <label>Start sequence from this number.</label>
              <input
                type="number"
                name="startNumber"
                value={inputValue.startNumber}
                placeholder={placeHolder.startNumber}
                onChange={(e) => {
                  handleOnChange(e);
                }}
                className={errors?.startNumber && "error-input"}
              />
              <span style={{ color: "red", fontSize: "15px" }}>{errors?.startNumber}</span>
            </div>
          </div>
          <div className="aritmetic-two-col-grid-items">
            <div className="input-new"></div>
            <div className="input-new">
              <label>Increase each element by this amount.</label>
              <input
                type="number"
                name="increaseNumber"
                value={inputValue.increaseNumber}
                placeholder={placeHolder.increaseNumber}
                onChange={(e) => {
                  handleOnChange(e);
                }}
                className={errors?.increaseNumber && "error-input"}
              />
              <span style={{ color: "red", fontSize: "15px" }}>{errors?.increaseNumber}</span>
            </div>
          </div>
          <div className="aritmetic-two-col-grid-items">
            <div className="input-new">
              <label>Number of elements in sequence.</label>
              <input
                type="number"
                name="totalNumber"
                value={inputValue.totalNumber}
                placeholder={placeHolder.totalNumber}
                onChange={(e) => {
                  handleOnChange(e);
                }}
                className={errors?.totalNumber && "error-input"}
              />
              <span style={{ color: "red", fontSize: "15px" }}>{errors?.totalNumber}</span>
            </div>
          </div>
          <div className="aritmetic-two-col-grid-items">
            <div className="input-new">
              <label>Separate elements in the arithmetic sequence by this character.</label>
              <input type="text" name="character" onChange={handleOnChange} placeholder={placeHolder.character} />
            </div>
          </div>
        </div>
      </div>
      <div className="button lowercase-center-alignment">
        <button onClick={handleOnSubmitArithmetic}>Genrate Now</button>
      </div>
      {textValue && 
      <div className="main-globally-counter-box">
        
        <div className="copy-textarea-icon-alignment">
          <i className="fa-solid fa-copy "  title="Copy"  onClick={() => handleCopy(textValue)}></i>

          {copy && (
            <div>
              {" "}
              <a>Copied</a>
            </div>
          )}
        </div>
        <div className="counter-text-area">
          <textarea value={textValue} placeholder={placeHolder.output} disabled={true} style={{color:"black"}}/>
        </div>
      </div>}
    </>
  );
}

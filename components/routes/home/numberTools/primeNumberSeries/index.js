import react, { useEffect, useState } from "react";

function PrimeNumberSeries() {
  const [inputValue, setInputValue] = useState({});
  const [placeValue, setPlaceValue] = useState({
    startNumber: "2",
    totalNumber: "10",
    character: "+",
    output: "2 3 5 7",
  });
  const [count, setCount] = useState([]);
  const [count1, setCount1] = useState([]);
  const [coma, setComa] = useState("  ");
  const [copy, setCopy] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [errors, setErrors] = useState({});

  const handleOnChange = (e) => {
    setTextValue("");
    if (e.target.value) {
      setPlaceValue({
        startNumber: "",
        totalNumber: "",
        character: "",
        output: "",
      });
    } else {
      setPlaceValue({
        startNumber: "2",
        totalNumber: "10",
        character: "+",
        output: "2 3 5 7",
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
      let lowerNumber = Number(inputValue.startNumber);
      let higherNumber = Number(inputValue.totalNumber);

      for (let i = lowerNumber; i <= higherNumber; i++) {
        let flag = 0;

        // looping through 2 to user input number
        for (let j = 2; j < i; j++) {
          if (i % j == 0) {
            flag = 1;
            break;
          }
        }

        // if number greater than 1 and not divisible by other numbers
        if (i > 1 && flag == 0) {
          count.push(i);
        }
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
      err.startNumber = "* Please enter number";
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
            <div className="input-new">
              <label>Enter Lower Number</label>
              <input
                type="number"
                name="startNumber"
                value={inputValue.startNumber}
                placeholder={placeValue.startNumber}
                onChange={(e) => {
                  handleOnChange(e);
                }}
                className={errors?.startNumber && "error-input"}
              />
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors?.startNumber}
              </span>
            </div>
          </div>

          <div className="aritmetic-two-col-grid-items">
            <div className="input-new">
              <label>Enter Higher Number</label>
              <input
                type="number"
                name="totalNumber"
                value={inputValue.totalNumber}
                placeholder={placeValue.totalNumber}
                onChange={(e) => {
                  handleOnChange(e);
                }}
                className={errors?.totalNumber && "error-input"}
              />
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors?.totalNumber}
              </span>
            </div>
          </div>
          <div className="aritmetic-two-col-grid-items">
            <div className="input-new">
              <label>
                Separate elements in the Prime numbers by this character.
              </label>
              <input
                type="text"
                name="character"
                onChange={handleOnChange}
                placeholder={placeValue.character}
              />{" "}
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
          <i
            className="fa-solid fa-copy "  title="Copy" 
            onClick={() => handleCopy(textValue)}
          ></i>

          {copy  && (
            <div>
              {" "}
              <a>Copied</a>
            </div>
          )}
        </div>
        <div className="counter-text-area">
          <textarea 
            value={textValue}
            placeholder={placeValue.output}
            disabled={true}
            style={{color:"black"}}
          />
        </div>
      </div>}
    </>
  );
}

export default PrimeNumberSeries;

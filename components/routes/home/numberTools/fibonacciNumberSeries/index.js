import react, { useEffect, useState } from "react";

function FibonacciNumberSeries() {
  const [inputValue, setInputValue] = useState({});
  const [count, setCount] = useState([]);
  const [count1, setCount1] = useState([]);
  const [coma, setComa] = useState("  ");
  const [copy, setCopy] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [errors, setErrors] = useState();

  const handleOnChange = (e) => {
    setCopy(false);
    const { name, value } = e.target;
    if (name === "character") {
      setComa(value);
    } else {
      setInputValue({ ...inputValue, [name]: value });
      setCount([]);
    }
    setErrors("");
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

      let n1 = 0,
        n2 = 1,
        nextTerm;

      for (let i = 1; i <= lowerNumber; i++) {
        count.push(n1);
        nextTerm = n1 + n2;
        n1 = n2;
        n2 = nextTerm;
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

    if (!inputValue || !inputValue.startNumber) {
      setErrors("* Please enter number");

      formIsValid = false;
    }

    return formIsValid;
  };
  return (
    <>
      <div className="commom-box-new aritmetic-top-alignment">
        <div className="aritmetic-two-col-grid">
          <div className="aritmetic-two-col-grid-items">
            <div className="input-new">
              <label>Enter the number of terms</label>
              <input
                type="number"
                name="startNumber"
                value={inputValue?.startNumber}
                placeholder="10"
                onChange={(e) => {
                  handleOnChange(e);
                }}
                className={errors && "error-input"}
              />
              <span style={{ color: "red", fontSize: "15px" }}>{errors}</span>
            </div>
          </div>

          <div className="aritmetic-two-col-grid-items">
            <div className="input-new">
              <label>
                Separate elements in the Fibonacci series by this character.
              </label>
              <input
                type="text"
                name="character"
                onChange={handleOnChange}
                placeholder=" + "
              />
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

          {copy && (
            <div>
              {" "}
              <a>Copied</a>
            </div>
          )}
        </div>
        <div className="counter-text-area">
          <textarea 
            value={textValue}
            placeholder="0  1  1  2  3  5  8  13  21  34"
            disabled={true}
            style={{color:"black"}}
          />
        </div>
      </div>}
    </>
  );
}

export default FibonacciNumberSeries;

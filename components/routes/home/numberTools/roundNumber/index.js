import react, { useCallback, useRef, useState } from "react";

const RoundNumber = () => {
  const [number, setNumber] = useState();
  const [nodeci, setNodeci] = useState();
  const [nodeciValue, setNodeciValue] = useState();
  const [answer, setAnswer] = useState();
  const [errors, setErrors] = useState({});

  const [copy, setCopy] = useState(false);

  const handleOnClick = () => {
    if (validateForm()) {
      let x = number * nodeci;
      let y = Math.round(x);
      let z = y / nodeci;
      setAnswer(z);
      setCopy(false);
    }
  };

  const handleOnChange = (e) => {
    setAnswer("");
    setNumber(e.target.value);
    setCopy(false);
    setErrors({ ...errors, [e.target.name]: "" });
  };
  const handleOnChangesec = (e) => {
    setAnswer("");
    setNodeciValue(e.target.value);
    setNodeci(Math.pow(10, e.target.value));
    setCopy(false);
    setErrors({ ...errors, [e.target.name]: "" });
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

    if (!number) {
      err.value = "* Please enter number";
      formIsValid = false;
    }
    if (!nodeciValue) {
      err.number = "* Please enter number";
      formIsValid = false;
    }

    setErrors(err);
    return formIsValid;
  };

  return (
    <>
      <div className="commom-box-new">
        <div className="input-new">
          <label>Enter a value here.</label>

          <input
            type="number"
            name="value"
            placeholder="Ex. 121.315"
            value={number}
            className={errors?.value && "error-input"}
            onChange={(e) => {
              e.target.value >= 0 && handleOnChange(e);
            }}
          ></input>
          <span style={{ color: "red", fontSize: "15px" }}>
            {errors?.value}
          </span>
        </div>
      </div>
      <div className="commom-box-new aritmetic-top-alignment">
        <div className="">
          <div className="">
            <div className="input-new">
              <label>Enter round precision here.</label>
              <input
                type="number"
                className={errors?.number && "error-input"}
                name="number"
                onChange={(e) => {
                  e.target.value >= 0 && handleOnChangesec(e);
                }}
              />
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors?.number}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="button arithmetic-button-center-alignment-new-one">
        <button onClick={handleOnClick}>Generate Now</button>
      </div>
      {answer &&
      <div className="commom-box-new">
       
        <div className="copy-icon-new">
          <i
            className="fa-solid fa-copy "  title="Copy" 
            onClick={() => handleCopy(answer)}
          ></i>

          {copy  && (
            <div>
              {" "}
              <a>Copied</a>
            </div>
          )}
        </div>
        <div className="input-new" style={{ position: "relative" }}>
          <input value={answer} style={{color:"black"}}/>
        </div>
      </div>}
    </>
  );
};

export default RoundNumber;

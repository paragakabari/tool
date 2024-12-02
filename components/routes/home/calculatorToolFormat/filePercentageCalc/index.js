import React, { useState } from "react";

export default function FilePercentageCalc({ Data }) {
 
  const [perCalc, setPerCalc] = useState();
  const [perce, setPerce] = useState();
 
  const [errors, setErrors] = useState({});
 

  const handleChange = (e) => {
    setPerce();
    const { name, value } = e.target;
    setPerCalc({ ...perCalc, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let formIsValid = true;
    let err = {};
    if (!perCalc || !perCalc?.amount) {
      err.amount = "* Required";
      formIsValid = false;
    }
    if (!perCalc || !perCalc?.percentage) {
      err.percentage = "* Required";
      formIsValid = false;
    }
    setErrors(err);
    return formIsValid;
  };

  const handleCalculate = () => {
    if (validateForm()) {
      var percentageCalc = perCalc?.amount * (perCalc?.percentage / 100);
      setPerce(percentageCalc);
    }
  };

  return (
    <div>
      <div className="children-box-alignment">
        <div className="percentage-calculator-design">
          <div className="two-col-grid">
            <div className="two-col-grid-items">
              <div className="text-grid">
                <div className="text-grid-items">
                  <span>What is</span>
                  {(errors?.amount || errors?.percentage) && (
                    <span style={{ color: "white", fontSize: "15px" }}>
                      {errors?.amount}
                    </span>
                  )}
                </div>
                <div className="text-grid-items">
                  <div className="percentage-input">
                    <input
                      type="number"
                      name="amount"
                      placeholder="10000"
                      onChange={(e) => handleChange(e)}
                      className={errors?.amount && "error-input"}
                    />
                    <span style={{ color: "red", fontSize: "15px" }}>
                      {errors?.amount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="two-col-grid-items">
              <div className="text-grid">
                <div className="text-grid-items text-child-text">
                  <span>% of</span>
                  {(errors?.amount || errors?.percentage) && (
                    <span style={{ color: "white", fontSize: "15px" }}>
                      {errors?.percentage}
                    </span>
                  )}
                </div>
                <div className="text-grid-items">
                  <div className="percentage-input">
                    <input
                      type="number"
                      name="percentage"
                      placeholder="10"
                      onChange={(e) => handleChange(e)}
                      className={errors?.percentage && "error-input"}
                    />
                    <span style={{ color: "red", fontSize: "15px" }}>
                      {errors?.percentage}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="percentage-final-answer">
            <div className="sec-grid">
              <div className="sec-grid-items">
                <div className="button">
                  <button onClick={() => handleCalculate()}>Calculate</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {perce &&
        <div className="gst-result-box">
          <div className="text-alignment">
            <p>Answer is</p>
            <span>{perce?.toFixed(2)}</span>
          </div>
        </div>}
      </div>
    </div>
  );
}

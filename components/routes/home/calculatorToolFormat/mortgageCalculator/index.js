import React, { useState } from "react";

import { useRouter } from "next/router";

function MortgageCalculator(Data) {
  const router = useRouter();
  const [errors, setErrors] = useState({});

  const [inputValue, setInputValue] = useState();
  const [ans, setAns] = useState();
  const [year, setYear] = useState();

  const handleChange = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
    setYear();
    setAns();
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    if (validateForm()) {
      if (inputValue?.lone && inputValue?.rate && inputValue?.LN) {
        var principal = inputValue?.lone;
        var rate = inputValue?.rate;
        var term = inputValue?.LN;

        if (rate > 1) {
          rate = rate * 0.01;
        } else {
          rate = rate;
        }
        //Can accept term in years or months
        if (term <= 30) {
          term = term * 12;
        } else {
          term = term;
        }

        const monthlyRate = rate / 12;
        const factor = Math.pow(monthlyRate + 1, term);
        const numerator = monthlyRate * factor;
        const denominator = factor - 1;
        const quotient = numerator / denominator;
        const payment = principal * quotient;
        const yearly = payment * 12 * inputValue?.LN;

        setAns(payment.toFixed(2));
        setYear(yearly.toFixed(2));
      }
    }
  };
  const validateForm = () => {
    let formIsValid = true;
    let err = {};
    if (!inputValue || !inputValue?.lone) {
      err.lone = "* Please enter amount:";
      formIsValid = false;
    }
    if (!inputValue || !inputValue?.rate) {
      err.rate = "* Please enter rate";
      formIsValid = false;
    }
    if (!inputValue || !inputValue?.LN) {
      err.LN = "* Please enter years";
      formIsValid = false;
    }
    setErrors(err);
    return formIsValid;
  };

  const reset = () => {
    setInputValue({
      lone: "",
      rate: "",
      LN: "",
    });
    setErrors({
      lone: "",
      rate: "",
      LN: "",
    });
    setAns("");
    setYear("");
  };

  return (
    <>
      <div>
        <div className="children-box-alignment">
        

          <>
            <div className="children-box-alignment">
              <div className="globally-file-title-and-sub-title">
                <h3>Mortgage Calculator</h3>
              </div>
              <div className="commom-box-new mortage-calc-input-alignment">
                <div className="input-new">
                  <label>Lone Amount:</label>
                  <div className="amount-label-relative">
                    <input type="number" placeholder="100000" name="lone" value={inputValue?.lone} onChange={handleChange}  className={errors?.lone && "error-input"} />
                    <div className="input-right-dolor-alignment">
                      <span>$</span>
                    </div>
                  </div>
                  <span style={{ color: "red", fontSize: "15px" }}>{errors?.lone}</span>
                </div>
                <div className="input-new">
                  <label>Interest Rate: </label>
                  <div className="amount-label-relative">
                    <input type="number"  className={errors?.rate && "error-input"} placeholder="10" name="rate" value={inputValue?.rate} onChange={handleChange} />
                    <div className="input-right-dolor-alignment">
                      <span>%</span>
                    </div>
                  </div>
                  <span style={{ color: "red", fontSize: "15px" }}>{errors?.rate}</span>
                </div>
                <div className="input-new">
                  <label>loan term:</label>
                  <div className="amount-label-relative">
                    <input type="number" placeholder="12" name="LN"  className={errors?.LN && "error-input"} value={inputValue?.LN} onChange={handleChange} />
                    <div className="input-right-dolor-alignment">
                      <span>years</span>
                    </div>
                  </div>
                  <span style={{ color: "red", fontSize: "15px" }}>{errors?.LN}</span>
                </div>
              </div>
              <div className="mortagr-button-alignment">
                <div className="button lowercase-center-alignment">
                  <button onClick={handleOnSubmit}>Calculate</button>
                </div>
                <div className="button lowercase-center-alignment">
                  <button onClick={reset}>Reset</button>
                </div>
              </div>
              <div className="counter-details-box">
                <div className="all-text-content-alignment">
                  <div className="text-align-style">
                    <span>Your estimated monthly payment is</span>
                    <p>$ {ans}</p>
                  </div>
                  <div className="text-align-style">
                    <span>Your estimated yearly payment is</span>
                    <p>$ {year}</p>
                  </div>
                </div>
              </div>
            </div>
          </>

         
        </div>
      </div>
    </>
  );
}

export default MortgageCalculator;

import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";


export default function FileLoanCalc({ Data }) {
 
  const router = useRouter();
  const [loan, setLoan] = useState();
  const [errors, setErrors] = useState({});
  const [totalLoan, setTotalLoan] = useState({
    monthlyPayment: 0,
    totalIntrest: 0,
    totalAmount: 0,
  });

  const handleChange = (e) => {
    setTotalLoan({
      monthlyPayment: 0,
      totalIntrest: 0,
      totalAmount: 0,
    });
    const { name, value } = e?.target;
    setLoan({ ...loan, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // ------------------------------------------
  const P = loan?.amount;
  const N = loan?.duration * 12;
  const R = loan?.intrest / 100 / 12;

  const Y = (1 + R) ** N;
  const EMI = (P * R * Y) / (Y - 1);
  const totalAmount = EMI * N;
  const totalIntrest = totalAmount - loan?.amount;
  // ------------------------------------------

  const validateForm = () => {
    let formIsValid = true;
    let err = {};

    if (!loan || !loan.amount) {
      err.amount = "* Please enter Loan Amount";
      formIsValid = false;
    }
    if (!loan || !loan.duration) {
      err.duration = "* Please enter duration of loan";
      formIsValid = false;
    }
    if (!loan || !loan.intrest) {
      err.intrest = "* Please enter intrest of loan(%)";
      formIsValid = false;
    }
    setErrors(err);
    return formIsValid;
  };

  const handleCalculate = () => {
    if (validateForm()) {
      setTotalLoan({
        ...totalLoan,
        monthlyPayment: EMI,
        totalIntrest: totalIntrest,
        totalAmount: totalAmount,
      });
    }
  };

  return (
    <div>
      <div className="children-box-alignment">
        <div className="load-calc-box">
          <div className="salry-input">
            <label>Estimated Amount of Loan</label>
            <input
              name="amount"
              type="number"
              value={loan?.amount}
              onChange={(e) => {
                e.target.value >= 0 && handleChange(e);
              }}
              className={errors?.amount && "error-input"}
            />
            <span style={{ color: "red", fontSize: "15px" }}>
              {errors?.amount}
            </span>
          </div>
          <div className="salry-input">
            <label>Intrest of Loan(%) </label>
            <input
              name="intrest"
              type="text"
              value={loan?.intrest}
              onChange={(e) => {
                e.target.value >= 0 && handleChange(e);
              }}
              className={errors?.intrest && "error-input"}
            />
            <span style={{ color: "red", fontSize: "15px" }}>
              {errors?.intrest}
            </span>
          </div>
          <div className="salry-input">
            <label>Duration of Loan(in years) </label>
            <input
              name="duration"
              type="text"
              value={loan?.duration}
              onChange={(e) => {
                e.target.value >= 0 && handleChange(e);
              }}
              className={errors?.duration && "error-input"}
            />
            <span style={{ color: "red", fontSize: "15px" }}>
              {errors?.duration}
            </span>
          </div>
        </div>
        <div className="loan-amount-button-center-alignment">
          <div className="button">
            <button onClick={() => handleCalculate()}>Calculate</button>
          </div>
        </div>

        <div className="gst-result-box">
          <div className="text-alignment">
            <p>Payment Every Month :</p>
            <span>{totalLoan?.monthlyPayment?.toFixed(2)}</span>
          </div>

          <div className="text-alignment">
            <p>Total amount of Intrest :</p>
            <span>{totalLoan?.totalIntrest?.toFixed(2)}</span>
          </div>
          <div className="text-alignment">
            <p>You have to pay amount: </p>
            <span>{totalLoan?.totalAmount?.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

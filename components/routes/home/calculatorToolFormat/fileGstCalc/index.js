import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

export default function FileGstCalc({ Data }) {
  
  const router = useRouter();
  const [gstValue, setGstValue] = useState();
  const [netAmount, setNetAmount] = useState();
  const [inclusiveAmount, setInclusiveAmount] = useState();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setInclusiveAmount();
    setNetAmount();
    const { name, value } = e.target;
    setGstValue({ ...gstValue, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let formIsValid = true;
    let err = {};
    if (!gstValue || !gstValue.amount) {
      err.amount = "* Please enter Amount";
      formIsValid = false;
    }
    if (!gstValue || !gstValue.gst) {
      err.gst = "* Please enter GST(%)";
      formIsValid = false;
    }
    setErrors(err);
    return formIsValid;
  };

  const handleCalculate = () => {
    if (validateForm()) {
      var price = gstValue?.amount;
      var taxvalue = price * (gstValue?.gst / 100);
      var total = parseInt(price) + taxvalue;
      setNetAmount(total);

      var gst = 1 + gstValue?.gst / 100;
      var goodsValue = gstValue?.amount / gst;
      setInclusiveAmount(goodsValue);
    }
  };
  return (
    <div>
      <div className="children-box-alignment">
        <div className="globally-gst-calculter">
          <div className="two-radio-button-alignment">
            <div>
              <input
                type="radio"
                name="type"
                id="inclusive"
                value="inclusive"
                defaultChecked
                onChange={(e) => handleChange(e)}
              />
              <span>GST Inclusive</span>
            </div>
            <div>
              <input
                type="radio"
                name="type"
                id="exclusive"
                value="exclusive"
                onChange={(e) => handleChange(e)}
              />
              <span>GST Exclusive</span>
            </div>
          </div>
          <div className="gst-input">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              placeholder="10000"
              value={gstValue?.amount}
              onChange={(e) => {
                e.target.value >= 0 && handleChange(e);
              }}
              className={errors?.amount && "error-input"}
            />{" "}
            <span style={{ color: "red", fontSize: "15px" }}>
              {errors?.amount}
            </span>
          </div>
          <div className="gst-input">
            <label>GST</label>
            <input
              type="number"
              name="gst"
              placeholder="18"
              value={gstValue?.gst}
              onChange={(e) => {
                e.target.value >= 0 && handleChange(e);
              }}
              className={errors?.gst && "error-input"}
            />{" "}
            <span style={{ color: "red", fontSize: "15px" }}>
              {errors?.gst}
            </span>
          </div>
        </div>
        <div className="gst-two-button-center-alignment">
          <div className="button">
            <button onClick={() => handleCalculate()}>Calculate GST</button>
          </div>
        </div>
        {gstValue?.type == "exclusive" ? (
          <div className="gst-result-box">
            <div className="text-alignment">
              <p>Gross Amount </p>
              <span>{gstValue?.amount}</span>
            </div>
            <div className="text-alignment">
              <p>GST (%)</p>
              <span>{gstValue?.gst}</span>
            </div>
            <div className="text-alignment">
              <p>Net Amount (excluding GST)</p>
              <span>{netAmount}</span>
            </div>
          </div>
        ) : (
          <div className="gst-result-box">
            <div className="text-alignment">
              <p>Net Amount </p>
              <span>{gstValue?.amount}</span>
            </div>
            <div className="text-alignment">
              <p>GST (%)</p>
              <span>{gstValue?.gst}</span>
            </div>
            <div className="text-alignment">
              <p>Gross Amount (including GST)</p>
              <span>{inclusiveAmount?.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { ApiArray } from "../../../../config/API/api.config";
import { country } from "./country";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../../Loader/Loader";

function CurrencyFormat({ Data }) {
  const [inputData, setInputData] = useState({});
  const [resultCurrancy, setResultCurrancy] = useState();
  const [apiLayerApi, setApiLayerApi] = useState("dbgUC5SmXwihUJi38LAF5nAq7YCqVAMA");
  const [againGet, setAgainGet] = useState(false);
  const [validationData, setValidationData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleOnChangeAmount = (e) => {
    setValidationData(false);

    const name = e.target.name;
    setInputData({ ...inputData, [name]: e.target.value });
    setErrors({ ...errors, [name]: "" });
  };

  useEffect(() => {
    if (againGet) {
      setAgainGet(false);
      handleONCUrrency();
    }
  }, [againGet]);

  const handleONCUrrency = () => {
    if (validateForm()) {
      if (inputData?.amount && inputData?.from && inputData?.to) {
        setLoading(true);

        const data = inputData?.to;
        fetch(`https://api.exchangerate-api.com/v4/latest/${inputData?.from}`)
          .then((res) => res.json())
          .then((res) => {
            setResultCurrancy(res?.rates[data] * inputData?.amount);
            setLoading(false);
          })
          .catch((error) => {
            toast.error("Something want wrong");

            // var myHeaders = new Headers();
            // myHeaders.append("apikey", apiLayerApi);

            // var requestOptions = {
            //   method: "GET",
            //   redirect: "follow",
            //   headers: myHeaders,
            // };
            // fetch(`https://api.apilayer.com/fixer/convert?to=${inputData?.to}&from=${inputData?.from}&amount=${inputData?.amount}`, requestOptions)
            //   .then((response) => response.text())
            //   .then((result) => {
            //     let data = JSON.parse(result);
            //     setResultCurrancy(data);
            //     setLoading(false);
            //     let errMessage = data.message?.includes("You have exceeded your daily/monthly API rate limit");
            //     if (errMessage) {
            //       setAgainGet(true);
            //       for (let i = 0; i < ApiArray.length; i++) {
            //         setApiLayerApi(ApiArray[i]);
            //       }
            //     }
            //   })
            //   .catch((error) => {
            //     toast.error("Something want wrong");
            //   });
          });
      }
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let err = {};

    if (!inputData || !inputData?.amount) {
      err.amount = "* Please enter Amount";
      formIsValid = false;
    }
    if (!inputData || !inputData?.from) {
      err.from = "* Please select country";
      formIsValid = false;
    }
    if (!inputData || !inputData?.to) {
      err.to = "* Please select country";
      formIsValid = false;
    }
    setErrors(err);
    return formIsValid;
  };

  return (
    <>
      <ToastContainer />

      <div>
        <div className="lenghth-box-design">
          <div className="two-col-grid">
            <div className="two-col-grid-items">
              <p>From :</p>
              {/* <div className={validationData ? "all-input-design-alignment" : ""}> */}
              <div className="all-input-design-alignment">
                <div>
                  <input type="number" placeholder="1000" name="amount" onChange={handleOnChangeAmount} className={errors?.amount && "error-input"} />
                  <span style={{ color: "red", fontSize: "15px" }}>{errors?.amount}</span>
                </div>
                <div>
                  <select name="from" id="country" onChange={handleOnChangeAmount} className={errors?.from && "error-input"} style={{ cursor: "pointer" }}>
                    {country.map((item, index) => {
                      return (
                        <option value={item.currencyCode} key={index} >
                          {item.countryName}
                        </option>
                      );
                    })}
                  </select>{" "}
                  <span style={{ color: "red", fontSize: "15px" }}>{errors?.from}</span>
                </div>
              </div>
            </div>

            <div className="two-col-grid-items">
              <p> To :</p>
              <div className="all-input-design-alignment">
                <div>
                  <input type="text" name="firstInput" value={resultCurrancy?.toFixed(2)} disabled={true} />
                  {errors?.amount && <span style={{ color: "white", fontSize: "15px" }}>{"none"}</span>}
                </div>
                <div>
                  <select name="to" id="country" onChange={handleOnChangeAmount} className={errors?.to && "error-input"} style={{ cursor: "pointer" }}>
                    {country.map((item, index) => {
                      return (
                        <option value={item.currencyCode} key={index}>
                          {item.countryName}
                        </option>
                      );
                    })}
                  </select>{" "}
                  <span style={{ color: "red", fontSize: "15px" }}>{errors?.to}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="button lowercase-center-alignment">
          <button type="submit" onClick={handleONCUrrency}>
            <span> Convert Currency</span>
            {loading && <Loader />}
          </button>
        </div>
      </div>
    </>
  );
}

export default CurrencyFormat;

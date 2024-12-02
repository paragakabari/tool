import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import styles from "../../fileUploadBox/fileUploadBox.module.scss";
import { useRouter } from "next/router";
import { images } from "../../../../common/CommonArray/FileArray";
import SecondAddBox from "../../../../common/secondAddBox";
import FirstAddBox from "../../../../common/firstAddBox";
import { userLogin } from "../../../../../src/jotaiContext/common";
import { useAtom } from "jotai";
export default function LogCalculator({ Data }) {
  const isUserPro = localStorage.getItem("isPro");
  const router = useRouter();
  const [perCalc, setPerCalc] = useState();
  const [perce, setPerce] = useState();
  const [errors, setErrors] = useState({});
  const [userLoggedin, setUserLoggedIn] = useAtom(userLogin);
  useEffect(() => {
    if (isUserPro) {
      handleIsPro();
    }
  }, [userLoggedin]);
  const handleChange = (e) => {
    setPerce("");
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
      if (perCalc?.amount && perCalc?.percentage) {
        if (perCalc?.percentage == "e") {
          setPerce(Math.log10(perCalc?.amount) / Math.log10(2.7182818));
        } else if (perCalc?.percentage >= 0) {
          setPerce(
            Math.log10(perCalc?.amount) / Math.log10(perCalc?.percentage)
          );
        } else {
          toast.error("Enter Valid Base Value");
        }
      } else {
        if (perCalc?.amount) {
          toast.error("Enter Valid Base Value");
        } else if (perCalc?.percentage) {
          toast.error("Enter Valid head Value");
        } else {
          toast.error("Enter Valid Values");
        }
      }
    }
  };
  return (
    <div>
      <ToastContainer />
      <div className="children-box-alignment">
        <div className="percentage-calculator-design">
          <div className="log-grid-alignment">
            <div className="log-gridItem-alignment">
              <div className="text-grid-items ">
                <h4>log</h4>
              </div>
            </div>
            <div className="log-gridItem-alignment">
              <div className="text-grid-items">
                <div className="percentage-input small-input-alignment">
                  <span style={{ color: "red", fontSize: "15px" }}>
                    {errors?.amount}
                  </span>
                  <input
                    type="number"
                    name="amount"
                    placeholder="10000"
                    onChange={(e) => {
                      e.target.value >= 0 && handleChange(e);
                    }}
                    className={errors?.amount && "error-input"}
                  />
                </div>
              </div>
              <div className="text-grid-items">
                <div className="percentage-input second-input-alignment">
                  <input
                    type="text"
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
          <div className="percentage-final-answer">
            <div className="text-grid-items">
              <div className="percentage-input"></div>
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
        {perce ? (
          <div className="gst-result-box">
            <div className="text-alignment">
              <p>Answer is</p>
              <span>{perce} </span>
            </div>
          </div>
        ) : (
          <div className="gst-result-box">
            <div className="text-alignment">
              <p>Answer is</p>
              <span>0 </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
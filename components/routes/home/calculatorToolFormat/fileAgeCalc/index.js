import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FileAgeCalc({ Data }) {
  
  const [age, setAge] = useState();
  const [date, setDate] = useState({ dob: "2000-05-12", ageDate: "" });
  let dob, diff, years_age, days_diff, months_age, days_age;
  let today;

  useEffect(() => {
    var dateN = new Date();
    var dayN = dateN.getDate();
    var monthN = dateN.getMonth() + 1;
    var yearN = dateN.getFullYear();

    if (monthN < 10) monthN = "0" + monthN;
    if (dayN < 10) dayN = "0" + dayN;

    var todayDate = yearN + "-" + monthN + "-" + dayN;
    setDate({ ...date, ageDate: todayDate });

    today = new Date(todayDate);
    dob = new Date(date?.dob);

    diff = today?.getTime() - dob?.getTime();
    years_age = Math.floor(diff / 31556736000);
    days_diff = Math.floor((diff % 31556736000) / 86400000);
    months_age = Math.floor(days_diff / 30.4167);
    days_age = Math.floor(days_diff % 30.4167);

    setAge(`${years_age} years ${months_age} months ${days_age} days`);
  }, []);

 

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    let formIsValid = true;
    let err = {};
    if (!date || !date?.dob) {
      // err?.dob = "* Please enter valid date";
      formIsValid = false;
    }
    if (!date || !date?.ageDate) {
      // err?.ageDate = "* Please enter valid date";
      formIsValid = false;
    }
    setErrors(err);
    return formIsValid;
  };

  function handleChange(birthday) {
    setAge();

    const { name, value } = birthday?.target;
    setDate({ ...date, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }

  const handleCalculate = () => {
    if (validateForm()) {
      today = new Date(date?.ageDate);
      dob = new Date(date?.dob);

      diff = today?.getTime() - dob?.getTime();
      years_age = Math.floor(diff / 31556736000);
      days_diff = Math.floor((diff % 31556736000) / 86400000);
      months_age = Math.floor(days_diff / 30.4167);
      days_age = Math.floor(days_diff % 30.4167);

      if (years_age > 0 || months_age > 0 || days_age > 0) {
        setAge(`${years_age} years ${months_age} months ${days_age} days`);
      } else {
        toast.error("please enter valid date");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div>
        <div className="globally-age-calculter">
          <div className="age-input">
            <label className="bottom-text">Date of Birth </label>

            <div className="age-input">
              <input
                name="dob"
                id="dob"
                type="date"
                value={date?.dob}
                onChange={(e) => handleChange(e)}
                className={errors?.dob && "error-input"}
              />
            </div>
            <span style={{ color: "red", fontSize: "15px" }}>
              {errors?.dob}
            </span>
          </div>
          <div className="three-col-grid"></div>

          <div className="age-input">
            <label className="bottom-text">Current Age or Age as of</label>

            <div className="age-input">
              <input
                name="ageDate"
                className={errors?.ageDate && "error-input"}
                id="ageDate"
                type="date"
                value={date?.ageDate}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <span style={{ color: "red", fontSize: "15px" }}>
              {errors?.ageDate}
            </span>
          </div>
          <div className="three-col-grid"></div>
        </div>
        <div className="gst-two-button-center-alignment">
          <div className="button">
            <button onClick={() => handleCalculate()}>Calculate</button>
          </div>
        </div>
        <div className="gst-result-box">
          <div className="text-alignment">
            <p>Your Age is:</p>
            <span>{age}</span>
          </div>
        </div>
        <div className="gst-result-box">
          <div className="text-alignment">
            <span>
              Modify the values and click the calculate button to see result.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

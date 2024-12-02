import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";



export default function FileSalaryCalc({ Data }) {
 
 
  const [salaryCalc, setSalaryCalc] = useState({ salary: 0 });
  const [adjusted, setAdjusted] = useState({
    hourlyIncome: 0,
    dailyIncome: 0,
    weeklyIncome: 0,
    annualy: 0,
    totalhour: 0,
  });

  const [unAdjusted, setUnAdjusted] = useState({
    hourlyIncome: 0,
    dailyIncome: 0,
    weeklyIncome: 0,
    annualy: 0,
    unAdjustedmonthly: 0,
    totalhour: 0,
  });

  // -------------Adjusted--------------------------
  let totalhour = parseInt(salaryCalc?.hour) * 4;
  let hourlyIncome = parseInt(salaryCalc?.salary) / totalhour;
  let totalDays = parseInt(salaryCalc?.days) * 4;
  let dailyIncome = parseInt(salaryCalc?.salary) / totalDays;
  let weeklyIncome = dailyIncome * parseInt(salaryCalc?.days);
  let annualy = parseInt(salaryCalc?.salary) * 12;
  // ---------------------------------------

  // -------------Unadjusted--------------------------
  let unadjustDays =
    totalDays * 12 -
    parseInt(salaryCalc?.holidays) -
    parseInt(salaryCalc?.vacation);
  let unAdjustedAnual = unadjustDays * dailyIncome;
  let unAdjustedmonthly = unAdjustedAnual / 12;
  let unAdjustedDaily = unAdjustedmonthly / totalDays;
  let unAdjustedHourly = unAdjustedmonthly / totalhour;
  let unAdjustedWeekly = unAdjustedmonthly / 4;
  // ---------------------------------------

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    let formIsValid = true;
    let err = {};
    if (!salaryCalc || !salaryCalc?.salary) {
      err.salary = "* Please enter salary amount";
      formIsValid = false;
    }
    if (!salaryCalc || !salaryCalc?.hour) {
      err.hour = "* Please enter weekly hours.";
      formIsValid = false;
    }
    if (!salaryCalc || !salaryCalc?.days) {
      err.days = "* Please enter days per week.";
      formIsValid = false;
    }
    if (!salaryCalc || !salaryCalc?.holidays) {
      err.holidays = "* Please enter holidays.";
      formIsValid = false;
    }
    if (!salaryCalc || !salaryCalc?.vacation) {
      err.vacation = "* Please enter Vacation Days.";
      formIsValid = false;
    }
    setErrors(err);
    return formIsValid;
  };

  const handleChange = (e) => {
    setAdjusted({
      hourlyIncome: 0,
      dailyIncome: 0,
      weeklyIncome: 0,
      annualy: 0,
      totalhour: 0,
    });
    setUnAdjusted({
      hourlyIncome: 0,
      dailyIncome: 0,
      weeklyIncome: 0,
      annualy: 0,
      unAdjustedmonthly: 0,
      totalhour: 0,
    });
    const { name, value } = e.target;
    setSalaryCalc({ ...salaryCalc, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleCalculate = () => {
    if (validateForm()) {
      setAdjusted({
        ...adjusted,
        hourlyIncome: hourlyIncome,
        dailyIncome: dailyIncome,
        weeklyIncome: weeklyIncome,
        annualy: annualy,
      });
      setUnAdjusted({
        ...adjusted,
        hourlyIncome: unAdjustedHourly,
        dailyIncome: unAdjustedDaily,
        weeklyIncome: unAdjustedWeekly,
        unAdjustedmonthly: unAdjustedmonthly,
        annualy: unAdjustedAnual,
      });
    }
  };

  return (
    <div>
      <div className="children-box-alignment">
        <div className="main-salary-calculator-box">
          <div className="two-col-grid">
            <div className="two-col-grid-items">
              <div className="salry-input">
                <label>Salary Amount (Per Month)</label>
                <input
                  type="number"
                  value={salaryCalc?.salary}
                  name="salary"
                  onChange={(e) => {
                    e.target.value >= 0 && handleChange(e);
                  }}
                  className={errors?.salary && "error-input"}
                />
              </div>
              <span style={{ color: "red" }}>{errors?.salary}</span>
            </div>

            <div className="two-col-grid-items">
              <div className="salry-input">
                <label>Hours per Week </label>
                <input
                  type="number"
                  name="hour"
                  value={salaryCalc?.hour}
                  onChange={(e) => {
                    e.target.value >= 0 && handleChange(e);
                  }}
                  className={errors?.hour && "error-input"}
                />
              </div>
              <span style={{ color: "red" }}>{errors?.hour}</span>
            </div>
            <div className="two-col-grid-items">
              <div className="salry-input">
                <label>Days per Week </label>
                <input
                  type="number"
                  value={salaryCalc?.days}
                  name="days"
                  onChange={(e) => {
                    e.target.value >= 0 && handleChange(e);
                  }}
                  className={errors?.days && "error-input"}
                />
              </div>
              <span style={{ color: "red" }}>{errors?.days}</span>
            </div>
            <div className="two-col-grid-items">
              <div className="salry-input">
                <label>Holidays per Year </label>
                <input
                  type="number"
                  value={salaryCalc?.holidays}
                  name="holidays"
                  onChange={(e) => {
                    e.target.value >= 0 && handleChange(e);
                  }}
                  className={errors?.holidays && "error-input"}
                />
              </div>
              <span style={{ color: "red" }}>{errors?.holidays}</span>
            </div>
            <div className="two-col-grid-items">
              <div className="salry-input">
                <label>Vacation Days per Year </label>
                <input
                  type="number"
                  value={salaryCalc?.vacation}
                  name="vacation"
                  onChange={(e) => {
                    e.target.value >= 0 && handleChange(e);
                  }}
                  className={errors?.vacation && "error-input"}
                />
              </div>
              <span style={{ color: "red" }}>{errors?.vacation}</span>
            </div>
          </div>
          <div className="button">
            <button onClick={() => handleCalculate()}>Calculate</button>
          </div>
        </div>
        <div className="salary-result-box">
          <table>
            <tr>
              <th></th>
              <th align="center">
                <span>Salary Adjusted After Holidays and Vacation Days</span>
              </th>
              <th align="center">
                <span>Salary Adjusted Before Holidays and Vacation Days</span>
              </th>
            </tr>

            <tr>
              <td align="right">
                <span>Hourly</span>
              </td>
              <td align="center">
                <span>{unAdjusted.hourlyIncome.toFixed(2)} </span>
              </td>
              <td align="right">
                <span>{adjusted.hourlyIncome}</span>
              </td>
            </tr>

            <tr>
              <td align="right">
                <span>Daily</span>
              </td>
              <td align="center">
                <span>{unAdjusted.dailyIncome.toFixed(2)} </span>
              </td>
              <td align="right">
                <span>{adjusted.dailyIncome}</span>
              </td>
            </tr>

            <tr>
              <td align="right">
                <span>Weekly</span>
              </td>
              <td align="center">
                <span>{unAdjusted.weeklyIncome.toFixed(2)} </span>
              </td>
              <td align="right">
                <span>{adjusted.weeklyIncome}</span>
              </td>
            </tr>

            <tr>
              <td align="right">
                <span>Monthly</span>
              </td>
              <td align="center">
                <span>{unAdjusted.unAdjustedmonthly.toFixed(2)} </span>
              </td>
              <td align="right">
                <span>{salaryCalc?.salary}</span>
              </td>
            </tr>

            <tr>
              <td align="right">
                <span>Annual</span>
              </td>
              <td align="center">
                <span>{unAdjusted.annualy.toFixed(2)} </span>
              </td>
              <td align="right">
                <span>{adjusted.annualy}</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

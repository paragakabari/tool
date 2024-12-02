import react, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { ToastContainer, toast } from "react-toastify";

export default function BMICalculator({ Data }) {
  const isUserPro = localStorage.getItem("isPro");
  const router = useRouter();
  const [errors, setErrors] = useState({});

  const [bmi, setBmi] = useState("");
  const [info, setInfo] = useState("");
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [copy, setCopy] = useState(false);

  const handleOnChangeW = (e) => {
    setBmi("");
    setInfo(" ");
    setWeight(e.target.value);
    setCopy(false);
    setErrors({ ...errors, ["weight"]: "" });
  };
  const handleOnChangeH = (e) => {
    setBmi("");
    setInfo(" ");
    setHeight(e.target.value);
    setCopy(false);
    setErrors({ ...errors, ["height"]: "" });
  };

  const validationData = () => {
    let formIsValid = true;
    let errors = {};
    if (!height) {
      formIsValid = false;
      errors["height"] = "* Please enter height";
    }
    if (!weight) {
      formIsValid = false;
      errors["weight"] = "* Please enter weight";
    }
    setErrors(errors);
    return formIsValid;
  };

  const handleBmi = () => {
    if (validationData()) {
      let val = (
        [Number(weight) / Number(height) / Number(height)] * 10000
      ).toFixed(1);
      setBmi(val);
      if (val < 18.5) {
        setInfo("Under Weight");
        setCopy(false);
      } else if (val > 18.5 && val <= 24.9) {
        setInfo("Healthy");
        setCopy(false);
      } else if (val > 24.9 && val < 30) {
        setInfo("Overweight");
        setCopy(false);
      } else {
        setInfo("Obese");
        setCopy(false);
      }
    }
  };

  const handleCopy = (user) => {
    navigator.clipboard.writeText(user);
    if (navigator.clipboard.writeText(user)) {
      setCopy(true);
    }
  };

  return (
    <>
      <ToastContainer />
      <div>
        <div className="children-box-alignment">
          <div className="percentage-calculator-design">
            <div className="input-new">
              <label>Enter Height(cm)</label>

              <input
                type="number"
                value={height}
                onChange={(e) => {
                  handleOnChangeH(e);
                }}
                placeholder="165"
                className={errors["height"] && "error-input"}
              />
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors["height"]}
              </span>
            </div>
            <div className="input-new">
              <label>Enter Weight(kg)</label>

              <input
                type="number"
                value={weight}
                onChange={(e) => {
                  handleOnChangeW(e);
                }}
                placeholder="72"
                className={errors["weight"] && "error-input"}
              />

              <span style={{ color: "red", fontSize: "15px" }}>
                {errors["weight"]}
              </span>
            </div>
            <div className="button arithmetic-button-center-alignment-new-one">
              <button onClick={handleBmi}>Calculate</button>
            </div>
            {bmi &&
            <div className="commom-box-new">
            
              <div className="copy-icon-new">
                <i
                  className="fa-solid fa-copy "
                  title="Copy"
                  onClick={() => handleCopy(bmi + " " + info)}
                ></i>

                {copy  && (
                  <div>
                    {" "}
                    <a>Copied</a>
                  </div>
                )}
              </div>

              <div className="input-new" style={{ position: "relative" }}>
                <label>BMI:-</label>
                <input
                  value={bmi + " " + info}
                  placeholder="26.4 Overweight"
                  disabled={true}
                />
              </div>
            </div>}
          </div>
        </div>
      </div>
    </>
  );
}

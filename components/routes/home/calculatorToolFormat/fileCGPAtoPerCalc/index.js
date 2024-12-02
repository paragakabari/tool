import react, { useState } from "react";

import { useRouter } from "next/router";

export default function CgpaToPerc({ Data }) {
  const router = useRouter();

  const [number, setNumber] = useState();
  const [answer, setAnswer] = useState();
  const [errors, setErrors] = useState();

  const [copy, setCopy] = useState(false);

  const handleOnClick = () => {
    if (validateForm()) {
      let x = number * 9.5;
      setAnswer(x.toFixed(2) + "%");
      setCopy(false);
    }
  };

  const handleOnChange = (e) => {
    setAnswer("");
    setNumber(e.target.value);
    setCopy(false);
    setErrors();
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
      setErrors("* Please enter CGPA/CPI");

      formIsValid = false;
    }

    return formIsValid;
  };

  return (
    <div>
      <div className="children-box-alignment">
        <div className="percentage-calculator-design">
          <div className="children-box-alignment">
            <div className="commom-box-new">
              <div className="input-new">
                <label>Enter CGPA/CPI here.</label>

                <input
                  type="number"
                  placeholder="Ex. 7.93"
                  value={number}
                  onChange={(e) => {
                    e.target.value >= 0 &&
                      e.target.value < 10 &&
                      handleOnChange(e);
                  }}
                  className={errors && "error-input"}
                ></input>
                <span style={{ color: "red", fontSize: "15px" }}>{errors}</span>
              </div>
            </div>

            <div className="button arithmetic-button-center-alignment-new-one">
              <button
                onClick={() => {
                  handleOnClick();
                }}
              >
                Calculate
              </button>
            </div>

            <div className="commom-box-new">
              {answer?.length > 0 &&
              <div className="copy-icon-new">
                <i
                  className="fa-solid fa-copy "
                  title="Copy"
                  onClick={() => handleCopy(answer)}
                ></i>

                {copy && answer && (
                  <div>
                    {" "}
                    <a>Copied</a>
                  </div>
                )}
              </div>}
              <div className="input-new" style={{ position: "relative" }}>
                <label>Percentage:-</label>

                <input value={answer} placeholder="75.33%" disabled={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

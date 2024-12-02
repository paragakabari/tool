import React, { useState } from "react";
// import PasswordStrengthBar from "react-password-strength-bar";
// import { handleCopy } from "../../../../common/commonFunction";
import { Progress } from 'antd';
import { ProgressBar } from "react-bootstrap";
export default function passwordStrengthChecker({ passwordValue }) {
  const [passwordInput, setPasswordInput] = useState("");
  const [poorPassword, setPoorPassword] = useState(false);
  const [weakPassword, setWeakPassword] = useState(false);
  const [goodPassword, setGoodPassword] = useState(false);
  const [strongPassword, setStrongPassword] = useState(false);
  const [passwordError, setPasswordErr] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [copy, setCopy] = useState(false);

  const handleCopy = (user) => {
    navigator.clipboard.writeText(user);
    if (navigator.clipboard.writeText(user)) {
      setCopy(true);
    }
  }

  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
    setCopy(false);

  }

  const passwordStrength = (e) => {

    const passwordValue = e.target.value;
    const passwordLength = passwordValue.length;

    const poorRegExp = /[a-z]/;
    const weakRegExp = /(?=.*?[0-9])/;
    const goodRegExp = /(?=.*?[A-Z#?!@$])/;
    const strongRegExp = /(?=.*?[#?!@$%^&*-])/;
    const whitespaceRegExp = /^$|\s+/;

    const poorPassword = poorRegExp.test(passwordValue);
    const weakPassword = weakRegExp.test(passwordValue);
    const goodPassword = goodRegExp.test(passwordValue);
    const strongPassword = strongRegExp.test(passwordValue);
    const whiteSpace = whitespaceRegExp.test(passwordValue);

    if (passwordLength === '') {
      setPasswordErr("Password is Empty");
    } else {

      // to check whitespace
      if (whiteSpace) {
        setPasswordErr(<span style={{color:"red",fontSize:"15px"}}>*Please enter password</span>);
      }
      // to check poor password
      if (passwordLength <= 3 && (poorPassword || weakPassword || goodPassword || strongPassword)) {
        setPoorPassword(true);
        setPasswordErr("Password is Poor");
      }
      // to check weak password
      if (passwordLength >= 4 && poorPassword && (weakPassword || goodPassword || strongPassword)) {
        setWeakPassword(true);
        setPasswordErr("Password is Weak");
      } else {
        setWeakPassword(false);
      }
      // to check strong Password
      if (passwordLength >= 6 && (poorPassword && weakPassword) && (goodPassword || strongPassword)) {
        setGoodPassword(true);
        setPasswordErr("Password is Good");
      } else {
        setGoodPassword(false);

      }
      if (passwordLength >= 8 && (poorPassword && weakPassword && goodPassword) && strongPassword) {
        setStrongPassword(true);
        setPasswordErr("Password is Strong");
      } else {
        setStrongPassword(false);
      }
    }

  }
  
  return (
    <div>
      <div className="children-box-alignment">
        <div className="main-salary-calculator-box">
          <div className="two-col-grid two-col-grid-one">
            <div className="two-col-grid-items">
              <div className="salry-input">
                <div className="counter-text-area">
                  <div className="password-input-relative-alignment ">
                  <div className="input-group mb-3" style={{backgroundColor:"#f8f9fb",width:"100%",borderColor: "1px solid black"}}>
                    <input className="form-control text-2" type={showPassword ? "text" : "password"}
                      onInput={passwordStrength}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setCopy(false);
                      }}
                     style={{width: "85%",borderColor: "white"}}
                      name="password"
                      placeholder="Password"
                    
                       />
                    <div className="icon-flex-alignment"  >
                      {!showPassword && password ? (
                        <div
                          className="copy-icon"
                          onClick={() => setShowPassword(true)}
                        >
                          <i className="fa-solid fa-eye-slash " ></i>
                        </div>
                      ) : (
                        <div
                          className="copy-icon"
                          onClick={() => setShowPassword(false)}
                        >
                          <i className="fa-solid fa-eye"></i>
                        </div>
                      )}
                      {password?.length > 0 &&
                      <div
                        className="copy-icon"
                        onClick={() => handleCopy(password, setCopy)}
                      >
                        <div className="new-copy-icon-text-style-alignment">
                          <i className="fa-solid fa-copy" title="Copy"></i>
                          {copy && password && (
                            <div>
                              {" "}
                              <span>Copied</span>
                            </div>
                          )}
                        </div>
                      </div>}

                    </div>
                    </div>
                  
                  </div>
                  <div>

                    {passwordError === "*Please enter password" && <Progress percent={0} size="small" />}
                    {passwordError === "Password is Empty" && <Progress percent={0} size="small" />}
                    {passwordError === "Password is Poor" && <Progress percent={25} size="small" status="exception" />}
                    {passwordError === "Password is Weak" && <Progress percent={50} size="small" />}
                    {passwordError === "Password is Good" && <Progress percent={75} size="small" />}
                    {passwordError === "Password is Strong" && <Progress percent={100} size="small" />}

                  </div>


                </div>
                <ul>
                  {poorPassword === true}
                  {weakPassword === true}
                  {goodPassword === true}
                  {strongPassword === true}
                </ul>

                {/* <ProgressBar password={passwordError} /> */}
                <p> {passwordError}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

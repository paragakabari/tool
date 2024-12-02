import axios from "axios";
import React, { useState } from "react";
import { ApiPost } from "../../../helpers/API/ApiData";
import { notification} from 'antd'
import Loader from "../../Loader/Loader";
import styles from "./SignUp.module.scss";

export default function SignUp(props) {
  
  const { setSignInModal, setSignOutModal } = props;
  const [inputValue, setInputValue] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState();
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e, key) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const bindInput = (value) => {
    var regex = new RegExp("^[^0-9]*$");
    var key = String.fromCharCode(
      !value.charCode ? value.which : value.charCode
    );
    if (regex.test(key)) {
      value.preventDefault();
      return false;
    }
  };
  
  const handleSignUP = async (e) => {
    let data = {
      roleName : "user",
      email : inputValue?.email,
      password : inputValue?.password,
      firstName : inputValue?.firstName,
      phone : inputValue?.phone,
    }
    if (validationData()) {
      setLoading(true);
      axios(`https://api-node.convertor.tools/api/v1/admin/signup`,  {method:"POST",data:data})
        .then((res) => {
          setLoading(false);
          notification['success']({
            message: 'Successfully',
          })
          setSignOutModal(false);
          setSignInModal(true);
        })
        .catch((error) => {
          setLoading(false);
          // toast.error(error, { autoClose: false });
          notification['error']({
            message: `${error?.response?.data?.message}`,
          })
        });
    }
  };

  const validationData = () => {
    let formIsValid = true;
    let errors = {};
    if (!inputValue?.firstName || inputValue?.firstName.trim() === "") {
      formIsValid = false;
      errors["firstName"] = "* Please enter Name.";
    }
    if (!inputValue?.phone || inputValue?.phone.trim() === "") {
      formIsValid = false;
      errors["phone"] = "* Please enter PhoneNo.";
    }
    if (!inputValue?.email || inputValue?.email.trim() === "") {
      formIsValid = false;
      errors["email"] = "* Please enter Email.";
    }
    if (!inputValue?.password || inputValue?.password.trim() === "") {
      formIsValid = false;
      errors["password"] = "* Please enter Password.";
    }
    setErrors(errors);
    return formIsValid;
  };
  return (
    <div className={styles.signOutModalAlignment}>
      <div className={styles.modalWrapper}>
        <div className={styles.signInBoxAlignment}>
          <div className={styles.headingAlignment}>
            <h1>Sign Up</h1>
            <div className={styles.closeButtonAlignment}>
              <i
                className="fa-sharp fa-solid fa-circle-xmark"
                onClick={() => setSignInModal(false)}
              ></i>
            </div>
          </div>
          <div className={styles.formAlignment}>
            <div className={styles.formBoxAlignment}>
              <div className={styles.inputAlignment}>
                <label>Name</label>
                <div className={styles.relativeInput}>
                  <input
                    type="text"
                    placeholder="Name"
                    name="firstName"
                    id="firstName"
                    value={inputValue?.firstName}
                    onChange={(e) => {
                      handleOnChange(e);
                    }}
                  />
                </div>
                <span
                  style={{
                    color: "red",
                    top: "5px",
                    fontSize: "12px",
                  }}
                >
                  {errors["firstName"]}
                </span>
              </div>
              <div className={styles.inputAlignment}>
                <label>Email</label>
                <div className={styles.relativeInput}>
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    name="email"
                    id="email"
                    value={inputValue?.email}
                    onChange={(e) => {
                      handleOnChange(e);
                    }}
                  />
                </div>
                <span
                  style={{
                    color: "red",
                    top: "5px",
                    fontSize: "12px",
                  }}
                >
                  {errors["email"]}
                </span>
              </div>
              <div className={styles.inputAlignment}>
                <label>Mobileno.</label>
                <div className={styles.relativeInput}>
                  <input
                    onKeyPress={bindInput}
                    type="text"
                    placeholder="Mobile No."
                    name="phone"
                    id="phone"
                    value={inputValue?.phone}
                    onChange={(e) => {
                      handleOnChange(e);
                    }}
                  />
                </div>
                <span
                  style={{
                    color: "red",
                    top: "5px",
                    fontSize: "12px",
                  }}
                >
                  {errors["phone"]}
                </span>
              </div>
              <div className={styles.inputAlignment}>
                <label>Password</label>
                <div className={styles.relativeInput}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Your Password"
                    name="password"
                    id="password"
                    value={inputValue?.password}
                    onChange={(e) => {
                      handleOnChange(e);
                    }}
                  />
                  <div
                    className={styles.iconAlignment}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={
                        showPassword
                          ? "fa-solid fa-eye"
                          : "fa-solid fa-eye-slash"
                      }
                    ></i>
                  </div>
                </div>
                <span
                  style={{
                    color: "red",
                    top: "5px",
                    fontSize: "12px",
                  }}
                >
                  {errors["password"]}
                </span>
              </div>
              <div className={styles.optionAlignment}>
                <div className={styles.checkboxAlignment}>
                  <div>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        handleOnChange(e);
                      }}
                    />
                  </div>
                  <div>
                    <span>Subscribe to Newsletter. No Spam</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.signInButtonAlignment}>
              <button type="submit" onClick={(e) => handleSignUP(e)}>
                <span> Sign Up</span>
                {loading && <Loader />}
              </button>
            </div>
            <div className={styles.signUpNotes}>
              <p>
                Already have an account?<a onClick={() => setSignOutModal(false)}>Sign In</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import styles from "./SignIn.module.scss";
import SignUp from "../SignUp";
import { ApiPost } from "../../../helpers/API/ApiData";
import { toast, ToastContainer } from "react-toastify";
import { notification } from "antd";
import Loader from "../../Loader/Loader";
import * as authUtil from "../../../utils/auth.util";
import * as userUtil from "../../../utils/user.util";
import axios from "axios";
import { userLogin } from "../../../src/jotaiContext/common";
import { useAtom } from "jotai";
import { NavLink } from "react-bootstrap";
import ForgotPassword from "../ForgotPage";

export default function SignIn(props) {
  const [userLoggedin, setUserLoggedIn] = useAtom(userLogin);
  const { setSignInModal, setforgotModal } = props;
  const [SignOutModal, setSignOutModal] = useState(false);
  const [inputValue, setInputValue] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState();

  const regexEmail =
    /^(([^<>()[\],;:\s@]+([^<>()[\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+)+[^<>()[\],;:\s@]{2,})$/i;

  const OnFormSubmit = (e) => {
    e.preventDefault();
  };

  const handleOnChange = (e, key) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.email && !inputValue.password) {
      setErrors({
        email: "* Please enter Email",
        password: "* Please enter Password.*",
      });
    } else if (inputValue.email === "" && inputValue.password === "") {
      setErrors({ ...errors, email: "* Please enter Email" });
    } else if (!inputValue.email || inputValue.email === "") {
      setErrors({ ...errors, email: "* Please enter Email" });
    } else if (
      !inputValue.email ||
      regexEmail.test(inputValue.email) === false
    ) {
      setErrors({ ...errors, email: "* Please enter valid email*" });
    } else if (!inputValue.password || inputValue.password === "") {
      setErrors({ ...errors, password: "* Please enter Password.*" });
    }
    // else if (inputValue?.password?.length < 8) {
    //   setErrors({password : "Password should must be minimum 8 character*"})
    // }
    else {
      setLoading(true);
      axios("https://api-node.convertor.tools/api/v1/admin/login", {
        method: "POST",
        data: inputValue,
      })
        .then((res) => {
          if (res?.status === 200) {
            setItems(res?.data?.payload?.admin);
            if (res?.data?.payload?.subscription) {
              setUserLoggedIn(true);
              localStorage.setItem(
                "isPro",
                JSON.stringify(res?.data?.payload?.subscription?.isCurrent)
              );
            }

            authUtil.setToken(res?.data?.payload?.token);
            userUtil.setUserInfo(res?.data?.payload?.admin);
            notification["success"]({
              message: "Login Successfully",
            });
            setSignInModal(false);
          } else {
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          notification["error"]({
            message: `${err?.response?.data?.message}`,
          });
        });
    }
  };

  const handleFotgot = () => {
    setSignInModal(false);
    setforgotModal(true);
  }

  return (
    <>
      <ToastContainer />
      <div className={styles.signInModalAlignment}>
        <div className={styles.modalWrapper}>
          <div className={styles.signInBoxAlignment}>
            <div className={styles.headingAlignment}>
              <h1>Sign In</h1>
              <div className={styles.closeButtonAlignment}>
                <i
                  className="fa-sharp fa-solid fa-circle-xmark"
                  onClick={() => setSignInModal(false)}
                ></i>
              </div>
            </div>
            <div className={styles.formAlignment}>
              <form onSubmit={OnFormSubmit}>
                <div className={styles.inputAlignment}>
                  <label>Email</label>
                  <div className={styles.relativeInput}>
                    <input
                      type="email"
                      placeholder="Email"
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
                      <input type="checkbox" />
                    </div>
                    <div>
                      <span>Remember me</span>
                    </div>
                  </div>
                  <div className={styles.forgotPasswordAlignment} onClick={() => {
                    handleFotgot()
                  }}>

                    <a>Forgot Password?</a>

                  </div>
                </div>
                <div className={styles.signInButtonAlignment}>
                  <button onClick={(e) => handleSubmit(e)}>
                    <span>Sign In</span>
                    {loading && <Loader />}
                  </button>
                </div>
              </form>
              <div className={styles.signUpNotes}>
                <p>
                  Don’t have an account yet?
                  <a onClick={() => setSignOutModal(true)}>Sign Up</a>
                </p>
              </div>
              {SignOutModal && (
                <SignUp
                  setSignInModal={setSignInModal}
                  setSignOutModal={setSignOutModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

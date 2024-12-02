import React, { useState } from 'react';
import OtpVerify from '../OtpVerify';
import styles from "./ForgotPage.module.scss";
import { toast, ToastContainer } from "react-toastify";
import Loader from '../../Loader/Loader';
import axios from 'axios';
import { notification } from "antd";

export default function ForgotPassword(props) {

  const {setforgotModal ,setOtoVerifyModal} = props
  const [inputValue, setInputValue] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  localStorage.setItem('Email', JSON.stringify(inputValue?.email));

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
    if (!inputValue.email) {
      setErrors({
        email: "* Please enter Email*",
      });
    } else if (inputValue.email === "") {
      setErrors({ ...errors, email: "* Please enter Email" });
    } else if (!inputValue.email || inputValue.email === "") {
      setErrors({ ...errors, email: "* Please enter Email" });
    } else if (
      !inputValue.email ||
      regexEmail.test(inputValue.email) === false
    ) {
      setErrors({ ...errors, email: "* Please Enter valid Email*" });
    }
    else {
      setLoading(true);
      axios("https://api-node.convertor.tools/api/v1/admin/sendEmail", {
        method: "POST",
        data: inputValue,
      })
        .then((res) => {
          if (res?.status === 200) {
            notification["success"]({
                message: `${res?.data?.message}`,
              });
              setOtoVerifyModal(true);
              setforgotModal(false);
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

  return (
    <div>
        <ToastContainer />
      <div className={styles.forgotPasswordModalAlignment}>
        <div className={styles.modalWrapper}>
          <div className={styles.forgotPasswordBoxAlignment}>
            <div className={styles.headingAlignment}>
              <h1>Verify Email</h1>
              <div className={styles.closeButtonAlignment}>
                <i
                  className="fa-sharp fa-solid fa-circle-xmark"
                  onClick={() => setforgotModal(false)}
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
              <div className={styles.signInButtonAlignment}>
                <button onClick={(e) => handleSubmit(e)
                    }>
                  <span>Verify Email</span>
                  {loading && <Loader />}
                </button>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

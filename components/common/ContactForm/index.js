import { style } from "@mui/system";
import React, { useState } from "react";
import { ApiPost } from "../../../helpers/API/ApiData";
import Loader from "../../Loader/Loader";
import styles from "./ContactForm.module.scss";
const ContctImg = "/Assets/Images/contactImg.png";
import { useHistory, useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
import axios from "axios";
import { notification } from "antd";
const RightAngle1 = "/Assets/Images/RectangleFirst.svg";
const RightAngle2 = "/Assets/Images/Rectangle2.svg";

export default function ContactForm() {
  const Router = useRouter();
  const [inputValue, setInputValue] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e, key) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSignUP = async (e) => {
    if (validationData()) {
      setLoading(true);
      axios(`https://api-node.convertor.tools/api/v1/contactUs/addContactUs`, {
        method: "POST",
        data: inputValue,
      })
        .then((res) => {
          setLoading(false);
          notification["success"]({
            message: "Successfully",
          });
          Router.push("/");
        })
        .catch((error) => {
          // toast.error(error, { autoClose: false });
          notification["error"]({
            message: `${err?.response?.data?.message}`,
          });
          setLoading(false);
        });
    }
  };

  const validationData = () => {
    const regexEmail =
    /^(([^<>()[\],;:\s@]+([^<>()[\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+)+[^<>()[\],;:\s@]{2,})$/i;
    let formIsValid = true;
    let errors = {};
    if (!inputValue?.name || inputValue?.name.trim() === "") {
      formIsValid = false;
      errors["name"] = "Name is required!";
    }
    if (!inputValue?.message || inputValue?.message.trim() === "") {
      formIsValid = false;
      errors["message"] = "Message is required!";
    }
    if (!inputValue?.email || inputValue?.email.trim() === "" || regexEmail.test(inputValue.email)===false ) {
      formIsValid = false;
      errors["email"] = "Email is required!";
    }
    setErrors(errors);
    return formIsValid;
  };

  return (
    <div>
      <div className="container-md">
        <div className={styles.contactFormAllSectionContentAlignment}>
          <div className={styles.contactFromAlignment}>
            <div className={styles.formGridAlignment}>
              <div className={styles.formDetailsAlignment}>
                <div className={styles.formDetailsHeadingAlignment}>
                  <h4>Get In Touch</h4>
                  <span>Have any Questions? We'd love to hear from you.</span>
                </div>
                <div className={styles.inputAlignment}>
                  <label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder=" "
                      value={inputValue?.name}
                      onChange={(e) => {
                        handleOnChange(e);
                      }}
                    />
                    <span>Name</span>
                  </label>
                  <p
                    style={{
                      color: "red",
                      top: "5px",
                      fontSize: "12px",
                    }}
                  >
                    {errors["name"]}
                  </p>
                </div>
                <div className={styles.inputAlignment}>
                  <label>
                    <input
                      placeholder=" "
                      type="email"
                      id="email"
                      name="email"
                      value={inputValue?.email}
                      onChange={(e) => {
                        handleOnChange(e);
                      }}
                    />
                    <span>Email</span>
                  </label>
                  <p
                    style={{
                      color: "red",
                      top: "5px",
                      fontSize: "12px",
                    }}
                  >
                    {errors["email"]}
                  </p>
                </div>
                <div className={styles.inputAlignment}>
                  <label>
                    <textarea className={errors && "error-input"}
                      placeholder=" "
                      type="text"
                      name="message"
                      id="message"
                      value={inputValue?.message}
                      onChange={(e) => {
                        handleOnChange(e);
                      }}
                    ></textarea>
                    <span>Message</span>
                  </label>
                  <p
                    style={{
                      color: "red",
                      top: "5px",
                      fontSize: "12px",
                    }}
                  >
                    {errors["message"]}
                  </p>
                </div>
                <div className={styles.buttonAlignment}>
                  <button type="submit" onClick={(e) => handleSignUP(e)}>
                    <span>Send</span>
                    {loading && <Loader />}
                  </button>
                </div>
              </div>

              <div className={styles.secondDetailsAlignment}>
                <img src={ContctImg} alt="ContctImg" />

                <div className={styles.formFridItemAlignment}>
                  <a
                    href="https://www.instagram.com/convertor.tools/"
                    target="_blank"
                  >
                    <div className={styles.iconBoxALignment}>
                      <i className="fa-brands fa-instagram"></i>
                    </div>
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=100088458615933"
                    target="_blank"
                  >
                    <div className={styles.iconBoxALignment}>
                      <i className="fa-brands fa-facebook-f"></i>
                    </div>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/convertor-tools/"
                    target="_blank"
                  >
                    <div className={styles.iconBoxALignment}>
                      <i className="fa-brands fa-linkedin"></i>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* <div className={styles.rightAngleFirstImg}>
              <img src={RightAngle1} alt="RightAngle1" /> 
            </div>
            <div className={styles.rightAngleSecondImg}>
              <img src={RightAngle2} alt="RightAngle2" />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

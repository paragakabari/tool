import React, { useEffect, useState } from 'react'
import styles from "./OtpVerify.module.scss";
import OtpInput from 'react-otp-input';
import Loader from '../../Loader/Loader';
import axios from 'axios';
import { notification } from "antd";

export default function OtpVerify(props) {

    const { setOtoVerifyModal, setNewPasswordModal } = props
    const [errors, setErrors] = useState({});
    const [InputOtp, setInputOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const Emaillll = JSON.parse(localStorage.getItem('Email'));


    const handleOnChangeCode = (e) => {
        setInputOtp(e);
      };

      const OnFormSubmit = (e) => {
        e.preventDefault();
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!InputOtp) {
            setErrors({
                code: "* Please enter OTP.",
            });
        } else if (!InputOtp || InputOtp === "") {
            setErrors({ ...errors, InputOtp: "* Please enter OTP." });
        }
        else {
            setLoading(true);
            axios("https://api-node.convertor.tools/api/v1/admin/verifyCode", {
                method: "POST",
               data: {email:Emaillll, code:InputOtp},
               
            })
                .then((res) => {
                    if (res?.status === 200) {
                        localStorage.setItem("token",JSON.stringify( res?.data?.payload?.token))
                        notification["success"]({
                            message: `${res?.data?.message}`,
                        });
                        setNewPasswordModal(true);
                        setOtoVerifyModal(false);
                    } else {
                        setLoading(false);
                    }
                })
                .catch((err) => {
                    setLoading(false);
                    notification["error"]({
                        message: `${err?.res?.data?.message}`,
                    });
                });
        }
    };

    return (
        <div>
            <div className={styles.otpVerifyModalAlignment}>
                <div className={styles.modalWrapper}>
                    <div className={styles.otpVerifyBoxAlignment}>
                        <div className={styles.headingAlignment}>
                            <h1>Verify Otp</h1>
                            <div className={styles.closeButtonAlignment}>
                                <i
                                    className="fa-sharp fa-solid fa-circle-xmark"
                                    onClick={() => setOtoVerifyModal(false)}
                                ></i>
                            </div>
                        </div>
                        <div className={styles.formAlignment}>
                        <form onSubmit={OnFormSubmit}>
                        <div className={styles.inputAlignment}>
                                <label>Otp</label>
                                <div className={styles.otpInputAlignment}>
                                    <OtpInput
                                    name="code"
                                    value={InputOtp}
                                    onChange={(e) => {
                                      handleOnChangeCode(e);
                                    }}
                                        numInputs={6}
                                        separator={<span>-</span>}
                                    />
                                </div>
                                <span
                                    style={{
                                        color: "red",
                                        top: "5px",
                                        fontSize: "12px",
                                    }}
                                >
                                    {errors["code"]}
                                </span>
                            </div>
                            <div className={styles.signInButtonAlignment}>
                                <button onClick={(e) =>
                                    handleSubmit(e)}>
                                    <span>Verify Otp</span>
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

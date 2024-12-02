import axios from 'axios';
import React, { useState } from 'react'
import Loader from '../../Loader/Loader';
import styles from "./NewPassword.module.scss";
import { notification } from "antd";
import { getUserInfo } from '../../../utils/user.util';

export default function NewPassword(props) {

    const { setNewPasswordModal, setSignInModal } = props
    const [showPassword, setShowPassword] = useState();
    const [inputValue, setInputValue] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const Emaillll = JSON.parse(localStorage.getItem('Email'));

    const savedItem = localStorage.getItem("token");

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
        if (!inputValue.newPassword) {
            setErrors({
                newPassword: "* Please enter Password",
            });
        } else if (!inputValue.newPassword || inputValue.newPassword === "") {
            setErrors({ ...errors, inputValue: "* Please enter Password" });
        }
        else {
            setLoading(true);
            axios("https://api-node.convertor.tools/api/v1/admin/afterForget", {
                method: "POST",
               data: {...inputValue,email:Emaillll, token:savedItem},
               
            })
                .then((res) => {
                    if (res?.status === 200) {
                        notification["success"]({
                            message: `${res?.data?.message}`,
                        });
                        setSignInModal(true);
                        setNewPasswordModal(false);
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
        <div className={styles.signInModalAlignment}>
            <div className={styles.modalWrapper}>
                <div className={styles.signInBoxAlignment}>
                    <div className={styles.headingAlignment}>
                        <h1>New Password</h1>
                        <div className={styles.closeButtonAlignment}>
                            <i
                                className="fa-sharp fa-solid fa-circle-xmark"
                                onClick={()=> setNewPasswordModal(false)}
                            ></i>
                        </div>
                    </div>
                    <div className={styles.formAlignment}>
                    <form onSubmit={OnFormSubmit}>
                            <div className={styles.inputAlignment}>
                                <label>New Password</label>
                                <div className={styles.relativeInput}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Your Password"
                                        name="newPassword"
                                        id="newPassword"
                                        value={inputValue?.newPassword}
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
                                    {errors["newPassword"]}
                                </span>
                            </div>
                            <div className={styles.signInButtonAlignment}>
                                <button  onClick={(e) =>
                                    handleSubmit(e)}>
                                    <span>Submit</span>
                                    {loading && <Loader />}
                                </button>
                            </div>
                        </form>
                 
                    </div>
                </div>
            </div>
        </div>
    )
}

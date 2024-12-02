import React, { useState, useEffect, useRef } from "react";
import styles from "./billingInfo.module.scss";
import * as stripe from "stripe";
import Image from "next/image";
import Download from "../../../src/Images/download.svg";
import Logo from "../../../src/Images/convertor-logo.png";

import {
  ApiGet,
  ApiGetNode,
  ApiPost,
  ApiPostNode,
} from "../../../helpers/API/ApiData";
import Loader from "../../Loader/Loader";
import moment from "moment";
import axios from "axios";
import { json } from "react-router-dom";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { notification } from "antd";
stripe(
  "sk_test_51IQ6SLLNDkmReOs8qFPCpJCTxjln09jP7oKXAP8DpKyevwMyB23QYoxz5dVKaCkXdnJkRqt5W3E97jaWQao7Deib00D1lGNixc"
);

export default function BillingInfo() {
  const currMonth = new Date().getMonth();
  const currYear = new Date().getFullYear();
  const [modal, setModal] = useState({
    billing: false,
    pdf: false,
    invoice: {},
  });
  const [loader, setLoader] = useState(false);
  const [card, setCardDetails] = useState({});
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [planData, setPlanData] = useState();
  const [billingType, setBillingType] = useState("pay");
  const user = JSON.parse(localStorage.getItem("userinfo"));
  const token = JSON.parse(localStorage.getItem("token"));

  const container = React.useRef(null);
  const pdfExportComponent = React.useRef(null);

  const exportPDFWithMethod = () => {
    let element = container.current || document.body;
    savePDF(element, {
      paperSize: "a4",
      margin: 40,
      fileName: "Payment Invoice",
    });
  };

  useEffect(() => {
    getHistories();
    getPlanDetails();
  }, []);

  const handleCardDetails = (e) => {
    setCardDetails({ ...card, [e.target.name]: e.target.value });
  };

  const getPlanDetails = async () => {
    ApiGetNode("plan/getPlan")
      .then((res) => {
        setPlanData(res?.data?.payload?.plan);
      })
      .catch((err) => {});
  };

  const getHistories = async () => {
    ApiGetNode("payment/getPayment")
      .then(async (res) => {
        setHistory(res.data.payload.payment);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const handleValidateForm = () => {
    let isValidate = true;
    let year = "20" + card.year;
    if (!card.shippingAddress) {
      setMessage("*Please enter shipping address");
      isValidate = false;
    } else if (!card.postal_code) {
      setMessage("*Please enter postal code");
      isValidate = false;
    } else if (!card.city) {
      setMessage("*Please enter city");
      isValidate = false;
    } else if (!card.state) {
      setMessage("*Please enter state");
      isValidate = false;
    } else if (!card.country) {
      setMessage("*Please enter country");
      isValidate = false;
    } else if (!card.number) {
      setMessage("*Please enter card numbers");
      isValidate = false;
    } else if (card.number.length < 16) {
      setMessage("*Please enter valid card numbers");
      isValidate = false;
    } else if (!card.month) {
      setMessage("*Please enter expiry month");
      isValidate = false;
    } else if (!card.month.length === 2) {
      setMessage("*Please enter valid month");
      isValidate = false;
    } else if (card.month > 12) {
      setMessage("*Please enter valid month");
      isValidate = false;
    } else if (!card.year) {
      setMessage("*Please enter expiry year");
      isValidate = false;
    } else if (year < currYear) {
      setMessage("*Make sure card is not expired");
      isValidate = false;
    } else if (card.year.length < 2) {
      setMessage("*Please enter year from card");
      isValidate = false;
    } else if (card.month <= currMonth && year <= currYear) {
      setMessage("*Make sure card is not expired");
      isValidate = false;
    } else if (!card.cvc) {
      setMessage("*Please enter cvv");
      isValidate = false;
    } else if (card.cvc.length < 3) {
      setMessage("*Please enter valid 3 digit CVV number");
      isValidate = false;
    } else {
      setMessage("");
      return isValidate;
    }
  };

  const handlePay = async (ev) => {
    if (handleValidateForm()) {
      setLoader(true);
      const payLoad = {
        planId: "639970760442b8fe8d94630e",
        type: "card",
        amount: 2.99,
        number: Number(card?.number),
        exp_month: Number(card?.month),
        exp_year: Number("20" + card?.year),
        cvc: Number(card?.cvc),
        currency: "usd",
        confirm: true,
        payment_method_types: ["card"],
        shippingAddress: card.shippingAddress,
        personName: user.fname + " " + user.lname,
        postal_code: Number(card.postal_code),
        city: card.city,
        state: card.state,
        country: "US",
        description: "Software development services",
      };

      await ApiPostNode("payment/addPayment", payLoad)
        .then(async (res) => {
          localStorage.setItem("isPro", true);
          getHistories();
          notification["success"]({
            message: "Purchase Successful!",
          });
          setModal(false);
          setLoader(false);
          setMessage("");
          setCardDetails({});
          setBillingType("list");
        })
        .catch((err) => {
          console.log("error", err);
          setLoader(false);
          setMessage("*Payment could not be processed");
        });
    }
  };

  return (
    <>
      <div>
        <div className={styles.billinginforAllcontentAlignment}>
          <div className="container-md">
            <div className={styles.billingInfoTab}>
              <button
                onClick={() => {
                  setBillingType("pay");
                }}
                className={billingType === "pay" ? styles.active : ""}
              >
                Billing Info
              </button>
              <button
                onClick={() => {
                  setBillingType("list");
                }}
                className={billingType === "list" ? styles.active : ""}
              >
                Billing History
              </button>
            </div>
            {billingType === "pay" && (
              <div className={styles.billinginfoAlltext}>
                <h1>Billing Information</h1>
                <div className={styles.creditCard}>
                  {/* <p>Credit Card Payment Information</p> */}
                  <div className="button">
                    <button
                      onClick={() => {
                        setModal({ ...modal, billing: true });
                      }}
                    >
                      {/* Pay {planData && planData[0].price} $ */}
                      Pay 2.99 $
                    </button>
                  </div>
                </div>
                {/* <div className={styles.ordersummary}>
                        <h6>Order Summary</h6>
                        <div className={styles.twoTextAlignment}>
                            <div className={styles.textstyl}>
                                <p>TinyWow Supporter - Monthly Subscription</p>
                                <p>$3.99</p>
                            </div>
                            <div className={styles.textstyl}>
                                <p>TinyWow  Subscription</p>
                                <p>$3.99</p>
                            </div>
                            <div className={styles.textstyl}>
                                <p>TinyWow  Subscription</p>
                                <p>$3.99</p>
                            </div>
                            <div className={styles.textstyl}>
                                <p>TinyWow Supporter  Subscription</p>
                                <p>$3.99</p>
                            </div>
                            <div className={styles.textstyl}>
                                <p>TinyWow </p>
                                <p>$3.99</p>
                            </div>
                            <div className={styles.textstyl}>
                                <p>Subtotal </p>
                                <p style={{ color:'rgb(71, 75, 255)'}}>$3.99</p>
                            </div>
                        </div>
                        <div className='button'>
                            <button>Subscribe & Checkout</button>
                        </div>
                    </div> */}
              </div>
            )}

            {billingType === "list" && (
              <div className={styles.billingDataTableAlignment}>
                <table>
                  <thead>
                    <tr>
                      <th align="left">Payment Id</th>
                      <th align="left">Plan</th>
                      <th align="left">Amount </th>
                      <th align="left">Started on </th>
                      <th align="left">Expiring on </th>
                      <th align="left">Duration </th>
                      <th align="left">Status </th>
                      <th align="left">Download</th>
                    </tr>
                  </thead>
                  {history?.map((item,index) => {
                    return (
                      <tr>
                        <td align="left" key={index}>
                          <span className={styles.linkTextColor}>
                            {item?.paymentId}
                          </span>
                        </td>{" "}
                        <td align="left">
                          <span>
                            {item?.planId?.name === "basic"
                              ? "Pro"
                              : item?.planId?.name}
                          </span>
                        </td>
                        <td align="left">${item?.amount}</td>
                        <td align="left">
                          {moment(item?.createdAt).format("l")}
                        </td>
                        <td align="left">
                          {moment(item?.expiryDate).format("l")}{" "}
                          {moment(item?.expiryDate).format("LT")}
                        </td>
                        <td align="left">
                          {item?.planId?.duration}{" "}
                          {item?.planId?.duration === 1 ? "month" : "months"}
                        </td>
                        <td align="left">
                          {item?.isCurrent ? "Active" : "Expired"}
                        </td>
                        <td align="left">
                          <span
                            className={styles.linkTextColor}
                            onClick={() => {
                              setModal({
                                ...modal,
                                pdf: true,
                                invoice: { ...item },
                              });
                            }}
                          >
                            <Image
                              className={styles.downloadIcon}
                              src={Download}
                              alt="img"
                            />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </table>
                {history?.length === 0 && (
                  <div className={styles.noRecords}>No records found</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {modal.pdf && (
        <div className={styles.modalWrapper}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeaderInvoice}>
              <div
                className={styles.imageDiv}
                onClick={() => {
                  setModal({ ...modal, pdf: false });
                }}
              >
                <i className="fa-sharp fa-solid fa-circle-xmark"></i>
              </div>
            </div>
            <div className={styles.modalSection}>
              <PDFExport
                ref={pdfExportComponent}
                paperSize="a4"
                margin={40}
                fileName="Payment Invoice"
                author="KendoReact Team"
              >
                <div ref={container}>
                  <div className={styles.invoiceSection}>
                    <div className={styles.invoiceTitle}>
                      {/* <p>CONVERTOR</p> */}
                      <img src={Logo.src} alt="Concertor"/>
                    </div>
                    <div className={styles.blueSection}> </div>
                    <div className={styles.invoiceTitle}>Person Details</div>
                    <div className={styles.invoiceItem}>
                      <div className={styles.invoiceLabel}>Name : </div>
                      <div className={styles.invoiceText}>{user?.fname}</div>
                    </div>
                    <div className={styles.invoiceItem}>
                      <div className={styles.invoiceLabel}>Email : </div>
                      <div className={styles.invoiceText}>{user?.email}</div>
                    </div>
                    <div className={styles.blueSection}> </div>
                    <div className={styles.invoiceTitle}>Plan Details</div>
                    <div className={styles.invoiceItem}>
                      <div className={styles.invoiceLabel}>Payment Id : </div>
                      <div className={styles.invoiceText}>
                        {modal?.invoice?.paymentId}
                      </div>
                    </div>
                    <div className={styles.invoiceItem}>
                      <div className={styles.invoiceLabel}>Plan : </div>
                      <div className={styles.invoiceText}>
                        {modal?.invoice?.planId?.name}
                      </div>
                    </div>
                    <div className={styles.invoiceItem}>
                      <div className={styles.invoiceLabel}>Amount : </div>
                      <div className={styles.invoiceText}>
                        {modal?.invoice?.amount} $
                      </div>
                    </div>
                    <div className={styles.invoiceItem}>
                      <div className={styles.invoiceLabel}>Duration : </div>
                      <div className={styles.invoiceText}>
                        {modal?.invoice?.planId?.duration}{" "}
                        {modal?.invoice?.planId?.duration === 1
                          ? "month"
                          : "months"}
                      </div>
                    </div>
                    <div className={styles.invoiceItem}>
                      <div className={styles.invoiceLabel}>Starts on : </div>
                      <div className={styles.invoiceText}>
                        {moment(modal?.invoice?.createdAt).format("l")}
                      </div>
                    </div>
                    <div className={styles.invoiceItem}>
                      <div className={styles.invoiceLabel}>Expires on : </div>
                      <div className={styles.invoiceText}>
                        {moment(modal?.invoice?.expiryDate).format("l")}{" "}
                        {moment(modal?.invoice?.expiryDate).format("LT")}
                      </div>
                    </div>
                    <div className={styles.invoiceItem}>
                      <div className={styles.invoiceLabel}>Status : </div>
                      <div className={styles.invoiceText}>
                        {modal?.invoice?.isCurrent ? "Active" : "Expired"}
                      </div>
                    </div>
                  </div>
                </div>
              </PDFExport>
              <div className={styles.downloadFooter}>
                <button
                  onClick={() => {
                    exportPDFWithMethod();
                    setModal({ ...modal, pdf: false, invoice: {} });
                  }}
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {modal.billing && (
        <div className={styles.modalWrapper}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <span>Payment</span>
              <div
                className={styles.imageDiv}
                onClick={() => {
                  setModal({ ...modal, billing: false });
                }}
              >
                <i className="fa-sharp fa-solid fa-circle-xmark"></i>
              </div>
            </div>

            <div className={styles.modalSection}>
              <div className={styles.cardInputs}>
                <label>Shipping Address</label>
                <div className={styles.cardNumber}>
                  <input
                    type="text"
                    value={card.shippingAddress}
                    placeholder="23, 34th street"
                    name="shippingAddress"
                    onChange={(e) => {
                      handleCardDetails(e);
                    }}
                  />
                </div>
              </div>
              <div className={styles.cardInputs}>
                <label>Postal code</label>
                <div className={styles.cardNumber}>
                  <input
                    type="number"
                    value={card.postal_code}
                    placeholder="888999"
                    name="postal_code"
                    onChange={(e) => {
                      e.target.value.length <= 6 && handleCardDetails(e);
                    }}
                  />
                </div>
              </div>
              <div className={styles.cardInputs}>
                <label>City</label>
                <div className={styles.cardNumber}>
                  <input
                    type="text"
                    value={card.city}
                    placeholder="New York"
                    name="city"
                    onChange={(e) => {
                      handleCardDetails(e);
                    }}
                  />
                </div>
              </div>
              <div className={styles.cardInputs}>
                <label>State</label>
                <div className={styles.cardNumber}>
                  <input
                    type="text"
                    value={card.state}
                    placeholder="new york"
                    name="state"
                    onChange={(e) => {
                      handleCardDetails(e);
                    }}
                  />
                </div>
              </div>
              <div className={styles.cardInputs}>
                <label>Country</label>
                <div className={styles.cardNumber}>
                  <input
                    type="text"
                    value={card.country}
                    placeholder="USA"
                    name="country"
                    onChange={(e) => {
                      handleCardDetails(e);
                    }}
                  />
                </div>
              </div>

              <div className={styles.cardInputs}>
                <label>Card Number</label>
                <div className={styles.cardNumber}>
                  <input
                    type="number"
                    value={card.number}
                    placeholder="4444 4444 4444 4444"
                    name="number"
                    onChange={(e) => {
                      e.target.value.length <= 16 && handleCardDetails(e);
                    }}
                  />
                </div>
              </div>

              <div className={styles.cardDetails}>
                <div className={styles.detailsItem}>
                  <label>Month</label>
                  <input
                    type="number"
                    value={card.month}
                    name="month"
                    placeholder="9"
                    onChange={(e) => {
                      e.target.value.length <= 2 && handleCardDetails(e);
                    }}
                  />
                </div>
                <div className={styles.detailsItem}>
                  <label>Year</label>
                  <input
                    type="number"
                    value={card.year}
                    placeholder="22"
                    name="year"
                    onChange={(e) => {
                      e.target.value.length <= 2 && handleCardDetails(e);
                    }}
                  />
                </div>
                <div className={styles.detailsItem}>
                  <label>Cvv</label>
                  <input
                    type="number"
                    value={card.cvc}
                    name="cvc"
                    placeholder="555"
                    onChange={(e) => {
                      e.target.value.length <= 3 && handleCardDetails(e);
                    }}
                  />
                </div>
              </div>
              {message && <div className={styles.messageError}>{message}</div>}
            </div>

            <div className={styles.modalFooter}>
              <button
                type="submit"
                onClick={() => {
                  handlePay();
                }}
              >
                {loader ? "Processing..." : "Pay"} {loader && <Loader />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

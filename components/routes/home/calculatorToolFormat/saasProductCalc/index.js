import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { userLogin } from "../../../../../src/jotaiContext/common";
import styles from "../../../../common/fileUploadBox/fileUploadBox.module.scss";
import { images } from "../../../../common/CommonArray/FileArray";

export default function SassProductCalc({ Data }) {
  const isUserPro = localStorage.getItem("isPro");
  const [adBox, setAdBox] = useState(true);
  const [userLoggedin, setUserLoggedIn] = useAtom(userLogin);
  const router = useRouter();
  const handleIsPro = () => {
    setAdBox(false);
  };

  useEffect(() => {
    if (isUserPro) {
      handleIsPro();
    }
  }, [userLoggedin]);

  const [calvalue, setCalvalue] = useState({
    input1: "30",
    input2: "20",
    input3: "10000",
    input4: "10000",
    input5: "10000",
    input6: "1000",
    input7: "200",
    input8: "1000",
  });
  const [output1, setOutput1] = useState();
  const [output2, setOutput2] = useState();
  const [output3, setOutput3] = useState();
  const [output4, setOutput4] = useState();
  const [output5, setOutput5] = useState();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCalvalue({ ...calvalue, [name]: value });
  };

  useEffect(() => {
    setOutput5(calvalue?.input1 * calvalue?.input8);

    if (calvalue?.input7 !== "0") {
      let totalcost =
        parseInt(calvalue?.input3, 10) +
        parseInt(calvalue?.input4, 10) +
        parseInt(calvalue?.input5, 10) +
        parseInt(calvalue?.input6, 10);
      setOutput3((calvalue?.input1 * 100) / calvalue?.input2);
      setOutput4(totalcost / parseInt(calvalue?.input7, 10));
      setOutput2(
        (calvalue?.input1 * 100) /
          calvalue?.input2 /
          (totalcost / parseInt(calvalue?.input7, 10))
      );
      setOutput1(
        (calvalue?.input1 * 100) /
          calvalue?.input2 /
          (totalcost / parseInt(calvalue?.input7, 10)) -
          1
      );
    } else {
      let newValue = 0;
      setOutput1(newValue);
      setOutput2(newValue);
      setOutput3(newValue);
      setOutput4(newValue);
    }
  }, [calvalue]);

  return (
    <>
      <div className="children-box-alignment">
        <div className="childrenBoxDetailsSticky">
          <div className="globally-file-title-and-sub-title">
            <h3>{Data?.Name.toUpperCase()}</h3>
          </div>
          {adBox && <div>{/* <FirstAddBox /> */}</div>}
        </div>
        <div className="">
          <div className="saas-calculater-grid">
            <div className="commom-box-new ">
              <div className="">
                <div className="aritmetic-two-col-grid-items">
                  <div className="input-new">
                    <label>Average revenue per customer per month</label>
                    <div>
                      <input
                        type="number"
                        name="input1"
                        value={calvalue.input1}
                        onChange={handleOnChange}
                      ></input>
                    </div>
                    <span>
                      The revenue generated per one customer calculated on a
                      monthly basis.{" "}
                    </span>
                  </div>
                </div>
                <div className="aritmetic-two-col-grid-items">
                  <div className="input-new">
                    <label>Average churn rate per month(%)</label>
                    <div>
                      <input
                        type="number"
                        name="input2"
                        value={calvalue.input2}
                        onChange={handleOnChange}
                      ></input>
                    </div>
                    <span>
                      The percentage rate at which customers cancel their
                      recurring revenue subscriptions.
                    </span>
                  </div>
                </div>
                <div className="aritmetic-two-col-grid-items">
                  <div className="input-new">
                    <label>Average cost of sales per month</label>
                    <div>
                      <input
                        type="number"
                        name="input3"
                        value={calvalue.input3}
                        onChange={handleOnChange}
                      ></input>
                    </div>
                    <span>
                      The average number of how much money you spend per your
                      sales activities and team per month.
                    </span>
                  </div>
                </div>
                <div className="aritmetic-two-col-grid-items">
                  <div className="input-new">
                    <label>Average cost of marketing per month</label>
                    <div>
                      <input
                        type="number"
                        name="input4"
                        value={calvalue.input4}
                        onChange={handleOnChange}
                      ></input>
                    </div>
                    <span>
                      The average number of how much money you spend per your
                      marketing activities, campaigns and team per month.
                    </span>
                  </div>
                </div>
                <div className="aritmetic-two-col-grid-items">
                  <div className="input-new">
                    <label>Average cost of development per month</label>
                    <div>
                      <input
                        type="number"
                        name="input5"
                        value={calvalue.input5}
                        onChange={handleOnChange}
                      ></input>
                    </div>
                    <span>
                      The average number of how much money you spend per your
                      development activities and team per month.
                    </span>
                  </div>
                </div>
                <div className="aritmetic-two-col-grid-items">
                  <div className="input-new">
                    <label>Average cost of customer support per month</label>
                    <div>
                      <input
                        type="number"
                        name="input6"
                        value={calvalue.input6}
                        onChange={handleOnChange}
                      ></input>
                    </div>
                    <span>
                      The average number of how much money you spend per your
                      customer support activities and team per month.
                    </span>
                  </div>
                </div>
                <div className="aritmetic-two-col-grid-items">
                  <div className="input-new">
                    <label>Average acquired new customers per month</label>
                    <div>
                      <input
                        type="number"
                        name="input7"
                        value={calvalue.input7}
                        onChange={handleOnChange}
                      ></input>
                    </div>
                    <span>
                      The average number of newly gained customers per month.
                    </span>
                  </div>
                </div>
                <div className="aritmetic-two-col-grid-items">
                  <div className="input-new">
                    <label>Total active customers</label>
                    <div>
                      <input
                        type="number"
                        name="input8"
                        value={calvalue.input8}
                        onChange={handleOnChange}
                      ></input>
                    </div>
                    <span>
                      The average number of newly gained customers per month.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="fake-genrate-add-box-design sass-calculater-height-alignment">
              <div className="text-grid">
                <div className="text-grid-items">
                  <p>One dollar generates:</p>
                </div>
                <div className="text-grid-items">
                  <span className="warning-text">
                    {output1 ? output1?.toFixed(2) : 0}{" "}
                  </span>
                </div>
              </div>
              <div className="text-grid">
                <div className="text-grid-items">
                  <p>Unit Economics (UE)</p>
                </div>
                <div className="text-grid-items">
                  <span className="bold-text-alignment">
                    {output2 ? output2?.toFixed(2) : 0}{" "}
                  </span>
                </div>
              </div>
              <div className="text-grid">
                <div className="text-grid-items">
                  <label>Live Time Value (LTV)</label>
                </div>
                <div className="text-grid-items">
                  <span className="bold-text-alignment">
                    {" "}
                    {output3 ? output3?.toFixed(2) : 0}
                  </span>
                </div>
              </div>
              <div className="text-grid">
                <div className="text-grid-items">
                  <label>Customer Acquisition Cost (CAC)</label>
                </div>
                <div className="text-grid-items">
                  <span className="bold-text-alignment">
                    {output4 ? output4?.toFixed(2) : 0}
                  </span>
                </div>
              </div>
              <div className="text-grid">
                <div className="text-grid-items">
                  <label>Monthly recurring revenue (MRR)</label>
                </div>
                <div className="text-grid-items">
                  <span className="bold-text-alignment">
                    {output5 ? output5?.toFixed(2) : 0}{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="button saas-genrate-add-button-center-alignment">
            <button>Generate Now</button>
          </div> */}
        </div>
        {adBox && <div>{/* <SecondAddBox /> */}</div>}
        <div className={styles.similarPdFBoxContentAlignment}>
          <div className={styles.title}>
            <p>Similar Tools</p>
          </div>
          <div className={styles.grid}>
            {images
              .filter(
                (item) =>
                  item.type == "calculator" &&
                  item.navigate != "/calculator/saas-product-calculator"
              )
              .map((item, index) => {
                return (
                  <div className={styles.gridItems} key={index}>
                    <div className={styles.subGrid}>
                      <div className={styles.subGridItems}>
                        <div className={styles.iconBox}>
                          <i className="fa-solid fa-calculator"></i>
                        </div>
                      </div>
                      <div className={styles.subGridItems}>
                        <span
                          onClick={() =>
                            router.push({ pathname: item.navigate })
                          }
                        >
                          {item.Name}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

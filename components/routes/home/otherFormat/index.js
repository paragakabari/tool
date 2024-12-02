import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { ApiPost } from "../../../../helpers/API/ApiData";
import styles from "../../../common/fileUploadBox/fileUploadBox.module.scss";
import back from "../../../../src/Images/back-icon.png";
import { saveAs } from "file-saver";
import names from "./names";
import Loader from "../../../Loader/Loader";

const zip = require("jszip")();

function OtherFormat({ Data }) {
  const location = useRouter();
  const Name = location.query.type;
  const ref = useRef();
  const humanNames = require("human-names");
  const [check, setCheck] = useState(false);
  const [checkAddress, setCheckAddress] = useState(false);
  const [checkZip, setCheckZip] = useState(false);
  const [uploadFile, setUploadFile] = useState({});
  const [downloadData, setDownloadData] = useState({});
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [searchName, setSearchName] = useState("");
  const [fakeName, setfakeName] = useState("");
  const [loading, setLoading] = useState(false);
  const [combineData, setCombineData] = useState("");
  const [combineDataShow, setCombineDataShow] = useState(false);
  const [text, setText] = useState([]);
  const [val, setVal] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setUploadFile({ ...uploadFile, [e.target.name]: e.target.files[0] });
    setCheckZip(true);

    let files = e.target.files;
    for (let file = 0; file < e.target.files.length; file++) {
      zip.file(files[file].name, files[file]);
    }
    zip.generateAsync({ type: "blob", compression: "DEFLATE" }).then((content) => {
      const compressedFile = new File([content], `${files[0].name.split(".")[0]}.zip`, {
        type: "application/zip",
      });
      setDownloadData(compressedFile);
      let data = Object.keys(zip.files);
      for (let i = 0; i < data.length; i++) {
        zip.remove(data[i]);
      }
    });
  };

  const handleDownload = (url) => {
    saveAs(downloadData, `${uploadFile.file.name.split(".")[0]}.zip`);
    setCheckZip(false);
  };

  const [address, setAddress] = useState({
    building_number: "",
    city: "",
    city_suffix: "",
    country: "",
    postalcode: "",
    state: "",
    street_name: "",
  });

  useEffect(() => {
    setCheck(false);
    setCheckAddress(false);
  }, [Name]);

  const handleOnChange = (e) => {
    setText1(e.target.value);
    setErrors({ ...errors, [e.target.name]: "" });
  };
  const handleOnTwoChange = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
    setText2(e.target.value);
  };

  const n1 = text1.length;
  const text1Array = [];
  const n2 = text2.length;
  const text2Array = [];
  const text3Array = [];

  for (let i = 1; i < n1; i++) {
    text1Array.push(text1.slice(i));
    text1Array.push(text1.slice(0, i));
  }

  for (let i = 1; i < n2; i++) {
    text1Array.push(text2.slice(i));
    text2Array.push(text2.slice(0, i));
  }

  for (let i = 0; i < text1Array.length; i++) {
    for (let j = 0; j < text2Array.length; j++) {
      text3Array.push(text1Array[i] + text2Array[j]);
    }
  }

  for (let i = 0; i < text2Array.length; i++) {
    for (let j = 0; j < text1Array.length; j++) {
      text3Array.push(text2Array[i] + text1Array[j]);
    }
  }

  const handleOnCombineChange = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });

    setSearchName(e.target.value);
  };

  const searchVal = searchName?.toLowerCase();

  const handlecombine = (e) => {
    if (validateForm()) {
      setCombineDataShow(true);
      const CombineName = text3Array?.filter((element) => element?.toLowerCase()?.match(searchVal));
      setCombineData(CombineName);
    }
  };

  useEffect(() => {
    const CombineName = text3Array?.filter((element) => element?.toLowerCase()?.match(searchVal));
    setCombineData(CombineName);
  }, [searchVal]);

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!text1 || text1?.trim() === "") {
      formIsValid = false;
      errors["text1"] = "*Please Enter name";
    }
    if (!text2 || text2?.trim() === "") {
      formIsValid = false;
      errors["text2"] = "*Please Enter name";
    }
    setErrors(errors);
    return formIsValid;
  };

  const getName = async () => {
    setLoading(true);
    let dataName = new FormData();
    dataName.append("text_generation_type", Data.conversion_type);

    ApiPost("v1/tool/text/fake_text", dataName)
      .then((res) => {
        setfakeName(res.data.data);
        setCheck(true);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
        setCheck(false);
        setLoading(false);
      });
  };

  const getAddress = async () => {
    setLoading(true);
    let dataAddress = new FormData();
    dataAddress.append("text_generation_type", Data.conversion_type);

    ApiPost("v1/tool/text/fake_text", dataAddress)
      .then((res) => {
        setAddress(res.data.data);
        setCheckAddress(true);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
        setCheckAddress(false);
        setLoading(false);
      });
  };

  const handleOnChangefunction = (e) => {
    if (e.target.value == "names") {
      const namesString = names[e.target.value];
      setText(namesString);
    } else {
      const yourString = humanNames[e.target.value];
      setText(yourString);
    }
  };

  const HandleOnInputChange = (e) => {
    setVal(e.target.value);
  };

  const newVal = val?.toLowerCase();

  const greaterThanTen = text?.filter((element) => element?.toLowerCase().match(newVal));

  return (
    <>
      <div ref={ref}>
        {/* Fake Address Generator */}
        {Name === "fake-address-generator" && (
          <>
            <div>
              <div className="button faek-genrate-add-button-center-alignment">
                <button onClick={() => getAddress()}>
                  <span>Generate Address</span>
                  {loading && <Loader />}
                </button>
              </div>
              {checkAddress == true ? (
                <div className="fake-genrate-add-box-design">
                  <div className="text-grid">
                    <div className="text-grid-items">
                      <p>Your building number is:</p>
                    </div>
                    <div className="text-grid-items">
                      <span>{address.building_number}</span>
                    </div>
                  </div>
                  <div className="text-grid">
                    <div className="text-grid-items">
                      <p>Your street name is:</p>
                    </div>
                    <div className="text-grid-items">
                      <span>{address.street_name}</span>
                    </div>
                  </div>
                  <div className="text-grid">
                    <div className="text-grid-items">
                      <p>Your city suffix is:</p>
                    </div>
                    <div className="text-grid-items">
                      <span>{address.city_suffix}</span>
                    </div>
                  </div>
                  <div className="text-grid">
                    <div className="text-grid-items">
                      <p>Your city is:</p>
                    </div>
                    <div className="text-grid-items">
                      <span> {address.city}</span>
                    </div>
                  </div>
                  <div className="text-grid">
                    <div className="text-grid-items">
                      <p> Your postalcode is:</p>
                    </div>
                    <div className="text-grid-items">
                      <span>{address.postalcode}</span>
                    </div>
                  </div>
                  <div className="text-grid">
                    <div className="text-grid-items">
                      <p>Your state is:</p>
                    </div>
                    <div className="text-grid-items">
                      <span>{address.state}</span>
                    </div>
                  </div>
                  <div className="text-grid">
                    <div className="text-grid-items">
                      <p>Your country is:</p>
                    </div>
                    <div className="text-grid-items">
                      <span>{address.country}</span>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </>
        )}

        {/* Fake Name Generator */}
        {Name === "fake-name-generator" && (
          <>
            <div className="button faek-genrate-add-button-center-alignment">
              <button onClick={() => getName()}>
                <span>Generate Name</span>
                {loading && <Loader />}
              </button>
            </div>
            {check == true ? (
              <div className="fake-genrate-add-box-design">
                <div className="text-grid">
                  <div className="text-grid-items">
                    <p>Your name is:</p>
                  </div>
                  <div className="text-grid-items">
                    <span>{fakeName.name}</span>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        )}

        {/* Create Zip */}
        {Name === "create-zip" && (
          <>
            <div className={styles.fileUploadBoxDesign}>
              <div className="alignsettwo alignset button">
                {checkZip == true ? (
                  <>
                    <h3> Your File is ready. </h3>
                    <br />
                    <button onClick={() => handleDownload()}>
                      <span>Download Zip File</span>
                    </button>
                    <br />
                    <br />

                    <h4 onClick={() => setCheckZip(false)}>
                      <img src={back.src} alt="back" style={{ height: "12px", width: "25px" }} /> Back to site.
                    </h4>
                  </>
                ) : (
                  <button style={{ justifyContent: "center" }}>
                    <input multiple type="file" name="file" onChange={(e) => handleChange(e)} />
                    <i className="fa-solid fa-upload"></i>
                    <span>Upload from PC or Mobile</span>
                  </button>
                )}
              </div>
            </div>
          </>
        )}

        {/* SERACH NAME */}
        {Name === "search-name" && (
          <>
            <div className="main-salary-calculator-box">
              {/* <div className="serch-name-two-col-grid-items"> */}
              <div className="salry-input">
                <div>
                  <select
                    id="unit"
                    name="unit"
                    onChange={(e) => {
                      handleOnChangefunction(e);
                    }}
                  >
                    <option selected disabled hidden>
                      Select Value
                    </option>
                    <option value="names">All Name</option>
                    <option value="femaleEn">English(Female)</option>
                    <option value="maleEn">English(Male)</option>
                    <option value="femaleFr">French(Female)</option>
                    <option value="maleFr">French(Male)</option>
                    <option value="femaleIt">Italian(Female)</option>
                    <option value="maleIt">Italian(Male)</option>
                    <option value="femaleDe">Deutch(Female)</option>
                    <option value="maleDe">Deutch(Male)</option>
                    <option value="femaleEs">Spanish(Female)</option>
                    <option value="maleEs">Spanish(Male)</option>
                    <option value="femaleNl">Dutch(Female)</option>
                    <option value="maleNl">Dutch(Male)</option>
                  </select>
                </div>
              </div>
            </div>
            {/* </div> */}
            {text.length === 0 ? (
              ""
            ) : (
              <div className="main-salary-calculator-box searchNameAlignment">
                <div className="salry-input timerAlignment">
                  <input onChange={(e) => HandleOnInputChange(e)} placeholder="Search Your Name Character Ex - A"></input>
                  <div className="new-flex-copy-new-align result-alignment">
                    <h4>Result :-</h4>
                  </div>

                  {greaterThanTen ? (
                    greaterThanTen.length === 0 ? (
                      <div className={styles.fileUploadBoxError}>There are no Data</div>
                    ) : (
                      <div className="five-grid-alignment">
                        {greaterThanTen?.map((item, index) => {
                          return <p key={index}>{item}</p>;
                        })}
                      </div>
                    )
                  ) : (
                    <div className="five-grid-alignment">
                      {text?.map((item, index) => {
                        return <p key={index}>{item}</p>;
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* name-combiner */}
        {Name === "name-combiner" && (
          <>
            <div className="main-salary-calculator-box">
              <div className="two-col-grid ">
                <div className="salry-input">
                  <input
                    placeholder="Enter Your Name"
                    value={text1}
                    name="text1"
                    onChange={(e) => handleOnChange(e)}
                    className={errors["text1"] && "error-input"}
                  />
                  <span style={{ color: "red", fontSize: "15px" }}>{errors["text1"]}</span>
                </div>
                <div className="salry-input">
                  <input
                    placeholder="Enter Your Name For Combine"
                    value={text2}
                    name="text2"
                    onChange={(e) => handleOnTwoChange(e)}
                    className={errors["text2"] && "error-input"}
                  />
                  <span style={{ color: "red", fontSize: "15px" }}>{errors["text2"]}</span>
                </div>
              </div>
            </div>

            <div className="button faek-genrate-add-button-center-alignment">
              <button
                onClick={(e) => {
                  handlecombine(e);
                }}
              >
                Combine
              </button>
            </div>

            {combineDataShow === true ? (
              <div className="main-salary-calculator-box searchNameAlignment">
                <div className="salry-input timerAlignment">
                  <input onChange={(e) => handleOnCombineChange(e)} placeholder="Search Your Name Character Ex - A" />
                  <div className="new-flex-copy-new-align result-alignment">
                    <h4>Result :-</h4>
                  </div>
                  {combineData ? (
                    combineData.length === 0 ? (
                      <div className={styles.fileUploadBoxError}>There are no Data</div>
                    ) : (
                      <div className="five-grid-alignment">
                        {combineData
                          ?.filter((element) => element?.toLowerCase()?.match(searchVal))
                          .map((item, index) => {
                            return <p key={index}>{item}</p>;
                          })}
                      </div>
                    )
                  ) : (
                    <div className="five-grid-alignment">
                      {text3Array?.map((item, index) => {
                        return <p key={index}>{item}</p>;
                      })}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </>
  );
}

export default OtherFormat;

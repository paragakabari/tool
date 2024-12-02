import React, { useEffect, useState } from "react";
import styles from "../fileUploadBox/fileUploadBox.module.scss";
import { ApiPost } from "../../../helpers/API/ApiData";
import ReCAPTCHA from "react-google-recaptcha";
import { saveAs } from "file-saver";
import back from "../../../src/Images/back-icon.png";
// import Loader from "../../../src/Images/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropzone from "react-dropzone";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useRouter } from "next/router";
import Loader from "../../Loader/Loader";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

var FileSaver = require("file-saver");

export default function FileUploadBoxImage({ Data }) {
  let captcha;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [uploadFile, setUploadFile] = useState();
  const [check, setCheck] = useState(false);
  const [downloadData, setDownloadData] = useState();
  const [loader, setLoader] = useState(false);
  const [qrCode, setQrCode] = useState();
  const [openEncrypt, setOpenEncrypt] = useState(false);
  const [openPdf, setOpenPdf] = useState(false);
  const handleOpenPdf = () => setOpenPdf(true);
  const handleOpenEncrypt = () => setOpenEncrypt(true);
  const handleClosePdf = () => setOpenPdf(false);
  const handleCloseEncrypt = () => setOpenEncrypt(false);
  const [password, setPassword] = useState();
  const [rcaptcha, setRcaptcha] = useState();
  const [errors, setErrors] = useState({});
  const [fileName, setFileName] = useState("");

  const [isLoading, setLoading] = useState(false);
  const setCaptchaRef = (ref) => {
    if (ref) {
      return (captcha = ref);
    }
  };

  function onChange(value, fileData) {
    if (value !== null) {
      setRcaptcha(value);
      setLoader(true);
      let data = new FormData();
      data.append("file", !rcaptcha ? uploadFile : fileData);
      data.append("conversion_type", Data.conversion_type);

      // setTimeout(() => {
      //   captcha?.reset();
      // }, [2000]);
      ApiPost(`v1/tool/${Data.apiRoute}`, data)
        .then((res) => {
          setDownloadData(res.data.data.url[0]);
          setQrCode(res.data.data.url[1]);
          setCheck(true);
          setLoader(false);
          handleClose();
          setUploadFile();
        })
        .catch((err) => {
          toast.error(err);
          setLoader(false);
          setUploadFile();
        });
    }
  }

  const handleDownload = (url) => {
    // var element = document.createElement("a");
    // var file = new Blob([downloadData], { type: `${Data.conversion_type}` });
    // element.href = URL.createObjectURL(file);
    // element.download = `${Data.Name}.${Data.conversion_type}`;
    // element.click();
    setLoading(true);
    // setTimeout(function () {
    // saveAs(downloadData, `${fileName}.${Data.conversion_type}`);
    // saveAs(downloadData, `${fileName}.${Data.conversion_type}`);
    FileSaver.saveAs(downloadData, `${fileName}.${Data.conversion_type}`);

    setLoading(false);
    // }, 2000);
  };

  const handleDownloadEncrypt = (url) => {
    setLoading(true);
    setTimeout(function () {
      saveAs(downloadData, `${Data.Name}.pdf`);
      setLoading(false);
    }, 2000);
  };
  const handleChange = (acceptedFiles) => {
    let file = acceptedFiles[0];
    setFileName(file?.name.split(".")[0]);

    // if (file && !file.name) {
    //   toast.error("Please select a file");
    // }

    // if (file.size > 10e6) {
    //   toast.error("Please upload a file smaller than 10 MB");
    // }
    // else {
    var myString = file.name;
    var FileExtension = myString?.substring(myString.lastIndexOf(".") + 1);
    if (Data.extension == FileExtension) {
      setUploadFile(acceptedFiles[0]);

      Data.Name === "Lock PDF" || Data.Name === "Unlock PDF"
        ? handleOpenEncrypt()
        : !rcaptcha
        ? handleOpen()
        : onChange(rcaptcha, acceptedFiles[0]);
    } else {
      toast.error(`Please upload ${Data?.extension} File`);
    }
    // }
  };

  const handleModelCloseEncrypt = () => {
    if (validateForm()) {
      handleOpenPdf();
      handleCloseEncrypt();
    }
  };

  const handlePassword = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let formIsValid = true;
    let err = {};
    if (!password || !password.password) {
      err.password = "* Please enter password";
      formIsValid = false;
    }
    setErrors(err);
    return formIsValid;
  };

  function onChangeEncrypt(value) {
    if (value !== null) {
      setLoader(true);
      let data = new FormData();
      data.append("file", uploadFile);
      data.append("conversion_type", Data.conversion_type);
      data.append("password", password.password);

      ApiPost(`v1/tool/${Data.apiRoute}`, data)
        .then((res) => {
          setDownloadData(res.data.data.url[0]);
          setQrCode(res.data.data.url[1]);
          setCheck(true);
          setLoader(false);
          handleClosePdf();
          setUploadFile();
        })
        .catch((err) => {
          toast.error(err);
          setLoader(false);
          setUploadFile();
        });
    }
  }

  const handleModelClose = () => {
    setUploadFile();
    handleClose();
    handleClosePdf();
  };

  const handleProcessCancel = () => {
    setUploadFile("");
    setLoader(false);
    window.location.reload();
  };

  const router = useRouter();
  const id = router.query.type;
  useEffect(() => {
    setCheck(false);
  }, [id]);

  return (
    <>
      <ToastContainer />
      <div>
        {/* <div className={styles.fileUploadBoxDesign}> */}
        <div className={check === false ? "" : "h100"}>
          <div
            className={
              check === true
                ? "button alignset "
                : "alignsettwo alignset button"
            }
          >
            {check == true ? (
              Data?.Name === "Lock PDF" || Data?.Name === "Unlock PDF" ? (
                <>
                  <div className={styles.fileUploadBoxDesign}>
                    <h3> Your File is ready. </h3>
                    <br />
                    <button onClick={() => handleDownloadEncrypt()}>
                      Download Now
                      {isLoading ? <Loader /> : null}
                    </button>
                    <h4 onClick={() => setCheck(false)}>
                      <img
                        src={back.src}
                        alt="back"
                        style={{ height: "12px", width: "25px" }}
                      />
                      Back to site.
                    </h4>
                  </div>
                </>
              ) : (
                <div className="new-file-ready-box">
                  <div className="all-new-grid">
                    <div className="all-new-grid-items">
                      <h3> Your File is ready. </h3>
                      <div className="download-button-center-alignment">
                        <button onClick={() => handleDownload()}>
                          {" "}
                          Download Now
                          {isLoading ? <Loader /> : null}
                        </button>
                      </div>
                      <div
                        onClick={() => setCheck(false)}
                        className="back-to-page-style"
                      >
                        <img
                          src={back.src}
                          alt="back"
                          style={{ height: "12px", width: "25px" }}
                        />{" "}
                        <span>Back to site.</span>
                      </div>
                    </div>
                    <div className="all-new-grid-items">
                      {check && (
                        <div
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={"data:image/png;base64," + qrCode}
                            style={{ width: "200px", height: "200px" }}
                          />

                          <label>
                            Scan this QR Code to download{" "}
                            {Data?.conversion_type} in your phone.
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            ) : (
              // <button style={{ justifyContent: "center" }}>
              //   <input
              //     type="file"
              //     name="file"
              //     accept="image/*"
              //     onChange={(e) => handleChange(e)}
              //   />
              //   <i className="fa-solid fa-upload"></i>
              //   <span>Upload from PC or Mobile</span>
              // </button>

              // <div className="image-cropper-box-design-upload">
              //   <div className="icon-center-alignment">
              //     <i className="fa-solid fa-cloud-arrow-up"></i>
              //   </div>
              //   <p>
              //     Drag your image here, or click to <strong>browse</strong>
              //   </p>

              <Dropzone onDrop={(acceptedFiles) => handleChange(acceptedFiles)}>
                {({ getRootProps, getInputProps, isDragActive }) => (
                  <div className="image-cropper-box-design-upload">
                    <div className="icon-center-alignment" {...getRootProps()}>
                      <i className="fa-solid fa-cloud-arrow-up"></i>
                    </div>
                    <div>
                      <p>
                        <input {...getInputProps()} />
                      </p>
                      {isDragActive ? (
                        <b>Drop it...</b>
                      ) : (
                        <p>
                          Drag your file here, or click to{" "}
                          <strong>browse</strong>
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </Dropzone>

              // <button style={{ justifyContent: "center" }}>
              //   <input
              //     type="file"
              //     name="file"
              //     onChange={(e) => handleChange(e)}
              //   />
              //   <i className="fa-solid fa-upload"></i>
              //   <span>Upload from PC or Mobile</span>
              // </button>

              // </div>
            )}
          </div>

          {/* {check == true ? " " : <p>or Drag files here</p>} */}
          {loader === true ? (
            <div className="cusLoader">
              <div className="spinner">
                {/* <img
                  className="loading-center-alignment"
                  src={Loader.src}
                  style={{ height: "100px", width: "150px", margin: "auto" }}
                /> */}

                <div className="button center-button-cancel">
                  <button onClick={() => handleProcessCancel()}>
                    cancel <Loader />
                  </button>
                </div>
              </div>
            </div>
          ) : Data?.Name === "Lock PDF" || Data?.Name === "Unlock PDF" ? (
            <Modal
              open={openEncrypt}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                {/* <Typography id="modal-modal-title" variant="h6" component="h2"> */}
                Please enter your Password
                <div className="input-new">
                  <input
                    type="password"
                    className={errors?.password && "error-input"}
                    placeholder="Password"
                    name="password"
                    onChange={(e) => handlePassword(e)}
                  />
                </div>
                <span style={{ color: "red", fontSize: "15px" }}>
                  {errors?.password}
                </span>
                {/* </Typography> */}
                <div className="button center-button-cancel">
                  <button onClick={() => handleModelCloseEncrypt()}>
                    Next
                  </button>
                </div>
              </Box>
            </Modal>
          ) : (
            <Modal
              open={open}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Please check the reCaptcha.
                </Typography>
                <hr />
                {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
                <ReCAPTCHA
                  ref={(r) => setCaptchaRef(r)}
                  // style={{ border: "none" }}
                  sitekey="6Ld-5uoiAAAAAMdWkYmXtf0DtvfZnay9Z8jIlQdj"
                  onChange={(e) => onChange(e)}
                />
                {/* </Typography> */}
                <hr />
                <div className="button center-button-cancel">
                  <button onClick={() => handleModelClose()}>cancel</button>
                </div>
              </Box>
            </Modal>
          )}

          <Modal
            open={openPdf}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Please check the reCaptcha.
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <ReCAPTCHA
                  sitekey="6Ld-5uoiAAAAAMdWkYmXtf0DtvfZnay9Z8jIlQdj"
                  onChange={onChangeEncrypt}
                />
              </Typography>
              <hr />
              <div className="button center-button-cancel">
                <button onClick={() => handleModelClose()}>cancel</button>
              </div>
            </Box>
          </Modal>
        </div>
        {/* </div> */}
        <br />
      </div>
    </>
  );
}

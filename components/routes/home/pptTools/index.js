import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { saveAs } from "file-saver";
import ConvertApi from "convertapi-js";
import styles from "../../../../components/common/fileUploadBox/fileUploadBox.module.scss";
import "react-toastify/dist/ReactToastify.css";

import back from "../../../../src/Images/back-icon.png";
// import Loader from "../../../../src/Images/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import Dropzone from "react-dropzone";
import Loader from "../../../Loader/Loader";

export default function PptToPdf({ Data }) {
  const [uploadFile, setUploadFile] = useState();
  const [check, setCheck] = useState(true);
  const [downloadData, setDownloadData] = useState();
  const [loader, setLoader] = useState(false);

  const handleDownload = (url) => {
    setLoader(true);
    saveAs(downloadData, `Document.pdf`);
    setLoader(false);
  };

  const handleChange = (acceptedFiles) => {
    let file = acceptedFiles[0];
    if (file && !file.name) {
      toast.error("Please select a file");
    }
    if (file.size > 10e6) {
      toast.error("Please upload a file smaller than 10 MB");
    } else {
      var myString = file.name;
      var FileExtension = myString?.substring(myString.lastIndexOf(".") + 1);

      if (FileExtension == "ppt" || FileExtension == "pptx") {
        setLoader(true);
        let convertApi = ConvertApi.auth("3y5xuKSpmPgRVcu1");
        let params = convertApi.createParams();
        params.add("File", file);
        let result = convertApi.convert("ppt", "pdf", params);
        Promise.resolve(result)
          .then((res) => {
            setDownloadData(res.dto.Files[0].Url);
            setLoader(false);
            setCheck(false);
            setUploadFile();
          })
          .catch((error) => {
            alert(error);
            setLoader(false);
            setCheck(false);
            setUploadFile();
          });
      } else {
        toast.error(`Please upload Ppt File`);
      }
    }
  };

  const handleProcessCancel = () => {
    setUploadFile("");
    setLoader(false);
    window.location.reload();
  };

  const router = useRouter();
  const id = router.query.type;
  useEffect(() => {
    setCheck(true);
  }, [id]);

  return (
    <>
      <ToastContainer />
      <div>
        <div className={check === false ? "" : "h100"}>
          <div
            className={
              check === true
                ? "button alignset "
                : "alignsettwo alignset button"
            }
          >
            {check == false ? (
              <div className={styles.fileUploadBoxDesign}>
                <h3> Your File is ready. </h3>
                <button onClick={() => handleDownload()}>
                  Download Now{loader && <Loader />}{" "}
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
            ) : (
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
            )}
          </div>

          {loader === true && (
            <div className="cusLoader">
              <div className="spinner">
                {/* <img
                  className="loading-center-alignment"
                  src={Loader.src}
                  style={{ height: "100px", width: "150px", margin: "auto" }}
                /> */}

                <div className="button center-button-cancel">
                  <button onClick={() => handleProcessCancel()}>
                    Cancel <Loader />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

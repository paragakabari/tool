import React, { useState, useRef } from "react";
import styles from "./imageCombine.module.scss";
import * as htmlToImage from "html-to-image";
import Loader from "../../../../Loader/Loader";
import { toast, ToastContainer } from "react-toastify";

export default function ImageCombine({ Data }) {
  const [combinImg, setCombineImg] = useState([]);
  const [valueDrop, setValueDrop] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleOnChange = (e) => {
    if (e.target.files[0]) {
      setCombineImg([...combinImg, URL.createObjectURL(e.target.files[0])]);
    }
  };

  const handleOnNewImage = () => {
    setCombineImg([]);
  };

  const handleOnExportPost = () => {
    if (validateForm()) {
      setLoader(true);
      htmlToImage
        .toJpeg(document.getElementById("merged_images"), { quality: 0.95 })
        .then(function (dataUrl) {
          var link = document.createElement("a");
          link.download = "Image.jpeg";
          link.href = dataUrl;
          link.click();
          setLoader(false);
        });
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    if (combinImg.length < 1) {
      formIsValid = false;
      toast.error("Please upload your image");
    } else if (combinImg.length < 2) {
      formIsValid = false;
      toast.error("Please upload your second image");
    }
    return formIsValid;
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.imageCombineAlignment}>
        <div className={styles.combineImgOptionAlignment}>
          <div className={styles.combineImgNew}>
            <select onClick={(e) => setValueDrop(e.target.value)}>
              <option value="false">Side By Side</option>
              <option value="true">Vertically</option>
            </select>
          </div>
        </div>

        <div className={styles.inputBoxAlignment}>
          {valueDrop === "true" ? (
            <div id="merged_images" className={styles.horizonakalAlignment}>
              <div className={styles.selectImgBoxAlignment}>
                {combinImg[0] ? (
                  <img src={combinImg[0]} />
                ) : (
                  <i className="fa-solid fa-images"></i>
                )}
                <input type="file" onChange={(e) => handleOnChange(e)} />
              </div>
              <div className={styles.selectImgBoxAlignment}>
                {combinImg[1] ? (
                  <img src={combinImg[1]} />
                ) : (
                  <i className="fa-solid fa-images"></i>
                )}
                <input type="file" onChange={(e) => handleOnChange(e)} />
              </div>
            </div>
          ) : (
            <div className={styles.verticalBoxAlignment}>
              <div id="merged_images" className={styles.verticalGrid}>
                <div className={styles.verticalselectImgBoxAlignment}>
                  {combinImg[0] ? (
                    <img src={combinImg[0]} />
                  ) : (
                    <i className="fa-solid fa-images"></i>
                  )}
                  <input type="file" onChange={(e) => handleOnChange(e)} />
                </div>
                <div className={styles.verticalselectImgBoxAlignment}>
                  {combinImg[1] ? (
                    <img src={combinImg[1]} />
                  ) : (
                    <i className="fa-solid fa-images"></i>
                  )}
                  <input type="file" onChange={(e) => handleOnChange(e)} />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="button reset-defaults-button-center-alignment">
          <div className="button">
            <button onClick={() => handleOnNewImage()}> New Image </button>
          </div>
          <div className="button">
            <button onClick={() => handleOnExportPost()}>
              Download Image {loader && <Loader />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

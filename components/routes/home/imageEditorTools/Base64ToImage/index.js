import React, { useState } from "react";
var isBase64 = require("is-base64");
// const base64_to_image = require("base64-to-image-downloader");

function BaseToImage() {
  const [image, setImage] = useState();
  const [showImage, setShowImage] = useState();
  const [errors, setErrors] = useState();

  const handlefileImage = (e) => {
    setShowImage();
    setImage(e.target.value);
    setErrors();
  };

  const handleconvert = (e) => {
    let base64check = isBase64(image, { mimeRequired: true });

    if (validateForm()) {
      if (base64check) {
        setShowImage(image);
      } else {
        setErrors("* Please enter valid base64 value");
      }
    }
  };
  const validateForm = () => {
    let formIsValid = true;
    if (!image) {
      setErrors("* Please enter base64 value");
      formIsValid = false;
    }

    return formIsValid;
  };

  const handleOnErase = () => {
    setImage("");
  };

  //  download base64 image

  const base64_to_image_download = (base64String, filename) => {
    // extract content type and base64 payload from original string
    var pos = base64String.indexOf(";base64,");
    var type = base64String.substring(5, pos);
    var b64 = base64String.substr(pos + 8);

    // decode base64
    var imageContent = atob(b64);

    // create an ArrayBuffer and a view (as unsigned 8-bit)

    var buffer = new ArrayBuffer(imageContent.length);
    var view = new Uint8Array(buffer);

    // fill the view, using the decoded base64

    for (var n = 0; n < imageContent.length; n++) {
      view[n] = imageContent.charCodeAt(n);
    }

    // convert ArrayBuffer to Blob

    var blob = new Blob([buffer], { type: type });

    // create a blob URL, such that it could be used as an image src

    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(blob);

    // download the image

    var tag = document.createElement("a");
    tag.href;
    tag.download = filename;
    document.body.appendChild(tag);
    tag.click();
    document.body.removeChild(tag);
  };

  return (
    <>
      <div className="main-globally-counter-box">
        <div className="color-picker-icon">
          {image && (
            <i
              className="fa-solid fa-eraser"
              title="Clear"
              onClick={handleOnErase}
            ></i>
          )}
        </div>
        <div className="counter-text-area">
          <textarea
            className={errors && "error-input"}
            type="text"
            value={image}
            onChange={(e) => handlefileImage(e)}
            placeholder="Enter Base64 value"
          />

          <span>{errors}</span>
        </div>
      </div>
      <div className="button counter-word-center-align">
        <button onClick={(e) => handleconvert(e)}>Convert Image</button>
      </div>
      {showImage != undefined && (
        <>
          <div className="counter-details-box">
            <div>
              <img src={showImage} alt="123"></img>
            </div>
          </div>
          <div className="button faek-genrate-add-button-center-alignment">
            <a href={showImage} download="image.png">
              <button>
                <span
                  onClick={() =>
                    base64_to_image_download(showImage, "mage.png")
                  }
                >
                  Download
                </span>
              </button>
            </a>
          </div>
        </>
      )}
    </>
  );
}

export default BaseToImage;

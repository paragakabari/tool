// import { useState } from "react";
import Resizer from "react-image-file-resizer";
import convert from "image-file-resize";
import Loader from "../../../../../src/Images/loader.gif";

import React, { useState, useRef } from "react";
export default function ImageResize({ Data }) {
  const [src, setSrc] = useState("");
  const imageRef = useRef(null);

  const [image, setImage] = useState();
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();
  const [newImage, setNewImage] = useState();
  const [showimage, setShowImage] = useState();
  const [loading, setLoading] = useState(false);

  const handlefileImage = (e) => {
    setNewImage(e.target.files[0]);
    setShowImage(URL.createObjectURL(e.target.files[0]));
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleImageLoad = () => {
    setWidth(imageRef.current.naturalWidth);
    setHeight(imageRef.current.naturalHeight);
  };

  const fileChangedHandler = (e) => {
    // setLoading(true);
    var fileInput = true;
    if (fileInput) {
      convert({
        file: newImage,
        width: width,
        height: height,
        type: "jpeg",
      })
        .then((resp) => {
          setImage(URL.createObjectURL(resp));
        })
        .catch((error) => {});
    }
  };

  const handleOnChange = (e) => {
    if (e.target.id === "height-input") {
      setHeight(e.target.value);
    } else if (e.target.id === "width-input") {
      setWidth(e.target.value);
    }
  };

  return (
    <>
      {!showimage && (
        <div className="image-cropper-box-design-upload">
          <div className="icon-center-alignment">
            <i className="fa-solid fa-cloud-arrow-up"></i>
          </div>
          <p>
            Drag your image here, or click to <strong>browse</strong>
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handlefileImage(e)}
          />
        </div>
      )}

      {showimage && (
        <>
          <div className="image-cropper-box-design-upload-two">
            <div className="image-cropper-scale-grid">
              <div className="input-new">
                <label htmlFor="scale-input">Height: </label>
                <input
                  id="height-input"
                  type="text"
                  placeholder="height"
                  value={height}
                  onChange={handleOnChange}
                />
              </div>
              <div className="input-new">
                <label htmlFor="rotate-input">width: </label>
                <input
                  id="width-input"
                  type="text"
                  value={width}
                  placeholder="maximum width 0-180 in % of hight"
                  onChange={handleOnChange}
                />
              </div>
            </div>
          </div>
          <div className="instruction-image-Resize">
            <span>
              * Modify the values and click the preview button to see result.
            </span>
          </div>
        </>
      )}
      <div className="button reset-defaults-button-center-alignment">
        {showimage && (
          <>
            <button onClick={fileChangedHandler}>preview</button>
            <button
              onClick={() => {
                setShowImage();
                setImage();
              }}
            >
              <i className="fa-sharp fa-solid fa-arrow-left"></i> Back to site
            </button>
          </>
        )}
        {image && (
          <>
            <a href={image} target="blank" download>
              <button>
                <span>Download</span>
                {loading && <Loader />}
              </button>
            </a>
          </>
        )}
      </div>
      {image ? (
        <div className="crop-image-first-alignment">
          <img src={image} alt="" id="mcanvas" className="canvas-img-style" />
        </div>
      ) : (
        <div className="crop-image-first-alignment">
          <img src={showimage} alt="" ref={imageRef} onLoad={handleImageLoad} />
        </div>
      )}
    </>
  );
}

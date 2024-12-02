import React, { useState, useRef, useCallback } from "react";
import download from "downloadjs";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import { toast, ToastContainer } from "react-toastify";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";
import Loader from "../../../../Loader/Loader";

import "react-image-crop/dist/ReactCrop.css";

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}
export default function ImageCropper({ Data }) {
  const [check, setCheck] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState("1");
  const [rotate, setRotate] = useState("0");
  const [aspect, setAspect] = useState(16 / 9);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
    //   var myString = e?.target?.files[0]?.name;
    // var FileExtension = myString?.substring(myString.lastIndexOf(".") + 1);
    // if (FileExtension == "jpg", "png", "jpeg", "tiff", "bmp") {
      setCheck(true);
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
      // console.log("if*******")
      // setcheckWatermark(true);
    // } else {
    //   // setWatermark("");
    //   toast.error("Please upload .jpg , .png, .jpeg, .tiff, .b File");
    // }
    //   // setCheck(true);
    //   // setCrop(undefined); // Makes crop preview update between images.
    //   // const reader = new FileReader();
    //   // reader.addEventListener("load", () =>
    //   //   setImgSrc(reader.result?.toString() || "")
    //   // );
    //   // reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  // var c = document?.getElementById("mcanvas");
  // var ctx = c?.getContext("2d");
  // ctx?.beginPath();
  // ctx?.arc(100, 75, 50, 0, 2 * Math.PI);
  // ctx?.stroke();

  const handleDownload = useCallback(async () => {
    // var canvas = document?.getElementById("mcanvas");
    setLoading(true);
    if (previewCanvasRef.current) {
      download(await toJpeg(previewCanvasRef.current), "my-image.png");
      // download(await toSvg(ref.current), "test.svg");
      setLoading(false);
    }
    // var image = canvas
    //   ?.toDataURL("image/png")
  }, [previewCanvasRef?.current]);

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined);
    } else if (imgRef.current) {
      const { width, height } = imgRef.current;
      setAspect(16 / 9);
      setCrop(centerAspectCrop(width, height, 16 / 9));
    }
  }

  return (
    <>
    <ToastContainer />
      {!imgSrc && (
        <div className="image-cropper-box-design-upload">
          <div className="icon-center-alignment">
            <i className="fa-solid fa-cloud-arrow-up"></i>
          </div>
          <p>
            Drag your image here, or click to <strong>browse</strong>
          </p>
          <input type="file" accept="image/jpg, image/png, image/bmp, image/jpeg" onChange={onSelectFile} />
        </div>
      )}

      {imgSrc && (
        <div>
          <div className="image-cropper-box-design-upload-two">
            <div className="image-cropper-scale-grid">
              <div className="input-new">
                <label htmlFor="scale-input">Scale: </label>
                <input
                  id="scale-input"
                  type="number"
                  step="0.1"
                  placeholder="1"
                  value={scale}
                  disabled={!imgSrc}
                  onChange={(e) => setScale(e.target.value)}
                />
              </div>
              <div className="input-new">
                <label htmlFor="rotate-input">Rotate (Degree) :</label>
                <input
                  id="rotate-input"
                  placeholder="0"
                  type="number"
                  value={rotate}
                  disabled={!imgSrc}
                  onChange={(e) => {
                    e.target.value <= 360 &&
                      e.target.value >= -360 &&
                      setRotate(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="button toogle-aspect-button-center-alignment">
            <button onClick={handleToggleAspectClick}>
              Toggle aspect {aspect ? "off" : "on"}
            </button>
          </div>
        </div>
      )}
      {!!imgSrc && (
        <div className="react-crop-image-style">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
          >
            <img
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        </div>
      )}
      <div>
        {!!completedCrop && (
          <div className="react-crop-image-style react-crop-image-style-top-alignment">
            <canvas
              ref={previewCanvasRef}
              id="mcanvas"
              style={{
                border: "1px solid black",
                objectFit: "contain",
                width: completedCrop.width,
                height: completedCrop.height,
              }}
            />
          </div>
        )}
      </div>
      {check == true && (
        <div className="button image-download-button-center-alignment">
          <div className="button reset-defaults-button-center-alignment">
            <button
              onClick={() => {
                setImgSrc("");
                setCompletedCrop();
                setCheck(false);
              }}
            >
              <i className="fa-sharp fa-solid fa-arrow-left"></i> Back to site
            </button>
            <button onClick={() => handleDownload()}>
              <span> Download </span>
              {loading && <Loader />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

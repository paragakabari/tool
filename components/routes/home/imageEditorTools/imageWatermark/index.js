import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { ApiPost } from "../../../../../helpers/API/ApiData";

export default function ImageWatermark({ Data }) {
  const [image, setImage] = useState();
  const [watermark, setWatermark] = useState();
  const [watermarkImage, setWatermarkImage] = useState();
  const [check, setcheck] = useState(false);
  const [checkWatermark, setcheckWatermark] = useState(false);
  const [download, setDownload] = useState(false);

  const handleChange = (e) => {
    var myString = e?.target?.files[0]?.name;
    var FileExtension = myString?.substring(myString.lastIndexOf(".") + 1);
    
    if (FileExtension == "jpg") {
      setImage(e.target.files[0]);
      setcheck(true);
    } else {
      setImage("");
      toast.error("Please upload .jpg File");
    }
  };

  const handleChangeWatermark = (e) => {
    var myString = e?.target?.files[0]?.name;
    var FileExtension = myString?.substring(myString.lastIndexOf(".") + 1);
    
    if (FileExtension == "jpg") {
      setWatermark(e.target.files[0]);
      setcheckWatermark(true);
    } else {
      setWatermark("");
      toast.error("Please upload .jpg File");
    }
  };

  const handleAddWatermark = () => {
    let data = new FormData();
    data.append("image", image);
    data.append("watermark", watermark);

    ApiPost("v1/tool/watermark/add_watermark", data)
      .then((res) => {
        
        setWatermarkImage(res.data.data);
        setDownload(true);
      })
      .catch((err) => {
        alert(err);
        setDownload(false);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="image-cropper-box-design-upload">
        <div className="icon-center-alignment">
          <i className="fa-solid fa-cloud-arrow-up"></i>
        </div>
        <p>
          Select your image in which you want add <strong>watermark.</strong>
        </p>
        <input type="file" onChange={(e) => handleChange(e)} />
      </div>

      <div className="image-cropper-box-design-upload image-cropper-box-design-upload-two">
        <div className="icon-center-alignment">
          <i className="fa-solid fa-cloud-arrow-up"></i>
        </div>
        <p>
          Select the image you want to <strong>use as a watermark.</strong>
        </p>
        <input type="file" onChange={(e) => handleChangeWatermark(e)} />
      </div>

      <div className="image-color-extractor-center-alignment" style={{height:'auto'}}>
        {check && (
          <img
            src={URL?.createObjectURL(image)}
            style={{ width: "300px", height: "300px" }}
          />
        )}
        {checkWatermark && (
          <img
            src={URL?.createObjectURL(watermark)}
            style={{ width: "300px", height: "300px" }}
          />
        )}
      </div>

      <div className="button image-download-button-center-alignment" style={{ height:'auto'}}>
        {download == true ? (
          <a
            href={`data:image/jpeg;base64,${watermarkImage}`}
            target="_blank"
            download
          >
            <button>Download</button>
          </a>
        ) : (
          <>
            <button onClick={() => handleAddWatermark()}>Add Watermark</button>
          </>
        )}
      </div>
    </>
  );
}

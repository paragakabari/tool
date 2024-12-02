import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import QrScanner from "qr-scanner";
import { handleCopy } from "../../../../common/commonFunction";

export default function QrCodeDecoder() {

  const [decodeQrCode, setDecodeQrCode] = useState("");
 
  const [fileData, setFileData] = useState("");
  const [copy, setCopy] = useState(false);

  const handleOnQrDecoder = async () => {
    if (decodeQrCode) {
      const result = await QrScanner.scanImage(decodeQrCode)
        .then((result) => {
          setFileData(result)
        })
        .catch((error) => { 
          toast.error("Please upload valid file");
        });
    }
  };


  const handleChange = (e) => {
    setDecodeQrCode(e.target.files[0]);
    toast.success("your file is uploaded successfully");
  };
 

  return (
    <>
      <ToastContainer />
      <div className="image-cropper-box-design-upload">
        <div className="icon-center-alignment">
          <i className="fa-solid fa-cloud-arrow-up"></i>
        </div>
        <p>
          Drag your image here, or click to <strong>browse</strong>
        </p>
        <input type="file" accept="image/*" onChange={handleChange} />
      </div>
      <div className="download-button-one-alignment">
        <div className="button">
          <button onClick={() => handleOnQrDecoder()}>Decode</button>
        </div>
      </div>
      {fileData?.length > 0 &&
        <div className="main-salary-calculator-box meta-result-box-top-alignment">
          <div className="new-flex-copy-new-align">
            <h4>Result</h4>

            <div className="new-copy-icon-text-style-alignment">
              <div className="copy-icon">
                <i
                  className="fa-solid fa-copy " title="Copy"
                  onClick={() => handleCopy(fileData, setCopy)}
                ></i>
              </div>
              {copy && fileData && (
                <div>
                  <span>Copied</span>
                </div>
              )}
            </div>

          </div>
          {fileData && <p>{fileData}</p>}
        </div>}

    </>
  );
}















import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QrCodeGenerator() {
  const [textForQrCode, setTextForQrCode] = useState("");
  const qrRef = useRef();
  const qrcode = <QRCodeCanvas id="qrCode" value={textForQrCode} size={200} />;

  const handleChange = (e) => {
    setTextForQrCode(e.target.value);
  };

  const downloadQRCode = (e) => {
    e.preventDefault();
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    // setTextForQrCode("");
  };

  return (
    <div>
      <div>
        <div className="children-box-alignment">
          <div className="main-salary-calculator-box">
            <div className="two-col-grid two-col-grid-one">
              <div className="two-col-grid-items">
                <div className="salry-input">
                  <label>Enter some text </label>
                  <input
                    type="text"
                    name="qrCodeText"
                    value={textForQrCode}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="download-button-one-alignment">
            {textForQrCode === "" ? (
              <div></div>
            ) : (
              <div className="button">
                <button onClick={downloadQRCode}>Download QR Code</button>
              </div>
            )}
          </div>
          {qrcode?.props?.value !== "" &&
          <div className="meta-result-box-top-alignment main-salary-calculator-box">
            <h4>Result</h4>

           <div className="qr-code-alignment" ref={qrRef}>{qrcode}</div>
          </div>}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useRef } from "react";
import Barcode from "react-barcode";
import { saveAs } from "file-saver";

export default function barcodeGenrerator() {
  const [textForBarCode, setTextForBarCode] = useState("");
  const barRef = useRef();

  const handleChange = (e) => {
    setTextForBarCode(e.target.value);
  };

  // const download = (e) => {
  //   fetch(`https://barcode.tec-it.com/barcode.ashx?data=${textForBarCode}&code=Code128&translate-esc=true`, {
  //     method: "GET",
  //     // headers: {
  //     //   "Access-Control-Allow-Origin": "*",
  //     // }
  //   })
  //     .then((response) => {
  //       response.arrayBuffer().then(function (buffer) {
  //         const url = window.URL.createObjectURL(new Blob([buffer]));
  //         const link = document.createElement("a");
  //         link.href = url;
  //         link.setAttribute("download", "image.png"); //or any other extension
  //         document.body.appendChild(link);
  //         link.click();
  //       }
  //       );
  //     })
  //     .catch((err) => {});

  // };

 
  const qrRef = useRef();

  const barcode = <Barcode ref={qrRef} value={textForBarCode} displayValue={false} renderer={"canvas"} />

  const downloadQRCode = (e) => {
    e.preventDefault();
    let canvas = qrRef.current.querySelector("canvas");
   
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `bar-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    // setTextForBarCode("");
  };

  // const downloadQRCode = (e) => {
  //   saveAs(barcode, `gb.png`);
  //   };


  return (
    <div>
      {/* <div >
        <img
        
          alt="Barcode Generator TEC-IT"
          src={`https://barcode.tec-it.com/barcode.ashx?data=${textForBarCode}&code=Code128&translate-esc=true`}
        />
      </div>
      <button  onClick={(e) => download(e)}>Download</button> */}
      {/* <div>
      
          <img
            alt="TEC-IT Barcode Software"
            border="0"
            src="http://www.tec-it.com/pics/banner/web/TEC-IT_Logo_75x75.gif"
          />
      </div> */}

      <div>
        <div className="children-box-alignment">
          <div className="main-salary-calculator-box">
            <div className="two-col-grid two-col-grid-one">
              <div className="two-col-grid-items">
                <div className="salry-input">
                  <label>Enter text to generate Barcode </label>
                  <input
                    type="text"
                    name="barCodeCodeText"
                    value={textForBarCode}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="download-button-one-alignment">
            {textForBarCode === "" ? (
              <div></div>
            ) : (
              <div className="button">
                <button onClick={(e) => downloadQRCode(e)}>Download Barcode</button>
              </div>
            )}
          </div>

        { textForBarCode && <div className="main-salary-calculator-box meta-result-box-top-alignmentv barcode-top-alignment">
            <h4>Result</h4>

            {/* {textForBarCode && (
              {barcode}
            )} */}
            {/* <div ref={qrRef}>{barcode}</div> */}
            {barcode?.props?.value !== "" && <div style={{position:"relative",overflow:"scroll"}} ref={qrRef}>{barcode}</div>}
          </div>}
        </div>
      </div>
    </div>
  );
}

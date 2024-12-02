import { useRef, useState } from "react";
import Draggable from "react-draggable";
import Dropzone from "react-dropzone";
import festival from "../../../../src/Images/festival.png";
import html2canvas from "html2canvas";
import * as htmlToImage from "html-to-image";

function FestivalPost({ Data }) {
  const [logoImg, setLogoImg] = useState();
  const [Images, setImage] = useState();
  const [showImg, setShowImg] = useState(false);
  const previewCanvasRef = useRef(null);

  const handleChange = (acceptedFiles) => {
    setLogoImg(URL.createObjectURL(acceptedFiles[0]));

    setShowImg(true);
  };

  const handleCapture = async () => {
    var canvas = document?.getElementById("capture");

    // const canvas = document.createElement('canvas')
    // const blob = await toBlob(canvas)
    // console.log(blob)
    html2canvas(canvas).then(function (canvas) {
      if (typeof window !== "undefined") {
        domtoimage.toPng(document.getElementById("capture")).then(function (base64image) {
          saveAs(base64image, "myfestival.png");
        });
      }
    });
    html2canvas(document.querySelector("#capture")).then((canvas) => {
      document.getElementById("DDDDD").appendChild(canvas);
    });
  };

  const handleDownload = (url) => {
    let node = document.getElementById("capture");
    console.log("node", node);
    htmlToImage
      .toPng(node)
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.setAttribute("download", "festival.png"); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };
  return (
    <>
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
                  Drag your file here, or click to <strong>browse</strong>
                </p>
              )}
            </div>
          </div>
        )}
      </Dropzone>
      <br />
      <br />

      <div id="capture">
        <div>
          <img src={festival.src} alt="festival image" />
        </div>

        {showImg && (
          <>
            <Draggable>
              <img width="100px" height="100px" style={{ objectFit: "contain" }} src={logoImg} alt="festival image" />
            </Draggable>

            {/* // </div> */}
          </>
        )}
      </div>
      <div id="DDDDD"></div>

      {logoImg === undefined ? (
        ""
      ) : (
        <>
          <div className="button image-download-button-center-alignment">
            <div className="button faek-genrate-add-button-center-alignment">
              <button onClick={handleDownload}>Download</button>
            </div>

            <div id="DDDDD"></div>
            {Images}
          </div>
        </>
      )}
    </>
  );
}

export default FestivalPost;

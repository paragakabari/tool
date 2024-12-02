import React, { useState } from "react";

function ImageToBase() {
  const [state, setState] = useState();
  const [imageUrl, setImageUrl] = useState();

  const [baseImage, setBaseImage] = useState();
  const [copy, setCopy] = useState(false);
  const [model, setModel] = useState(true);

  const handleFileInputChange = (e) => {
    setCopy(false);
    setModel(false);

    const file = e.target.files[0];

    // convert image file to base64 string

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setBaseImage(reader.result);
    };

    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const handleCopy = (user) => {
    navigator.clipboard.writeText(user);
    if (navigator.clipboard.writeText(user)) {
      setCopy(true);
    }
  };

  //  image to base64

  const image_to_base64 = (image) => {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;

    var ctx = canvas.getContext("2d");
    ctx?.drawImage(image, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  };

  return (
    <>
      {baseImage === undefined && (
        //  && model
        <div className="image-cropper-box-design-upload">
          <div className="icon-center-alignment">
            <i className="fa-solid fa-cloud-arrow-up"></i>
          </div>
          <p>
            Drag your image here, or click to <strong>browse</strong>
          </p>
          <input type="file" accept="image/*" onChange={(e) => handleFileInputChange(e)} />
        </div>
      )}

      {baseImage === undefined ? (
        ""
      ) : (
        <>
          <div className="counter-details-box">
            <div>
              <img src={baseImage} alt="" />
            </div>
          </div>

          <div className="main-globally-counter-box">
            <div className="copy-textarea-icon-alignment">
              <i className="fa-solid fa-copy " title="Copy" onClick={() => handleCopy(baseImage)}></i>

              {copy && baseImage && (
                <div>
                  {" "}
                  <a>Copied</a>
                </div>
              )}
            </div>
            <div className="counter-text-area">
              <textarea value={baseImage} disabled="true" />
            </div>
          </div>
          <div className="button counter-word-center-align">
            <button
              onClick={() => {
                setBaseImage(undefined);
              }}
            >
              <i className="fa-sharp fa-solid fa-arrow-left"></i> Back to site
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default ImageToBase;

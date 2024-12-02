import React, { useRef, useState , useCallback } from "react";
import { SketchPicker } from "react-color";
import html2canvas from "html2canvas";
import { Editor } from "@tinymce/tinymce-react";
import Loader from "../../../../Loader/Loader";
import download from "downloadjs";
import {  toJpeg} from "html-to-image";



function TextToImg() {

  const [image, setImage] = useState()
  const [textvalue, setTextvalue] = useState();
  const [textbackground, setTextbackground] = useState({ background: "#FFFFFF" });
  const [color, setcolor] = useState(false);
  const [loading, setLoading] = useState(false);

  const exportRef = useRef();


  const exportAsImage = async (element, imageFileName) => {
    
    const canvas = await html2canvas(element)
    const image= canvas.toDataURL('image/png', 1.0)

    setImage(image)
    downloadImage(image, imageFileName)
  }

  const downloadImage =useCallback(async (blob, fileName) => {

    setLoading(true);
    if (exportRef.current) {
      download(await toJpeg(exportRef.current), "my-image.png");
      // download(await toSvg(ref.current), "test.svg");
      setLoading(false);
    }
    const fakeLink = window.document.createElement('a')
    fakeLink.style = 'display:none;'
    // fakeLink.download = fileName

    fakeLink.href = blob

    document.body.appendChild(fakeLink)
    fakeLink.click()
    document.body.removeChild(fakeLink)

    fakeLink.remove()
  },[exportRef?.current]);

  const handleTextbackgroundOn = (e) => {
    setcolor(!color);
  };

  const handletextbackground = (color) => {
    setTextbackground({ background: color.hex });
  };

  const handletext = (content) => {
    setTextvalue(content);
  };
  
  return (
    <div>
      <div>
      <Editor
                init={{
                  height: 500,
                  menubar: true,
                }}
                onEditorChange={(content) => handletext (content)}
              />
      </div>
      <div className="image-cropper-box-design-upload-two color-picker-box-alignment">
          <div className="meta-result-box-top-alignment">
            <h4>Background Color</h4>
            </div>
            <div className="color-picker-alignment">
              <div
                style={{
                  background: textbackground.background,
                }}
                className="color-picker-box"
                onClick={(e) => handleTextbackgroundOn(e)}
                // className="get-yout-color-picker"
              ></div>
              <span>Select color</span>
            </div>
          </div>
          {color === true ? <SketchPicker onChangeComplete={handletextbackground} color={textbackground.background} /> : ""}

          {textvalue === undefined ? (
          ""
        ) : (
          <div className="image-cropper-box-design-upload-two color-picker-box-alignment">
            <div
              className="meta-result-box-top-alignment"
              ref={exportRef}
              style={{ backgroundColor: `${textbackground.background}`, height: "350px", width: "100%" }}
            >
              <p dangerouslySetInnerHTML={{ __html: textvalue }} ></p>
            </div>
          </div>
        )}

      <div className="button faek-genrate-add-button-center-alignment">
        <button onClick={() => exportAsImage(exportRef.current)}>
          <span>Download</span>
          {loading && <Loader />}
          </button>
        </div>
      </div>
  );
}

export default TextToImg;

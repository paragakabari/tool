import React ,{ useState } from "react";
import convert from "image-file-resize";

export default function FaviconGenerator({ data}) {
  const [image, setImage] = useState();
  const [newImage, setNewImage] = useState();
  const [showimage, setShowImage] = useState();
  const [download, setDownload] = useState([])

  const handlefileImage = (e) => {
    setNewImage(e.target.files[0]);
    setShowImage(URL.createObjectURL(e.target.files[0]));
  };
 
  const browserIconHandler = async (e) => {
    var fileInput = true;
    if (fileInput) {
      await convert({
        file: newImage,
        width: 16,
        height: 16,
        type: "jpeg",
      })
        .then((resp) => {
          const url = window.URL.createObjectURL(resp);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "browsericon.png"); //or any other extension
          document.body.appendChild(link);
          link.click();
         
          // Response contain compressed and resized file
        })
        .catch((error) => {
          // Error
        });
    }

  };
  const bindInput = (value) => {
    var regex = new RegExp("^[^0-9]*$");
    var key = String.fromCharCode(
      !value.charCode ? value.which : value.charCode
    );
    if (regex.test(key)) {
      value.preventDefault();
      return false;
    }
  };
  const taskBarHandler = async (e) => {
    var fileInput = true;
    if (fileInput) {
      await convert({
        file: newImage,
        width: 32,
        height: 32,
        type: "jpeg",
      })
        .then((resp) => {
          const url = window.URL.createObjectURL(resp);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "taskbarshortcut.png"); //or any other extension
          document.body.appendChild(link);
          link.click();
          // Response contain compressed and resized file
        })
        .catch((error) => {
          // Error
        });
    }

  };
  const desktopHandler = async (e) => {
    var fileInput = true;
    if (fileInput) {
      await convert({
        file: newImage,
        width: 96,
        height: 96,
        type: "jpeg",
      })
        .then((resp) => {
          const url = window.URL.createObjectURL(resp);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "desktopshortcut.png"); //or any other extension
          document.body.appendChild(link);
          link.click();
          // Response contain compressed and resized file
        })
        .catch((error) => {
          // Error
        });
    }

  };
  const appleTouchHandler = async (e) => {
    var fileInput = true;
    if (fileInput) {
      await convert({
        file: newImage,
        width: 180,
        height: 180,
        type: "jpeg",
      })
        .then((resp) => {
          const url = window.URL.createObjectURL(resp);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Appletouch.png"); //or any other extension
          document.body.appendChild(link);
          link.click();
          // Response contain compressed and resized file
        })
        .catch((error) => {
          // Error
        });
    }

  };
  const wordPressHandler = async (e) => {
    var fileInput = true;
    if (fileInput) {
      await convert({
        file: newImage,
        width: 512,
        height: 512,
        type: "jpeg",
      })
        .then((resp) => {
          const url = window.URL.createObjectURL(resp);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Wordpresssizing.png"); //or any other extension
          document.body.appendChild(link);
          link.click();
          // Response contain compressed and resized file
        })
        .catch((error) => {
          // Error
        });
    }

  };


  const handleChange = (e) => {
    const {  value } = e.target
    // Destructuring
    const { checked } = e.target;

 

    // Case 1 : The user checks the box / push the item in the array
    if (checked) {
      setDownload((preValue) => ([...preValue, value]))
    }
    // Case 2  : The user unchecks the box / pop the item from the array
    else {
      setDownload((preValue) => (preValue.filter((e) => e !== value)))
    }
  };

  const handleDownload = () => {
    for (let index = 0; index < download.length; index++) {
      if (download[index] === 'Browser') {
        browserIconHandler();
      }
      if (download[index] === 'Taskbar') {
        taskBarHandler();
      }
      if (download[index] === 'Desktop') {
        desktopHandler();
      }
      if (download[index] === 'AppleTouch') {
        appleTouchHandler();
      }
      if (download[index] === 'WordPress') {
        wordPressHandler();
      }
    }
  }


  return (
    <>
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
        /><br></br>

      </div>
      {showimage === undefined ? (
        ""
      ) : (
        <></>
      )}
       {showimage === undefined ? (
        ""
      ) : (
      <div>
        <div className="favicon-image-style">
          <img src={showimage} alt="" />
        </div>
        <div className="favicon-checkbox-grid">
          <div className="favicon-checkbox-grid-items">
            <input type="checkbox" name="icon" value="Browser" onChange={(e) => handleChange(e)} />
            <label>Browser icon</label>
          </div>
          <div className="favicon-checkbox-grid-items">
            <input type="checkbox" name="icon" value="Taskbar" onChange={(e) => handleChange(e)} />
            <label>Taskbar Shortcut</label>
          </div>
          <div className="favicon-checkbox-grid-items">
            <input type="checkbox" name="icon" value="Desktop" onChange={(e) => handleChange(e)} />
            <label>Desktop Shortcut</label>
          </div>
          <div className="favicon-checkbox-grid-items">
            <input type="checkbox" name="icon" value="AppleTouch" onChange={(e) => handleChange(e)} /> 
            <label>Apple Touch</label>
          </div>
          <div className="favicon-checkbox-grid-items">
            <input type="checkbox" name="icon" value="WordPress" onChange={(e) => handleChange(e)} />
            <label>Wordpress Sizing</label>
          </div>
        </div>
        </div>
         )}
          {showimage === undefined ? (
        ""
      ) : (
        <div className="button image-download-button-center-alignment">
          <a href={image} download>
            <button onClick={handleDownload}>Download</button>
          </a>
        </div>
      )}

    </>
  );
}

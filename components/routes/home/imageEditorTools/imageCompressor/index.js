import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import Loader from "../../../../../src/Images/loader.gif";
class ImageCompressor extends React.Component {
  constructor() {
    super();
    this.state = {
      compressedLink: "",
      originalImage: "",
      originalLink: "",
      clicked: false,
      uploadImage: false,
      check: false,
      checkbtn: false,
      loading: false,
      loaderDownload: false,
    };
  }
  handle = (e) => {
    
    const imageFile = e.target.files[0];
    const sizeFormate = +(imageFile.size / 1024).toFixed(2);
    this.setState({
      compressedSize: "",
      originalLink: URL.createObjectURL(imageFile),
      originalImage: imageFile,
      outputFileName: imageFile.name,
      uploadImage: true,
      check: true,
      orignalsize: sizeFormate,
      size: "",
    });
  };
  changeValue = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  click = (e) => {
    this.setState({ loading: true });
    this.state.checkbtn = true;
    e.preventDefault();
    const options = {
      maxSizeMB: this.state.size / 1024,
      useWebWorker: true,
    };
    if (options.maxSizeMB >= this.state.originalImage.size) {
      alert("Bring a bigger image");
      return 0;
    }
    let output;
    imageCompression(this.state.originalImage, options).then((x) => {
      output = x;
      this.setState({ compressedSize: output.size / 1024 });
      const downloadLink = URL.createObjectURL(output);
      this.setState({
        compressedLink: downloadLink,
        loading: false,
      });
    });
    this.setState({ clicked: true });
    return 1;
  };
  handleDownload = () => {
    this.setState({ loaderDownload: true });
    return new Promise((resolve) => {
      setTimeout(() => {
        this.setState({ loaderDownload: false });
        resolve();
      }, 500);
    });
  };
  handleOnChange = (e) => {
    this.setState({ compressedLink: "" });
    let value = e.target.value;
    this.setState({ [e.target.name]: value });
  };
  render() {
    return (
      <>
        {!this.state.check && (
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
                className="mt-2 btn btn-outline-warning w-75"
                onChange={(e) => this.handle(e)}
              />
            </div>
          </>
        )}
        {/* render() {
        <Loader />
  } */}
        {this.state.check == true && (
          <>
            <div className="image-cropper-box-design-upload-two">
              <div className="image-cropper-scale-grid">
                <div className="input-new">
                  <label htmlFor="scale-input">Orignal Size(Kb): </label>
                  <input
                    id="height-input"
                    type="text"
                    name="size"
                    placeholder="size"
                    value={this.state.orignalsize}
                    disabled={this.state.outputFileName && true}
                  />
                </div>
                <div className="input-new">
                  <label htmlFor="scale-input">Maxsize(Kb): </label>
                  <input
                    id="height-input"
                    type="text"
                    name="size"
                    placeholder="size"
                    value={this.state.size}
                    onChange={this.handleOnChange}
                  />
                </div>
                {this.state.compressedSize && (
                  <div className="input-new">
                    <label htmlFor="scale-input">compresed size(Kb): </label>
                    <input
                      id="height-input"
                      type="text"
                      name="size"
                      placeholder="size"
                      value={this.state.compressedSize.toFixed(2)}
                      disabled={true}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="instruction-image-Resize">
              <span>
                * Set the Maxsize in Kb and and click the Compress button to see
                the compresed size in Kb and download compresed image.
              </span>
            </div>
            <div className="button reset-defaults-button-center-alignment">
              {this.state.outputFileName && (
                <>
                  <button
                    className="submit_btn"
                    variant="primary"
                    onClick={(e) => this.click(e)}
                  >
                    <span>Compress</span>
                    {this.state.loading && (
                      <span className="spinner">
                        <i class="fa fa-refresh fa-spin loader_im"></i>
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      this.setState({ check: false });
                      this.setState({ compressedLink: "" });
                    }}
                  >
                    <i className="fa-sharp fa-solid fa-arrow-left"></i> Back to
                    site
                  </button>
                  {this.state.compressedLink && (
                    <button onClick={() => this.handleDownload()}>
                      <a
                        href={this.state.compressedLink}
                        download={this.state.outputFileName}
                      >
                        <span>Download</span>
                        {this.state.loaderDownload && (
                          <span className="spinner">
                            <i class="fa fa-refresh fa-spin loader_im"></i>
                          </span>
                        )}
                      </a>
                    </button>
                  )}
                </>
              )}
            </div>
            {!this.state.compressedLink && (
              <div className="crop-image-first-alignment">
                <img
                  alt=""
                  id="mcanvas"
                  className="ht"
                  variant="top"
                  src={this.state.originalLink}
                />
              </div>
            )}
          </>
        )}
        {this.state.compressedLink && (
          <>
            <div className="crop-image-first-alignment">
              <img
                alt=""
                id="mcanvas"
                className="canvas-img-style"
                variant="top"
                src={this.state.compressedLink}
              />
            </div>
          </>
        )}
      </>
    );
  }
}
export default ImageCompressor;
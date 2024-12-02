import React, { useState, useEffect } from "react";

export default function YouTubeYThumbnail({ Data }) {
  const [urlLink, setUrlLink] = useState("");
  const [copy, setCopy] = useState(0);
  const [err, setErr] = useState();

  const grabLink = require("youtube-thumbnail-grabber");

  const imageMax = grabLink(
    `https://www.youtube.com/watch?v=${urlLink}`,
    "max"
  );
  const imageSd = grabLink(`https://www.youtube.com/watch?v=${urlLink}`, "sd");
  const imageMq = grabLink(`https://www.youtube.com/watch?v=${urlLink}`, "hq");
  const imageHq = grabLink(`https://www.youtube.com/watch?v=${urlLink}`, "mq");

  const imageDefault = grabLink(
    `https://www.youtube.com/watch?v=${urlLink}`,
    "default"
  );

  const handleOnPrieview = (key) => {
    saveAs(`${key}`, "image.jpg");
  };

  const updatedThumbnail = (sequence) =>
    imageDefault
      .split("/")
      .map((item) => (item === "default.jpg" ? `${sequence}.jpg` : item))
      .join("/");

  const downLoadImage = (quality) => {
    saveAs(
      `${quality === "default" ? imageDefault : updatedThumbnail(quality)}`,
      "image.jpg"
    );
  };

  useEffect(() => {
    const array = [0, 1, 2, 3].map((item) => {
      return updatedThumbnail(item);
    });
  }, [urlLink]);

  useEffect(() => {
    setTimeout(() => {
      setCopy(0);
    }, 2000);
  }, [copy]);

  const handleCopy = (text, copy) => {
    navigator.clipboard.writeText(text);
    if (navigator.clipboard.writeText(text)) {
      setCopy(copy);
    }
  };

  const handleChange = (e) => {
   
    var RegExUrl =
      /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
    if (RegExUrl.test(e.target.value)) {
      setUrlLink(e.target.value);
      setErr("");
    } else {
      setUrlLink("");
      setErr("* Please enter URL");
    }
    if (urlLink) {
      setErr("");
    }
  };

  return (
    <>
      <div>
        <div className="commom-box-new">
          <div className="input-new">
            <input
              type="text"
              placeholder="YouTube URL"
              onChange={(e) => handleChange(e)}
              className={err && "error-input"}
            />
          </div>
          <span style={{ color: "red" }}>{err}</span>
        </div>

        {!urlLink ? (
          <div className="youtub-upload-data-link-dummy-box">
            <div>
              <div align="center">
                <i className="fa-brands fa-youtube"></i>
              </div>
              <span>Enter a valid YouTube URL to see the thumbnails</span>
            </div>
          </div>
        ) : (
          <>
            <div className="resultion-type-content">
              <h4>Maximum Resolution</h4>
              <p>Size: 1280 x 720</p>
              <div align="center">
                <img style={{ maxWidth: "1280px" }} src={imageMax} />
              </div>
              <i className="bx bx-copy"></i>
            </div>
            <div className="button youtube-thumbnail-center-alignment">
              {copy == 1 && imageMax ? (
                <button type="submit">Copied</button>
              ) : (
                <button type="submit" onClick={() => handleCopy(imageMax, 1)}>
                  Copy URL
                </button>
              )}
              <button type="submit" onClick={() => handleOnPrieview(imageMax)}>
                Download
              </button>
            </div>

            <div className="resultion-type-content">
              <h4> Standard Definition</h4>
              <p>Size: 640 x 480</p>
              <div align="center">
                <img style={{ maxWidth: "640px" }} src={imageSd} />
              </div>
              <i className="bx bx-copy"></i>
            </div>
            <div className="button youtube-thumbnail-center-alignment">
              {copy == 2 && imageSd ? (
                <button type="submit">Copied</button>
              ) : (
                <button type="submit" onClick={() => handleCopy(imageSd, 2)}>
                  Copy URL
                </button>
              )}
              <button type="submit" onClick={() => handleOnPrieview(imageSd)}>
                Download
              </button>
            </div>

            <div className="resultion-type-content">
              <h4> High Quality</h4>
              <p>Size: 480 x 360</p>
              <div align="center">
                <img style={{ maxWidth: "480px" }} src={imageHq} />
              </div>
              <i className="bx bx-copy"></i>
            </div>
            <div className="button youtube-thumbnail-center-alignment">
              {copy == 3 && imageHq ? (
                <button type="submit">Copied</button>
              ) : (
                <button type="submit" onClick={() => handleCopy(imageHq, 3)}>
                  Copy URL
                </button>
              )}
              <button type="submit" onClick={() => handleOnPrieview(imageHq)}>
                Download
              </button>
            </div>

            <div className="resultion-type-content">
              <h4> Medium Quality</h4>
              <p>Size: 320 x 180</p>
              <div align="center">
                <img style={{ maxWidth: "320px" }} src={imageMq} />
              </div>
              <i className="bx bx-copy"></i>
            </div>
            <div className="button youtube-thumbnail-center-alignment">
              {copy == 4 && imageMq ? (
                <button type="submit">Copied</button>
              ) : (
                <button type="submit" onClick={() => handleCopy(imageMq, 4)}>
                  Copy URL
                </button>
              )}
              <button type="submit" onClick={() => handleOnPrieview(imageMq)}>
                Download
              </button>
            </div>

            <div className="resultion-type-content">
              <h4> List Thumbnail</h4>
              <p>Size: 480 x 360</p>
              <div align="center">
                <img style={{ maxWidth: "480px" }} src={updatedThumbnail(0)} />
              </div>
              <i className="bx bx-copy"></i>
            </div>
            <div className="button youtube-thumbnail-center-alignment">
              {copy == 5 && updatedThumbnail(0) ? (
                <button type="submit">Copied</button>
              ) : (
                <button
                  type="submit"
                  onClick={() => handleCopy(updatedThumbnail(0), 5)}
                >
                  Copy URL
                </button>
              )}
              <button type="submit" onClick={() => downLoadImage(0)}>
                Download
              </button>
            </div>

            <div className="resultion-type-content">
              <h4> Mini Thumbnail #1</h4>
              <p>Size: 120 x 90</p>
              <div align="center">
                <img style={{ maxWidth: "120px" }} src={updatedThumbnail(1)} />
              </div>
              <i className="bx bx-copy"></i>
            </div>
            <div className="button youtube-thumbnail-center-alignment">
              {copy == 6 && updatedThumbnail(1) ? (
                <button type="submit">Copied</button>
              ) : (
                <button
                  type="submit"
                  onClick={() => handleCopy(updatedThumbnail(1), 6)}
                >
                  Copy URL
                </button>
              )}
              <button type="submit" onClick={() => downLoadImage(1)}>
                Download
              </button>
            </div>

            <div className="resultion-type-content">
              <h4> Mini Thumbnail #2</h4>
              <p>Size: 120 x 90</p>
              <div align="center">
                <img style={{ maxWidth: "120px" }} src={updatedThumbnail(2)} />
              </div>
              <i className="bx bx-copy"></i>
            </div>
            <div className="button youtube-thumbnail-center-alignment">
              {copy == 7 && updatedThumbnail(2) ? (
                <button type="submit">Copied</button>
              ) : (
                <button
                  type="submit"
                  onClick={() => handleCopy(updatedThumbnail(2), 7)}
                >
                  Copy URL
                </button>
              )}
              <button type="submit" onClick={() => downLoadImage(2)}>
                Download
              </button>
            </div>

            <div className="resultion-type-content">
              <h4> Mini Thumbnail #3</h4>
              <p>Size: 120 x 90</p>
              <div align="center">
                <img style={{ maxWidth: "120px" }} src={updatedThumbnail(3)} />
              </div>
              <i className="bx bx-copy"></i>
            </div>
            <div className="button youtube-thumbnail-center-alignment">
              {copy == 8 && updatedThumbnail(3) ? (
                <button type="submit">Copied</button>
              ) : (
                <button
                  type="submit"
                  onClick={() => handleCopy(updatedThumbnail(3), 8)}
                >
                  Copy URL
                </button>
              )}
              <button type="submit" onClick={() => downLoadImage(3)}>
                Download
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

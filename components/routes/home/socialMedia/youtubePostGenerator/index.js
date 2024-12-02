import React, { useState, useEffect } from "react";
const LikeIcon = "/Assets/Images/y-like.webp";
const FakeLikeIcon = "/Assets/Images/y-fake-like.webp";
const ShareIcon = "/Assets/Images/y-share.webp";
const DownloadIcon = "/Assets/Images/y-download.webp";
const SaveIcon = "/Assets/Images/y-save.webp";
import * as htmlToImage from "html-to-image";
import Loader from "../../../../Loader/Loader";

export default function YoutubePostGenerator({ Data }) {
  const [loading, setLoading] = useState(false)

  const [youTubePostGeneratorDetail, setYouTubePostGeneratorDetail] = useState({
    postImage:
      "https://i.ytimg.com/vi/DZstFb1rCcE/hq720.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARh_IEIoEzAP&rs=AOn4CLDBbG-OEbgb-IsEMAPKtuXRSlmlVw",
    avtarImage:
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",

    videoTitle: "",
    channelCount: "",
    unlikeCount: "",
    uploadTime: "1",
    likeCount: "",
    viewersCount: "4.3M",
    hashTag: "",

    channelName: "",
    commentsCount: "",
    userCommentsCount: "",

    subscribers: "",
  });

  const handleOnChange = (e, key) => {
    const { name, value } = e.target;

    setYouTubePostGeneratorDetail({
      ...youTubePostGeneratorDetail,
      [name]: value,
    });
  };

  const downloadPost = () => {
    setLoading(true)
    htmlToImage
      .toJpeg(document.getElementById("post-box"), { quality: 1 })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = "my-image-name.jpeg";
        link.href = dataUrl;
        link.click();
        setLoading(false)
      });
  };

  const fileUplaod = (e) => {
    const { name, files } = e.target;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      setYouTubePostGeneratorDetail({
        ...youTubePostGeneratorDetail,
        [name]: e.target.result,
      });
    };
  };

  return (
    <>
      <div className="youtube-post-generator-all-contnet-alignment">
        <div className="youtube-grid">
          <div className="youtube-grid-items" >
            <div className="main-card" id="post-box">
              <div className="card-image">
                <img src={youTubePostGeneratorDetail.postImage} />
              </div>
              <div className="card-details">
                <span>
                  {" "}
                  {youTubePostGeneratorDetail?.hashTag ||
                    "#video #youtube #facebook"}
                </span>
                <p>
                  {youTubePostGeneratorDetail?.videoTitle ||
                    "The Last of Us Part II - Release Date Reveal Trailer | PS4"}
                </p>
                <h6>
                  {`${youTubePostGeneratorDetail?.viewersCount} views` } {" "} {`${youTubePostGeneratorDetail?.uploadTime} year ago`  }
                </h6>
                <div className="all-icon-text-alignment-for-section">
                  <div className="content-alignment">
                    <div>
                      <img src={LikeIcon} alt="LikeIcon" />
                    </div>
                    <h5>{youTubePostGeneratorDetail?.likeCount || "312K"}</h5>
                  </div>
                  <div className="content-alignment">
                    <div>
                      <img src={FakeLikeIcon} alt="FakeLikeIcon" />
                    </div>
                    <h5>{youTubePostGeneratorDetail?.unlikeCount || "6.1K"}</h5>
                  </div>
                  <div className="content-alignment">
                    <div>
                      <img src={ShareIcon} alt="ShareIcon" />
                    </div>
                    <h5>Share</h5>
                  </div>
                  <div className="content-alignment">
                    <div>
                      <img src={DownloadIcon} alt="DownloadIcon" />
                    </div>
                    <h5>Download</h5>
                  </div>
                  <div className="content-alignment">
                    <div>
                      <img src={SaveIcon} alt="SaveIcon" />
                    </div>
                    <h5>Save</h5>
                  </div>
                </div>
              </div>
              <div className="play-section">
                <div className="left-content">
                <div className="profile-grid-items">
                    <div className="profile-image-style">
                      <img
                        src={youTubePostGeneratorDetail.avtarImage}
                      />
                    </div>
                  </div>
                  <div>
                    <p>
                      {youTubePostGeneratorDetail?.channelName || "PlayStation"}
                    </p>
                    <span>
                  {`${youTubePostGeneratorDetail?.subscribers} subscribers` || "9.01M subscribers" }
                        
                    </span>
                  </div>
                </div>
                <div className="right-content">
                  <a>SUBSCRIBE</a>
                </div>
              </div>
            </div>
          </div>

          <div className="youtube-grid-items">
            <div className="two-col-grid">
              <div className="two-col-grid-items">
                <div className="input-new">
                  <label>Video Post Image</label>
                  <div className="relativ-input">
                    <input type="text" placeholder="Upload Image" />
                    <input
                      type="file"
                      className="file-upload"
                      name="postImage"
                      onChange={(e) => fileUplaod(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="two-col-grid-items">
                <div className="input-new">
                  <label>Profile Photo</label>
                  <div className="relativ-input">
                    <input type="text" placeholder="Upload Profile Image" />
                    <input
                      type="file"
                      className="file-upload"
                      name="avtarImage"
                      onChange={(e) => fileUplaod(e)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="input-new bottom-in-align">
              <label>Video title</label>
              <input
              maxLength={110}
                type="text"
                placeholder="Video Title"
                name="videoTitle"
                onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div className="two-col-grid">
              <div className="input-new">
                <label>Video hash tag</label>
                <input
                maxLength={65}
                  type="text"
                  placeholder="#video #youtube"
                  name="hashTag"
                  onChange={(e) => handleOnChange(e)}
                />
              </div>
              <div className="input-new">
                <label>Video progress</label>
                <input
                  type="text"
                  placeholder="50"
                  onChange={(e) => handleOnChange(e)}
                />
              </div>
              <div className="input-new">
                <label>Viewers count</label>
                <input
                  type="text"
                  maxLength="6"
                  placeholder="1.3M"
                  name="viewersCount"
                  onChange={(e) => handleOnChange(e)}
                />
              </div>
              <div className="input-new">
                <label>Upload Time</label>
                <input
                  type="text"
                  maxLength="6"
                  placeholder="1 Year Ago"
                  name="uploadTime"
                  onChange={(e) => handleOnChange(e)}
                />
              </div>
              <div className="input-new">
                <label>Like count</label>
                <input
                  type="text"
                  maxLength="6"
                  placeholder="312K"
                  name="likeCount"
                  onChange={(e) => handleOnChange(e)}
                />
              </div>
              <div className="input-new">
                <label>Unlike count</label>
                <input
                  type="text"
                  maxLength="6"
                  placeholder="6.1K"
                  name="unlikeCount"
                  onChange={(e) => handleOnChange(e)}
                />
              </div>
              <div className="input-new">
                <label>Channel Name</label>
                <input
                maxLength={55}
                  type="text"
                  placeholder="Channel Name"
                  name="channelName"
                  onChange={(e) => handleOnChange(e)}
                />
              </div>
              <div className="input-new">
                <label>Subscribers</label>
                <input
                maxLength={18}
                  type="text"
                  placeholder="Subscribers"
                  name="subscribers"
                  onChange={(e) => handleOnChange(e)}
                />
              </div>
            </div>
            <div className="button youtube-post-center-alignment">
              <button onClick={downloadPost}>Export Youtube Post {loading && <Loader />}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

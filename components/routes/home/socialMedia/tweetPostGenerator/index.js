import React, { useState, useEffect } from "react";
import TimeAgo from "timeago-react";
import * as htmlToImage from "html-to-image";

const UnLikeIcon = "/Assets/Images/t-like.svg";
const LikeIcon = "/Assets/Images/likeimage.svg";
const CommentIcon = "/Assets/Images/comment.svg";
const RefreshIcon = "/Assets/Images/refresh.svg";
const ShareIcon = "/Assets/Images/t-share.svg";
import Loader from "../../../../Loader/Loader";


export default function TweetPostGenerator({ Data }) {
  const [loading, setLoading] = useState(false)

  const [tweetInfo, setTweetInfo] = useState({
    avatarImg:
      "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
    tweetImg:
      "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    urName: "Name",
    userName: "username",
    tweetDate: "",
    description:
      "This is a sample tweet. @mentions, #hashtags, https://links.com are all automatically converted.",
    replyCount: 0,
    retweetCount: 0,
    likeCount: 0,
    isverified: false,
    avatarName: "",
    tweetName: "",
  });
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setTweetInfo({ ...tweetInfo, [name]: value });
  };
  const fileUplaod = (e, fileName) => {
    const { name, files } = e.target;
    let reader = new FileReader();
    if (files.length > 0) reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      setTweetInfo({
        ...tweetInfo,
        [name]: e.target.result,
        [fileName]: files[0].name,
      });
    };
  };
  const downloadPost = () => {
    setLoading(true)
    htmlToImage
      .toJpeg(document.getElementById("tweet_post"), { quality: 0.95 })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = "my-image-name.jpeg";
        link.href = dataUrl;
        link.click();
        setLoading(false)
      });
  };

  return (
    <>
      <div className="tweeter-post-genrate-all-content-alignment-for-page">
        <div className="twitter-main-box">
          <div className="twitter-box" id="tweet_post">
            <div className="twitter-grid">
              <div className="twitter-grid-items">
                <div className="profile-image">
                  <img src={tweetInfo.avatarImg} />
                </div>
              </div>
              <div className="twitter-grid-items">
                <div className="first-header-alignment">
                  <p className="tweet-uname">
                    {tweetInfo.urName || "Name"}
                    {tweetInfo?.isverified && (
                      <svg
                        style={{ fill: "rgb(29, 161, 242)" }}
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        aria-label="Verified account"
                      >
                        <g>
                          <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path>
                        </g>
                      </svg>
                    )}
                    <span>
                      @{tweetInfo.userName || "username"} ·{" "}
                      {<TimeAgo datetime={tweetInfo?.tweetDate} />}
                    </span>
                  </p>
                  <i className="fa-solid fa-ellipsis"></i>
                </div>
                <div className="content-alignment">
                  <p>{tweetInfo.description || "This is a sample tweet."}</p>
                </div>
                <div className="tweet-img-wrapper">
                  <img src={tweetInfo.tweetImg} alt="img" />
                </div>
                <div className="tweet-social-icon-alignment">
                  <div>
                    <img src={RefreshIcon} alt="RefreshIcon" />
                    <span className="tweet-nums">
                      {tweetInfo.retweetCount || 0}
                    </span>
                  </div>

                  <div>
                    <img src={CommentIcon} alt="CommentIcon" />
                    <span className="tweet-nums">
                      {tweetInfo.replyCount || 0}
                    </span>
                  </div>
                  <div>
                    {tweetInfo.likeCount == 0 ? (
                      <img src={UnLikeIcon} alt="LikeIcon" />
                    ) : (
                      <img src={LikeIcon} alt="LikeIcon" />
                    )}
                    <span className="tweet-nums">
                      {tweetInfo.likeCount || 0}
                    </span>
                  </div>
                  <div>
                    <img src={ShareIcon} alt="ShareIcon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="avtar-grid">
          <div className="input-new">
            <label>Avatar</label>
            <div className="relative-avtar">
              <input
                type="text"
                placeholder="Click to upload"
                value={tweetInfo?.avatarName || ""}
              />
              {/* <input type="file" placeholder="" className="file-upload" /> */}
              <input
                name="avatarImg"
                type="file"
                className="file-upload"
                onChange={(e) => fileUplaod(e, "avatarName")}
              />
            </div>
          </div>
          <div className="input-new">
            <label>Tweet Images</label>
            <div className="relative-avtar">
              <input
                type="text"
                placeholder="Click to upload"
                value={tweetInfo?.tweetName || ""}
              />
              {/* <input type="file" placeholder="" className="file-upload" /> */}
              <input
                name="tweetImg"
                type="file"
                className="file-upload"
                onChange={(e) => fileUplaod(e, "tweetName")}
              />
            </div>
          </div>
        </div>
        <div className="three-col-grid">
          <div className="input-new">
            <label>Name</label>
            <div className="input-user-name-relative">
              <input
              maxLength={16}
                name="urName"
                type="text"
                placeholder="Name"
                onChange={(e) => handleChange(e)}
              />
              <div className="verfify-button">
                <span
                  name="isverified"
                  style={
                    tweetInfo?.isverified
                      ? { color: "rgb(29, 161, 242)" }
                      : { color: "black" }
                  }
                  onClick={() =>
                    setTweetInfo({
                      ...tweetInfo,
                      isverified: !tweetInfo.isverified,
                    })
                  }
                >
                  Verified
                </span>
              </div>
            </div>
          </div>
          <div className="input-new">
            <label>Username</label>
            <input
            maxLength={19}
              name="userName"
              type="text"
              placeholder="Username"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="input-new">
            <label>Tweet Date</label>
            <input
              name="tweetDate"
              type="date"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="tweeter-textarea">
          <div className="input-new">
            <label>Tweet Text</label>
            <textarea
            maxLength={120}
              name="description"
              type="text"
              placeholder="This is a sample tweet. @mentions, #hashtags, https://links.com are all automatically converted."
              onChange={(e) => handleChange(e)}
            ></textarea>
          </div>
        </div>
        <div className="three-col-grid">
          <div className="input-new">
            <label>Retweet Count</label>
            <input
            maxLength="5"
              name="retweetCount"
              type="text"
              placeholder="Retweet Count"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="input-new">
            <label>Reply Count</label>
            <input
              maxLength="5"
              name="replyCount"
              type="text"
              placeholder="Reply Count"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="input-new">
            <label>Like Count</label>
            <input
              maxLength="5"
              name="likeCount"
              type="text"
              placeholder="Like Count"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="button">
          <button onClick={downloadPost}>Export Tweet Image {loading && <Loader />}</button>
        </div>
      </div>
    </>
  );
}

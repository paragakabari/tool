import React, { useState } from "react";
import TimeAgo from "timeago-react";
import * as htmlToImage from "html-to-image";
const UnLikeIcon = "/Assets/Images/in_like.svg";
const LikeIcon = "/Assets/Images/likeimage.svg";
const SaveIcon = "/Assets/Images/in_save.svg";
const ShareIcon = "/Assets/Images/in_share.svg";
const In_comment = "/Assets/Images/in_comment.svg";
import Loader from "../../../../Loader/Loader";

export default function InstagramPostGenerator({ Data }) {
  const [loading, setLoading] = useState(false)
  const [instagramPostGeneratorDetail, setInstagramPostGeneratorDetail] =
    useState({
      avtarImage:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      postImage:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      userName: "UserName",
      isverified: false,
      description: "",
      postDate: "",
      postText: "",
      likeCount: "",
      imageCount: 0,
      commentCount: "",
      isPostLikeByViewer: false,
      isSomeonetagged: false,
      isInstagramStory: false,
      firstUserComment: "",
      secondUserComment: "",
      firstUserText: "",
      secondUserText: "",
    });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (
      name == "isPostLikeByViewer" ||
      name == "isSomeonetagged" ||
      name == "isInstagramStory"
    ) {
      setInstagramPostGeneratorDetail({
        ...instagramPostGeneratorDetail,
        [name]: checked,
      });
    } else {
      setInstagramPostGeneratorDetail({
        ...instagramPostGeneratorDetail,
        [name]: value,
      });
    }
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
      setInstagramPostGeneratorDetail({
        ...instagramPostGeneratorDetail,
        [name]: e.target.result,
      });
    };
  };
  return (
    <>
      <div className="instagram-post-genertor-all-content-alignment">
        <div className="instagram-grid">
          <div className="instagram-grid-items">
            <div className="post-box" id="post-box">
              <div className="final-post-box">
                <div className="profile-grid">
                  <div className="profile-grid-items">
                    <div className="profile-image-style">
                      <img
                        className={
                          instagramPostGeneratorDetail?.isInstagramStory &&
                          "actie-insta-boder-color"
                        }
                        src={instagramPostGeneratorDetail.avtarImage}
                      />
                    </div>
                  </div>
                  <div className="profile-grid-items">
                    <div className="all-content-style">
                      <div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <p>{instagramPostGeneratorDetail?.userName}</p>
                          {instagramPostGeneratorDetail?.isverified && (
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
                        </div >
                        <span>{instagramPostGeneratorDetail?.description}</span>
                      </div>
                      <div>
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="main-image">
                  <img src={instagramPostGeneratorDetail.postImage} />
                  {instagramPostGeneratorDetail?.isSomeonetagged && (
                    <div className="image-upper-icon-alignment">
                      <i className="fa-solid fa-user"></i>
                    </div>
                  )}
                </div>
                <div className="like-share-all-content-alignment">
                  <div className="left-side-contnet">
                    <div>
                      {instagramPostGeneratorDetail?.isPostLikeByViewer ? (
                        <img src={LikeIcon} alt="LikeIcon" />
                      ) : (
                        <img src={UnLikeIcon} alt="UnLikeIcon" />
                      )}
                    </div>
                    <div>
                      <img src={In_comment} alt="In_comment" />
                    </div>
                    <div>
                      <img src={ShareIcon} alt="ShareIcon" />
                    </div>
                  </div>
                  <div className="center-content-dot-alignment">
                    {instagramPostGeneratorDetail?.imageCount > 1 &&
                      [
                        ...Array(
                          Number(instagramPostGeneratorDetail?.imageCount)
                        ),
                      ]
                        .map((_, i) => i + 1)
                        ?.map(() => {
                          return <div></div>;
                        })}
                  </div>
                  <div className="right-side-contnet">
                    <img src={SaveIcon} alt="SaveIcon" />
                  </div>
                </div>
                <div className="like-text-content-alignment">
                  <span>{instagramPostGeneratorDetail?.likeCount || "1K" } likes</span>
                </div>
                <div className="simple-text">
                  <p>
                    <span>{instagramPostGeneratorDetail?.userName}</span>{" "}
                    {instagramPostGeneratorDetail?.postText}
                  </p>
                  <p>
                    View all {instagramPostGeneratorDetail?.commentCount || "1K" }{" "}
                    comments
                  </p>
                  <p>
                    <span>
                      {instagramPostGeneratorDetail?.firstUserComment}
                    </span>{" "}
                    {instagramPostGeneratorDetail?.firstUserText}
                  </p>
                  <p>
                    <span>
                      {instagramPostGeneratorDetail?.secondUserComment}{" "}
                    </span>
                    {instagramPostGeneratorDetail?.secondUserText}
                  </p>
                  <a>
                    <TimeAgo
                      datetime={instagramPostGeneratorDetail?.postDate}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="instagram-grid-items">
            <div className="avtar-grid">
              <div className="avtar-grid-items">
                <div className="input-new">
                  <label>Avatar</label>
                  <div className="input-relative-upload">
                    <input type="text" placeholder="Click to upload" />
                    <input
                      name="avtarImage"
                      type="file"
                      className="file-upload-hidden"
                      onChange={(e) => fileUplaod(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="avtar-grid-items">
                <div className="input-new">
                  <label>Post Image</label>
                  <div className="input-relative-upload">
                    <input type="text" placeholder="Click to upload" />
                    <input
                      name="postImage"
                      type="file"
                      className="file-upload-hidden"
                      onChange={(e) => fileUplaod(e)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="user-name-text">
              <div className="input-new">
                <label>Username</label>
                <div className="input-user-name-relative">
                  <input
                  maxLength={49}
                    name="userName"
                    type="text"
                    placeholder="Username"
                    onChange={(e) => handleChange(e)}
                  />
                  <div className="verfify-button">
                    <span
                      name="isverified"
                      style={
                        instagramPostGeneratorDetail?.isverified
                          ? { color: "rgb(29, 161, 242)" }
                          : { color: "black" }
                      }
                      onClick={() =>
                        setInstagramPostGeneratorDetail({
                          ...instagramPostGeneratorDetail,
                          isverified: !instagramPostGeneratorDetail.isverified,
                        })
                      }
                    >
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="description-all-content-alignment">
              <div className="avtar-grid">
                <div className="input-new">
                  <label>Description</label>
                  <input
                    maxLength={150}
                    name="description"
                    type="text"
                    placeholder="New York, USA"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="input-new">
                  <label>Post Date</label>
                  <input
                    name="postDate"
                    type="date"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
            </div>
            <div className="post-text-alignment">
              <div className="input-new">
                <label>Post Text</label>
                <textarea 
                  name="postText"
                  maxLength={45}
                  placeholder="Post Text (max. 45 characters will be seen)"
                  onChange={(e) => handleChange(e)}
                ></textarea>
              </div>
            </div>
            <div className="states-all-content-alignment">
              <p>Stats & States</p>
              <div className="three-col-grid">
                <div className="input-new">
                  <label>Image Count</label>
                  <select
                    name="imageCount"
                    id="imageCount"
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
                <div className="input-new">
                  <label>Like Count</label>
                  <input
                    name="likeCount"
                    maxLength="6"
                    type="text"
                    placeholder="Ex-2.4M"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="input-new">
                  <label>Comment Count</label>
                  <input
                    name="commentCount"
                    type="text"
                    maxLength="6"
                    placeholder="Ex-2.4M"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="all-checkbox-content-alignment">
                <div className="checkbox-alignment">
                  <div>
                    <input
                      name="isPostLikeByViewer"
                      type="checkbox"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div>
                    <span>Is post liked by viewer?</span>
                  </div>
                </div>
                <div className="checkbox-alignment">
                  <div>
                    <input
                      name="isSomeonetagged"
                      type="checkbox"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div>
                    <span>Is someone tagged?</span>
                  </div>
                </div>
                <div className="checkbox-alignment">
                  <div>
                    <input
                      name="isInstagramStory"
                      type="checkbox"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div>
                    <span>Has an Instagram story?</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="comments-all-content-alignment">
          <p>Comments</p>
          
          <div className="comments-two-col-grid">
            <div className="input-new">
              <label>First Comment Username</label>
              <input
              maxLength={20}
                name="firstUserComment"
                type="text"
                placeholder="Comment Username"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="input-new">
              <label>First Comment Text</label>
              <input
              maxLength={50}
                name="firstUserText"
                type="text"
                placeholder="First Comment Text"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="comments-two-col-grid">
            <div className="input-new">
              <label>Second Comment Username</label>
              <input
              maxLength={20}
                name="secondUserComment"
                type="text"
                placeholder="Second Comment Username"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="input-new">
              <label>Second Comment Text</label>
              <input
              maxLength={50}
                name="secondUserText"
                type="text"
                placeholder="🔥🔥🔥"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="button export-insta-post-center-alignment">
            
            <button onClick={downloadPost}>Export Instagram Post {loading && <Loader />} </button>
          </div>
        </div>
      </div>
    </>
  );
}

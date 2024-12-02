/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFacebookPostData } from "../redux/reducer";
import * as htmlToImage from "html-to-image";
import Loader from "../../../../Loader/Loader";

const FacebookIcon = "/Assets/Images/facebook.png";
const FacebookComment2 = "/Assets/Images/facebook.png";
const FacebookComment1 = "/Assets/Images/facebook.png";
const FacebookPostIcon = "/Assets/Images/fabook-post.jpg";
const ThumbIcon = "/Assets/Images/thumb.svg";
const EmojiIcon = "/Assets/Images/emoji.svg";
const HeartIcon = "/Assets/Images/heart.svg";
const Profile = "/Assets/Images/facebook.png";
const FBLike = "/Assets/Images/facebook-like.svg";
const FBLiked = "/Assets/Images/thumbsup-liked.png";
const FbComment = "/Assets/Images/fb-comment.svg";
const FbShare = "/Assets/Images/fb-share.svg";

export default function FacebookPostGenerator() {
  const dispatch = useDispatch();
  const postData = useSelector((state) => state.socialMedia?.facebookPostData);
  const [verified, setVerified] = useState();
  const [loading, setLoading] = useState(false);

  const [facebookPostGeneratorDetail, setFacebookPostGeneratorDetail] = useState({
    avtarImage: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    postImage: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    userName: "UserName",
    isverified: false,
    commentCount: "",
    likeCount: "",
  });

  const handleOnChange = (e, key) => {
    const { name, value, checked } = e.target;
    dispatch(
      setFacebookPostData({
        [name]: key ? checked : value,
      })
    );
  };

  const handleOnImageUpload = (e, name) => {
    const file = e.target.files;
    if (file.length > 0) {
      dispatch(
        setFacebookPostData({
          [name]: URL.createObjectURL(file[0]),
          [`${name}Name`]: file[0].name,
        })
      );
    }
  };
  const handleOnExportPost = () => {
    setLoading(true);
    htmlToImage.toJpeg(document.getElementById("facebook_post"), { quality: 1 }).then(function (dataUrl) {
      var link = document.createElement("a");
      link.download = "my-image-name.jpeg";
      link.href = dataUrl;
      link.click();
      setLoading(false);
    });
  };
  return (
    <>
      <div className="instagram-post-genertor-all-content-alignment">
        <div className="instagram-grid">
          <div className="instagram-grid-items" >
            <div className="facebook-post-box" id="facebook_post">
              <div className="facdebook-profile-grid">
                <div className="facdebook-profile-grid-items">
                  <div className="facebook-profile">
                    <img src={postData?.avatar || FacebookIcon} alt="facebookIcon" />
                  </div>
                </div>
                <div className="facdebook-profile-grid-items">
                  <div className="first-row-alignment">
                    <span>{postData?.userName || "User Name"}</span>
                    {facebookPostGeneratorDetail?.isverified && (
                      <svg style={{ fill: "rgb(29, 161, 242)" }} width="14" height="14" viewBox="0 0 24 24" aria-label="Verified account">
                        <g>
                          <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path>
                        </g>
                      </svg>
                    )}
                  </div>
                  <div className="sec-row-alignment">
                    <span>
                      {`${moment(postData?.postDate || new Date()).format("Do MMMM")} at ${moment(postData?.postDate || new Date()).format("LT")} · `}
                    </span>
                    <i className="fa-solid fa-earth-americas"></i>
                  </div>
                </div>
              </div>
              <div className="list-text">
                <p>{postData?.description || "Bravo! Performances. Metaverse. Art. A #pamigente celebration with Facebook."}</p>
              </div>
              <div className="facebook-post">
                <img src={postData?.postImage || FacebookPostIcon} alt="FacebookPostIcon" />
              </div>
              <div className="facebook-related-content-alignment">
                <div className="left-content">
                  <img src={ThumbIcon} alt="ThumbIcon" />
                  <img src={EmojiIcon} alt="EmojiIcon" />
                  <img src={HeartIcon} alt="HeartIcon" />
                  <span maxlength="2">{postData?.likeCount || 1}K</span>
                </div>
                <div className="right-contnet">
                  <span>{postData?.commentCount || 1}K comments</span>
                  <span>{postData?.shareCount || 1} shares</span>
                </div>
              </div>
              <div className="like-share-button-alignment">
                <div>
                  <img src={postData?.isLiked ? FBLiked : FBLike} alt="FBLike" />
                  <span style={{ color: postData?.isLiked && "#474bff" }}>Like</span>
                </div>
                <div>
                  <img src={FbComment} alt="FbComment" />
                  <span>Comment</span>
                </div>
                <div>
                  <img src={FbShare} alt="FbShare" />
                  <span>Share</span>
                </div>
              </div>
              {/* cOMMENT 1 IMAGE */}
              {postData?.isCommented && (
                <div className="view-previous-comments">
                  <h6>View previous comments</h6>
                  {postData?.fcUserName && (
                    <div className="comments-grid">
                      <div className="comments-grid-items">
                        <img src={postData?.comment1 || FacebookComment2} alt="Profile" />
                      </div>
                      <div className="comments-grid-items">
                        <div className="com-box">
                          <span>{postData?.fcUserName}</span>
                          <p>{postData?.fcText}</p>
                        </div>
                        <div className="update-com">
                          <span>Just Now</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* cOMMENT 2 IMAGE */}
                  {postData?.scUserName && (
                    <div className="comments-grid">
                      <div className="comments-grid-items">
                        <img src={postData?.comment2 || FacebookComment1} alt="Profile" />
                      </div>
                      <div className="comments-grid-items">
                        <div className="com-box">
                          <span>{postData?.scUserName}</span>
                          <p>{postData?.scText}</p>
                        </div>
                        <div className="update-com">
                          <span>Just Now</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="instagram-grid-items">
            <div className="avtar-grid">
              <div className="avtar-grid-items">
                <div className="input-new">
                  <label>Avatar</label>
                  <div className="input-relative-upload">
                    <input type="text" value={postData?.avatarName} placeholder="Click to upload" />
                    <input type="file" className="file-upload-hidden" onChange={(e) => handleOnImageUpload(e, "avatar")} />
                  </div>
                </div>
              </div>
              <div className="avtar-grid-items">
                <div className="input-new">
                  <label>Post Image</label>
                  <div className="input-relative-upload">
                    <input type="text" value={postData?.postImageName} placeholder="Click to upload" />
                    <input type="file" className="file-upload-hidden" onChange={(e) => handleOnImageUpload(e, "postImage")} />
                  </div>
                </div>
              </div>
            </div>

            <div className="user-name-text">
              <div className="input-new">
                <label>Username</label>
                <div className="input-user-name-relative">
                  <input maxLength={49} type="text" name="userName" placeholder="Username" onChange={handleOnChange} />
                  <div className="verfify-button">
                    <span
                      name="isverified"
                      style={facebookPostGeneratorDetail?.isverified ? { color: "rgb(29, 161, 242)" } : { color: "black" }}
                      onClick={() =>
                        setFacebookPostGeneratorDetail({
                          ...facebookPostGeneratorDetail,
                          isverified: !facebookPostGeneratorDetail.isverified,
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
                  <label>Location</label>
                  <input maxLength={25} type="text" name="location" placeholder="New York, USA" onChange={handleOnChange} />
                </div>
                <div className="input-new">
                  <label>Post Date</label>
                  <input type="date" name="postDate" onChange={handleOnChange} />
                </div>
              </div>
            </div>
            <div className="post-text-alignment">
              <div className="input-new">
                <label>Description</label>
                <textarea maxLength={125} name="description" placeholder="Post Text (max. 120 characters will be seen)" onChange={handleOnChange} />
              </div>
            </div>
            <div className="states-all-content-alignment">
              <p>Stats & States</p>
              <div className="three-col-grid">
                <div className="input-new">
                  <label>Like Count</label>
                  <input maxLength="6" type="text" name="likeCount" placeholder="Ex-14M" onChange={handleOnChange} />
                </div>
                <div className="input-new">
                  <label>Comment Count</label>
                  <input maxLength="6" type="text" name="commentCount" placeholder="Ex-14M" onChange={handleOnChange} />
                </div>
                <div className="input-new">
                  <label>Share Count</label>
                  <input maxLength="6" type="text" name="shareCount" placeholder="Ex-14M" onChange={handleOnChange} />
                </div>
              </div>
              <>
                <div className="all-checkbox-content-alignment">
                  {[
                    {
                      name: "isLiked",
                      label: "Is post liked by viewer?",
                    },
                    {
                      name: "isCommented",
                      label: "Is someone commented?",
                    },
                  ].map((item, index) => (
                    <div className="checkbox-alignment" key={index}>
                      <div>
                        <input type="checkbox" name={item.name} onChange={(e) => handleOnChange(e, "checkbox")} />
                      </div>
                      <div>
                        <span>{item.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <br></br>
                <div className="instagram-grid-items">
                  <div className="avtar-grid">
                    <div className="avtar-grid-items">
                      <div className="input-new">
                        <label>First Comment Profile</label>
                        <div className="input-relative-upload">
                          <input type="text" value={postData?.comment1Name} placeholder="Click to upload" />
                          <input type="file" className="file-upload-hidden" onChange={(e) => handleOnImageUpload(e, "comment1")} />
                          <br></br>
                          <br></br>
                          <label>Second Comment Profile</label>
                          <div className="input-relative-upload">
                            <input type="text" value={postData?.comment2Name} placeholder="Click to upload" />
                            <input type="file" className="file-upload-hidden" onChange={(e) => handleOnImageUpload(e, "comment2")} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>

        {postData?.isCommented && (
          <div>
            <div className="comments-all-content-alignment">
              <p>Comments</p>

              <div className="comments-two-col-grid">
                <div className="input-new">
                  <label>First Comment Username</label>
                  <input maxLength={44} type="text" name="fcUserName" placeholder="Comment Username" onChange={handleOnChange} />
                </div>

                <div className="input-new">
                  <label>First Comment Text</label>
                  <input maxLength={66} type="text" name="fcText" placeholder="First Comment Text" onChange={handleOnChange} />
                </div>
              </div>
              <div className="comments-two-col-grid">
                <div className="input-new">
                  <label>Second Comment Username</label>
                  <input maxLength={44} type="text" name="scUserName" placeholder="Second Comment Username" onChange={handleOnChange} />
                </div>
                <div className="input-new">
                  <label>Second Comment Text</label>
                  <input maxLength={66} type="text" name="scText" placeholder="🔥🔥🔥" onChange={handleOnChange} />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="button export-insta-post-center-alignment">
          <button onClick={handleOnExportPost}>Export Facebook Post {loading && <Loader />}</button>
        </div>
      </div>
    </>
  );
}

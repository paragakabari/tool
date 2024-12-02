import React, { useState, useEffect } from "react";
import { ApiPost } from "../../../../../helpers/API/ApiData";
import load from "../../../../../src/Images/loader.gif";

export default function TweetToImage({ Data }) {
  const [url, setURL] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [loader, setLoader] = useState(false);
  const [check, setCheck] = useState(true);
  const [checkurl, setCheckurl] = useState(false);
  const [errors, setErrors] = useState();


  const handleChange = (e) => {
    setURL(e.target.value);
    setErrors("");
    if (checkurl === true) {
      setCheckurl(!checkurl);

    }
  };
  function validateTweet  (str){
  
    if(/((https?):\/\/)?(www.)?twitter\.com(\/@?(\w){1,15})\/status\/[0-9]{19}\?/g.test(str)) {
      return true;
     } else {
         return false;
     }
} 

  const handleClick = () => {
    if(validateTweet(url)){
      setLoader(true);
    let data = new FormData();
    data.append("tweet_url", url);
    ApiPost(`v1/tool/tweet/tweet_shcreenshot`, data)
      .then((res) => {
        setImageUrl(res.data.data);
        setLoader(false);
        setCheck(true);
        setCheckurl(true);
      })
      .catch((err) => {
        alert(err);
        setCheck(false);
        setLoader(false);
        setURL();
      });
    }else{
      setErrors("* Please enter URL");
    }
  };

  return (
    <>
      <div className="tweet-to-image-converter-alignment">
        <div className="commom-box-new">
          <div className="input-new">
            <label>Tweet URL</label>
            <input type="text"  placeholder="e.g. https://twitter.com/convertor/status/15961785488634080" onChange={(e) => handleChange(e)} className={errors && "error-input"}/>
            <span  style={{ color: "red", fontSize:"15px"}}>{errors}</span>
            <div className="button img-alignment">
              <button onClick={() => handleClick()}>Capture</button>
            </div>
          </div>
        </div>

        {loader && <img className="loading-center-alignment" src={load.src} style={{ height: "100px", width: "150px", margin: "auto" }} />}
        <>
          {check === true ? (
            <>
              {checkurl && (
                <>
                  <div className="tweet-image-center-alignment">
                    <img src={"data:image/jpeg;base64," + imageUrl} />
                  </div>
                  <div className="button youtube-thumbnail-center-alignment">
                    <a href={"data:image/jpeg;base64," + imageUrl} target="_blank" download>
                      <button type="submit">Download</button>
                    </a>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="youtub-upload-data-link-dummy-box">
              <div>
                <div align="center">
                  <i className="fa-brands fa-square-twitter"></i>
                </div>
                <span>Enter a valid Twitter URL to see the Image</span>
              </div>
            </div>
          )}
        </>
      </div>
    </>
  );
}

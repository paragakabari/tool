import React, { useState } from "react";
import ReactPlayer from "react-player/lazy";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../../../Loader/Loader";


function FbVideoDownload() {
    const [input, setinput] = useState("");
    const [lowQuality, setLowQuality] = useState("");
    const [highQuality, setHighQuality] = useState("");
    const fetch = require("node-fetch");
    const [isDownloadable, setDownloadable] = useState(false);
    const [showBt, setShowBt] = useState(false);
    const [loading, setLoading] = useState(false);  
    const [error, setError] = useState("")
    const url = `https://facebook-reel-and-video-downloader.p.rapidapi.com/app/main.php?url=${input}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "731ded7a04msh9f8c94f37831043p174323jsn1e2695b108f3",
        "X-RapidAPI-Host": "facebook-reel-and-video-downloader.p.rapidapi.com",
      },
    };
    function isValidUrl(str) {
      if(/^https?:\/\/www\.facebook\.com.*\/(video(s)?|watch|story)(\.php?|\/).+$/g.test(str)) {
        setShowBt(true)
        return true;
       } else {
           return false;
       }
    }
    const handleOnClick = () => {
      setLoading(true)
      if (isValidUrl(input)) {
        fetch(url, options)
          .then((res) => res.json())
          .then((json) => {if(json.links[`Download Low Quality`]){
            setLowQuality(json.links[`Download Low Quality`]);
            setDownloadable(true);
            setLoading(false)
          }
          if(json.links[`Download High Quality`]){
            setHighQuality(json.links[`Download High Quality`]);
            setDownloadable(true);
            setLoading(false)
          }
          })
          .catch((err) => toast.error("error",err));
          setLoading(false)
      }
      else{
        setLoading(false)
       return  setError("*Please enter Facebook Url");
      }
    };
  
    return (
      <>
     <ToastContainer/>
        <div>
        <div className="children-box-alignment">
          <div className="main-salary-calculator-box">
            <div className="two-col-grid two-col-grid-one">
              <div className="two-col-grid-items">
                <div className="salry-input">
                  <label>Enter the Facebook URL and click submit</label>
                    <input
                     className={error && "error-input"}
                    type="textbox"
                    value={input}
                    onChange={(e) => 
                      {setinput(e.target.value);
                        setShowBt(false);
                        setError("");
                    }
                    }
                  ></input>
                  <span style={{color:"red"}}>{error}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="download-button-one-alignment">
            <div className="button">
              <button className="dowload-btn" onClick={async () => {
                  if (!isDownloadable) {
                    setDownloadable(false);
                    // setProcessing(true);
                    await handleOnClick();
                  }
                }}>
              <span>Submit</span>
              {loading && <Loader />}

              </button>
            </div>
          </div>
         { showBt &&  <div className="meta-result-box-top-alignment main-salary-calculator-box">
            <h4>Result</h4>
            <div>
              <div className="player-wrapper">
                <ReactPlayer
                  className="react-player"
                  url={input}
                  width="30%"
                  height="30%"
                />
              </div>
            </div>
          </div>}
          <div className="download-button-one-alignment">
            {isDownloadable&& showBt && 
            <div className="button">
             { lowQuality && <button>
                {" "}
                <a className="" href={lowQuality}>
                  Low Quality
                </a>
              </button>}
              { highQuality && <button>
                {" "}
                <a className="" href={highQuality}>
                  High Quality
                </a>
              </button>}
            </div>}
          </div>
        </div>
      </div>
      </>
    )
}

export  default FbVideoDownload;
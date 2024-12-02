import React, { useState } from "react";
import ReactPlayer from "react-player/lazy";
import { ToastContainer, toast } from "react-toastify";
import { Button, Container, Row, Col, Spinner } from "react-bootstrap";
import Loader from "../../../../Loader/Loader";
import "react-toastify/dist/ReactToastify.css";
export default function YtDownloader() {
  const [input, setInput] = useState("");
  //720p
  const [sty, setSty] = useState("");
  //360p
  const [tsp, setTsp] = useState("");
  //144p
  const [off, setOff] = useState("");
  //244p
  const [tff, setTff] = useState("");
  //480p
  const [fey, setFey] = useState("");
  //1080p
  const [oey, setOey] = useState("");
  //audio-MP4
  const [aud, setAud] = useState("");
  //2160P-4K
  const [fk, setFk] = useState("");
  //1440p60
  const [offs, setOffs] = useState("");
  //
  const [isDownloadable, setDownloadable] = useState(false);
 
  const [isLoading,setIsLoading] = useState(false);
  // const [isProcessing, setProcessing] = useState(false);
  const [showBt, setShowBt] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [error, setError] = useState("")
  const getYouTubeID = require("get-youtube-id");
  const id = getYouTubeID(`${input}`);
  let url = `https://youtube-video-download-info.p.rapidapi.com/dl?id=${id}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "731ded7a04msh9f8c94f37831043p174323jsn1e2695b108f3",
      "X-RapidAPI-Host": "youtube-video-download-info.p.rapidapi.com",
    },
  };
  function isValidURL(str) {
    if(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/g.test(str)) {
      setShowBt(true);
      return true;
     } else {
         return false;
     }
 }
   
 
  
  const handleOnClick = async () => {
    setIsLoading(true)
    if(isValidURL(input)){
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        //720p
        if (json.link[22][0]) {
          setSty(json.link[22][0]);
          setDownloadable(true);
          setIsLoading(false)
          // setProcessing(false);
        }
        //360p
        if (json.link[18][0]) {
          setTsp(json.link[18][0]);
          setDownloadable(true);
          setIsLoading(false)
          // setProcessing(false);
        }
        //144p
        if (json.link[17][0]) {
          setOff(json.link[17][0]);
          setDownloadable(true);
          setIsLoading(false)
          // setProcessing(false);
        }
        //244p
        if (json.link[133][0]) {
          setTff(json.link[133][0]);
          setDownloadable(true);
          setIsLoading(false)
          // setProcessing(false);
        }
        //480p
        if (json.link[135][0]) {
          setFey(json.link[135][0]);
          setDownloadable(true);
          setIsLoading(false)
          // setProcessing(false);
        }
        //1080p
        if (json.link[137][0]) {
          setOey(json.link[137][0]);
          setDownloadable(true);
          setIsLoading(false)
          // setProcessing(false);
        }
        //audio-MP4
        if (json.link[139][0]) {
          setAud(json.link[139][0]);
          setDownloadable(true);
          setIsLoading(false)
          // setProcessing(false);
        }
        //2160P-4K
        if (json.link[313][0]) {
          setFk(json.link[313][0]);
          setDownloadable(true);
          setIsLoading(false)
          // setProcessing(false);
        }
        // 1440p60
        if (json.link[400][0]) {
          setOffs(json.link[400][0]);
          setDownloadable(true);
          setIsLoading(false)
          // setProcessing(false);
        }
      })
      .catch((err) => console.log("error"));
    }
    else{
      setIsLoading(false)
      return  setError("*Please enter Youtube Url");
     
    }
  };

  return (
    <>
      <ToastContainer />
      <div>
        <div className="children-box-alignment">
          <div className="main-salary-calculator-box">
            <div className="two-col-grid two-col-grid-one">
              <div className="two-col-grid-items">
                <div className="salry-input">
                  <label>
                    Enter the YouTube URL and click to submit
                  </label>
                  <input
                    className={error && "error-input"}
                    type="textbox"
                    value={input}
                    onChange={(e) => 
                      {setInput(e.target.value);
                        setError("");
                        setShowBt(false);
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
              <button
                className="dowload-btn"
                onClick={ async() => {
                 await handleOnClick();
                  if (!isDownloadable) {
                    setDownloadable(false);
                    // setProcessing(true);
                  }
                }}
              >
                {" "}
                Submit{" "}
                {isLoading && <Loader />}
              </button>
            </div>
          </div>
          {/* {isProcessing && (
            <Row md="12" lg="4" className="justify-content-center">
              <Col>
                <p className="d-flex justify-content-between">
                  processing{" "}
                  <Spinner animation="border" variant="primary" size="sm" />
                </p>
              </Col>
            </Row>
          )} */}
          {   showBt && <div className="meta-result-box-top-alignment main-salary-calculator-box">
            <h4>Result</h4>
            <div>
            
                <div className="player-wrapper">
                  < ReactPlayer
                    className="react-player"
                    url={input}
                    width="30%"
                    height="30%"
                  />
                </div>
            </div>
          </div>}

          <div className="download-button-one-alignment">
            {isDownloadable&& showBt && (
              <div className="button">
                {/* //Audio */}
                {aud && (
                  <button style={{marginRight:"3px"}}>
                    {" "}
                    <a className="" href={aud}>
                      Audio
                    </a>
                  </button>
                )}
                {/* //144P */}
                {off && (
                  <button style={{marginRight:"3px"}}>
                    {" "}
                    <a className="" href={off}>
                      144P
                    </a>
                  </button>
                )}
                {/* //244P */}
                {tff && (
                 <button style={{marginRight:"3px"}}>
                    {" "}
                    <a className="" href={tff}>
                      244P
                    </a>
                  </button>
                )}
                {/* //360p */}
                {tsp && (
                 <button style={{marginRight:"3px"}}>
                    {" "}
                    <a className="" href={tsp}>
                      360P
                    </a>
                  </button>
                )}
                {/* //480P */}
                {fey && (
                 <button style={{marginRight:"3px"}}>
                    {" "}
                    <a className="" href={fey}>
                      480P
                    </a>
                  </button>
                )}
                {/* //720p */}
                {sty && (
                  <button className="">
                    {" "}
                    <a className="" href={sty}>
                      720P
                    </a>
                  </button>
                )}
                {/* //1080P */}
                {oey && (
                 <button style={{marginRight:"3px"}}>
                    {" "}
                    <a className="" href={oey}>
                      1080P
                    </a>
                  </button>
                )}
                {/* //4k */}
                {fk && (
                 <button style={{marginRight:"3px"}}>
                    {" "}
                    <a className="" href={fk}>
                      4K
                    </a>
                  </button>
                )}
                {/* //1440P60 */}
                {offs && (
                 <button style={{marginRight:"3px"}}>
                    {" "}
                    <a className="" href={offs}>
                      1440P60
                    </a>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

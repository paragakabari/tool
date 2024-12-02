import React ,{useState} from 'react'
import ReactPlayer from "react-player/lazy";
import { ToastContainer, toast } from "react-toastify";
import Loader from '../../../../Loader/Loader'
export default function TwitterDownloader() {
    const [input, setInput] = useState("")
    const[download,setDownload]=useState("");
    const [isDownloadable, setDownloadable] = useState(false);
    const [showBt, setShowBt] = useState(false);    // const url = `${input}`;
    const [isLoading,setIsLoading] = useState(false);
    const [error, setError] = useState("")
    // const fetch = require('node-fetch');

const url = 'https://twitter65.p.rapidapi.com/api/twitter/links';

const options = {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '731ded7a04msh9f8c94f37831043p174323jsn1e2695b108f3',
    'X-RapidAPI-Host': 'twitter65.p.rapidapi.com'
  },
  body: `{"url":"${input}"}`
};
function isValidURL(str) {
  if(/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/g.test(str)) {

    return true;
   } else {
       return false;
   }
}

const handleOnClick=()=>{
  setIsLoading(true)
  if(isValidURL(input)){
    fetch(url, options)
	.then(res => res.json())
    .then(json =>{if(json[0][`urls`][0][`url`]){
        setDownload(json[0][`urls`][0][`url`]);
        setDownloadable(true);
       
        setIsLoading(false)
      }
      }) 
	.catch(err => console.error('error:' + err));
    }else{
      setIsLoading(false)
      return  setError("*Please enter Twitter Url");
    }
}
  return (
    <>
    <ToastContainer />
    <div>
    <div className="children-box-alignment">
      <div className="main-salary-calculator-box">
        <div className="two-col-grid two-col-grid-one">
          <div className="two-col-grid-items">
            <div className="salry-input">
              <label>Enter the Twitter URL in box and click to submit</label>
              <input
                  className={error && "error-input"}
                type="textbox"
                value={input}
                onChange={(e) => {setInput(e.target.value)
                  setShowBt(false);
                  setDownloadable(false);
                  setError("");}}
              ></input>
               <span style={{color:"red"}}>{error}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="download-button-one-alignment">
        <div className="button">
          <button className="dowload-btn" onClick={async () => {
                  await handleOnClick();
                 if (!isDownloadable) {
                    setDownloadable(false);
                    // setProcessing(true);
                  }
                  setShowBt(true);
                }}>
            {" "}
            Submit{" "}
            {isLoading &&<Loader/>}
          </button>
        </div>
      </div>
     {isDownloadable &&  <div className="meta-result-box-top-alignment main-salary-calculator-box">
        {/* <h4>Result</h4> */}
        {/* <div>
          <div className="player-wrapper">
            <ReactPlayer
              className="react-player"
              url={input}
              width="30%"
              height="30%"
            />
          </div>
        </div> */}
      <div className="download-button-one-alignment">
        {isDownloadable && showBt &&
        <div className="button">
         { download && <button>
            {" "}
            <a className="" href={download}>
              Download
            </a>
          </button>}
        </div>
        }
      </div>
        </div>}
    </div>
  </div>
  </>
  )
}

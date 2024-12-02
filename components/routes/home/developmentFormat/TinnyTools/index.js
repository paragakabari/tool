import axios from "axios";
import React, { useState } from "react";
import Loader from "../../../../Loader/Loader";

function TinnyTools() {
  const [value, setValue] = useState("");
  const [shortenLink, setShortenLink] = useState("");

  const [loading, setLoading] = useState(false);
  const [copy, setCopy] = useState(false);
  const [error, setError] = useState(false);

  const handleClick = () => {
    if (value) {
      fetchData(value);
      setCopy(false);
    } else {
      setError("* Please enter URL");
    }
  };

  const handleOnChange = (e) => {
    setValue(e.target.value);
    if (e.target.value === "") setShortenLink("");
    setError("");
  };

  const fetchData = (url) => {
    setLoading(true);
    axios
      .get(`https://api.shrtco.de/v2/shorten?url=${url}`)
      .then((res) => {
        if (res.data) {
          setShortenLink(res.data.result.full_short_link);
          setLoading(false);
        }
      })
      .catch((err) => {
        setError("* Please enter URL");
        setLoading(false);
      });
  };

  const handleCopy = (user) => {
    navigator.clipboard.writeText(user);
    if (navigator.clipboard.writeText(user)) {
      setCopy(true);
    }
  };

  return (
    <>
      <div className="children-box-alignment">
        <div className="main-globally-counter-box">
          <div className="timeStamp-text-area">
            <input
              type="text"
              placeholder=" Enter a long URL to make a TinyURL"
              value={value}
              onChange={(e) => handleOnChange(e)}
              className={error && "error-input"}
            />
          </div>
          <span style={{ color: "red", fontSize: "15px" }}>{error}</span>
        </div>

        <div className="button lowercase-center-alignment">
          <button onClick={handleClick}>Make TinyURL {loading && <Loader />}</button>
        </div>
        {/* <div style={{ justifyContent: "center", display: "flex" }}>
          {loading && (
            <img
              src={Loader.src}
              alt="Loadder"
              style={{ width: "100px", height: "100px" }}
            />
          )}
        </div> */}
          {shortenLink && 
        <div className="main-globally-counter-box">
        
          <div className="copy-textarea-icon-alignment">
            <div className="" onClick={() => handleCopy(shortenLink)}>
              <i className="fa-solid fa-copy "  title="Copy" ></i>
            </div>
            {copy && (
              <div>
                <a>Copied</a>
              </div>
            )}
          </div>
          <div className="timeStamp-text-area">
            <input value={shortenLink} placeholder={"Tiny URL"} disabled={true} />
          </div>
        </div>}
      </div>
    </>
  );
}

export default TinnyTools;

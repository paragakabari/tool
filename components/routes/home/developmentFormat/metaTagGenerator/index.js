import React, { useState, useEffect } from "react";
import { handleCopy } from "../../../../common/commonFunction";
export default function metaTagGenerator({ Data }) {
  const [metaTagList, setMetaTagList] = useState({
    language: "English",
    contentType: "UTF-8",
    allowIndex: "Yes",
    allowLink: "Yes",
  });
  const [genratedMetaTag, setGenratedMetaTag] = useState();
  const [copy, setCopy] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMetaTagList({ ...metaTagList, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const genreateMetaTag = () => {
    if (validate()) {
      setCopy(false);
      //convert objec to array for generate dynamic meta tage based on ke and value
      const metaTagListArray = Object.entries(metaTagList);
      let finalArray = metaTagListArray.map((item, index) => {
        return `<meta ${item[0] == "contentType" ? "http-equiv" : "name"}="${
          item[0]
        }"  content="${
          item[0] == "contentType" ? `text/html; charset=${item[1]}` : item[1]
        }"/>`;
      });
      setGenratedMetaTag(finalArray);
    }
  };

  const validate = () => {
    let isFormValid = true;
    let errors = {};
    if (metaTagList.title?.trim() === "" || !metaTagList.title) {
      isFormValid = false;
      errors.title = "* Please enter Site Title";
    }
    if (metaTagList.description?.trim() === "" || !metaTagList.description) {
      isFormValid = false;
      errors.description = "* Please enter Site Description";
    }
    if (metaTagList.keywords?.trim() === "" || !metaTagList.keywords) {
      isFormValid = false;
      errors.keywords = "* Please enter Site Keywords";
    }
    setErrors(errors);
    return isFormValid;
  };

  const resetForm = () => {
    setCopy(false);
    setMetaTagList({
      language: "English",
      contentType: "UTF-8",
      allowIndex: "Yes",
      allowLink: "Yes",
      title: "",
      description: "",
      keywords: "",
    });
    setErrors("");
    setGenratedMetaTag([]);
  };
  // const copyClipBoard = () => {
  //   let data = navigator.clipboard.writeText(genratedMetaTag);
  //   setCopiedContent("Copied");

  // };

  return (
    <div>
      <div className="">
        <div className="main-salary-calculator-box">
          <div className="two-col-grid">
            <div className="two-col-grid-items">
              <div className="salry-input">
                <label>Site Title </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Site Title"
                  value={metaTagList?.title}
                  onChange={(e) => handleChange(e)}
                  className={errors?.title && "error-input"}
                />
                <span style={{ color: "red", fontSize: "15px" }}>
                  {errors?.title}
                </span>
              </div>
            </div>
            <div className="two-col-grid-items">
              <div className="salry-input">
                <label>Site Description </label>
                <input
                  type="text"
                  name="description"
                  placeholder="Site Description"
                  value={metaTagList.description}
                  onChange={(e) => handleChange(e)}
                  className={errors?.description && "error-input"}
                />
                <span style={{ color: "red", fontSize: "15px" }}>
                  {errors?.description}
                </span>
              </div>
            </div>
            <div className="two-col-grid-items">
              <div className="salry-input">
                <label>Site Keywords </label>
                <input
                  type="text"
                  name="keywords"
                  placeholder="Site Keywords"
                  value={metaTagList.keywords}
                  onChange={(e) => handleChange(e)}
                  className={errors?.keywords && "error-input"}
                />
                <span style={{ color: "red", fontSize: "15px" }}>
                  {errors?.keywords}
                </span>
              </div>
            </div>
            <div className="two-col-grid-items">
              <div className="salry-input">
                <label>Allow robots to index your website? </label>
                <select
                  id="unit"
                  name="allowIndex"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  value={metaTagList.allowIndex}
                  className=""
                >
                  <option value="Yes" selected>
                    Yes
                  </option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
            <div className="two-col-grid-items">
              <div className="salry-input">
                <label>Allow robots to follow all links? </label>
                <select
                  id="unit"
                  name="allowLink"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  value={metaTagList.allowLink}
                  className=""
                >
                  <option value="Yes" selected>
                    Yes
                  </option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
            <div className="two-col-grid-items">
              <div className="salry-input">
                <label>What type of content will your site display?? </label>
                <select
                  id="unit"
                  name="contentType"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  value={metaTagList.contentType}
                  className=""
                >
                  <option value="UTF-8" selected>
                    UTF-8
                  </option>
                  <option value="UTF-16">UTF-16</option>
                  <option value="ISO-8859-1">ISO-8859-1</option>
                  <option value="WINDOWS-1252">WINDOWS-1252</option>
                </select>
              </div>
            </div>
            <div className="two-col-grid-items">
              <div className="salry-input">
                <label>What is your site primary language? </label>
                <select
                  id="unit"
                  name="language"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  value={metaTagList.language}
                  className=""
                >
                  <option value="English" selected>
                    English
                  </option>
                  <option value="French">French</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Russian">Russian</option>
                  <option value="Arbic">Arbic</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Korean">Korean</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Portuguese">Portuguese</option>
                  <option value="No Language Tag">No Language Tag</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="gentrate-meta-tag-two-button-center-alignment">
          <div className="button">
            <button onClick={resetForm}>Reset</button>
          </div>
          <div className="button">
            <button onClick={genreateMetaTag}>Generate Meta Tags</button>
          </div>
        </div>
        {genratedMetaTag?.length > 0 && (
        <div className="main-salary-calculator-box meta-result-box-top-alignment">
          <div className="new-flex-copy-new-align">
            <h4>Result</h4>
          
              <div className="new-copy-icon-text-style-alignment">
                <div className="copy-icon">
                  <i
                    className="fa-solid fa-copy "
                    title="Copy"
                    onClick={() => handleCopy(genratedMetaTag, setCopy)}
                  ></i>
                </div>
                {copy && (
                  <div>
                    {" "}
                    <span>Copied</span>
                  </div>
                )}
              </div>
            
          </div>
          {genratedMetaTag &&
            genratedMetaTag.map((item, index) => {
              return (
                <>
                  <div className="meta-tag-text-style">
                    <p key={index}>{item}</p>
                  </div>
                </>
              );
            })}
        </div>)}

        {genratedMetaTag?.length > 0 && (
          <div className="meta-tag-copy-button-center-alignment"></div>
        )}
      </div>
    </div>
  );
}

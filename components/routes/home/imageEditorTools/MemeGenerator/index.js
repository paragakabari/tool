import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import "./style.module.css";
import EditableText from "./EditableText";
//image related imports

import html2canvas from "html2canvas";
import * as htmlToImage from "html-to-image";
//draggable text
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";

//EditableText goes here
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import FormatColorFillIcon from "@material-ui/icons/FormatColorFill";
import Paper from "@material-ui/core/Paper";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import InputColor from "react-input-color";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStylesVerticalDividors = makeStyles((theme) => ({
  paper: {
    margin: "0 auto",
    width: "fit-content",
    color: "inherit",

    display: "flex",

    borderRadius: "10px",
    "& svg": {
      margin: theme.spacing(0.0),
    },
    "& hr": {
      margin: theme.spacing(0, 0),
    },
  },
  box: {
    height: "200px",
    width: "200px",
    background: "linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)",
    // "linear-gradient(to bottom, #000066 0%, #ff6666 100%)",
    zIndex: 9999,
    // "linear-gradient(rgba(250,0,0,0.5),transparent)",

    backgroundColor: "red" /*this your primary color*/,
  },
}));

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0),
    border: "none",
    "&:not(:first-child)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-child": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);

const EditableInput = (props) => {
  // We use hooks to declare "initial" states
  const classNameesVerticalDividors = useStylesVerticalDividors();
  const [isbold, SetIsBold] = useState(false);
  const [isItalic, SetIsItalic] = useState(false);
  const [isUnderLine, SetIsUnderLine] = useState(false);
  const [formats, setFormats] = useState("");
  const [incfont, SetIncFont] = useState(parseInt(props.fSize, 10));
  const [color, setColor] = React.useState({});
  const [angle, setAngle] = useState("0");
  const transform = `rotate(${-angle}deg)`;

  async function handleIncFont() {
    await SetIncFont(incfont + 1);
  }

  function handleFormat(event, newFormats) {
    setFormats(newFormats);
  }

  return (
    <React.Fragment
      className={classNameesVerticalDividors.root}
      style={{
        fontWeight: isbold ? "bold" : "normal",
        fontStyle: isItalic ? "italic" : "normal",
        textDecoration: isUnderLine ? "underline" : "none",
        fontSize: incfont + "px",
        transform,
        color: color.hex,
        width: "100%",
      }}
    >
     
        <Paper style={{ overflowX: "hidden" }} elevation={0} className={classNameesVerticalDividors.paper}>
          <Grid item xs={12}>
          <div className="all-icon-content-alignment">
            <StyledToggleButtonGroup
              size="small"
              value={formats}
              onChange={(event, newFormats) => handleFormat(event, newFormats)}
              aria-label="text formatting"
            >
              <Grid style={{ border: "1px solid #d0d0d0", borderRadius: "10px" }} item xs={4}>
                <ToggleButton style={{ border: "none", padding: "7px" }} value="bold" aria-label="bold" onClick={() => SetIsBold(!isbold)}>
                  <FormatBoldIcon />
                </ToggleButton>
              </Grid>
              <Grid style={{ border: "1px solid #d0d0d0", borderRadius: "10px" }} item xs={4}>
                <ToggleButton style={{ border: "none", padding: "7px" }} value="italic" aria-label="italic" onClick={() => SetIsItalic(!isItalic)}>
                  <FormatItalicIcon />
                </ToggleButton>
              </Grid>
              <Grid style={{ border: "1px solid #d0d0d0", borderRadius: "10px" }} item xs={4}>
                <ToggleButton
                  style={{ border: "none", padding: "7px" }}
                  value="underlined"
                  aria-label="underlined"
                  onClick={() => SetIsUnderLine(!isUnderLine)}
                >
                  <FormatUnderlinedIcon />
                </ToggleButton>
              </Grid>
            </StyledToggleButtonGroup>
            <StyledToggleButtonGroup>
              <Grid style={{ border: "1px solid #d0d0d0", borderRadius: "10px" }} item xs={5.5}>
                <ToggleButton
                  style={{ border: "none", padding: "7px" }}
                  // style={{ padding: "0 5px" }}
                >
                  <input
                    className="number-wrapper numberAlignment"
                    style={{ width: 20, border: "none" }}
                    type="number"
                    value={angle}
                    onChange={(e) => {
                      if (e.target) {
                        setAngle(Number(e.target.value));
                      }
                    }}
                    placeholder="angle"
                  />
                </ToggleButton>
              </Grid>
            </StyledToggleButtonGroup>
          </div>
          </Grid>
        </Paper>
     
      <Paper style={{ overflowX: "hidden" }} elevation={0}>
        <br/>
        <Grid item xs={12}>
          <div className="all-icon-content-alignment">
          <StyledToggleButtonGroup>
            <Grid style={{ border: "1px solid #d0d0d0", borderRadius: "10px" }} item xs={4}>
              <ToggleButton style={{ border: "none", padding: "7px" }} value="incfont" aria-label="underlined" onClick={() => handleIncFont()}>
                <ZoomInIcon />
              </ToggleButton>
            </Grid>

            <Grid style={{ border: "1px solid #d0d0d0", borderRadius: "10px" }} item xs={4}>
              <ToggleButton
                style={{ border: "none", padding: "7px" }}
                value="incfont"
                aria-label="underlined"
                onClick={() => SetIncFont(incfont - 1)}
              >
                <ZoomOutIcon />
              </ToggleButton>
            </Grid>
            <Grid style={{ border: "1px solid #d0d0d0", borderRadius: "10px" }} item xs={4}>
              <ToggleButton style={{ border: "none", padding: "0 6px" }} value="incfont" aria-label="backgroundColor">
                <InputLabel htmlFor="input-with-icon-adornment"></InputLabel>

                <Input
                  type="color"
                  id="input-with-icon-adornment"
                  startAdornment={
                    <InputAdornment position="center">
                      <FormatColorFillIcon />
                    </InputAdornment>
                  }
                />
              </ToggleButton>
            </Grid>
           
            <Grid style={{ border: "1px solid #d0d0d0", borderRadius: "10px" }} item xs={5.5}>
              <ToggleButton style={{ border: "none", padding: "4px 7px" }}>
                <InputColor
                  className={classNameesVerticalDividors.box}
                  initialValue="null"
                  onChange={setColor}
                  placement="right"
                  autoAdjust="true"
                  style={{
                    zIndex: 9999,
                    margin: "auto",
                    display: "flex",
                    position: "relative",
                    height: "30px",
                  }}
                />
              </ToggleButton>
            </Grid>
          </StyledToggleButtonGroup>
            </div>
        </Grid>
      </Paper>
    </React.Fragment>
  );
};
//EditableText ends here
//
//

export default function Index() {
  const [images, setImages] = React.useState([]);
  const [activeImage, setActiveImage] = React.useState("https://i.imgflip.com/1iruch.jpg");
  const [isMemeGenerated, setIsMemeGenerated] = React.useState(false);
  const [textelement, settextelement] = useState([]);
  const [imageElement, setImageElement] = React.useState([]);

  // changing image

  function handleSecImageInputChange(event) {
    addSecimage(URL.createObjectURL(event.target.files[0]));
  }
  function addSecimage(e) {
    setImageElement((prevElements) => {
      return [...prevElements, e];
    });
  }

  //downloading image
  function handleMemeDownlod(el) {
    let node = document.getElementById("mnode");
    console.log("node", node);
    htmlToImage
      .toPng(node)
      .then(function (dataUrl) {
        console.log("dataUrl", dataUrl);

        const link = document.createElement("a");
        link.href = dataUrl;
        link.setAttribute("download", "meme.png"); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
    // var canvas = document.getElementById("mnode");
    // html2canvas(canvas).then(function (canvas) {
    //   domtoimage
    //     .toBlob(document.getElementById("mnode"))
    //     .then(function (base64image) {
    //       //  saveAs(base64image, "my-node.png");
    //     });
    // });
  }

  // Fetch images using API
  async function fetchImage() {
    const imgData = await fetch("https://api.imgflip.com/get_memes").then((res) => res.json());

    const { memes } = await imgData?.data;
    await setImages(memes);
    const image = images[Math.floor(Math.random() * images?.length)];
    await setActiveImage(image?.url);
  }
  //...

  return (
    <div className="App">
    
      <Grid style={{ maxWidth: "80vw", margin: "auto", backgroundColor: "#ffffff" }} container spacing={2}>
        <Grid style={{ border: "1px solid #d0d0d0", borderRadius: "10px" }} item sm={12} lg={6}>
          <div id="mnode">
            <div
              style={{
                backgroundColor: "#ffffff",
              }}
            >
              <img
                style={{
                  // margin: "0 auto",
                  maxWidth: "100%",
                  width: "100vw",
                  backgroundColor: "#ffffff",
                  margin: "0",
                }}
                src={activeImage}
                alt="0"
              />
            </div>
            <div
              style={{
                backgroundColor: "#ffffff",
              }}
              className="content"
            >
              {textelement.map((item, index) => {
                return (
                  <Draggable>
                    <p
                      style={{
                        maxWidth: "100%",
                        margin: "0 auto",
                      }}
                    >
                      <EditableText isUnderLine={true} text={item} fSize="24" />
                      {/* {item} */}
                    </p>
                  </Draggable>
                );
              })}
              {imageElement.map((item, index) => {
                return (
                  <Draggable>
                    <Resizable defaultSize={{}}>
                      <img
                        style={{
                          width: "150px",
                          height: "inherit",
                          zIndex: "200",
                        }}
                        src={item}
                        alt={index}
                      />
                    </Resizable>
                  </Draggable>
                );
              })}
            </div>
          </div>
        </Grid>

        <Grid style={{ border: "1px solid #d0d0d0", borderRadius: "10px" }} item sm={12} lg={6}>
          <React.Fragment>
            <div style={{ margin: "auto 0" }} className="form__btns">
              <Grid
                style={{
                  margin: "auto",
                }}
                item
                sm={12}
                lg={6}
              >
                <EditableInput />
              </Grid>
              <Grid
                style={{
                  margin: "40px auto",
                }}
                item
                xs={12}
                lg={6}
              >
                {/* <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                    setIsMemeGenerated(false);
                    fetchImage();
                  }}
                >
                  Go to Next Image
                </button> */}
              </Grid>

              <>
                <div className="min-new-align">
                <div className="upload-image-mem-style"  htmlFor="LocalfileInput">
                  <span>  Add Local Images</span>
                  <div className="icon-upload">
                    <i className="fa-solid fa-cloud-arrow-up"></i>
                    <input
                    id="LocalfileInput"
                    name="LocalfileInput"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={(event) => {
                      setIsMemeGenerated(false);
                      setActiveImage(URL.createObjectURL(event.target.files[0]));
                    }}
                    onClick={() => {
                      setIsMemeGenerated(false);
                    }}
                    
                  />
                  </div>
                </div>

                <div className="upload-image-mem-style" htmlFor="fileInput">
                    <span>Add Secondary Image</span>
                    <div className="icon-upload">
                    <i className="fa-solid fa-cloud-arrow-up"></i>
                    <input 
                    id="fileInput" 
                    name="fileInput"
                     type="file" 
                     accept=".jpg, .jpeg, .png"
                      onChange={handleSecImageInputChange}  />
                     
                    </div>
                </div>
                </div>
              
              </>

              <div className="two-button-mem-alignment">
                <div className="button">
                <button
                  type="button"
                  onClick={(e) => {
                    setIsMemeGenerated(false);
                    settextelement((prevElements) => {
                      return [...prevElements, "Sample Text"];
                    });
                  }}
                >
                  Add Meme Text
                </button>
                </div>
                <div className="button">
                {isMemeGenerated ? (
                  <button className="btn btn-success form__btns form " type="button" onClick={() => handleMemeDownlod(this)} id="foo">
                    Download Meme
                  </button>
                ) : (
                  <button className="btn btn-success form__btns form " type="button" onClick={() => setIsMemeGenerated(true)}>
                    Generate Meme
                  </button>
                )}
                </div>
              </div>

            
            </div>
          </React.Fragment>
        </Grid>
      </Grid>
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from "./standupTimer.module.scss";
import classNames from "classnames";

export default function StandupTimer() {
  const [data, setData] = useState();
  const [speakerCount, setSpeakerCount] = useState(1);
  const [num, setNum] = useState();
  const [pause1, setPause1] = useState(false);
  const [inputData, setInputData] = useState({
    totalduration: "01:00",
    tspeakers: "4",
    eachduration: "00:15",
  });
  const [time, setTime] = useState({ minute: "0", second: "20" });
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [show, setShow] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [timeArray, setTimeArray] = useState(0);
  const [tArray, setTArray] = useState([]);

  var Tsec, secs, minIL, hoursLeft;
  let bell = new Audio(
    "https://nzt6ku-a.akamaihd.net/downloads/ringtones/files/mp3/temple-bell-543.mp3"
  );

  const audio = () => {
    bell.play();
  };

  const InputChange = (e) => {
    const { name, value } = e.target;
    setTime({ ...time, [name]: value });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleonclick = () => {
    if (pause1 == true) {
      handleOnPause();
    }
    handleOpen();
    setOpen2(true);
    setNum(data);
  };

  const handleonStart = () => {
    setShow(true);
    setOpen2(false);
    setIsActive(true);
    setIsPaused(false);
  };
  const handleOnNextSpeaker = () => {
    setTimeArray(0);
    setNum(data);
    setIsPaused(false);

    if (tArray) {
      setTArray([...tArray, timeArray]);
    } else {
      setTArray(timeArray);
    }

    setShow(true);
    if (pause1 == true) {
      handleOnPause();
    }
    if (speakerCount < inputData.tspeakers) {
      for (let i = speakerCount; i <= inputData.tspeakers; i++) {
        setSpeakerCount(i + 1);

        break;
      }
    } else {
      setOpen3(true);
      setIsPaused(true);
    }
  };
  const onClickReset = () => {
    setNum(data);
    setIsPaused(false);
    setIsActive(true);
  };
  const handleOnPause = () => {
    setIsPaused(!isPaused);
    setPause1((prev) => !prev);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setShow(true);
    setSpeakerCount(1);
    setOpen(false);
  };
  useEffect(() => {
    hoursLeft = Math.floor(time?.second / 3600);
    if (time?.minute) {
      var min =
        Math.floor((time?.second - hoursLeft * 3600) / 60) +
        parseFloat(time?.minute);
    } else {
      var min = Math.floor((time?.second - hoursLeft * 3600) / 60);
    }
    var secondsLeft =
      time?.second - Math.floor((time?.second - hoursLeft * 3600) / 60) * 60;
    secondsLeft = Math.round(secondsLeft * 100) / 100;
    let hours = hoursLeft < 10 ? "0" + hoursLeft : hoursLeft;
    minIL = min < 10 ? "0" + min : min;
    secs = secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;
    Tsec = minIL + ":" + secs;
    setInputData(Tsec);
    if (time?.second > 60) {
      setTime({ ...time, minute: minIL, second: secs });
    }
    let minutes = minIL / inputData?.tspeakers;
    let second = secs / inputData?.tspeakers;
    let minFix = minutes.toFixed(2);
    let uy = minFix.split(".");
    let secData = parseInt(uy[1] * 0.6 + second, 0);
    setData(minutes * 60 + second);
    let answer;
    if (uy[0].length == 1 && secData >= 10) {
      answer = `0${uy[0]}:${secData}`;
    } else if (uy[0].length != 1 && secData < 10) {
      answer = `${uy[0]}:0${secData}`;
    } else if (uy[0].length == 1 && secData < 10) {
      answer = `0${uy[0]}:0${secData}`;
    } else {
      answer = `${uy[0]}:${secData}`;
    }
    setInputData({ ...inputData, eachduration: answer });
  }, [time, inputData?.tspeakers]);

  useEffect(() => {
    let interval = null;
    if (num !== undefined) {
      if (isActive && isPaused === false) {
        interval = setInterval(() => {
          setNum((num) => {
            if (num > 0) {
              return num - 1;
            } else {
              audio();
              setIsPaused(!isPaused);
              setShow(false);
            }
          });
          setTimeArray((pre) => pre + 1);
        }, 1000);
      } else {
        clearInterval(interval);
      }
      return () => {
        clearInterval(interval);
      };
    }
  }, [isPaused, isActive]);

  return (
    <>
      <div>
        <div className="main-globally-counter-box timer-box-alignment">
          <div className={classNames(styles.timerAlignment)}>
            <div className={styles.meetingSectionAlignment}>
              <p> The meeting duration will be</p>
              <div className={styles.inputAlignment}>
                <input
                  type="number"
                  name="minute"
                  value={time?.minute}
                  onChange={(e) => {
                    e.target.value >= 0 &&
                      e.target.value.length <= 3 &&
                      InputChange(e);
                  }}
                />
                <span>:</span>
                <input
                  type="number"
                  name="second"
                  value={time?.second}
                  onChange={(e) => {
                    e.target.value >= 0 &&
                      e.target.value.length <= 3 &&
                      InputChange(e);
                  }}
                />
              </div>
              <p> Minutes</p>
            </div>
            <div className={styles.meetingSectionAlignment}>
              <p>There are</p>
              <div
                className={classNames(styles.inputAlignment, styles.smallInput)}
              >
                <input
                  type="number"
                  value={inputData?.tspeakers}
                  name="tspeakers"
                  onChange={(e) => {
                    e.target.value > 0 &&
                      e.target.value.length <= 3 &&
                      handleOnChange(e);
                  }}
                />
                <div className={styles.iconAlignment}></div>
              </div>
              <p>Speakers</p>
            </div>
            <div className={styles.meetingSectionAlignment}>
              <p>Each speaking for</p>
              <div
                className={classNames(styles.inputAlignment, styles.smallInput)}
              >
                <input
                  type="text"
                  name="eachduration"
                  value={inputData?.eachduration}
                  onChange={handleOnChange}
                  disabled={true}
                />
              </div>
              <p>Minutes</p>
            </div>
          </div>
        </div>
        <div className="button meeting-button-alignment">
          <button onClick={handleonclick}>
            Start Meeting <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box>
            <Modal
              open={open2}
              onClose={() => {
                setOpen2(false);
              }}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box>
                Custom Modal 1
                <div
                  className={styles.timerModalAlignment}
                  onClose={handleClose}
                >
                  <div className={styles.modalWrapper}>
                    <div className={styles.timerBoxAlignment}>
                      <div className={styles.modalHeadingAlignment}>
                        <h2>Meeting starting...</h2>
                      </div>
                      <div className={styles.modalBodyAlignment}>
                        <h3>Speaker {speakerCount}</h3>
                      </div>
                      <div className={styles.buttobAlignment}>
                        <button onClick={handleonStart}>
                          Start Speaker-{speakerCount}{" "}
                          <i className="fa-solid fa-arrow-right"></i>
                        </button>
                      </div>
                    </div>
                    <div className={styles.closeButtonAlignment}>
                      <button
                        onClick={() => {
                          setOpen2(false);
                          handleClose();
                        }}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </Box>
            </Modal>
            <div className={styles.timerSetModalAlignment}>
              <div className={styles.modalWrapper}>
                <div className={styles.modalDetailsAlignment}>
                  {num >= 0 ? (
                    <>
                      <h5>
                        Speaker {speakerCount} of {inputData.tspeakers}
                      </h5>
                      <h2>
                        <div className="timer">
                          <span className="digits">
                            {("0" + Math.floor((timeArray / 60) % 60)).slice(
                              -2
                            )}
                            :
                          </span>
                          <span className="digits">
                            {("0" + Math.floor((timeArray / 1) % 60)).slice(-2)}
                          </span>
                        </div>
                      </h2>
                      <h1>
                        <div className="timer">
                          <span className="digits">
                            {("0" + Math.floor((num / 60) % 60)).slice(-2)}:
                          </span>
                          <span className="digits">
                            {("0" + Math.floor((num / 1) % 60)).slice(-2)}
                          </span>
                        </div>
                      </h1>
                    </>
                  ) : (
                    <h2>Speaker {speakerCount} is Completed</h2>
                  )}

                  <div className={styles.buttonAlignment}>
                    {show && <button onClick={onClickReset}>Reset Time</button>}
                    {speakerCount == inputData.tspeakers && num == "0" ? (
                      handleOnNextSpeaker()
                    ) : (
                      <button onClick={handleOnNextSpeaker}>
                        Next Speaker
                      </button>
                    )}

                    {show && (
                      <button onClick={handleOnPause}>
                        {pause1 ? (
                          <i className="fa-solid fa-play"></i>
                        ) : (
                          <i className="fa-solid fa-pause"></i>
                        )}
                      </button>
                    )}
                  </div>
                </div>
                <div className={styles.closeButtonAlignment}>
                  <button onClick={handleClose}>
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
        <Modal
          open={open3}
          onClose={() => {
            setOpen3(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box>
            <div className={styles.overSettimerSetModalAlignmentNew}>
              <div className={styles.modalWrapperNew}>
                <div className={styles.modalDetailsAlignmentNew}>
                  <h2>Meeting is over</h2>

                  <div className={styles.modelBoxLoop}>
                    {tArray.map((item, index) => {
                      return (
                        <div
                          className={styles.modalBodySetAlignment}
                          key={index}
                        >
                          <h3>Speaker {index + 1}</h3>
                          <h3>
                            <span className="digits">
                              {("0" + Math.floor((item / 60) % 60)).slice(-2)}:
                            </span>
                            <span className="digits">
                              {("0" + Math.floor((item / 1) % 60)).slice(-2)}
                            </span>{" "}
                            min
                          </h3>
                        </div>
                      );
                    })}
                  </div>

                  <h3>
                    Total meeting time{" "}
                    <span className="digits">
                      {(
                        "0" +
                        Math.floor(
                          (tArray.reduce((a, b) => a + b, 0) / 60) % 60
                        )
                      ).slice(-2)}
                      :
                    </span>{" "}
                    <span className="digits">
                      {(
                        "0" +
                        Math.floor((tArray.reduce((a, b) => a + b, 0) / 1) % 60)
                      ).slice(-2)}
                    </span>{" "}
                    minutes
                  </h3>
                  <div className={styles.buttonAlignmentNew}>
                    <button
                      onClick={() => {
                        setOpen3(false);
                        setOpen2(false);
                        setNum();
                        setSpeakerCount(1);
                        handleClose();
                        setTArray([]);
                      }}
                    >
                      Back to home
                    </button>
                  </div>
                  {/* </div> */}
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}

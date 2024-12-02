import React, { useEffect, useState, useRef } from "react";

import { useReactToPrint } from "react-to-print";
import ReactToPrint from "react-to-print";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

export default function TimeSheetCal({ Data }) {
  const componentRef = useRef();
  const pdfExportComponent = React.useRef(null);
  const container = React.useRef(null);

  const [indexValue, setIndexValue] = useState(null);
  const [tArray, setTArray] = useState();
  const [grossPayInput, setGrossPayInput] = useState();
  const [checked, setChecked] = useState(false);

  const [timeSheetData, setTimeSheetData] = useState([
    {
      day: "Monday",
      timeIn: "",
      timeOut: "",
      breakTimeHR: "00",
      breakTimeMI: "00",
      totalhour: 0,
    },
    {
      day: "Tuesday",
      timeIn: "",
      timeOut: "",
      breakTimeHR: "00",
      breakTimeMI: "00",
      totalhour: 0,
    },
    {
      day: "Wednesday",
      timeIn: "",
      timeOut: "",
      breakTimeHR: "00",
      breakTimeMI: "00",
      totalhour: 0,
    },
    {
      day: "Thursday",
      timeIn: "",
      timeOut: "",
      breakTimeHR: "00",
      breakTimeMI: "00",
      totalhour: 0,
    },
    {
      day: "Friday",
      timeIn: "",
      timeOut: "",
      breakTimeHR: "00",
      breakTimeMI: "00",
      totalhour: 0,
    },
    {
      day: "Saturday",
      timeIn: "",
      timeOut: "",
      breakTimeHR: "00",
      breakTimeMI: "00",
      totalhour: 0,
    },
    {
      day: "Sunday",
      timeIn: "",
      timeOut: "",
      breakTimeHR: "00",
      breakTimeMI: "00",
      totalhour: "00:00",
    },
  ]);

  const [totalHr, setTotalHr] = useState([
    {
      totalhour: "00:00",
      totalhourSec: 0,
    },
    {
      totalhour: "00:00",
      totalhourSec: 0,
    },
    {
      totalhour: "00:00",
      totalhourSec: 0,
    },
    {
      totalhour: "00:00",
      totalhourSec: 0,
    },
    {
      totalhour: "00:00",
      totalhourSec: 0,
    },
    {
      totalhour: "00:00",
      totalhourSec: 0,
    },
    {
      totalhour: "00:00",
      totalhourSec: 0,
    },
  ]);

  const exportPDFWithMethod = () => {
    let element = container.current || document.body;
    savePDF(element, {
      paperSize: "a4",
      margin: 40,
      fileName: "TimeSheet",
    });
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handleIsPro = () => {
    setAdBox(false);
  };

  const handleOnClear = () => {
    setTimeSheetData([
      {
        day: "Monday",
        timeIn: "",
        timeOut: "",
        breakTimeHR: "00",
        breakTimeMI: "00",
        totalhour: 0,
      },
      {
        day: "Tuesday",
        timeIn: "",
        timeOut: "",
        breakTimeHR: "00",
        breakTimeMI: "00",
        totalhour: 0,
      },
      {
        day: "Wednesday",
        timeIn: "",
        timeOut: "",
        breakTimeHR: "00",
        breakTimeMI: "00",
        totalhour: 0,
      },
      {
        day: "Thursday",
        timeIn: "",
        timeOut: "",
        breakTimeHR: "00",
        breakTimeMI: "00",
        totalhour: 0,
      },
      {
        day: "Friday",
        timeIn: "",
        timeOut: "",
        breakTimeHR: "00",
        breakTimeMI: "00",
        totalhour: 0,
      },
      {
        day: "Saturday",
        timeIn: "",
        timeOut: "",
        breakTimeHR: "00",
        breakTimeMI: "00",
        totalhour: 0,
      },
      {
        day: "Sunday",
        timeIn: "",
        timeOut: "",
        breakTimeHR: "00",
        breakTimeMI: "00",
        totalhour: "00:00",
      },
    ]);
    setTotalHr([
      {
        totalhour: "00:00",
        totalhourSec: 0,
      },
      {
        totalhour: "00:00",
        totalhourSec: 0,
      },
      {
        totalhour: "00:00",
        totalhourSec: 0,
      },
      {
        totalhour: "00:00",
        totalhourSec: 0,
      },
      {
        totalhour: "00:00",
        totalhourSec: 0,
      },
      {
        totalhour: "00:00",
        totalhourSec: 0,
      },
      {
        totalhour: "00:00",
        totalhourSec: 0,
      },
    ]);
    setTArray("");
    setGrossPayInput("");
    setChecked(false);
  };

  const handleChange = (e, index) => {
    const { name, value } = e?.target;
    setIndexValue(index);
    setTimeSheetData((prevState) => {
      let newState = prevState[index];
      newState[name] = value;
      return [...prevState];
    });
  };

  useEffect(() => {
    if (
      timeSheetData[indexValue]?.timeOut &&
      timeSheetData[indexValue]?.timeIn
    ) {
      var date1 = new Date(`08/05/2015 ${timeSheetData[indexValue]?.timeIn}`);
      var date2 = new Date(`08/05/2015 ${timeSheetData[indexValue]?.timeOut}`);
      var date3 =
        timeSheetData[indexValue]?.breakTimeHR * 3600000 +
        timeSheetData[indexValue]?.breakTimeMI * 60000;

      var diff = date2?.getTime() - date1?.getTime() - date3;

      setTotalHr((prevState) => {
        let newState = prevState[indexValue];
        newState["totalhourSec"] = date2?.getTime() - date1?.getTime() - date3;
        return [...prevState];
      });

      var hh = Math.floor(diff / 1000 / 60 / 60);
      diff -= hh * 1000 * 60 * 60;
      var mm = Math.floor(diff / 1000 / 60);
      diff -= mm * 1000 * 60;
      var ss = Math.floor(diff / 1000);
      diff -= ss * 1000;
      let hours;
      if (hh < -9) {
        hours = "-" + hh * -1;
      } else if (hh < 0) {
        hours = "-" + "0" + hh * -1;
      } else {
        hours = hh < 10 ? "0" + hh : hh;
      }
      let minIL = mm < 10 ? "0" + mm : mm;
      let secs = ss < 10 ? "0" + ss : ss;
      let Totalval = hours + ":" + minIL;

      setTotalHr((prevState) => {
        let newState = prevState[indexValue];
        newState["totalhour"] = Totalval;
        return [...prevState];
      });
    }
  }, [timeSheetData]);

  let FinalValue = 0;
  useEffect(() => {
    for (let i = 0; i < totalHr.length; i++) {
      if (totalHr[i]?.totalhourSec > 0) {
        FinalValue += totalHr[i]?.totalhourSec;
      }
    }
    setTArray(convertMsToHM(FinalValue));
  }, [totalHr]);

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function convertMsToHM(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = seconds >= 30 ? minutes + 1 : minutes;
    minutes = minutes % 60;
    hours = hours % 24;

    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
  }

  const handleGrossPay = (e) => {
    let array = tArray?.split(":");
    setGrossPayInput(((+array[0] + array[1] / 60) * e.target.value).toFixed(2));
  };

  return (
    <div>
      <div className="children-box-alignment">
        {/* <h1>TIMESHEET CALCULATOR</h1> */}
        <div>
          {/* Create table for time sheet with date p */}
          <div>
            <ReactToPrint content={() => componentRef.current} />
           

            <PDFExport
              ref={pdfExportComponent}
              paperSize="a4"
              margin={40}
              fileName="TimeSheet"
              author="KendoReact Team"
            >
              <div ref={container}>
                {/* <h1>month:<input type="date"/></h1> */}
                <div className="time-sheet-table-new-design">
                  <table ref={componentRef}>
                    <tr>
                      <th align="left">Day</th>
                      <th align="left">Time in</th>
                      <th align="left">Time out</th>
                      <th align="center">Break Time</th>
                      <th align="center">Total hours</th>
                    </tr>
                    <tbody>
                      {timeSheetData &&
                        timeSheetData.map((item, index) => {
                          return (
                            <>
                              <tr align="left" key={index}>
                                <td>{item?.day}</td>
                                <td>
                                  <input
                                    type="time"
                                    name="timeIn"
                                    value={timeSheetData[index]?.timeIn}
                                    onChange={(e) => handleChange(e, index)}
                                  />
                                </td>
                                <td align="left">
                                  <input
                                    type="time"
                                    name="timeOut"
                                    value={timeSheetData[index]?.timeOut}
                                    onChange={(e) => handleChange(e, index)}
                                  />
                                </td>
                                <td align="left">
                                  <div className="two-input-table-design-alignment">
                                    <input
                                      style={{ maxWidth: "40px" }}
                                      type="number"
                                      name="breakTimeHR"
                                      value={timeSheetData[index]?.breakTimeHR}
                                      onChange={(e) => {
                                        e.target.value >= 0 &&
                                          handleChange(e, index);
                                      }}
                                    />
                                    <span>:</span>
                                    <input
                                      type="number"
                                      style={{ maxWidth: "40px" }}
                                      name="breakTimeMI"
                                      value={timeSheetData[index]?.breakTimeMI}
                                      onChange={(e) => {
                                        e.target.value >= 0 &&
                                          handleChange(e, index);
                                      }}
                                    />
                                  </div>
                                </td>
                                <td align="center">
                                  {totalHr[index]?.totalhour}
                                </td>
                              </tr>
                            </>
                          );
                        })}
                    </tbody>
                    <tr>
                      <th></th>
                      {/* {checked ?<><th>Gross pay:{grossPayInput}</th></>  : <><th></th><th></th></>} */}
                      <th>{checked ? "Gross pay:" : ""}</th>
                      <th>{checked ? grossPayInput : ""}</th>
                      <th>Total hours</th>
                      <th>{tArray}</th>
                    </tr>
                  </table>
                </div>
              </div>
            </PDFExport>
          </div>
          <div className="all-button-new-table-alignment">
            <div className="button">
              <button onClick={handlePrint}>Print</button>
            </div>
            <div className="button">
              <button onClick={exportPDFWithMethod}>PDF</button>
            </div>
            <div className="button">
              <button onClick={handleOnClear}>Clear Table</button>
            </div>
          </div>
        </div>
        <div className="calculate-gross-checkbox-alignment">
          <label>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
          </label>
          <span> Calculate Gross Pay Totals</span>
        </div>

        {checked && (
          <div className="commom-box-new">
            <div className="input-new">
              <input
                type="number"
                placeholder="Rate per hour"
                onChange={handleGrossPay}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

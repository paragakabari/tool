import React, { useEffect, useRef, useState } from "react";

function DropDown({ Data }) {
  var convert = require("convert-units");
  const Convert = require("unit-converter-pro");
  const force = new Convert.Force();
  const energy = new Convert.Energy();
  const density = new Convert.Density();
  const power = new Convert.Power();

  const [selectFirst, setSelectFirst] = useState(
    Data?.UnitArray[0].split(" ")[0]
  );
  const [selectSecond, setSelectSecond] = useState(
    Data?.UnitArray[0].split(" ")[0]
  );
  const [first, setfirst] = useState(1);
  const [answer, setAnswer] = useState(NaN);

  useEffect(() => {
    setfirst(NaN);
    setAnswer(NaN);
    setSelectFirst(Data?.UnitArray[0].split(" ")[0]);
    setSelectSecond(Data?.UnitArray[0].split(" ")[0]);
  }, [Data.navigate, Data?.UnitArray]);

  useEffect(() => {
    handelData();
  }, [first, selectFirst, selectSecond]);

  const handelData = () => {
    var lower = Data?.Name?.toLowerCase();
    if (Data.dataType == "convert") {
      var convertData = convert(first).from(selectFirst).to(selectSecond);
      setAnswer(convertData);
    } else {
      if (Data.Name == "Force") {
        var convertData = force[selectFirst](first)[selectSecond]();
        setAnswer(convertData);
      } else if (Data.Name == "Energy Extra Unit") {
        var convertData = energy[selectFirst](first)[selectSecond]();
        setAnswer(convertData);
      } else if (Data.Name == "Density") {
        var convertData = density[selectFirst](first)[selectSecond]();
        setAnswer(convertData);
      } else if (Data.Name == "Power") {
        var convertData = power[selectFirst](first)[selectSecond]();
        setAnswer(convertData);
      }
    }
  };

  return (
    <>
      <div>
        <div className="lenghth-box-design">
          <div className="two-col-grid">
            <div className="two-col-grid-items">
              <p>From :</p>
              <div className="all-input-design-alignment">
                <div>
                  <input
                    type="number"
                    name="firstInput"
                    value={first}
                    onChange={(e) => {
                      setfirst(() => e.target.value), handelData();
                    }}
                  />
                </div>
                <div>
                  <select
                    id="unit"
                    name="unit"
                    onChange={(e) => {
                      setSelectFirst(() => e.target.value);
                      handelData();
                    }}
                    className=""
                    value={selectFirst}
                  >
                    {Data.UnitArray.map((item, index) => {
                      return (
                        <option
                          value={item.split(" ")[0]}
                          selected={index == 0 && true}
                        >
                          {item}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="two-col-grid-items">
              <p> To :</p>
              <div className="all-input-design-alignment">
                <div>
                  <input
                    disabled
                    type="number"
                    name="firstInput"
                    value={answer}
                    // onChange={(e) => setSecond(e.target.value)}
                  />
                </div>
                <div>
                  <select
                    id="unit"
                    name="unit"
                    onChange={(i) => {
                      setSelectSecond(() => i.target.value);
                      handelData();
                    }}
                    value={selectSecond}
                    className=""
                  >
                    {Data.UnitArray.map((item, index) => {
                      return (
                        <option
                          value={item.split(" ")[0]}
                          selected={index == 0 && true}
                        >
                          {item}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DropDown;

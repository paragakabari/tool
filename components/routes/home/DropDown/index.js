import React, { useEffect, useRef, useState } from "react";

function DropDown({ Data }) {
  var convert = require("convert-units");

  const [selectFirst, setSelectFirst] = useState("");
  const [selectSecond, setSelectSecond] = useState("");
  const [first, setfirst] = useState(NaN);
  const [answer, setAnswer] = useState(NaN);
  useEffect(() => {
    setfirst(NaN);
    setAnswer(NaN);
  }, [Data.navigate]);

  useEffect(() => {
    setSelectFirst(Data.UnitArray[0].split(" ")[0]);
    setSelectSecond(Data.UnitArray[1].split(" ")[0]);
  }, []);

  const handelData = () => {
    var convertData = convert(first).from(selectFirst).to(selectSecond);
    setAnswer(convertData);
  };

  return (
    <>
      {/* length */}

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
                      setfirst(e.target.value), handelData();
                    }}
                  />
                </div>
                <div>
                  <select
                    id="unit"
                    name="unit"
                    onChange={(e) => {
                      setSelectFirst(e.target.value);
                      handelData();
                    }}
                    className=""
                  >
                    {Data.UnitArray.map((item) => {
                      return <option value={item.split(" ")[0]}>{item}</option>;
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
                      setSelectSecond(i.target.value);
                      handelData();
                    }}
                    className=""
                  >
                    {Data.UnitArray.map((item) => {
                      return <option value={item.split(" ")[0]}>{item}</option>;
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

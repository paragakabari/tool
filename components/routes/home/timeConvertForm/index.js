import React, { useEffect, useRef, useState } from "react";
import moment from "moment-timezone";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

function TimeConvertForm({ Data }) {
  const [storeTimezone, setStoreTimezone] = useState("");
  const [storeTimezoneTwo, setStoreTimezoneTwo] = useState("");
  const [initialValue, setInitialValue] = useState();
  const ct = require("countries-and-timezones");
  const countries = ct.getAllCountries();

  const timezoneOne = ct.getTimezone(storeTimezone);
  const timezoneTwo = ct.getTimezone(storeTimezoneTwo);

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          {item?.name}-{item?.timeZone}
        </span>
      </>
    );
  };

  const handleOnSelect = (item1) => {
    setStoreTimezone(moment.tz(new Date(), item1.timeZone).format("hh:mm A , DD-MM-YYYY").toString());
  };

  const handleOnSelectTwo = (item1) => {
    setStoreTimezoneTwo(moment.tz(new Date(), item1.timeZone).format("hh:mm A , DD-MM-YYYY"));
  };

  useEffect(() => {
    setInitialValue({
      from: moment.tz(new Date(), "Europe/Vienna").format("hh:mm A , DD-MM-YYYY"),
      to: moment.tz(new Date(), "Canada").format("hh:mm A , DD-MM-YYYY"),
    });
  }, []);

  return (
    <>
      <div>
        <div className="lenghth-box-design">
          <div className="two-col-grid">
            <div className="two-col-grid-items">
              <p>From :</p>
              <div className="all-input-design-alignment">
                <div>
                  <input disabled type="text" name="firstInput" placeholder={initialValue?.from} value={storeTimezone} />
                </div>
                <div className="time-input-change-css">
                  <ReactSearchAutocomplete
                    placeholder="Europe/Vienna"
                    items={Object.values(countries)?.map((item1) => {
                      return {
                        name: item1?.name,
                        timeZone: item1?.timezones[0],
                      };
                    })}
                    onSelect={handleOnSelect}
                    onSearch={(e) => setStoreTimezone("")}
                    autoFocus
                    formatResult={formatResult}
                  />
                </div>
              </div>
            </div>
            <div className="two-col-grid-items">
              <p> To :</p>
              <div className="all-input-design-alignment">
                <div>
                  <input
                    disabled
                    type="text"
                    name="firstInput"
                    placeholder={initialValue?.to}
                    value={storeTimezoneTwo}
                    // onChange={(e) => setSecond(e.target.value)}
                  />
                </div>

                <div className="time-input-change-css">
                  <ReactSearchAutocomplete
                    placeholder="Canada"
                    items={Object.values(countries)?.map((item1) => {
                      return {
                        name: item1?.name,
                        timeZone: item1?.timezones[0],
                      };
                    })}
                    onSelect={handleOnSelectTwo}
                    onSearch={(e) => setStoreTimezoneTwo("")}
                    autoFocus
                    formatResult={formatResult}
                  />
                </div>

                <h1 id="myTime"></h1>
              </div>
            </div>
          </div>
        </div>
        <div className="instruction-image-Resize">
          <span>* Enter countrys name to see the result.</span>
        </div>
      </div>
    </>
  );
}

export default TimeConvertForm;

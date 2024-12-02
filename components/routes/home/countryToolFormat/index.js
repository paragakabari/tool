import React, { useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { countryFlage } from "./countryFlage";

function CountryToolFormat({ Data }) {
  var countries = require("country-data").countries;
  var currencies = require("country-data").currencies;
  var languages = require("country-data").languages;

  const [valueOfFilterDAta, setValueOfFilterDAta] = useState();
  const [storeCountryDetail, setStoreCountryDetail] = useState({});


  const handleOnSelect = (item) => {
    setStoreCountryDetail(item);
    const selectedUsers = [item.alpha2];

    Object.keys(countryFlage)
      .filter((key) => selectedUsers.includes(key))
      .reduce((obj, key) => {
        obj[key] = countryFlage[key];
        return setValueOfFilterDAta(obj[key].image);
      }, {});
  };

  const SelectValue = storeCountryDetail?.countryCurrencies
    ?.toString()
    ?.toUpperCase();

  const match = currencies.all.find((item) => item.code == SelectValue);

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
      </>
    );
  };

  return (
    <>
      <div className="lenghth-box-design">
        <div className="input-new">
          <div className="input-new">
            <label>Enter your country</label>
            <div>
              <header>
                <div className="country-tools-search-box-width">
                  <ReactSearchAutocomplete
                    placeholder="US"
                    items={countries.all.map((item) => {
                      return {
                        name: item?.name,
                        countryCode: item?.countryCallingCodes[0],
                        countryCurrencies: item?.currencies,
                        alpha2: item?.alpha2,
                        lang: item?.languages,
                      };
                    })}
                    onChange={(e) => storeCountryDetail({})}
                    onSelect={handleOnSelect}
                    autoFocus
                    formatResult={formatResult}
                  />
                </div>
              </header>
            </div>
          </div>
        </div>
      </div>
      <div className="country-information-design-box">
        {storeCountryDetail?.name ? (
          <h4>{storeCountryDetail?.name}'s Information :-</h4>
        ) : (
          <h4>Information :-</h4>
        )}

        <>
          <div className="country-two-col-grid">
            {valueOfFilterDAta && (
              <div className="country-flag-item">
                <img src={valueOfFilterDAta} />
              </div>
            )}

            <div className="country-two-col-grid-items">
              <div className="country-text-grid">
                <div className="country-text-grid-items">
                  <span>Country Name :</span>
                </div>
                <div className="country-text-grid-items">
                  <p>{storeCountryDetail?.name}</p>
                </div>
              </div>

              <div className="country-text-grid">
                <div className="country-text-grid-items">
                  <span>Country code :</span>
                </div>
                <div className="country-text-grid-items">
                  <p>{storeCountryDetail?.countryCode}</p>
                </div>
              </div>

              <div className="country-text-grid">
                <div className="country-text-grid-items">
                  <span>Currencies :</span>
                </div>
                <div className="country-text-grid-items">
                  <p>
                    {storeCountryDetail?.countryCurrencies
                      ?.join(" , ")
                      .toUpperCase()}{" "}
                    {match?.name ? `(${match?.name})` : ""}
                  </p>
                </div>
              </div>

              <div className="country-text-grid">
                <div className="country-text-grid-items">
                  <span>Currencies Symbol :</span>
                </div>
                <div className="country-text-grid-items">
                  <p>{match?.symbol}</p>
                </div>
              </div>

              <div className="country-text-grid">
                <div className="country-text-grid-items">
                  <span>Language :</span>
                </div>
                <div className="country-text-grid-items">
                  <p>{storeCountryDetail?.lang?.join(" , ").toUpperCase()}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
}

export default CountryToolFormat;

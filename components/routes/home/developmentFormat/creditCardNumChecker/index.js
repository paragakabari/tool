import { start } from "@popperjs/core";
import React, { useState } from "react";
import validator from "validator";
import Dinnersclub from "../../../../../src/Images/DinersClub.png";
import amex from "../../../../../src/Images/amex.png";
import discover from "../../../../../src/Images/discover.png";
import instapay from "../../../../../src/Images/instapay card.png";
import jcb from "../../../../../src/Images/jcb.png";
import laser from "../../../../../src/Images/laser.png";
import Maestro from "../../../../../src/Images/Maestro-icon.png";
import MasterCard from "../../../../../src/Images/MasterCard.png";
import visa from "../../../../../src/Images/visa.jpg";
import visaElectron from "../../../../../src/Images/visaElectron.png";

var valid = require("card-validator");
valid.creditCardType.addCard({
  niceType: "visaElectron",
  type: "visaElectron",
  patterns: [4026, 417500, 4508, 4844, 4913, 4917],
  lengths: [16],
  code: {
    name: "CVV",
    size: 3,
  },
});

valid.creditCardType.addCard({
  niceType: "Instapay",
  type: "instapay",
  patterns: [637, 638, 639],
  lengths: [16],
  code: {
    name: "CVV",
    size: 3,
  },
});

valid.creditCardType.addCard({
  niceType: "Laser",
  type: "laser",
  patterns: [6304, 6706, 6771, 6709],
  lengths: [16 - 19],
  code: {
    name: "CVV",
    size: 3,
  },
});

export default function CreditCardNumberChecker() {
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");
  const [img, setimg] = useState("");
  const [number, setNumber] = useState();
  const [check, setCheck] = useState(false);
  const [checkbtn, setCheckBtn] = useState(false);
  const [color, setColor] = useState("red");

  const validateCreditCard = (value) => {
    setNumber(value);
    if (validator.isCreditCard(value)) {
      setErrorMessage("Valid CreditCard Number");
      setColor("green")
      setCheckBtn(true);
    } else {
      setErrorMessage("Enter valid CreditCard Number!");
      setColor("red")
      setCheckBtn(false);
      setCheck(false);
    }
  };

  const handleButtonClick = () => {
    var numberValidation = valid.number(number);

    if (numberValidation.card) {
      setError(numberValidation.card.niceType);

    }

    if (numberValidation?.card?.type == "american-express") {
      setimg(amex);
    }
    if (numberValidation?.card?.type == "diners-club") {
      setimg(Dinnersclub);
    }
    if (numberValidation?.card?.type == "discover") {
      setimg(discover);
    }
    if (numberValidation?.card?.type == "instapay") {
      setimg(instapay);
    }
    if (numberValidation?.card?.type == "jcb") {
      setimg(jcb);
    }
    if (numberValidation?.card?.type == "laser") {
      setimg(laser);
    }
    if (numberValidation?.card?.type == "maestro") {
      setimg(Maestro);
    }
    if (numberValidation?.card?.type == "mastercard") {
      setimg(MasterCard);
    }
    if (numberValidation?.card?.type == "visa") {
      setimg(visa);
    }
    if (numberValidation?.card?.type == "visaElectron") {
      setimg(visaElectron);
    }

    setCheck(true);
  };

  return (
    <>
      <div className="creditacard-number-checked">
        <div className="input-new">
          <label>Enter CreditCard Number:</label>
          <input
            type="text"
            placeholder="0000 0000 0000 0000"
            maxLength={16}
            onChange={(e) => validateCreditCard(e.target.value)}
          />
        </div>
        <br />
        <span style={{ fontWeight: "bold", color: `${color}` }}>{errorMessage}</span>
      </div>
      {checkbtn && (
        <div className="button lowercase-center-alignment">
          <button onClick={() => handleButtonClick()}>Check Card</button>
        </div>
      )}

      {check && (
        <div className="salary-result-box">
          <table>
            <tr>
              <th align="center">
                <span>{error}</span>
              </th>

              <th align="center">
                <span>
                  <img
                    src={img.src}
                    style={{ width: "150px", height: "100px" }}
                  ></img>
                </span>
              </th>
            </tr>
          </table>
        </div>
      )}
      <div className="credit-list-label-alignment">
        <label>List of credit card number formats : -</label>
      </div>

      <div className="salary-result-box">
        <table>
          <tr>
            <th align="center">
              <span>Credit Card Issuer</span>
            </th>

            <th align="center">
              <span>Starts With ( IIN Range )</span>
            </th>

            <th align="center">
              <span>Length ( Number of digits )</span>
            </th>
          </tr>

          <tr>
            <td align="left">
              <span>American Express</span>
            </td>
            <td align="left">
              <span>34, 37 </span>
            </td>
            <td align="left">
              <span>15</span>
            </td>
          </tr>

          <tr>
            <td align="left">
              <span>Diners Club - Carte Blanche </span>
            </td>
            <td align="left">
              <span>300, 301, 302, 303, 304, 305 </span>
            </td>
            <td align="left">
              <span>14</span>
            </td>
          </tr>

          <tr>
            <td align="left">
              <span>Diners Club - International </span>
            </td>
            <td align="left">
              <span>36 </span>
            </td>
            <td align="left">
              <span>14</span>
            </td>
          </tr>

          <tr>
            <td align="left">
              <span>Diners Club - USA & Canada </span>
            </td>
            <td align="left">
              <span>54 </span>
            </td>
            <td align="left">
              <span>16</span>
            </td>
          </tr>

          <tr>
            <td align="left">
              <span>Discover </span>
            </td>
            <td align="left">
              <span>
                6011, 622126 to 622925, 644, 645, 646, 647, 648, 649, 65{" "}
              </span>
            </td>
            <td align="left">
              <span>16</span>
            </td>
          </tr>

          <tr>
            <td align="left">
              <span>InstaPayment </span>
            </td>
            <td align="left">
              <span>637, 638, 639 </span>
            </td>
            <td align="left">
              <span>16</span>
            </td>
          </tr>

          <tr>
            <td align="left">
              <span>JCB </span>
            </td>
            <td align="left">
              <span>3528 to 3589 </span>
            </td>
            <td align="left">
              <span>16</span>
            </td>
          </tr>

          <tr>
            <td align="left">
              <span>Laser </span>
            </td>
            <td align="left">
              <span>6304, 6706, 6771, 6709 </span>
            </td>
            <td align="left">
              <span>16-19</span>
            </td>
          </tr>

          <tr>
            <td align="left">
              <span>Maestro </span>
            </td>
            <td align="left">
              <span>5018, 5020, 5038, 5893, 6304, 6759, 6761, 6762, 6763 </span>
            </td>
            <td align="left">
              <span>16-19</span>
            </td>
          </tr>

          <tr>
            <td align="left">
              <span>MasterCard </span>
            </td>
            <td align="left">
              <span>51, 52, 53, 54, 55 </span>
            </td>
            <td align="left">
              <span>16-19</span>
            </td>
          </tr>

          <tr>
            <td align="left">
              <span>Visa </span>
            </td>
            <td align="left">
              <span>4 </span>
            </td>
            <td align="left">
              <span>13-16</span>
            </td>
          </tr>

          <tr>
            <td align="left">
              <span>Visa Electron </span>
            </td>
            <td align="left">
              <span>4026, 417500, 4508, 4844, 4913, 4917 </span>
            </td>
            <td align="left">
              <span>16</span>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { handleCopy } from "../../../common/commonFunction";
function BinaryText({ Data }) {
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [copy, setCopy] = useState(false);
  const [errors, setErrors] = useState("");  

  const handleOnErase = () => {
    setText("")
    setText2("")
    setCopy(false)
  };


  const handleOnChange = (event) => {
    setErrors("")
    setText(event.target.value);
    setText2("");
  };

  useEffect(() => {
    setText2("");
    setText("");
    setCopy(false);
    setErrors("")
  }, [Data]);

  const texttobinary = () => {
    if(!text || text.trim() === "") return setErrors("* Please enter text.")
    setCopy(false);
    let data = "";
    for (var i = 0; i < text.length; i++) {
      data += text[i].charCodeAt(0).toString(2) + " ";
    }
    setText2(data);
  };

  const binarytotext = () => {
    if(!text || text.trim() === "") return setErrors("* Please enter number.")
    setCopy(false);
    let binary = text;
    binary = binary.split(" ");
    binary = binary.map((elem) => parseInt(elem, 2));
    binary = binary.map((elem) => String.fromCharCode(elem));
    let newText = binary.join("");
    setText2(newText);
  };

  const checkKeyPress = (e) => {
    if(!text || text.trim() === "") return setErrors("* Please enter number.")
    setCopy(false);
    if (
      Data.navigate == "/binary-to-text" ||
      Data.navigate == "/binary-to-hex"
    ) {
      if (e.key == 1 || e.key == 0) {
        return true;
      } else {
        e.preventDefault();
        return false;
      }
    }
  };

  const asciitoBinary = () => {
    if(!text || text.trim() === "") return setErrors("* Please enter number.")
    setCopy(false);
    let result = "";
    for (let i = 0; i < text.length; i++) {
      let bin = text[i].charCodeAt().toString(2);
      result += Array(8 - bin.length + 1).join(" ") + bin;
    }
    setText2(result);
  };

  const binarytoAscii = () => {
     if(!text || text.trim() === "") return setErrors("* Please enter number.")
    setCopy(false);
    let result = "";
    let arr = text.match(/.{1,8}/g);
    for (let i = 0; i < arr.length; i++) {
      result += String.fromCharCode(parseInt(arr[i], 2).toString(10));
    }
    setText2(result);
  };

  const texttoascii = () => {
    if(!text || text.trim() === "") return setErrors("* Please enter text.")
    setCopy(false);
    let data = [];
    data = text.split("");
    let array = [];
    for (let index = 0; index < data.length; index++) {
      array.push(data[index].charCodeAt(data[index]));
    }

    setText2(array.join(" "));
  };

  const ConvertBase = (num) => {
    if(!text || text.trim() === "") return setErrors("* Please enter value.")
    setCopy(false);
    return {
      from: function (baseFrom) {
        return {
          to: function (baseTo) {
            return parseInt(num, baseFrom).toString(baseTo);
          },
        };
      },
    };
  };

  const bin2hex = () => {
    if(!text || text.trim() === "") return setErrors("* Please enter number.")
    setText2(ConvertBase(text.split(" ").join("")).from(2).to(16));
  };
  const hex2bin = () => {
    if(!text || text.trim() === "") return setErrors("* Please enter number.")
    setText2(ConvertBase(text.split(" ").join("")).from(16).to(2));
  };
  const bin2dec = () => {
     if(!text || text.trim() === "") return setErrors("* Please enter number.")
    setText2(ConvertBase(text.split(" ").join("")).from(2).to(10));
  };

  const dec2bin = () => {
    if(!text || text.trim() === "") return setErrors("* Please enter number.")
    setText2(ConvertBase(text.split(" ").join("")).from(10).to(2));
  };
  const dec2hex = () => {
     if(!text || text.trim() === "") return setErrors("* Please enter number.")
    setText2(ConvertBase(text.split(" ").join("")).from(10).to(16));
  };
  const hex2dec = () => {
    if(!text || text.trim() === "") return setErrors("* Please enter number.")
    setText2(ConvertBase(text.split(" ").join("")).from(16).to(10));
  };
  const hex2txt = () => {
    if(!text || text.trim() === "") return setErrors("* Please enter number.")
    var hex = text.toString().split("").join("");
    var str = "";
    for (var n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    setText2(str);
  };

  const txt2hex = () => {
    if(!text || text.trim() === "") return setErrors("* Please enter text.")
    const hex = require("string-hex");
    setText2(hex(text).split("").join(""));
  };

  const txt2dec = () => {
    if(!text || text.trim() === "") return setErrors("* Please enter text.")
    setCopy(false);
    let data = [];
    data = text.split("");
    let array = [];
    for (let index = 0; index < data.length; index++) {
      array.push(data[index].charCodeAt(data[index]));
    }
    setText2(array.join(" "));
  };

  const dec2txt = () => {
    if(!text || text.trim() === "") return setErrors("* Please enter number.")
    var ascii = text;
    text.replace(/\s+/g, " ");
    var bytes = ascii.split(" ");
    var ret = "";
    for (var i = 0; i < bytes.length; i++) {
      ret += String.fromCharCode(bytes[i]);
    }
    setText2(ret);
  };

  const octal2binary = () => {
     if(!text || text.trim() === "") return setErrors("* Please enter octal value.")
    setCopy(false);
    let i = 0;
    let binary = "";
    while (i < text.length) {
      let c = text[i];
      switch (c) {
        case "0":
          binary += "000";
          break;
        case "1":
          binary += "001";
          break;
        case "2":
          binary += "010";
          break;
        case "3":
          binary += "011";
          break;
        case "4":
          binary += "100";
          break;
        case "5":
          binary += "101";
          break;
        case "6":
          binary += "110";
          break;
        case "7":
          binary += "111";
          break;
        // default:
        //   setError("Invalid Octal Digit " + text[i]);
        //   break;
      }
      i++;
    }
    setText2(binary);
    return binary;
  };

  const octal2decimal = () => {
    if(!text || text.trim() === "") return setErrors("* Please enter octal value.")
    setCopy(false);
    let num = text;
    let dec_value = 0;
    let base = 1;
    let temp = num;
    while (temp) {
      let last_digit = temp % 10;
      temp = Math.floor(temp / 10);
      dec_value += last_digit * base;
      base = base * 8;
    }
    setText2(dec_value);
    return dec_value;
  };

  const octal2hex = () => {
    if(!text || text.trim() === "") return setErrors("* Please enter octal value.")
    setCopy(false);
    setText2(ConvertBase(text.split(" ").join("")).from(8).to(16));
  };

  const octal2text = () => {
    if(!text || text.trim() === "") return setErrors("* Please enter octal value.")
    setCopy(false);
    let octal = text;
    octal = octal.split(" ");
    octal = octal.map((elem) => parseInt(elem, 8));
    octal = octal.map((elem) => String.fromCharCode(elem));
    let newText = octal.join("");
    setText2(newText);
  };

  const text2octal = () => {
    if(!text || text.trim() === "") return setErrors("* Please enter text.")
    setCopy(false);
    let data = "";
    for (var i = 0; i < text.length; i++) {
      data += text[i].charCodeAt(0).toString(8) + " ";
    }
    setText2(data);
  };

  const binary2octal = () => {
    if(!text || text.trim() === "") return setErrors("* Please enter number.")
    setCopy(false);
    setText2(ConvertBase(text.split(" ").join("")).from(2).to(8));
  };

  const decimal2octal = () => {
    if(!text || text.trim() === "") return setErrors("* Please enter number.")
    setCopy(false);
    setText2(ConvertBase(text.split(" ").join("")).from(10).to(8));
  };

  const hex2octal = () => {
    if(!text || text.trim() === "") return setErrors("* Please enter number.")
    setCopy(false);
    setText2(ConvertBase(text.split(" ").join("")).from(16).to(8));
  };

  const json2txt = () => {
    if(!text || text.trim() === "") return setErrors("* Please enter json.")
    var convert = require("json-to-plain-text");
    try {
      var response = convert.toPlainText(JSON.parse(text));
      setText2(response);
    } catch (error) {
      toast.error("It's Not Valid JSON, Enter Valid Base Value");
    }
  };

  const ascii2txt = () => {
    if(!text || text.trim() === "") return setErrors("* Please enter number.")
    setCopy(false);
    let ascii = text;
    ascii = ascii.split(" ");
    ascii = ascii.map((elem) => String.fromCharCode(elem));
    let newText = ascii.join("");
    setText2(newText);
  };

  const CustomPlaceholder = () => {
    switch (Data.navigate) {
      case "/text-to-binary":
        return texttobinary;

      case "/binary-to-text":
        return binarytotext;

      case "/binary-to-ascii":
        return binarytoAscii;

      case "/ascii-to-binary":
        return asciitoBinary;

      case "/text-to-ascii":
        return texttoascii;

      case "/binary-to-hex":
        return bin2hex;

      case "/hex-to-binary":
        return hex2bin;

      case "/binary-to-decimal":
        return bin2dec;

      case "/decimal-to-binary":
        return dec2bin;

      case "/decimal-to-hex":
        return dec2hex;

      case "/hex-to-decimal":
        return hex2dec;

      case "/text-to-hex":
        return txt2hex;

      case "/hex-to-text":
        return hex2txt;

      case "/text-to-decimal":
        return txt2dec;

      case "/octal-to-binary":
        return octal2binary;

      case "decimal-to-text":
        return binarytotext;

      case "/binary-to-ascii":
        return binarytoAscii;

      case "/ascii-to-binary":
        return asciitoBinary;

      case "/text-to-ascii":
        return texttoascii;

      case "/binary-to-hex":
        return bin2hex;

      case "/hex-to-binary":
        return hex2bin;

      case "/binary-to-decimal":
        return bin2dec;

      case "/decimal-to-binary":
        return dec2bin;

      case "/decimal-to-hex":
        return dec2hex;

      case "/hex-to-decimal":
        return hex2dec;

      case "/text-to-hex":
        return txt2hex;

      case "/hex-to-text":
        return hex2txt;

      case "/text-to-decimal":
        return txt2dec;

      case "/octal-to-binary":
        return octal2binary;

      case "/octal-to-decimal":
        return octal2decimal;

      case "/octal-to-hex":
        return octal2hex;

      case "/octal-to-text":
        return octal2text;

      case "/text-to-octal":
        return text2octal;
        

      case "/binary-to-octal":
        return binary2octal;

      case "/decimal-to-octal":
        return decimal2octal;

      case "/hex-to-octal":
        return hex2octal;

      case "/decimal-to-text":
        return dec2txt;

      case "/ascii-to-text":
        return ascii2txt;

      case "/json-to-text":
        return json2txt;

      default:
    }
  };

  let x = Data.function;

  return (
    <>
      <ToastContainer />
      <div>
        <div className="children-box-alignment">
         

          <div className="main-globally-counter-box">
{text?.length > 0 &&
          <div className="color-picker-icon">
              <i className="fa-solid fa-eraser"  title="Clear" onClick={handleOnErase}></i>
            </div>}
            <div className="counter-text-area">
              <textarea className={errors && "error-input"}
                placeholder={Data.placeholder}
                onChange={handleOnChange}
                value={text}
                onKeyPress={(e) => checkKeyPress(e)}
              />
               <span>{errors}</span>
            </div>
          </div>
          <div className="button lowercase-center-alignment">
            <button
             
              onClick={CustomPlaceholder()}
            
            >
              {Data.Name}
            </button>
          </div>
          {text2 &&
          <div className="main-globally-counter-box">
           
            <div className="copy-textarea-icon-alignment">
              <div className="" onClick={() => handleCopy(text2, setCopy)}>
                <i className="fa-solid fa-copy "  title="Copy" ></i>
              </div>
              {copy  && (
                <div>
                  {" "}
                  <a>Copied</a>
                </div>
              )}
            </div>
            <div className="counter-text-area">
              <textarea  value={text2} />
            </div>
          </div>}
        </div>
      </div>
    </>
  );
}

export default BinaryText;

import React, { useEffect, useState } from "react";

export default function FileUploadBoxCalc() {
  const [gstValue, setGstValue] = useState();
  const [netAmount, setNetAmount] = useState();
  const [inclusiveAmount, setInclusiveAmount] = useState();
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGstValue({ ...gstValue, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    let formIsValid = true;
    let err = {};
    if (!gstValue || !gstValue.amount) {
      err.amount = "* Please enter Amount";
      formIsValid = false;
    }
    if (!gstValue || !gstValue.gst) {
      err.gst = "* Please enter GST(%)";
      formIsValid = false;
    }
    setErrors(err);
    return formIsValid;
  };

  // const handleCalculate = () => {
  //   if (validateForm()) {
  //   var price = gstValue?.amount;
  //   var taxvalue = price * (gstValue?.gst / 100);
  //   var total = parseInt(price) + taxvalue;
  //   setNetAmount(total);
    
  //   var inclusiveValue = gstValue?.amount - (price * (gstValue?.gst / 100));
  //   var gst = 1+(gstValue?.gst/100)
  //   var goodsValue = (gstValue?.amount)/(gst);

    
  //   setInclusiveAmount(goodsValue);
  //   }    
  // };

  return (
    <div>
      <div className={styles.fileUploadBoxDesign}>
        
            <input name="amount" placeholder="Please enter amount"/>
              <button style={{ justifyContent: "center" }}>
                <input
                  name="file"
                  onChange={(e) => handleChange(e)}
                />
                <i className="fa-solid fa-upload"></i>
                <span>GST- Goods and Services Tax</span>
              </button>
          
      </div>
    </div>
  );
}

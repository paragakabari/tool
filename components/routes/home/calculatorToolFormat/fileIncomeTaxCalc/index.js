import React, { useEffect, useState } from "react";


import { useRouter } from "next/router";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function FileIncomeTaxCalc({ Data }) {


 
  

 
  

 

  const router = useRouter();
  const id = router.query.type;
  useEffect(() => {
    setCheck(false);
  }, [id]);

  return (
    <div>
      <div className="children-box-alignment">
        <div className={styles.fileUploadBoxDesign}>
          <input name="amount" placeholder="Please enter amount" />
          <input name="taxvalue" placeholder="Please enter tax value" />
        </div>
      </div>
    </div>
  );
}

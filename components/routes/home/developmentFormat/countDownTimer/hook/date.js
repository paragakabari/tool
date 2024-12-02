import React from 'react';

const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    // <div style={{display:"inline-flex",marginRight:"30px",marginTop:"50px",
    // background:"linear-gradient(270deg,#051817,#0e3839)",justifyContent:"center",height:"100px", width:"150px",alignItems:"center",
    // color:"#1c67ca",textShadow:"1px 1px 7px",borderRadius:"15px",border:"2px solid silver",boxShadow:"0 0 5px 25px"}} >
    <div className="">
      {value?
    <div className={isDanger ? 'countdown danger ' : 'countdown '}  >
      <p>{value}{type}</p>
    </div>:
    <p>0</p>
    }
    </div>
    // </div>
  );
};

export default DateTimeDisplay;
import React, { useEffect, useState } from "react";
import DateTimeDisplay from "./hook/date";
import { useCountdown } from "./hook/countDown";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";


const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Expired!!!</span>
      <p>Please select a future date and time.</p>
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  //hours
  var hdigits = hours.toString().split("");
  var hoursArray = hdigits.map(Number);
  //days
  var Ddigits = days.toString().split("");
  var daysArray = Ddigits.map(Number);
  //minutes
  var mdigits = minutes.toString().split("");
  var minutesArray = mdigits.map(Number);
  //seconds
  var sdigits = seconds.toString().split("");
  var secondsArray = sdigits.map(Number);
  return (
    <div className="show-counter">
      <div className="new-counter-design-grid">
        <div className="new-counter-design-grid-items">
          <div className="timer-alignment">
            <div className="sub-grid">
              <div className="sub-grid-items">
                {days ? (
                  <p>{daysArray.length > 1 ? daysArray[0] : 0}</p>
                ) : (
                  <p>0</p>
                )}
              </div>
              <div className="sub-grid-items">
                <DateTimeDisplay
                  value={daysArray.length > 1 ? daysArray[1] : daysArray[0]}
                  isDanger={days <= 3}
                />
              </div>
            </div>
            <h2>Days</h2>
          </div>
          <span>:</span>
        </div>
        <div className="new-counter-design-grid-items">
          <div className="timer-alignment">
            <div className="sub-grid">
              <div className="sub-grid-items">
                {hours ? (
                  <p>{hoursArray.length > 1 ? hoursArray[0] : 0}</p>
                ) : (
                  <p>0</p>
                )}
              </div>
              <div className="sub-grid-items">
                <DateTimeDisplay
                  value={hoursArray.length > 1 ? hoursArray[1] : hoursArray[0]}
                  isDanger={false}
                />
              </div>
            </div>
            <h2>Hours</h2>
          </div>
          <span>:</span>
        </div>
        <div className="new-counter-design-grid-items">
          <div className="timer-alignment">
            <div className="sub-grid">
              <div className="sub-grid-items">
                {minutes ? (
                  <p>{minutesArray.length > 1 ? minutesArray[0] : 0}</p>
                ) : (
                  <p>0</p>
                )}
              </div>
              <div className="sub-grid-items">
                <DateTimeDisplay
                  value={
                    minutesArray.length > 1 ? minutesArray[1] : minutesArray[0]
                  }
                  isDanger={false}
                />
              </div>
            </div>
            <h2>Minutes</h2>
          </div>
          <span>:</span>
        </div>
        <div className="new-counter-design-grid-items">
          <div className="timer-alignment">
            <div className="sub-grid">
              <div className="sub-grid-items">
                {seconds ? (
                  <p>{secondsArray.length > 1 ? secondsArray[0] : 0}</p>
                ) : (
                  <p>0</p>
                )}
              </div>
              <div className="sub-grid-items">
                <DateTimeDisplay
                  value={
                    secondsArray.length > 1 ? secondsArray[1] : secondsArray[0]
                  }
                  isDanger={false}
                />
              </div>
            </div>
            <h2>Seconds</h2>
          </div>
      
        </div>
      </div>
    </div>
  );
};



const CountDownTimer = () => {
//   const [value, setValue] = useState();
//   var countDownDate = new Date(value).getTime();
  
//   const [days, hours, minutes, seconds] = useCountdown(countDownDate);
//   // const disableDates = () => {
//   //   var today = new Date();
//   //   var dd = today.getDate();
//   //   var mm = today.getMonth();
//   //   var yyyy = today.getFullYear();
//   //   return dd + "-" + mm + "-" + yyyy;
//   // };
//     return (
//       <>
//         <div className="commom-box-new">
//           <div className="input-new">
//             {/* <input
//               type="datetime-local"
//               step="2"
//               value={value}
//               min="12-27-2022"
//               onChange={(e) => setValue(e.target.value)}
//             /> */}
//       <DatePicker
//   format="MM/DD/YYYY HH:mm:ss"
//   minDate={new Date()}
//   value={value}
//   onChange={(e) => setValue(e)}
//   plugins={[
//     <TimePicker position="bottom" />,
    
//   ]}
// />
//           </div>
//         </div>
//         <ShowCounter
//           days={days}
//           hours={hours}
//           minutes={minutes}
//           seconds={seconds}
//         />
//       </>
//     );
};

export default CountDownTimer;

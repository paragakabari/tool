import React, { useRef } from "react";
import { useRouter } from "next/router";
import TimeConvertForm from "..";
import DateToTimestamp from "../dateToTimeStamp";
import TimestampToDate from "../timeStempToDate";

function TimeConvertFormat({ Data }) {
  const router = useRouter();
  const Name = router.query.type;
  const ref = useRef();

  return (
    <>
      <div ref={ref}>{/* <PdfToCsvDemo /> */}</div>
      <div className="">
        
        {/* Convert timestamp to date */}
        {Name === "timestamp-to-date" && (
          <>
            <TimestampToDate />
          </>
        )}
        
        {/* Convert date to timestamp */}
        {Name === "date-to-timestamp" && (
          <>
            <DateToTimestamp />
          </>
        )}
        
        {/* Time Convertor */}
        {Name === "time-convert" && (
          <>
            <TimeConvertForm />
          </>
        )}

        

      </div>
    </>
  );
}

export default TimeConvertFormat;

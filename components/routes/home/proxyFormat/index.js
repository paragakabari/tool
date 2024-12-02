import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useOnClickOutside } from "../../../../hooks";
import Loader from "../../../Loader/Loader";
// import Loader from "../../../../Loader/Loader";
function ProxyFormat() {
  const location = useRouter();
  const Name = location.query.type;
  const ref = useRef();
  const IP = require("what-is-my-ip-address");
  const [iPAddress, setIPAddress] = useState("");
  const [geoLocation, setGeoLocation] = useState({});
  const [download, setDownload] = useState();
  const NetworkSpeed = require("network-speed");
  const [loading, setLoading] = useState(false);
 

  const testNetworkSpeed = new NetworkSpeed();

  useEffect(() => {
    setIPAddress("")
    setDownload()
    setGeoLocation({})
  }, []);

  

  const handleGeolocationData = () => {
    setLoading(true);
    axios.get(`https://ipapi.co/json/`).then((response) => {
      setGeoLocation(response.data);
       setLoading(false);
    });
  };

  

  const handleIPAddress = () => {
    setLoading(true);
    IP.v4().then((res) => {
      setIPAddress(res);
      setLoading(false);
    });
  };

  // {1}
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     getNetworkDownloadSpeed();
  //   }, 10);
  //   return () => clearTimeout(timer);
  // }, []);

  // async function getNetworkDownloadSpeed() {
  //   setLoading(true);
  //   const baseUrl = "https://eu.httpbin.org/stream-bytes/500000";
  //   const fileSizeInBytes = 3000000;
  //   const speed = await testNetworkSpeed.checkDownloadSpeed(
  //     baseUrl,
  //     fileSizeInBytes,
  //   );
  //   setDownload(speed?.mbps);
  //   setLoading(false);

  // }
 

  return (
    <Box ref={ref}>
      <Box sx={{ padding: "16px" }}>
        <Box
          sx={{
            display: "flex",
            border: "2px solid #624BD8",
            borderRadius: "8px",
            margin: "0 auto",
            padding: "16px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "auto",
              gap: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "auto",
                gap: "10px",
              }}
            >
              {Name === "check-ip-address" && (
                <>
                  {/* check-ip-address */}
                  {iPAddress && (
                    <Typography variant="body2" component="h2">
                      This is your IP: <b>{iPAddress}</b>
                    </Typography>
                  )}
                  <div className="button lowercase-center-alignment">
                  <button
                    onClick={handleIPAddress}
                  >
                    What is my IP?
                    {loading && <Loader />}
                  </button>
                  </div>
                </>
              )}

              {Name === "find-ip-location" && (
                <>
                  {Object.keys(geoLocation).length > 0 && (
                    <>
                      <Typography variant="body2" component="h2">
                        This is your Location
                      </Typography>
                      <Typography variant="body2" component="h2">
                        Location:{" "}
                        <b>
                          {geoLocation?.city},{geoLocation?.region},
                          {geoLocation.country_name}
                        </b>
                      </Typography>
                      <Typography variant="body2" component="h2">
                        Latitude: <b>{geoLocation?.latitude}</b>
                      </Typography>
                      <Typography variant="body2" component="h2">
                        Longitude: <b>{geoLocation?.longitude}</b>
                      </Typography>
                      <Typography variant="body2" component="h2">
                        Timezone: <b>{geoLocation?.timezone}</b>
                      </Typography>
                    </>
                  )}
                  <div className="button lowercase-center-alignment">
                  <button
                    // color="info"
                    // variant="outlined"
                    onClick={handleGeolocationData}
                  >
                    What is my Location?
                    {loading && <Loader />}
                  </button>
                  </div>
                </>
              )}

              {/* {Internet speed checker} */}
              {/* {Name === "check-internet-speed-test" && (
                <>
                  <Typography variant="body2" component="h2">
                    This is your Internet Down Speed :
                  </Typography>
                  {download} <p>Mbps</p>
                  <Typography variant="body2" component="h2">
                    This is your Upload Speed :
                  </Typography>
                  {(Number(download) - 16.59).toFixed(2)} <p>Mbps</p>
                  <div className="button lowercase-center-alignment">
                  <button
                    // color="info"
                    // variant="outlined"
                    onClick={getNetworkDownloadSpeed}
                  >
                    Check Internet Speed
                    {loading && <Loader />}
                  </button>
                  </div>
                </>
              )} */}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProxyFormat;

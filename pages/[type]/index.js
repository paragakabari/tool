import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { images } from "../../components/common/CommonArray/FileArray";
import DropDown from "../../components/common/DropDown";
import DropZoneFileImage from "../../components/common/ImagesComponent";

import BinaryText from "../../components/routes/home/BinaryTextFormat";
import CountryToolFormat from "../../components/routes/home/countryToolFormat";
import CryptoFormat from "../../components/routes/home/cryptoFormat";
import CurrencyFormat from "../../components/routes/home/currencyFormat";
import DevFormat from "../../components/routes/home/developmentFormat";
import ImgEditorFormat from "../../components/routes/home/imageEditorFormat";
import NumberToolFormat from "../../components/routes/home/numberToolFormat";
import OtherFormat from "../../components/routes/home/otherFormat";
import ProxyFormat from "../../components/routes/home/proxyFormat";
import SocialMediaFormat from "../../components/routes/home/socialMediaToolFormat";
import TextArea from "../../components/routes/home/TextToolImport";
import TimeConvertFormat from "../../components/routes/home/timeConvertForm/newTimeConvertFormat";
import SubLayout from "../../components/subLayout";
import styles from "./pdfToCsv.module.scss";

import { useAtom } from "jotai";
import { QRCodeCanvas } from "qrcode.react";
import FirstAddBox from "../../components/common/firstAddBox";
import SecondAddBox from "../../components/common/secondAddBox";
import CalculatorToolsData from "../../components/routes/home/calculatorToolFormat";
import CoderToolsFormat from "../../components/routes/home/CoderToolsFormat";
import FestivalPost from "../../components/routes/home/festivalpostFormat";
import LanguageConvertorFormat from "../../components/routes/home/LanguageConvertor/LanguageConvertorFormate";
import PPTFormat from "../../components/routes/home/pptFormat";
import VideoDownload from "../../components/routes/home/VideoDownloaderFormat";
import { userLogin } from "../../src/jotaiContext/common";

export default function VideoPage() {
  const isUserPro = localStorage.getItem("isPro");
  const [adBox, setAdBox] = useState(true);
  const [userLoggedin, setUserLoggedIn] = useAtom(userLogin);
  const handleIsPro = () => {
    setAdBox(false);
  };

  useEffect(() => {
    if (isUserPro) {
      handleIsPro();
    }
  }, [userLoggedin]);

  const location = useRouter();
  const router = useRouter();
  const Name = location.query.type;
 
  function hasSimilarTools(type){
      if(type=="AI"){
          return <p></p>
      }
      if(type=="currencyconvert"){
         return <p></p>
      }
      if(type=="countrytool"){
        return <p></p>
      }
      if(type=="language"){
        return <p></p>
      }
      if(Data?.type=="yml"){
        return <p></p>
      }
      if(Data?.type=="tsv"){
        return <p></p>
      }
      return <p>Similar Tools</p>
  }
  const Data = images?.find((item) => item.navigate == `/${Name}`);

  return (
    <SubLayout Data={Data}>
      <div className="children-box-alignment">
        <div className="childrenBoxDetailsSticky">
          {/* <div
            className="globally-file-title-and-sub-title"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              columnGap: "30px",
            }}
          >
            <h3>{Data?.Name.toUpperCase()}</h3>
            <QRCodeCanvas
              id="qrCode"
              value={`https://convertor.tools/${Name}`}
              size={50}
            />
            <p>Scan QR code to open this tool on your phone </p>
          </div> */}

          {adBox && (
            <div>
              <FirstAddBox />
            </div>
          )}
        </div>
        {(Data?.maintype == "doc" ||
          Data?.maintype == "image" ||
          Data?.maintype == "video" ||
          Data?.maintype == "mp3" ||
          Data?.maintype == "file") && <DropZoneFileImage Data={Data} />}
        {Data?.maintype == "ppt" && <PPTFormat Data={Data} />}
        {Data?.maintype == "imageeditor" && <ImgEditorFormat Data={Data} />}
        {Data?.maintype == "calculator" && <CalculatorToolsData Data={Data} />}
        {Data?.maintype == "binary" && <BinaryText Data={Data} />}
        {Data?.maintype == "proxy" && <ProxyFormat Data={Data} />}
        {Data?.maintype == "texttools" && <TextArea Data={Data} />}
        {Data?.maintype == "onlinenumber" && <NumberToolFormat Data={Data} />}
        {Data?.maintype == "unit" && <DropDown Data={Data} />}
        {Data?.maintype == "development" && <DevFormat Data={Data} />}
        {Data?.maintype == "otherTools" && <OtherFormat Data={Data} />}
        {Data?.maintype == "timeConvertor" && <TimeConvertFormat Data={Data} />}
        {Data?.maintype == "currencyconvert" && <CurrencyFormat Data={Data} />}
        {Data?.maintype == "countrytool" && <CountryToolFormat Data={Data} />}
        {Data?.maintype == "socialmedia" && <SocialMediaFormat Data={Data} />}
        {Data?.maintype == "cryptotools" && <CryptoFormat Data={Data} />}
     
        {Data?.maintype == "festivalpost" && <FestivalPost Data={Data} />}
        {Data?.maintype == "language" && (
          <LanguageConvertorFormat Data={Data} />
        )}
        {Data?.maintype == "videodownloader" && <VideoDownload Data={Data} />}
        {Data?.maintype == "codertools" && <CoderToolsFormat Data={Data} />}

        {adBox && (
          <div>
            <SecondAddBox />
          </div>
        )}
        <div className={styles.similarPdFBoxContentAlignment}>
          <div className={styles.title}>
         {hasSimilarTools(Data?.maintype)}
          </div>

          <div className={styles.grid}>
            {images
              .filter(
                (item) => item.type == Data?.type && item.navigate != `/${Name}`
              )
              // .slice(0, 7 - 1)
              .map((item ,index) => {
                return (

                  <div className={styles.gridItems} key={index}>
                    <div className={styles.subGrid}>
                      <div className={styles.subGridItems}>
                        {Data.maintype == "language" && (
                          <div className={styles.iconBox}>
                            <i className="fa fa-language"></i>
                          </div>
                        )}
                        {Data.maintype == "proxy" && (
                          <div className={styles.iconBox}>
                            <i className="fa fa-server"></i>
                          </div>
                        )}
                        {/* {Data.maintype == "calculator" && (
                          <div className={styles.iconBox}>
                            <i className="fa fa-calculator"></i>
                          </div>
                        )} */}

                        {Data.maintype == "texttools" && (
                          <div className={styles.iconBox}>
                            <i className="fa-solid fa-font"></i>
                          </div>
                        )}

                        {Data.maintype == "onlinenumber" && (
                          <div className={styles.iconBox}>
                            <i className="fa-solid fa-1"></i>
                          </div>
                        )}

                        {Data.maintype == "unit" && (
                          <div className={styles.iconBox}>
                            <i className="fa-brands fa-unity"></i>
                          </div>
                        )}

                        {Data.maintype == "development" && (
                          <div className={styles.iconBox}>
                            <i className="fa-brands fa-dev"></i>
                          </div>
                        )}

                        {Data.maintype == "binary" && (
                          <div className={styles.iconBox}>
                            <i className="fa-solid fa-file"></i>
                          </div>
                        )}

                        {Data.maintype == "calculator" && (
                          <div className={styles.iconBox}>
                            <i className="fa-solid fa-calculator"></i>
                          </div>
                        )}

                        {Data.maintype == "otherTools" && (
                          <div className={styles.iconBox}>
                            <i className="far fa-address-card"></i>
                          </div>
                        )}

                        {Data.maintype == "imageeditor" && (
                          <div className={styles.iconBox}>
                            <i className="fa-solid fa-pen-to-square"></i>
                          </div>
                        )}

                        {Data.maintype == "timeConvertor" && (
                          <div className={styles.iconBox}>
                            <i className="fa-solid fa-clock"></i>
                          </div>
                        )}

                        {Data.maintype == "currencyconvert" && (
                          <div className={styles.iconBox}>
                            <i className="fa-solid fa-pen-to-square"></i>
                          </div>
                        )}

                        {Data.maintype == "countrytool" && (
                          <div className={styles.iconBox}>
                            <i className="fa-solid fa-pen-to-square"></i>
                          </div>
                        )}

                        {Data.maintype == "socialmedia" && (
                          <div className={styles.iconBox}>
                            <i className="far fa-envelope"></i>
                          </div>
                        )}

                        {Data.maintype == "cryptotools" && (
                          <div className={styles.iconBox}>
                            <i className="fa-brands fa-bitcoin"></i>
                          </div>
                        )}

                        {Data.maintype == "videodownloader" && (
                          <div className={styles.iconBox}>
                              <i className="fa fa-download" aria-hidden="true"></i>
                          </div>
                        )}

                        {Data.maintype == "AI" && (
                          <div className={styles.iconBox}>
                            <i className="fa-solid fa-paragraph"></i>
                          </div>
                        )}
                        {Data.maintype == "codertools" && (
                          <div className={styles.iconBox}>
                              <i className="fa fa-file-code-o"></i>
                          </div>
                        )}
                        {Data.maintype == "ppt" && (
                          <div className={styles.iconBox}>
                            <i class="fa-solid fa-file-powerpoint"></i>
                          </div>
                        )}
                        {Data.maintype == "festivalpost" && (
                          <div className={styles.iconBox}>
                            <i class="fa-solid fa-gift"></i>
                          </div>
                        )}

                        {(Data?.maintype == "doc" ||
                          Data?.maintype == "image" ||
                          Data?.maintype == "video" ||
                          Data?.maintype == "mp3" ||
                          Data?.maintype == "file") && (
                          <div className={styles.iconBox}>
                          { Data?.maintype == "doc" && <i className="fa-solid fa-file-pdf"></i>}
                          {  Data?.maintype == "mp3" && <i className="fa-solid fa-music"></i>}
                         {   Data?.maintype == "file" &&  <i className="fa-solid fa-folder"></i>}
                        {   Data?.maintype == "video" &&  <i className="fa-solid fa-video"></i>}
                         {    Data?.maintype == "image" && <i className="fa-solid fa-image"></i>}
                          </div>
                        )}
                      </div>
                      <div className={styles.subGridItems}>
                        <span
                          onClick={() =>
                            router.push({ pathname: item.navigate })
                          }
                        >
                          {item.Name}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </SubLayout>
  );
}

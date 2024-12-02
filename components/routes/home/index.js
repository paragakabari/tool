import { useRouter } from "next/router";
import React from "react";
import BinaryTools from "./BinaryConvertorTools";
import CalculatorTools from "./calculatorTools";
import CountryTool from "./countryTools";
import CryptoTools from "./cryptoTool";
import CurrencyConvert from "./currencyConvert";
import Development from "./developmentTools";
import NumbersTools from "./onlineNumbersTool";
import Other from "./otherTools";
import Proxy from "./proxyTools";
import SocialMediaTools from "./socialMediaTools";
import TextTools from "./TextTools";
import TimeConvertor from "./timeConvertor";
import UnitTools from "./UnitConverter";

import CoderTools from "./CoderTools";
import LanguageConvertor from "./LanguageConvertor";
import VideoDownload from "./VideoDownloader";
const TopImg = "/Assets/Images/topImg.png";

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      <div
        className="topArrowAlignment"
        style={{ scrollBehavior: "smooth" }}
        onClick={() => window.scrollTo(0, 0)}
      >
       
        <img src={TopImg} alt="Top" />
       
      </div>
    

      {/* <HeroBanner /> */}
      
    
     
     
    
    
      <TextTools />
      <NumbersTools />
      <CalculatorTools />
      <UnitTools />
      <BinaryTools />
      <Development />
      <CalculatorTools/>
      <Proxy />
      <Other />
      <TimeConvertor />
      <CurrencyConvert />
      <CountryTool />
      <SocialMediaTools />
      <CryptoTools />
      <LanguageConvertor />
      <VideoDownload />
      <CoderTools />
      {/* <FestivalPostHome /> */}
    </>
  );
}

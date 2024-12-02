import React, { useRef } from "react";
import { useRouter } from "next/router";
import MetaTagGenerator from "./metaTagGenerator";
import BarCodeGenerator from "./barcodeGenerator";
import PasswordGenerator from "./passwordGenerator";
import PasswordStrengthChecker from "./passwordStrengthChecker";
import QRCodeGenerator from "./qrCodeGenerator";
import LoremIpsumGenerator from "./loremIpsumGenerator";

import CreditCardNumberChecker from "./creditCardNumChecker";
import QrCodeDecoder from "./qrCodeDecoder";
import StandupTimer from "./standupTimer";
import TinnyTools from "./TinnyTools";
import MergePdf from "./MergePDF/pages/Merge";

import CountDownTimer from "./countDownTimer";
import Pomodoro from "./pomodoro/index";
import FaviconGenerator from "./FaviconGenerator";


function DevFormat() {
  const router = useRouter();
  const Name = router.query.type;
  const ref = useRef();
  return (
    <>
      <div ref={ref}>{/* <PdfToCsvDemo /> */}</div>
      <div className="">
        {/* Meta Tag Generator */}
        {Name === "meta-tag-generator" && (
          <>
            <MetaTagGenerator />
          </>
        )}

        {/* Password Generator */}
        {Name === "password-generator" && (
          <>
            <PasswordGenerator />
          </>
        )}
        {/* Password Strength Checker */}
        {Name === "password-strength-checker" && (
          <>
            <PasswordStrengthChecker />
          </>
        )}
        {/* QR Code Generator */}
        {Name === "qr-code-generator" && (
          <>
            <QRCodeGenerator />
          </>
        )}
        {/* QR Code Decoder */}
        {Name === "qr-code-decoder" && (
          <>
            <QrCodeDecoder />
          </>
        )}
        {/* Barcode Generator */}
        {Name === "barcode-generator" && (
          <>
            <BarCodeGenerator />
          </>
        )}
        {/* Lorem Ipsum Generator */}
        {Name === "lorem-ipsum-generator" && (
          <>
            <LoremIpsumGenerator />
          </>
        )}

        {/* Creditcard Number Checker */}
        {Name === "creditcard-number-checker" && (
          <>
            <CreditCardNumberChecker />
          </>
        )}
         {/* favicon Generator*/}
         {Name === "favicon-generator" && (
          <>
            <FaviconGenerator />
          </>
        )}
        
        {/* Standup timer */}
        {Name === "standup-timer" && (
          <>
            <StandupTimer />
          </>
        )}
         {/* Countdown Timer */}
         {Name === "countdown-timer" && (
          <>
            <CountDownTimer/>
          </>
        )}
         {/*tiny-url*/}
         {Name === "tiny-url" && (
          <>
            <TinnyTools />
          </>
        )}
          {/*Merge Pdf*/}
          {Name === "merge-pdf" && (
          <>
          <MergePdf/>
          </>
        )}
            {/*Pomodoro*/}
         {Name === "pomodoro" && (
          <>
          <Pomodoro/>
          </>
        )}
      </div>
    </>
  );
}

export default DevFormat;

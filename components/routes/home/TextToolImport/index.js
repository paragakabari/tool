import React from "react";
import { useRouter } from "next/router";
import CombineWord from "./CombineWord";
import ToUpperCase from "./LowerCase";
import ToLowerCase from "./UpperCase";
import WordCounter from "./WordCounter";
import TextReverce from "./TextReverce";
import Md5 from "./Md5";
import SplitText from "./SplitText";
import TruncateText from "./TruncateText";
import UrlDecode from "./UrlDecode";
import UrlEncode from "./UrlEncode";
import RemoveSpace from "./RemoveSpace";
import TextCompare from "./TextCompare";
import FancyFont from "./FancyFont";
import TextToSpeech from "./TextToSpeech";
import SpeechToText from "./SpeechToText";
import TextCaseInverter from "./TextCaseInverter";
import TextToPdf from "./TextToPdf";

function TextArea({ Data }) {
  const location = useRouter();
  const Name = location.query.type;
  

  return (
    <>
      {/* Combine */}
      {Name === "combine-the-word" && (
        <>
          <CombineWord />
        </>
      )}

      {/* Convert To Uppercase */}

      {Name === "lowercase-to-uppercase" && (
        <>
          <ToLowerCase />
        </>
      )}

      {/* Convert To Lowercase */}

      {Name === "uppercase-to-lowercase" && (
        <>
          <ToUpperCase />
        </>
      )}

      {/* word-counter */}

      {Name === "word-counter" && (
        <>
          <WordCounter />
        </>
      )}

      {/* md5-generator */}

      {Name === "md5-generator" && (
        <>
          <Md5 />
        </>
      )}

      {/* text-reverser */}

      {Name === "text-reverser" && (
        <>
          <TextReverce />
        </>
      )}

      {/* split-text */}
      {Name === "split-text" && (
        <>
          <SplitText />
        </>
      )}

      {/* truncate-text */}
      {Name === "truncate-text" && (
        <>
          <TruncateText />
        </>
      )}

      {/* url-encode */}
      {Name === "url-encode" && (
        <>
          <UrlEncode />
        </>
      )}

      {/* url-decode */}
      {Name === "url-decode" && (
        <>
          <UrlDecode />
        </>
      )}

      {/* remove-all-white-spaces */}
      {Name === "remove-all-white-spaces" && (
        <>
          <RemoveSpace />
        </>
      )}

      {/* text-compare */}
      {Name === "text-compare" && (
        <>
          <TextCompare />
        </>
      )}

      {/*fancy-font*/}
      {Name === "fancy-font" && (
        <>
          <FancyFont />
        </>
      )}

      {/* text to speech */}
      {Name === "text-to-speech" && (
        <>
          <TextToSpeech />
        </>
      )}

      {/* speech to text */}
      {Name === "speech-to-text" && (
        <>
          <SpeechToText />
        </>
      )}

      {Name === "text-case-inverter" && (
        <>
          <TextCaseInverter />
        </>
      )}
       {Name === "text-to-pdf" && (
        <>
          <TextToPdf />
        </>
      )}
    </>
  );
}

export default TextArea;

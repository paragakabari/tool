import React, { useRef } from "react";
import { useRouter } from "next/router";
import ImageCropper from "../imageEditorTools/imageCropper";
import ImageFilters from "../imageEditorTools/imageFilters";
import ImageResize from "../imageEditorTools/imageResize";
import ImageColorExtractor from "../imageEditorTools/imageColorExtractor";
import ImageWatermark from "../imageEditorTools/imageWatermark";
import GetYourColor from "../imageEditorTools/getYourColor";
import ImageCompressor from "../imageEditorTools/imageCompressor";
import ImageToBase from "../imageEditorTools/ImageToBase64";
import BaseToImage from "../imageEditorTools/Base64ToImage";
import TextToImg from "../imageEditorTools/TextToImage";
import MemeGen from "../imageEditorTools/MemeGenerator";
import ImageCombine from "../imageEditorTools/imageCombine";
import PptToPdf from "../pptTools";
import PptToPNG from "../pptTools/pptToPng";

function PPTFormat({ Data }) {
  const router = useRouter();
  const Name = router.query.type;
  const ref = useRef();

  return (
    <>
      <div ref={ref}>{/* <PdfToCsvDemo /> */}</div>
      <div className="">
        {/* Image Cropper */}
        {Name === "ppt-to-pdf" && (
          <>
            <PptToPdf />
          </>
        )}
          {Name === "ppt-to-png" && (
          <>
            <PptToPNG />
          </>
        )}
      </div>
    </>
  );
}

export default PPTFormat;

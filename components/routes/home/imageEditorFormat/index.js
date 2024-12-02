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

function ImgEditorFormat({ Data }) {
  const router = useRouter();
  const Name = router.query.type;
  const ref = useRef();

  return (
    <>
      <div ref={ref}>{/* <PdfToCsvDemo /> */}</div>
      <div className="">
        {/* Image Cropper */}
        {Name === "image-cropper" && (
          <>
            <ImageCropper />
          </>
        )}

        {/* Image Filters */}
        {Name === "image-filters" && (
          <>
            <ImageFilters />
          </>
        )}

        {/* Image Resize */}
        {Name === "image-resize" && (
          <>
            <ImageResize />
          </>
        )}

        {/* Image Compressor */}
        {Name === "image-compressor" && (
          <>
            <ImageCompressor />
          </>
        )}

        {/* Image Color Extractor */}
        {Name === "image-color-extractor" && (
          <>
            <ImageColorExtractor />
          </>
        )}

        {/* Image Watermark */}
        {Name === "image-watermark" && (
          <>
            <ImageWatermark />
          </>
        )}

        {/* get your color */}
        {Name === "get-your-color" && (
          <>
            <GetYourColor />
          </>
        )}

        {/* ImagetoBase*/}
        {Name === "image-to-base64-convertor" && (
          <>
            <ImageToBase />
          </>
        )}

        {/* BaseToImage */}
        {Name === "base64-to-image-convertor" && (
          <>
            <BaseToImage />
          </>
        )}

        {/* TextToImg */}
        {Name === "text-to-image-convertor" && (
          <>
            <TextToImg />
          </>
        )}

        {/* Meme Generator */}
        {Name === "meme-generator" && (
          <>
            <MemeGen />
          </>
        )}

        {/* Meme Generator */}
        {Name === "combine-image" && (
          <>
            <ImageCombine />
          </>
        )}
      </div>
    </>
  );
}

export default ImgEditorFormat;

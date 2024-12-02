import React, { useRef } from "react";
import { useRouter } from "next/router";
import ImageCropper from "../imageEditorTools/imageCropper";
import ImageFilters from "../imageEditorTools/imageFilters";
import ImageResize from "../imageEditorTools/imageResize";
import ImageColorExtractor from "../imageEditorTools/imageColorExtractor";
import ImageWatermark from "../imageEditorTools/imageWatermark";
import InstagramPostGenerator from "../socialMedia/instagramPostGenerator";
import YouTubeYThumbnail from "../socialMedia/youTubeThumbnail";
import FacebookPostGenerator from "../socialMedia/facebookPostGenerator";
import TweetPostGenerator from "../socialMedia/tweetPostGenerator";
import YoutubePostGenerator from "../socialMedia/youtubePostGenerator";
import TweetToImage from "../socialMedia/tweetToImage";

function SocialMediaFormat({ Data }) {
  const router = useRouter();
  const Name = router.query.type;
  const ref = useRef();

  return (
    <>
      <div ref={ref}>{/* <PdfToCsvDemo /> */}</div>
      <div className="">
        {/* Instagram post generator */}
        {Name === "instagram-post-generator" && (
          <>
            <InstagramPostGenerator />
          </>
        )}

        {/* Facebook Post Generator */}
        {Name === "facebook-post-generator" && (
          <>
            <FacebookPostGenerator />
          </>
        )}

        {/* Tweet Post Generator */}
        {Name === "tweet-post-generator" && (
          <>
            <TweetPostGenerator />
          </>
        )}

        {/* Tweet To Image */}
        {Name === "tweet-to-image" && (
          <>
            <TweetToImage />
          </>
        )}

        {/* Youtube Post Generator */}
        {Name === "youtube-post-generator" && (
          <>
            <YoutubePostGenerator />
          </>
        )}

        {/* Youtube thumbnail */}
        {Name === "youtube-thumbnail" && (
          <>
            <YouTubeYThumbnail />
          </>
        )}
      </div>
    </>
  );
}

export default SocialMediaFormat;

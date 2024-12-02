import React from 'react'
import { useRouter } from "next/router";
import { images } from '../../../common/CommonArray/FileArray';
import FbVideoDownload from './FbVideoDownloader';
import YtDownloader from './ytDownloader';
import TwitterDownloader from './twitterDonwloader';


function VideoImport({Data}) {
const location = useRouter();
const Name = location.query.type;

  return (
    <>
    {/* FbVideoDownload */}
    {Name === "fb-video-downloader" && (
      <>
        <FbVideoDownload/>
      </>
    )}

    {/*YtDownloader*/}
    {Name === "yt-downloader" && (
      <>
        <YtDownloader/>
      </>
    )}
     {/*TwitterDownloader*/}
     {Name === "twitter-video-downloader" && (
      <>
        <TwitterDownloader/>
      </>
    )}
    </>


  )
}

export default VideoImport


    
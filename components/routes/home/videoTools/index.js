import { useRouter } from "next/router";
import React, { useState } from "react";
import { images } from "../../../common/CommonArray/FileArray";
import MainLoader from "../../../MainLoader";
import styles from "./videoTools.module.scss";


export default function VideoTools() {
  const [mainloader, setMainloader] = useState(false);
  const router = useRouter();

  return (
    <>
     {mainloader &&
    <MainLoader/>}
    <div>
      <div className={styles.videoToolsAllContentAlignment} id="video-tools">
        <div className="container-md">
          <div className={styles.sectionTitle}>
            <h4>
              <span>#</span> VIDEO TOOLS
            </h4>
          </div>
          <div className={styles.grid}>
          {images
              .filter((item) => item.maintype == "video")
              .map((item,index) => (
                <div
                  className={styles.gridItems}
                  key={index}
                  onClick={() =>{
                    setMainloader(true)
                     router.push({ pathname: item.navigate })}}
                >
                  <div className={styles.subGrid}>
                    <div className={styles.subGridItems}>
                      <div className={styles.iconBox}>
                        <i className="fa-solid fa-video"></i>
                      </div>
                    </div>
                    <div className={styles.subGridItems}>
                      <span>{item.Name}</span>
                    </div>
                  </div>
                </div>
              ))}

          </div>
        </div>
      </div>
    </div>
    </>
  );
}

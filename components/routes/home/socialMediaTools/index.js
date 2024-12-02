import { useRouter } from "next/router";
import React, { useState } from "react";
import { images } from "../../../common/CommonArray/FileArray";
import styles from "./socialmediaTools.module.scss";
import MainLoader from "../../../MainLoader";

export default function SocialMediaTools() {
  const [mainloader, setMainloader] = useState(false);
  const router = useRouter();

  return (
    <div>
       {mainloader &&
      <MainLoader/>}
      <div className={styles.videoToolsAllContentAlignment} id="social-media-tools">
        <div className="container-md">
          <div className={styles.sectionTitle}>
            <h4>
              <span>#</span> SOCIAL MEDIA TOOLS
            </h4>
          </div>
          <div className={styles.grid}>
          {images
              .filter((item) => item.maintype == "socialmedia")
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
                      <i className="far fa-envelope"></i>
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
  );
}

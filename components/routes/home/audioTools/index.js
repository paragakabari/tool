import React, { useState } from "react";
import { images } from "../../../common/CommonArray/FileArray";
import styles from "./audioTools.module.scss";
import { useRouter } from "next/router";
import MainLoader from "../../../MainLoader";

export default function AudioTools() {
  const [mainloader, setMainloader] = useState(false);
  const router = useRouter();
  
  return (
    <>
     {mainloader &&
    <MainLoader/>}
    <div>
      <div className={styles.audioToolsAllContnetAlignment} id="audio-tools">
        <div className="container-md">
          <div className={styles.sectionTitle}>
            <h4>
              <span>#</span> AUDIO TOOLS
            </h4>
          </div>
          <div className={styles.grid}>
          {images
                  .filter((item) => item.maintype == "mp3")
                  .map((item , index) => (
                    <div className={styles.gridItems} key={index} onClick={() => router.push({ pathname: item.navigate })}>
                    <div className={styles.subGrid}>
                      <div className={styles.subGridItems}>
                        <div className={styles.iconBox}>
                          <i className="fa-solid fa-music"></i>
                        </div>
                      </div>
                      <div className={styles.subGridItems}>
                        <span >{item.Name}</span>
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

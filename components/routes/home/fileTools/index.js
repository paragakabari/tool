import React, { useState } from "react";
import { images } from "../../../common/CommonArray/FileArray";
import styles from "./fileTools.module.scss";
import { useRouter } from "next/router";
import MainLoader from "../../../MainLoader";


export default function FileTools() {
  const [mainloader, setMainloader] = useState(false);
  const router = useRouter();
  
  return (
  <>
    {mainloader &&
      <MainLoader/>}
    <div>
      <div className={styles.fileToolsContentAlignment} id="file-tools">
        <div className="container-md">
          <div className={styles.sectionTitle}>
            <h4>
              <span># </span> FILE TOOLS
            </h4>
          </div>
          <div className={styles.grid}>
            {images
              .filter((item) => item.maintype == "file")
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
                        <i className="fa-solid fa-file"></i>
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

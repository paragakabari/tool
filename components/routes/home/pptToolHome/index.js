import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { images } from "../../../common/CommonArray/FileArray";
import MainLoader from "../../../MainLoader";
import styles from "./pptTools.module.scss";

export default function PptTools() {
  const [mainloader, setMainloader] = useState(false);
  const router = useRouter();

  return (
    <>
      {mainloader &&
    <MainLoader/>
    }
      <div className={styles.pptToolsAllContentAlignment} id="ppt-tools">
        <div className="container-md">
          <div className={styles.sectionTitle}>
            <h3>
              <span>#</span>PPT TOOLS
            </h3>
          </div>
          <div className={styles.grid}>
            {images
              .filter((item) => item.maintype == "ppt")
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
                        <i class="fa-solid fa-file-powerpoint"></i>
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
    </>
  );
}

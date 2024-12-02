import Link from "next/link";
import React, { useState } from "react";
import { images } from "../../../common/CommonArray/FileArray";
import styles from "./imageTools.module.scss";
import { useRouter } from "next/router";
import MainLoader from "../../../MainLoader";

export default function ImageTools() {
  const [mainloader, setMainloader] = useState(false);
  const router = useRouter();
  

  return (
    <>
      {mainloader &&
    <MainLoader/>
    }
    <div>
      <div className={styles.imagesToolsAllContnetAlignment} id="image-tools">
        <div className="container-md">
          <div className={styles.sectionTitle}>
            <h4>
              <span>#</span> IMAGE TOOLS
            </h4>
          </div>
          <div className={styles.grid}>
          {images
              .filter((item) => item.maintype == "image")
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
                        <i className="fa-solid fa-image"></i>
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

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { images } from "../../../common/CommonArray/FileArray";
import styles from "./codertools.module.scss";
import MainLoader from "../../../MainLoader";

export default function CoderTools() {
  const [mainloader, setMainloader] = useState(false);
  const router = useRouter();

  return (
    <>
     {mainloader &&
      <MainLoader/>}
      <div className={styles.pdfToolsAllContentAlignment} id="coder-tools">
        <div className="container-md">
          <div className={styles.sectionTitle}>
            <h3>
              <span>#</span>CODER TOOLS{" "}
            </h3>
          </div>
          <div className={styles.grid}>
          {images
              .filter((item) => item.maintype == "codertools")
              .map((item ,index) => (
                <div
                key={index}
                  className={styles.gridItems}
                  onClick={() =>{
                    setMainloader(true)
                     router.push({ pathname: item.navigate })}}
                >
                  <div className={styles.subGrid}>
                    <div className={styles.subGridItems}>
                      <div className={styles.iconBox}>
                      <i className="fa fa-file-code-o"></i>
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

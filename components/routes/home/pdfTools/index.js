import { useRouter } from "next/router";
import React, { useState } from "react";
import { images } from "../../../common/CommonArray/FileArray";
import MainLoader from "../../../MainLoader";
import styles from "./pdfTools.module.scss";

export default function PdfTools() {
  const router = useRouter();
  const [mainloader, setMainloader] = useState(false);

  return (
    <>
     {mainloader &&
    <MainLoader/>
    }
      <div className={styles.pdfToolsAllContentAlignment} id="pdf/doc">
        <div className="container-md">
          <div className={styles.sectionTitle}>
            <h3>
              <span>#</span>PDF/DOC{" "}
            </h3>
          </div>
          <div className={styles.grid}>
            {images
              .filter((item) => item.maintype == "doc")
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
                        <i className="fa-solid fa-file-pdf"></i>
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

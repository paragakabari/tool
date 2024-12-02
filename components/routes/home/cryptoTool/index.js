import { useRouter } from "next/router";
import React, { useState } from "react";
import { images } from "../../../common/CommonArray/FileArray";
import styles from "./cryptoTools.module.scss";
import MainLoader from "../../../MainLoader";
export default function CryptoTools() {
  const [mainloader, setMainloader] = useState(false);
  const router = useRouter();

  return (
    <div>
       {mainloader &&
      <MainLoader/>}
      <div className={styles.videoToolsAllContentAlignment} id="crypto-tools">
        <div className="container-md">
          <div className={styles.sectionTitle}>
            <h4>
              <span>#</span> CRYPTO TOOLS
            </h4>
          </div>
          <div className={styles.grid}>
            {images
              .filter((item) => item.maintype == "cryptotools")
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
                        <i className="fa-brands fa-bitcoin"></i>
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

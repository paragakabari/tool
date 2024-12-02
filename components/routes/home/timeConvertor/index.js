import axios from "axios";
import React, { useState } from "react";
import { images } from "../../../common/CommonArray/FileArray";
import styles from "./timeConvertor.module.scss";
import { useRouter } from "next/router";
import MainLoader from "../../../MainLoader";

function TimeConvertor() {
  const [mainloader, setMainloader] = useState(false);
  const router = useRouter();

  return (
    <>
    {mainloader &&
      <MainLoader/>}
      <div className={styles.pdfToolsAllContentAlignment} id="time-convert">
        <div className="container-md">
          <div className={styles.sectionTitle}>
            <h3>
              <span>#</span>TIME CONVERTOR TOOLS
            </h3>
          </div>
          <div className={styles.grid}>
            {images
              .filter((item) => item.maintype == "timeConvertor")
              .map((item, index) => (
                <div
                  className={styles.gridItems}
                  // onClick={() => router.push({ pathname: item.navigate, query: { name: item.type } }, item.navigate)}
                  onClick={() =>{
                    setMainloader(true)
                     router.push({ pathname: item.navigate })}}
                  key={index}
                >
                  <div className={styles.subGrid}>
                    <div className={styles.subGridItems}>
                      <div className={styles.iconBox}>
                        <i className="fa-solid fa-clock"></i>
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

export default TimeConvertor;

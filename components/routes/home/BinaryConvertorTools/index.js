import { useRouter } from "next/router";
import React, { useState } from "react";
import { images } from "../../../common/CommonArray/FileArray";
import styles from "./binarytools.module.scss";
import MainLoader from "../../../MainLoader";

export default function BinaryTools() {
  const [mainloader, setMainloader] = useState(false);
  const router = useRouter();

  return (
    <>
     {mainloader &&
      <MainLoader/>}
      <div className={styles.pdfToolsAllContentAlignment} id="binary-tools">
        <div className="container-md">
          <div className={styles.sectionTitle}>
            <h3>
              <span>#</span>BINARY CONVERTOR TOOLS{" "}
            </h3>
          </div>
          <div className={styles.grid}>
            {images
              .filter((item) => item.maintype == "binary")
              .map((item ,index) => (
                <div
                key={index}
                  className={styles.gridItems}
                  // onClick={() =>
                  //   router.push(
                  //     { pathname: item.navigate, query: { name: item.type } },
                  //     item.navigate
                  //   )
                  // }
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
    </>
  );
}

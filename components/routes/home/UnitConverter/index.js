import { useRouter } from "next/router";
import React, { useState } from "react";
import { images } from "../../../common/CommonArray/FileArray";
import styles from "./unit.module.scss";
import MainLoader from "../../../MainLoader";

export default function UnitTools() {
  const [mainloader, setMainloader] = useState(false);
  const router = useRouter();

  return (
    <>
     {mainloader &&
      <MainLoader/>}
      <div className={styles.pdfToolsAllContentAlignment} id="unit-tools" >
        <div className="container-md" >
          <div className={styles.sectionTitle}>
            <h3>
              <span>#</span>UNIT CONVERTOR TOOLS{" "}
            </h3>
          </div>
          <div className={styles.grid}>
          {images
              .filter((item) => item.maintype == "unit")
              .map((item,index) => (
                <div
                  className={styles.gridItems}
                  key={index}
                  // onClick={() => router.push({ pathname: item.navigate , query: { name: item.type } }, item.navigate )}
                  onClick={() =>{
                    setMainloader(true)
                     router.push({ pathname: item.navigate })}}
                >
                  <div className={styles.subGrid}>
                    <div className={styles.subGridItems}>
                      <div className={styles.iconBox}>
                        <i className="fa-brands fa-unity"></i>
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
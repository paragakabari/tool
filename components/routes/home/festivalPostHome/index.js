import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { images } from "../../../common/CommonArray/FileArray";
import styles from "./festival.module.scss";

export default function FestivalPostHome() {
  const router = useRouter();

  return (
    <>
      <div className={styles.pdfToolsAllContentAlignment} id="festivalpost">
        <div className="container-md">
          <div className={styles.sectionTitle}>
            <h3>
              <span>#</span>FESTIVAL POST
            </h3>
          </div>
          <div className={styles.grid}>
            {images
              .filter((item) => item.maintype == "festivalpost")
              .map((item,index) => (
                <div
                  className={styles.gridItems}
                  key={index}
                  onClick={() => router.push({ pathname: item.navigate })}
                >
                  <div className={styles.subGrid}>
                    <div className={styles.subGridItems}>
                      <div className={styles.iconBox}>
                        <i class="fa-solid fa-gift"></i>
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

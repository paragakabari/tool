import React from "react";
import styles from "./footer.module.scss";
import Logo from "../../../src/Images/convertor-logo.png";
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();
  return (
    <div>
      <div className={styles.footerContentAlignment}>
        <div className="">
          <div className={styles.footerAlignment}>
            <div className={styles.leftContent}>
              <div className={styles.logo} onClick={() => router.push("/")}>
                <h1>
                  AiGallery
                </h1>
                {/* <img src={Logo.src} alt="Tiny Tools" /> */}
              </div>
              <a
                style={{ cursor: "pointer" }}
                className={styles.btn_policy}
                onClick={() => router.push("/privacy-policy")}
              >
                Privacy Policy
              </a>
              <a
                style={{ cursor: "pointer" }}
                className={styles.btn_policy}
                onClick={() => router.push("/terms-condition")}
              >
                terms And Conditions
              </a>
              {/* <a
                className={styles.btn_policy}
                onClick={() => router.push("/sitemap.xml")}
              >
                Sitemap
              </a> */}
            </div>
            <div
              style={{ cursor: "context-menu" }}
              className={styles.rightContent}
            >
              <span>© Copyright 2022 - All Rights Reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Sidebar from "../common/sidebar";
import styles from "./subLayout.module.scss";
import Header from "../auth/header";
import { images } from "../common/CommonArray/FileArray";
export default function SubLayout(props, { Data }) {
  const { children } = props;

  return (
    <>
      <Header Data = {images} />
      <div className={styles.sublayoutGrid}>
        <div className={styles.sublayoutGridItems}>
          <Sidebar />
        </div>
        <div className={styles.sublayoutGridItems}>
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}

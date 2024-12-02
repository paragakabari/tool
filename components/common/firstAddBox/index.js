import React from "react";
import styles from "./firstAddBox.module.scss";
const FirstAddImg = "/Assets/Images/add1img.png";
export default function FirstAddBox() {
  return (
    <div className={styles.firstAddBoxSection}>
      <div className={styles.firstAddBoxAlignment}>
        {/* <img src={FirstAddImg} alt="Advertisement"/> */}
      </div>
    </div>
  );
}

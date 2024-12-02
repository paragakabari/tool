import React from 'react';
import styles from "./Loader.module.scss";

function Loader() {
  return (
    <div className={styles.loaderWrapper}>
        <div className={styles.loaderBox}>Loader...</div>
    </div>
  )
}

export default Loader;
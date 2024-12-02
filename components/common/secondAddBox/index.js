import React from "react";
import styles from "./secondAddBox.module.scss";
const FirstAddImg = "/Assets/Images/add1img.png";
export default function SecondAddBox() {
  return (
    <div className={styles.secondAddBoxAlignment}>
      <div className={styles.secondImgAlignment}>
        {/* <img src={FirstAddImg} alt="Advertisement" /> */}

        <script
          id="Adsense-id"
          async
          onError={(e) => {
            console.error("Script failed to load", e);
          }}
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5504931430899051"
          crossOrigin="anonymous"
        />

        {/* <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5504931430899051"
          crossOrigin="anonymous"
        ></script> */}

        {/* <!-- Box --> */}
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-5504931430899051"
          data-ad-slot="1018051742"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      </div>

      <div className={styles.secondImgAlignment}>
        {/* <img src={FirstAddImg} alt="Advertisement" /> */}
        <script
          id="Adsense-id"
          async
          onError={(e) => {
            console.error("Script failed to load", e);
          }}
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5504931430899051"
          crossOrigin="anonymous"
        />
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-5504931430899051"
          data-ad-slot="1018051742"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      </div>
    </div>
  );
}

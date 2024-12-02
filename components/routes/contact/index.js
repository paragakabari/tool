import React from "react";
import styles from "./contact.module.scss";
const MailImage = "/Assets/Images/mail.png";
export default function Contact() {
  return (
    <div>
      <div className="container-md">
        <div className={styles.contactAllSectionContentAlignment}>
          <div className={styles.imageCenteralignment}>
            <img src={MailImage} alt="MailImage" />
          </div>
          <div className={styles.textRepeatText}>
            <h2>Contact</h2>
            <p>
              You can contact via email for your issues related with Convertor
              Tolls. You can give feedback about current tools or suggest new
              tools that you want to see on Convertor Tolls.
            </p>
            <a href="mailto: convertortools@gmail.com">
              Email : convertortools@gmail.com
            </a>
            <div className="button">
              <button>Contact Us</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

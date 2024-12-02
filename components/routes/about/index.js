import Link from "next/link";
import React from "react";
import styles from "./about.module.scss";
export default function About() {
  return (
    <>
      <div className="container-md">
        <div className={styles.aboutAllContentAlignment}>
          <div className={styles.textRepeatText}>
            <h2>What?</h2>
            <p>
              Convertor tools is an online tool factory where you can get all
              tools you needed in one place. While serving different type of
              tools in different categories, it aims to perform this with a
              clean and beautiful user interface. Every tool is designed to
              solve a problem with minimum number of steps to save time of the
              users and decrease the complexity of the operation.
            </p>
            <p>
              Convertor tools has started to operate in 2020 and it will
              continue to grow with time by adding new tools each day.
            </p>
          </div>
          <div className={styles.textRepeatText}>
            <h2>Why?</h2>
            <p>
              There are lots of sites on web which offers you online tools. Most
              of them focus on specific topics and they mostly have outdated
              designs which makes you think "Am I in 90's?". When you start to
              bookmark the tools you needed, the list becomes larger and larger
              in some point.
            </p>
            <p>
              10015 Tools solves all these problems. So, bookmark it and forget
              about all other tool sites.
            </p>
          </div>
          <div className={styles.textRepeatText}>
            <h2>Who?</h2>
            <p>
              Convertor tools is designed and coded by Fatih Telis (me) as a
              side project. I am a frontend developer based in Istanbul, Turkey.
              I started this project to build a platform which will work as an
              all-in-one toolbox while I'm challenging myself to create tools
              which does many different things. Even though I'm not a
              professional designer, I'm doing my best to construct a simple,
              aesthetic and easy-to-use UI system. You can contact me via email
              or Twitter about anything.
            </p>
            <div className="button">
              <Link href="/contact">
                <button>Contact me</button>
              </Link>
            </div>
          </div>
          <div className={styles.textRepeatText}></div>
        </div>
      </div>
    </>
  );
}

import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styles from "./heroBanner.module.scss";
const HeroBannerImage = "/Assets/Images/hero-banner.svg";
const PdfIcon = "/Assets/Images/pdf.svg";
const RightArrowAlignment = "/Assets/Images/right-white-arrow.svg";

export default function HeroBanner() {
  const router = useRouter();
  return (
    <div className={styles.homeHeroBanner} id="homepage">
      <div className="container">
        <div className={styles.homeHeroBannerAlignment}>
          <div className={styles.homeHeroBannerHeading}>
            <h1>
              <span style={{ color: "#1566cc" }}>Convertor.tools: </span>
              The ultimate conversion toolkit
            </h1>
          </div>
          <div className={styles.bannerGridAlignment}>
            <div className={styles.bannerGridItemAlignment}>
              <div
                className={classNames(
                  styles.bannerBoxAlignment,
                  styles.imageTools
                )}
                onClick={() => router.push("/standup-timer")}
              >
                <div className={styles.headingAlignment}>
                  <div
                    className={classNames(styles.iconBox, styles.imgeasIcon)}
                  >
                    <i
                      style={{ color: "white" }}
                      className="fa-solid fa-stopwatch-20"
                    ></i>
                  </div>
                  <div>
                    <p>Standup Timer</p>
                    <span>Manage Your Meetings Easy </span>
                  </div>
                </div>
                {/* <div className={styles.bodyPartAlignment}>
                  <div
                    className={classNames(styles.toolsTag, styles.imgeasTag)}
                  >
                    <span>45+ tools</span>
                  </div>
                </div> */}
              </div>
              <div className={styles.footerAlignment}>
                <div className={styles.toolsDetailsAlignment}>
                  <span>More Tool :</span>
                  <a href="#development-tools">DEVELOPMENT TOOLS</a>
                </div>
              </div>
            </div>
            <div className={styles.bannerGridItemAlignment}>
              <div
                className={classNames(
                  styles.bannerBoxAlignment,
                  styles.videoTools
                )}
                onClick={() =>
                  router.push("/saas-product-calculator")
                }
              >
                <div className={styles.headingAlignment}>
                  <div className={classNames(styles.iconBox, styles.videoIcon)}>
                    <i
                      style={{ color: "white" }}
                      className="fa-solid fa-calculator"
                    ></i>
                    {/* <img src={PdfIcon} alt="PdfIcon" /> */}
                  </div>
                  <div>
                    <p>Sass Calculator</p>
                    <span>Solve Your Calculation Problems</span>
                  </div>
                </div>
                {/* <div className={styles.bodyPartAlignment}>
                  <div className={classNames(styles.toolsTag, styles.videoTag)}>
                    <span>45+ tools</span>
                  </div>
                </div> */}
              </div>
              <div className={styles.footerAlignment}>
                <div className={styles.toolsDetailsAlignment}>
                  <span>More Tool :</span>
                  <a href="#calculator-tools">CALCULATOR TOOLS</a>
                </div>
              </div>
            </div>
            <div className={styles.bannerGridItemAlignment}>
              <div
                className={classNames(
                  styles.bannerBoxAlignment,
                  styles.allWrite
                )}
                onClick={() => router.push("/tweet-to-image")}
              >
                <div className={styles.headingAlignment}>
                  <div
                    className={classNames(styles.iconBox, styles.allWeiteIcon)}
                  >
                    <i
                      style={{ color: "white" }}
                      className="fa-brands fa-twitter"
                    ></i>
                    {/* <img src={PdfIcon} alt="PdfIcon" /> */}
                  </div>
                  <div>
                    <p>Tweet To Image</p>
                    <span>Capture Image From Tweeter</span>
                  </div>
                </div>
                {/* <div className={styles.bodyPartAlignment}>
                  <div
                    className={classNames(styles.toolsTag, styles.allWeiteTag)}
                  >
                    <span>45+ tools</span>
                  </div>
                </div> */}
              </div>
              <div className={styles.footerAlignment}>
                <div className={styles.toolsDetailsAlignment}>
                  <span>More Tool :</span>
                  <a href="#social-media-tools">SOCIAL MEDIA TOOLS</a>
                </div>
              </div>
            </div>

            <div className={styles.bannerGridItemAlignment}>
              <div
                className={styles.bannerBoxAlignment}
                onClick={() => router.push("/timesheet-calculator")}
              >
                <div className={styles.headingAlignment}>
                  <div className={styles.subGridItems}>
                    <div className={styles.iconBox}>
                      <i
                        style={{ color: "white" }}
                        className="fa-solid fa-clock"
                      ></i>
                    </div>
                  </div>
                  <div>
                    <p>Timesheet Calculator</p>
                    <span>Generates Weekly Work Reports </span>
                  </div>
                </div>
                {/* <div className={styles.bodyPartAlignment}>
                  <div className={styles.toolsTag}>
                    <span>45+ tools</span>
                  </div>
                </div> */}
              </div>
              <div className={styles.footerAlignment}>
                <div className={styles.toolsDetailsAlignment}>
                  <span>More Tool :</span>
                  <a href="#calculator-tools">CALCULATOR TOOLS</a>
                </div>
              </div>
            </div>
            {/* <div className={styles.bannerGridItemAlignment}>
              <div className={classNames(styles.bannerBoxAlignment, styles.fileTools)}>
                <div className={styles.headingAlignment}>
                  <div className={classNames(styles.iconBox, styles.fileToolsIcon)}>
                    <img src={PdfIcon} alt="PdfIcon" />
                  </div>
                  <div>
                    <p>File Tools</p>
                    <span>Solve Your File Problems</span>
                  </div>

                </div>
                <div className={styles.bodyPartAlignment}>

                  <div className={classNames(styles.toolsTag, styles.fileToolsTag)}>
                    <span>45+ tools</span>
                  </div>
                </div>
              </div>
              <div className={styles.footerAlignment}>
                <div className={styles.toolsDetailsAlignment}>
                  <span>Featured Tool :</span>
                  <a>Split Excel</a>
                </div>
              </div>
            </div> */}
          </div>

          <div className={styles.userAlignment}>
            <div className={styles.userAlignmentFlex}>
              <div className={styles.userDetailsAlignment}>
                <h1>25K</h1>
                <span>Active User</span>
              </div>

              {/* <div className={styles.userDetailsAlignment}>
                <h1>10m</h1>
                <span>Files</span>
              </div> */}

              <div className={styles.userDetailsAlignment}>
                <h1>500+ </h1>
                <span>Online Tools</span>
              </div>
              <div className={styles.userDetailsAlignment}>
                <h1>367k</h1>
                <span>Conversions</span>
              </div>
            </div>
          </div>
        </div>

        {/* <div className={styles.grid}>
          <div className={styles.gridItems}>
            <span>OUR TOOLS</span>
            <h1>Too ls That Solve Your Files Problem</h1>
            <p>
              Convertor tools is a “free all-in-one toolbox” solution created to ease
              your life by preventing bookmark mess.
            </p>
            <div className="button">
              <Link href="/pdf-to-jpg">
                <button>Explore Tools</button>
              </Link>
            </div>
          </div>
          <div className={styles.gridItems}>
            <div className={styles.heroBannerImage}>
              <img src={HeroBannerImage} alt="HeroBannerImage" />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

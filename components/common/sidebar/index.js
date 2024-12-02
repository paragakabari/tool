import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { images } from "../CommonArray/FileArray";
import { setCurrentPage } from "./redux/reducer";
import styles from "./sidebar.module.scss";

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [subMenuOpen, setSubMenuOpen] = useState({
    pdfdoc: false,
    ppttools: false,
    image: false,
    imageeditor: false,
    video: false,
    audio: false,
    file: false,
    text: false,
    number: false,
    calculator: false,
    unit: false,
    binary: false,
    development: false,
    proxy: false,
    other: false,
    timeConvertor: false,
    currencyconvert: false,
    countrytool: false,
    socialmedia: false,
    crypto: false,
    AI: false,
    language: false,
    videodownloader: false,
    codertools: false,
  });

  const [menuOpen, setMenuOpen] = useState({
    jpg: false,
    tiff: false,
    svg: false,
    emf: false,
    bmp: false,
    vsd: false,
    vsdx: false,
    psd: false,
    png: false,
    webp: false,
    mp4: false,
    avi: false,
    mkv: false,
    mov: false,

    mp3: false,
    aac: false,
    wav: false,
    ogg: false,
    m4a: false,

    csv: false,
    excel: false,
    json: false,
    tsv: false,
    xml: false,
    yml: false,
  });

  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubMenu = (type) => {
    setSubMenuOpen({ [type]: !subMenuOpen[type] });

    dispatch(setCurrentPage(type));
  };

  const handleImages = (type) => {
    setMenuOpen({ [type]: !menuOpen[type] });
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
      </>
    );
  };

  const handleOnSelect = (item) => {
    router.push({ pathname: item?.Route });
  };

  return (
    <>
      <div
        className={
          sidebarOpen
            ? classNames(styles.sidebar, styles.sidebarHiddenShow)
            : classNames(styles.sidebar, styles.sidebarHiddenStyle)
        }
      >
        <div className="sidebar-search-sticky-top">
          <div className="result-search-box" style={{ width: "100%" }}>
            <ReactSearchAutocomplete
              placeholder="Search tools"
              items={images?.map((item) => {
                return {
                  name: item?.Name,
                  Route: item?.navigate,
                };
              })}
              onSelect={handleOnSelect}
              autoFocus
              formatResult={formatResult}
            />
          </div>
        </div>
       

       

        

        <div className={styles.sidebarMenu}>
         


          <div className={styles.mainMenu}>
            <div
              className={styles.sidebarFlex}
              onClick={() => {
                handleSubMenu("calculator");
              }}
            >
              <div className={styles.leftAlignment}>
                <div>
                  <i className="fa-solid fa-calculator"></i>
                </div>
                <div>
                  <span>CALCULATOR TOOLS</span>
                </div>
              </div>
              <div className={styles.rightAlignment}>
                {subMenuOpen?.calculator ? (
                  <i className="fa-solid fa-chevron-up"></i>
                ) : (
                  <i className="fa-solid fa-chevron-down"></i>
                )}
              </div>
            </div>
            <div
              className={
                subMenuOpen?.calculator
                  ? classNames(styles.subMenu, styles.subMenuShow)
                  : classNames(styles.subMenu, styles.subMenuHidden)
              }
            >
              {images
                .filter((item) => item.type == "calculator")
                .map((item, index) => {
                  return (
                    <span
                      key={index}
                      onClick={() => {
                        router.push(
                          {
                            pathname: item.navigate,
                            query: { name: item.type },
                          },
                          item.navigate
                        );
                      }}
                    >
                      {" "}
                      {item.Name}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>

        {/* TEXT ANALYTICS TOOLS */}

        <div className={styles.sidebarMenu}>
          <div className={styles.mainMenu}>
            <div
              className={styles.sidebarFlex}
              onClick={() => {
                handleSubMenu("text");
              }}
            >
              <div className={styles.leftAlignment}>
                <div>
                  <i className="fa-solid fa-font"></i>
                </div>
                <div>
                  <span>TEXT ANALYTICS TOOLS</span>
                </div>
              </div>
              <div className={styles.rightAlignment}>
                {subMenuOpen?.text ? (
                  <i className="fa-solid fa-chevron-up"></i>
                ) : (
                  <i className="fa-solid fa-chevron-down"></i>
                )}
              </div>
            </div>
            <div
              className={
                subMenuOpen?.text
                  ? classNames(styles.subMenu, styles.subMenuShow)
                  : classNames(styles.subMenu, styles.subMenuHidden)
              }
            >
              {images
                .filter((item) => item.type == "texttools")
                .map((item, index) => {
                  return (
                    <span
                      key={index}
                      onClick={() => {
                        router.push(
                          {
                            pathname: item.navigate,
                            query: { name: item.type },
                          },
                          item.navigate
                        );
                      }}
                    >
                      {" "}
                      {item.Name}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Online Number Tools */}

        <div className={styles.sidebarMenu}>
          <div className={styles.mainMenu}>
            <div
              className={styles.sidebarFlex}
              onClick={() => {
                handleSubMenu("number");
              }}
            >
              <div className={styles.leftAlignment}>
                <div>
                  <i className="fa-solid fa-1"></i>
                </div>
                <div>
                  <span>NUMBER TOOLS</span>
                </div>
              </div>
              <div className={styles.rightAlignment}>
                {subMenuOpen?.number ? (
                  <i className="fa-solid fa-chevron-up"></i>
                ) : (
                  <i className="fa-solid fa-chevron-down"></i>
                )}
              </div>
            </div>
            <div
              className={
                subMenuOpen?.number
                  ? classNames(styles.subMenu, styles.subMenuShow)
                  : classNames(styles.subMenu, styles.subMenuHidden)
              }
            >
              {images
                .filter((item) => item.type == "onlinenumber")
                .map((item, index) => {
                  return (
                    <span
                      key={index}
                      onClick={() => {
                        router.push(
                          {
                            pathname: item.navigate,
                            query: { name: item.type },
                          },
                          item.navigate
                        );
                      }}
                    >
                      {" "}
                      {item.Name}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Unit convertor tools */}

        <div className={styles.sidebarMenu}>
          <div className={styles.mainMenu}>
            <div
              className={styles.sidebarFlex}
              onClick={() => {
                handleSubMenu("unit");
              }}
            >
              <div className={styles.leftAlignment}>
                <div>
                  <i className="fa-solid fa-ruler"></i>
                </div>
                <div>
                  <span>UNIT CONVERTOR TOOLS</span>
                </div>
              </div>
              <div className={styles.rightAlignment}>
                {subMenuOpen?.unit ? (
                  <i className="fa-solid fa-chevron-up"></i>
                ) : (
                  <i className="fa-solid fa-chevron-down"></i>
                )}
              </div>
            </div>
            <div
              className={
                subMenuOpen?.unit
                  ? classNames(styles.subMenu, styles.subMenuShow)
                  : classNames(styles.subMenu, styles.subMenuHidden)
              }
            >
              {images
                .filter((item) => item.type == "unit")
                .map((item, index) => {
                  return (
                    <span
                      key={index}
                      onClick={() => {
                        router.push(item.navigate);
                      }}
                    >
                      {" "}
                      {item.Name}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>

        {/* BINARY CONVERTOR TOOLS */}

        <div className={styles.sidebarMenu}>
          <div className={styles.mainMenu}>
            <div
              className={styles.sidebarFlex}
              onClick={() => {
                handleSubMenu("binary");
              }}
            >
              <div className={styles.leftAlignment}>
                <div>
                  <i className="fa-solid fa-file"></i>
                </div>
                <div>
                  <span>BINARY CONVERTOR TOOLS</span>
                </div>
              </div>
              <div className={styles.rightAlignment}>
                {subMenuOpen?.binary ? (
                  <i className="fa-solid fa-chevron-up"></i>
                ) : (
                  <i className="fa-solid fa-chevron-down"></i>
                )}
              </div>
            </div>
            <div
              className={
                subMenuOpen?.binary
                  ? classNames(styles.subMenu, styles.subMenuShow)
                  : classNames(styles.subMenu, styles.subMenuHidden)
              }
            >
              {images
                .filter((item) => item.type == "binary")
                .map((item, index) => {
                  return (
                    <span
                      key={index}
                      onClick={() => {
                        router.push(item.navigate);
                      }}
                    >
                      {item.Name}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>

        {/* DEVELOPMENT TOOLS */}

        <div className={styles.sidebarMenu}>
          <div className={styles.mainMenu}>
            <div
              className={styles.sidebarFlex}
              onClick={() => {
                handleSubMenu("development");
              }}
            >
              <div className={styles.leftAlignment}>
                <div>
                  <i className="fa-brands fa-dev"></i>
                </div>
                <div>
                  <span>DEVELOPMENT TOOLS</span>
                </div>
              </div>
              <div className={styles.rightAlignment}>
                {subMenuOpen?.development ? (
                  <i className="fa-solid fa-chevron-up"></i>
                ) : (
                  <i className="fa-solid fa-chevron-down"></i>
                )}
              </div>
            </div>
            <div
              className={
                subMenuOpen?.development
                  ? classNames(styles.subMenu, styles.subMenuShow)
                  : classNames(styles.subMenu, styles.subMenuHidden)
              }
            >
              {images
                .filter((item) => item.type == "development")
                .map((item, index) => {
                  return (
                    <span
                      key={index}
                      onClick={() => {
                        router.push(
                          {
                            pathname: item.navigate,
                            query: { name: item.type },
                          },
                          item.navigate
                        );
                      }}
                    >
                      {" "}
                      {item.Name}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>

        {/* PROXY TOOLS */}
        <div className={styles.sidebarMenu}>
          <div className={styles.mainMenu}>
            <div
              className={styles.sidebarFlex}
              onClick={() => {
                handleSubMenu("proxy");
              }}
            >
              <div className={styles.leftAlignment}>
                <div>
                  <i className="fa fa-server"></i>
                </div>
                <div>
                  <span>PROXY TOOLS</span>
                </div>
              </div>
              <div className={styles.rightAlignment}>
                {subMenuOpen?.proxy ? (
                  <i className="fa-solid fa-chevron-up"></i>
                ) : (
                  <i className="fa-solid fa-chevron-down"></i>
                )}
              </div>
            </div>
            <div
              className={
                subMenuOpen?.proxy
                  ? classNames(styles.subMenu, styles.subMenuShow)
                  : classNames(styles.subMenu, styles.subMenuHidden)
              }
            >
              {images
                .filter((item) => item.type == "proxy")
                .map((item, index) => {
                  return (
                    <span
                      key={index}
                      onClick={() => {
                        router.push(
                          {
                            pathname: item.navigate,
                            query: { name: item.type },
                          },
                          item.navigate
                        );
                      }}
                    >
                      {" "}
                      {item.Name}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>

        {/* OTHER TOOLS */}

        <div className={styles.sidebarMenu}>
          <div className={styles.mainMenu}>
            <div
              className={styles.sidebarFlex}
              onClick={() => {
                handleSubMenu("other");
              }}
            >
              <div className={styles.leftAlignment}>
                <div>
                  <i className="far fa-address-card"></i>
                </div>
                <div>
                  <span>OTHER TOOLS</span>
                </div>
              </div>
              <div className={styles.rightAlignment}>
                {subMenuOpen?.other ? (
                  <i className="fa-solid fa-chevron-up"></i>
                ) : (
                  <i className="fa-solid fa-chevron-down"></i>
                )}
              </div>
            </div>
            <div
              className={
                subMenuOpen?.other
                  ? classNames(styles.subMenu, styles.subMenuShow)
                  : classNames(styles.subMenu, styles.subMenuHidden)
              }
            >
              {images
                .filter((item) => item.type == "other")
                .map((item, index) => {
                  return (
                    <span
                      key={index}
                      onClick={() => {
                        router.push(
                          {
                            pathname: item.navigate,
                            query: { name: item.type },
                          },
                          item.navigate
                        );
                      }}
                    >
                      {" "}
                      {item.Name}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>

        {/* TIME CONVERTOR TOOLS */}

        <div className={styles.sidebarMenu}>
          <div className={styles.mainMenu}>
            <div
              className={styles.sidebarFlex}
              onClick={() => {
                handleSubMenu("timeConvertor");
              }}
            >
              <div className={styles.leftAlignment}>
                <div>
                  <i className="fa-solid fa-clock"></i>
                </div>
                <div>
                  <span>TIME CONVERTOR TOOLS</span>
                </div>
              </div>
              <div className={styles.rightAlignment}>
                {subMenuOpen?.timeConvertor ? (
                  <i className="fa-solid fa-chevron-up"></i>
                ) : (
                  <i className="fa-solid fa-chevron-down"></i>
                )}
              </div>
            </div>
            <div
              className={
                subMenuOpen?.timeConvertor
                  ? classNames(styles.subMenu, styles.subMenuShow)
                  : classNames(styles.subMenu, styles.subMenuHidden)
              }
            >
              {images
                .filter((item) => item.type == "timeConvertor")
                .map((item, index) => {
                  return (
                    <span
                      key={index}
                      onClick={() => {
                        router.push(
                          {
                            pathname: item.navigate,
                            query: { name: item.type },
                          },
                          item.navigate
                        );
                      }}
                    >
                      {" "}
                      {item.Name}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>

        {/* CURRENCY CONVERTOR TOOLS */}

        <div className={styles.sidebarMenu}>
          <div className={styles.mainMenu}>
            <div
              className={styles.sidebarFlex}
              onClick={() => {
                handleSubMenu("currencyconvert");
              }}
            >
              <div className={styles.leftAlignment}>
                <div>
                  <i className="fa-solid fa-dollar-sign"></i>
                </div>
                <div>
                  <span>CURRENCY CONVERTOR TOOLS</span>
                </div>
              </div>
              <div className={styles.rightAlignment}>
                {subMenuOpen?.currencyconvert ? (
                  <i className="fa-solid fa-chevron-up"></i>
                ) : (
                  <i className="fa-solid fa-chevron-down"></i>
                )}
              </div>
            </div>
            <div
              className={
                subMenuOpen?.currencyconvert
                  ? classNames(styles.subMenu, styles.subMenuShow)
                  : classNames(styles.subMenu, styles.subMenuHidden)
              }
            >
              {images
                .filter((item) => item.type == "currencyconvert")
                .map((item, index) => {
                  return (
                    <span
                      key={index}
                      onClick={() => {
                        router.push(
                          {
                            pathname: item.navigate,
                            query: { name: item.type },
                          },
                          item.navigate
                        );
                      }}
                    >
                      {" "}
                      {item.Name}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>

        {/* COUNTRY TOOLS */}

        <div className={styles.sidebarMenu}>
          <div className={styles.mainMenu}>
            <div
              className={styles.sidebarFlex}
              onClick={() => {
                handleSubMenu("countrytool");
              }}
            >
              <div className={styles.leftAlignment}>
                <div>
                  <i className="fas fa-globe-americas"></i>
                </div>
                <div>
                  <span>COUNTRY TOOLS</span>
                </div>
              </div>
              <div className={styles.rightAlignment}>
                {subMenuOpen?.countrytool ? (
                  <i className="fa-solid fa-chevron-up"></i>
                ) : (
                  <i className="fa-solid fa-chevron-down"></i>
                )}
              </div>
            </div>
            <div
              className={
                subMenuOpen?.countrytool
                  ? classNames(styles.subMenu, styles.subMenuShow)
                  : classNames(styles.subMenu, styles.subMenuHidden)
              }
            >
              {images
                .filter((item) => item.type == "countrytool")
                .map((item, index) => {
                  return (
                    <span
                      key={index}
                      onClick={() => {
                        router.push(
                          {
                            pathname: item.navigate,
                            query: { name: item.type },
                          },
                          item.navigate
                        );
                      }}
                    >
                      {" "}
                      {item.Name}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>

        {/* SOCIAL MEDIA TOOLS */}

        <div className={styles.sidebarMenu}>
          <div className={styles.mainMenu}>
            <div
              className={styles.sidebarFlex}
              onClick={() => {
                handleSubMenu("socialmedia");
              }}
            >
              <div className={styles.leftAlignment}>
                <div>
                  <i className="far fa-envelope"></i>
                </div>
                <div>
                  <span>SOCIAL MEDIA TOOLS</span>
                </div>
              </div>
              <div className={styles.rightAlignment}>
                {subMenuOpen?.socialmedia ? (
                  <i className="fa-solid fa-chevron-up"></i>
                ) : (
                  <i className="fa-solid fa-chevron-down"></i>
                )}
              </div>
            </div>
            <div
              className={
                subMenuOpen?.socialmedia
                  ? classNames(styles.subMenu, styles.subMenuShow)
                  : classNames(styles.subMenu, styles.subMenuHidden)
              }
            >
              {images
                .filter((item) => item.type == "socialmedia")
                .map((item, index) => {
                  return (
                    <span
                      key={index}
                      onClick={() => {
                        router.push(
                          {
                            pathname: item.navigate,
                            query: { name: item.type },
                          },
                          item.navigate
                        );
                      }}
                    >
                      {" "}
                      {item.Name}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Crypto Tools */}

        <div className={styles.sidebarMenu}>
          <div className={styles.mainMenu}>
            <div
              className={styles.sidebarFlex}
              onClick={() => {
                handleSubMenu("crypto");
              }}
            >
              <div className={styles.leftAlignment}>
                <div>
                  <i className="fa-brands fa-bitcoin"></i>
                </div>
                <div>
                  <span>CRYPTO TOOLS</span>
                </div>
              </div>
              <div className={styles.rightAlignment}>
                {subMenuOpen?.crypto ? (
                  <i className="fa-solid fa-chevron-up"></i>
                ) : (
                  <i className="fa-solid fa-chevron-down"></i>
                )}
              </div>
            </div>
            <div
              className={
                subMenuOpen?.crypto
                  ? classNames(styles.subMenu, styles.subMenuShow)
                  : classNames(styles.subMenu, styles.subMenuHidden)
              }
            >
              {images
                .filter((item) => item.type == "cryptotools")
                .map((item, index) => {
                  return (
                    <span
                      key={index}
                      onClick={() => {
                        router.push(
                          {
                            pathname: item.navigate,
                            query: { name: item.type },
                          },
                          item.navigate
                        );
                      }}
                    >
                      {" "}
                      {item.Name}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Language Convertor */}

        <div className={styles.sidebarMenu}>
          <div className={styles.mainMenu}>
            <div
              className={styles.sidebarFlex}
              onClick={() => {
                handleSubMenu("language");
              }}
            >
              <div className={styles.leftAlignment}>
                <div>
                  <i className="fa-solid fa-language"></i>
                </div>
                <div>
                  <span>LANGUAGE TOOLS</span>
                </div>
              </div>
              <div className={styles.rightAlignment}>
                {subMenuOpen?.language ? (
                  <i className="fa-solid fa-chevron-up"></i>
                ) : (
                  <i className="fa-solid fa-chevron-down"></i>
                )}
              </div>
            </div>
            <div
              className={
                subMenuOpen?.language
                  ? classNames(styles.subMenu, styles.subMenuShow)
                  : classNames(styles.subMenu, styles.subMenuHidden)
              }
            >
              {images
                .filter((item) => item.type == "language")
                .map((item, index) => {
                  return (
                    <span
                      key={index}
                      onClick={() => {
                        router.push(
                          {
                            pathname: item.navigate,
                            query: { name: item.type },
                          },
                          item.navigate
                        );
                      }}
                    >
                      {" "}
                      {item.Name}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>

        {/* video downloader */}

        <div className={styles.sidebarMenu}>
          <div className={styles.mainMenu}>
            <div
              className={styles.sidebarFlex}
              onClick={() => {
                handleSubMenu("videodownloader");
              }}
            >
              <div className={styles.leftAlignment}>
                <div>
                  <i className="fa fa-download" aria-hidden="true"></i>
                </div>
                <div>
                  <span>VIDEO DOWNLOADER</span>
                </div>
              </div>
              <div className={styles.rightAlignment}>
                {subMenuOpen?.videodownloader ? (
                  <i className="fa-solid fa-chevron-up"></i>
                ) : (
                  <i className="fa-solid fa-chevron-down"></i>
                )}
              </div>
            </div>
            <div
              className={
                subMenuOpen?.videodownloader
                  ? classNames(styles.subMenu, styles.subMenuShow)
                  : classNames(styles.subMenu, styles.subMenuHidden)
              }
            >
              {images
                .filter((item) => item.type == "videodownloader")
                .map((item, index) => {
                  return (
                    <span
                      key={index}
                      onClick={() => {
                        router.push(
                          {
                            pathname: item.navigate,
                            query: { name: item.type },
                          },
                          item.navigate
                        );
                      }}
                    >
                      {" "}
                      {item.Name}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>

        {/* coder tools */}

        <div className={styles.sidebarMenu}>
          <div className={styles.mainMenu}>
            <div
              className={styles.sidebarFlex}
              onClick={() => {
                handleSubMenu("codertools");
              }}
            >
              <div className={styles.leftAlignment}>
                <div>
                  <i className="fa fa-file-code-o"></i>
                </div>
                <div>
                  <span>CODER TOOLS</span>
                </div>
              </div>
              <div className={styles.rightAlignment}>
                {subMenuOpen?.codertools ? (
                  <i className="fa-solid fa-chevron-up"></i>
                ) : (
                  <i className="fa-solid fa-chevron-down"></i>
                )}
              </div>
            </div>
            <div
              className={
                subMenuOpen?.codertools
                  ? classNames(styles.subMenu, styles.subMenuShow)
                  : classNames(styles.subMenu, styles.subMenuHidden)
              }
            >
              {images
                .filter((item) => item.type == "codertools")
                .map((item, index) => {
                  return (
                    <span
                      key={index}
                      onClick={() => {
                        router.push(
                          {
                            pathname: item.navigate,
                            query: { name: item.type },
                          },
                          item.navigate
                        );
                      }}
                    >
                      {" "}
                      {item.Name}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

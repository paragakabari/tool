import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Auth from "../../../helpers/Auth";
import manifest from "../../../public/FireFoxExtension/manifest.json";
import Logo from "../../../src/Images/convertor-logo.png";
import { getUserInfo } from "../../../utils/user.util.js";
import ForgotPassword from "../../common/ForgotPage";
import NewPassword from '../../common/NewPassword';
import OtpVerify from '../../common/OtpVerify';
import SignIn from "../../common/SignIn";
import styles from "./header.module.scss";
// import MainLoader from "../../MainLoader";

export default function Header({ Data }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownMobileOpen, setDropdownMobileOpen] = useState(false);
  const [ExtensiondropdownOpen, setExtensionDropdownOpen] = useState(false);
  const [ExtensiondropdownMobileOpen, setExtensionDropdownMobileOpen] =
    useState(false);
  const router = useRouter();
  const [mobileHeaderOpen, setMobileHeaderOpen] = useState(false);
  const [SignInModal, setSignInModal] = useState(false);
  const [profileDrop, setProfileDrop] = useState(false);
  const [forgotModal, setforgotModal] = useState(false);
  const [OtoVerifyModal, setOtoVerifyModal] = useState(false);
  const [NewPasswordModal, setNewPasswordModal] = useState(false);
  // const [mainloader, setMainLloader] = useState(false);

  const signin = SignInModal;
 

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setDropdownOpen(false);
          document.body.classList.remove("body-overflow");
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  const useOutsideAlerterExtension = (ref) => {
    useEffect(() => {
      function handleClickOutside1(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setExtensionDropdownOpen(false);

          document.body.classList.remove("body-overflow");
        }
      }
      document.addEventListener("mousedown", handleClickOutside1);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside1);
      };
    }, [ref]);
  };

  const useOutsideAlerterUser = (ref) => {
    useEffect(() => {
      function handleClickOutside1(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setProfileDrop(false);
          document.body.classList.remove("body-overflow");
        }
      }
      document.addEventListener("mousedown", handleClickOutside1);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside1);
      };
    }, [ref]);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const popupRef = useRef(null);
  useOutsideAlerterExtension(popupRef);

  const userRef = useRef(null);
  useOutsideAlerterUser(userRef);

  useEffect(() => {
    if (signin) {
      document.getElementById("body").style.overflow = "hidden";
    } else {
      document.getElementById("body").style.overflow = "scroll";
    }
  }, [signin]);

  let info = getUserInfo("userinfo");
  let items;
  if (info) {
    items = getUserInfo("userinfo");
  }

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

  const LogOut = async () => {
    await Auth.deauthenticateLocalUser();
    window.location.replace("/");
  };

  const handleDownloadManifest = () => {
    const json = JSON.stringify(manifest, null, 2);
    var element = document.createElement("a");
    var file = new Blob([json], { type: `.json` });
    element.href = URL.createObjectURL(file);
    element.download = `manifest.json`;
    element.click();
  };

  return (
    <>
     {/* {mainloader &&
      <MainLoader/>} */}
      <div className={styles.headerContainer}>
        <div className={styles.headerAlignment}>
          <div className={styles.logo}>
            <Link href="/" >
            {/* onClick={() => setMainLloader(true)} */}
              <h1>AiGallery</h1>
              {/* <img src={Logo.src} alt="Tiny Tools" /> */}
            </Link>
          </div>
          <div>
            <div>
              <div>
                <div className={styles.searchBarCenterAlignment}>
                  <div className="result-search-box">
                    <ReactSearchAutocomplete
                      placeholder="Search with your favourite tools"
                      items={Data?.map((item) => {
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
              </div>
            </div>
          </div>

          {/* <div className={styles.menuSearch}>x
            <div className={styles.menuText}>
             
              <div ref={wrapperRef} className={styles.relativMainDiv}>
                <div
                  className={styles.categoriseRelativeDiv}
                  onClick={() => {
                    setDropdownOpen(!dropdownOpen);
                  }}
                >
                  <a>Categories</a>
                  {dropdownOpen ? (
                    <i class="fa-solid fa-chevron-up"></i>
                  ) : (
                    <i className="fa-solid fa-chevron-down"></i>
                  )}
                </div>

                <div
                  className={
                    dropdownOpen
                      ? classNames(
                        styles.dropdownDesign,
                        styles.dropdownDesignOpen
                      )
                      : classNames(
                        styles.dropdownDesign,
                        styles.dropdownDesignClose
                      )
                  }
                >
                

                 

                  
                  <div
                    className={styles.allMenuAlignment}
                    onClick={() => router.push("/#ppt-tools")}
                  >
                    <div>
                      <i className="fa-solid fa-file-powerpoint"></i>
                    </div>
                    <div>
                      <span>Ppt</span>
                    </div>
                  </div>

                  
                  <div
                    className={styles.allMenuAlignment}
                    onClick={() => router.push("/#image-tools")}
                  >
                    <div>
                      <i className="fa-solid fa-image"></i>
                    </div>
                    <div>
                      <span>Images</span>
                    </div>
                  </div>

                  
                  <div
                    className={styles.allMenuAlignment}
                    onClick={() => router.push("/#image-editor-tools")}
                  >
                    <div>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </div>
                    <div>
                      <span>Image Editor</span>
                    </div>
                  </div>

                  
                  <div
                    className={styles.allMenuAlignment}
                    onClick={() => router.push("/#video-tools")}
                  >
                    <div>
                      <i className="fa-solid fa-video"></i>
                    </div>
                    <div>
                      <span>Video</span>
                    </div>
                  </div>

                  
                  <div
                    className={styles.allMenuAlignment}
                    onClick={() => router.push("/#audio-tools")}
                  >
                    <div>
                      <i className="fa-solid fa-music"></i>
                    </div>
                    <div>
                      <span>Audio</span>
                    </div>
                  </div>

                  
                  <div
                    className={styles.allMenuAlignment}
                    onClick={() => router.push("/#file-tools")}
                  >
                    <div>
                      <i className="fa-solid fa-folder"></i>
                    </div>
                    <div>
                      <span>File</span>
                    </div>
                  </div>

                  
                  <div
                    className={styles.allMenuAlignment}
                    onClick={() => router.push("/#text-tools")}
                  >
                    <div>
                      <i className="fa-solid fa-font"></i>
                    </div>
                    <div>
                      <span>Text</span>
                    </div>
                  </div>

                  
                  <div
                    className={styles.allMenuAlignment}
                    onClick={() => router.push("/#number-tools")}
                  >
                    <div>
                      <i className="fa-solid fa-1"></i>
                    </div>
                    <div>
                      <span>Number</span>
                    </div>
                  </div>

                  
                  <div
                    className={styles.allMenuAlignment}
                    onClick={() => router.push("/#calculator-tools")}
                  >
                    <div>
                      <i className="fa-solid fa-calculator"></i>
                    </div>
                    <div>
                      <span>Calculator</span>
                    </div>
                  </div>

                  
                  <div
                    className={styles.allMenuAlignment}
                    onClick={() => router.push("/#unit-tools")}
                  >
                    <div>
                      <i className="fa-brands fa-unity"></i>
                    </div>
                    <div>
                      <span>Unit</span>
                    </div>
                  </div>

                  
                  <div
                    className={styles.allMenuAlignment}
                    onClick={() => router.push("/#binary-tools")}
                  >
                    <div>
                      <i className="fa-solid fa-file"></i>
                    </div>
                    <div>
                      <span>Binary</span>
                    </div>
                  </div>

                 
                  <div
                    className={styles.allMenuAlignment}
                    onClick={() => router.push("/#development-tools")}
                  >
                    <div>
                      <i className="fa-brands fa-dev"></i>
                    </div>
                    <div>
                      <span>Development</span>
                    </div>
                  </div>

                 
                  <div
                    className={styles.allMenuAlignment}
                    onClick={() => router.push("/#proxy-tools")}
                  >
                    <div>
                      <i className="fa fa-server"></i>
                    </div>
                    <div>
                      <span>Proxy</span>
                    </div>
                  </div>

                 
                  <div
                    className={styles.allMenuAlignment}
                    onClick={() => router.push("/#other-tools")}
                  >
                    <div>
                      <i className="far fa-address-card"></i>
                    </div>
                    <div>
                      <span>Other</span>
                    </div>
                  </div>

                 
                  <div
                    className={styles.allMenuAlignment}
                    onClick={() => router.push("/#time-convert")}
                  >
                    <div>
                      <i className="fa-solid fa-clock"></i>
                    </div>
                    <div>
                      <span>Time Convert</span>
                    </div>
                  </div>

                 
                  <div
                    className={styles.allMenuAlignment}
                    onClick={() => router.push("/#currency-convert")}
                  >
                    <div>
                      <i className="fa-solid fa-dollar-sign"></i>
                    </div>
                    <div>
                      <span>Currency Convert</span>
                    </div>
                  </div>

                 
                  <div
                    className={styles.allMenuAlignment}
                    onClick={() => router.push("/#country-tools")}
                  >
                    <div>
                      <i className="fas fa-globe-americas"></i>
                    </div>
                    <div>
                      <span>Country</span>
                    </div>
                  </div>

                 
                  <div
                    className={styles.allMenuAlignment}
                    onClick={() => router.push("/#social-media-tools")}
                  >
                    <div>
                      <i className="far fa-envelope"></i>
                    </div>
                    <div>
                      <span>Social Media</span>
                    </div>
                  </div>

                  
                  <div
                    className={styles.allMenuAlignment}
                    onClick={() => router.push("/#crypto-tools")}
                  >
                    <div>
                      <i className="fa-brands fa-bitcoin"></i>
                    </div>
                    <div>
                      <span>Crypto Tools</span>
                    </div>
                  </div>

                  
                  <div
                    className={styles.allMenuAlignment}
                    onClick={() => router.push("/#language-tools")}
                  >
                    <div>
                      <i className="fa-solid fa-language"></i>
                    </div>
                    <div>
                      <span>Language</span>
                    </div>
                  </div>

                  
                  <div
                    className={styles.allMenuAlignment}
                    onClick={() => router.push("/#videodownload-tools")}
                  >
                    <div>
                      <i className="fa fa-download" aria-hidden="true"></i>
                    </div>
                    <div>
                      <span>Video Downloader</span>
                    </div>
                  </div>

                  
                  <div
                    className={styles.allMenuAlignment}
                    onClick={() => 
                      router.push("/#coder-tools")}
                  >
                    <div>
                      <i className="fa fa-file-code-o"></i>
                    </div>
                    <div>
                      <span>Coder Tools</span>
                    </div>
                  </div>
                </div>
              </div>

              <div ref={popupRef} className={styles.relativMainDiv}>
                <div
                  className={styles.categoriseRelativeDiv}
                  onClick={() =>
                    setExtensionDropdownOpen(!ExtensiondropdownOpen)
                  }
                >
                  <a>Extension</a>
                  {ExtensiondropdownOpen ? (
                    <i class="fa-solid fa-chevron-up"></i>
                  ) : (
                    <i className="fa-solid fa-chevron-down"></i>
                  )}
                </div>

                <div
                  className={
                    ExtensiondropdownOpen
                      ? classNames(
                        styles.dropdownDesign,
                        styles.dropdownDesignOpen
                      )
                      : classNames(
                        styles.dropdownDesign,
                        styles.dropdownDesignClose
                      )
                  }
                >
                  <a
                    href="https://chrome.google.com/webstore/detail/convertor-tools/fnnlkhdneloidlmjjbllncdlpndlogpm?hl=en"
                    target="_blank"
                    style={{ padding: "0px" }}
                  >
                    <div className={styles.allMenuAlignment}>
                      <div>
                        <i className="fa-brands fa-chrome"></i>
                      </div>
                      <div>
                        <span>Chrome</span>
                      </div>
                    </div>
                  </a>
                  <a
                    href="https://addons.mozilla.org/en-US/firefox/addon/convertor-tools-easy-convert"
                    target="_blank"
                    style={{ padding: "0px" }}
                  >
                    <div
                      className={styles.allMenuAlignment}
                    >
                      <div>
                        <i className="fa-brands fa-firefox"></i>
                      </div>
                      <div>
                        <span>Mozila</span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <Link href="/contact">Contact</Link>
              {items?.role === "admin" || items?.role === "user" ? (
                <div
                  className={styles.userproifleDetailscontent}
                  ref={userRef}
                  onClick={() => {
                    setProfileDrop(!profileDrop);
                  }}
                >
                  <div className={styles.profileImage}>
                    {items?.fname?.charAt(0).toUpperCase()}
                  </div>
                  {profileDrop && (
                    <div className={styles.profiledropdown}>
                      <div className={styles.profiledropdownDesgin}>
                        <Link href="/billinginfo">Billing Info</Link>
                        <a onClick={() => LogOut()}>LogOut</a>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <a onClick={() => setSignInModal(true)}>Sign In</a>
              )}
              {SignInModal && <SignIn setSignInModal={setSignInModal} setforgotModal={setforgotModal} />}
              {forgotModal && (
                <ForgotPassword setforgotModal={setforgotModal} setOtoVerifyModal={setOtoVerifyModal} />
              )}
              {OtoVerifyModal && (
                <OtpVerify setOtoVerifyModal={setOtoVerifyModal} setNewPasswordModal={setNewPasswordModal} />
              )}

              {
                NewPasswordModal && (
                  <NewPassword setNewPasswordModal={setNewPasswordModal} setSignInModal={setSignInModal} />
                )
              }

            </div>
          </div> */}
          <div
            className={styles.mobileMenu}
            onClick={() => setMobileHeaderOpen(!mobileHeaderOpen)}
          >
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </div>

      <div
        className={
          mobileHeaderOpen
            ? classNames(styles.mobileViewHeader, styles.mobileHeaderShow)
            : classNames(styles.mobileViewHeader, styles.mobileHeaderHidden)
        }
      >
        <div className={styles.smallHeaderAlignment}>
          <div className={styles.logo}>
            <Link href="/">
              <img src={Logo.src} alt="Tiny Tools" />
            </Link>
          </div>
          <div onClick={() => setMobileHeaderOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <div className={styles.mobileViewBodyContentAlignment}>
          <div className={styles.mobileViewrelativMainDiv}>
            <div
              className={styles.mobileViewcategoriseRelativeDiv}
              onClick={() => {
                setDropdownMobileOpen(!dropdownMobileOpen);
                setExtensionDropdownMobileOpen(false);
              }}
            >
              <a>Categories</a>
              {dropdownMobileOpen ? (
                <i class="fa-solid fa-chevron-up"></i>
              ) : (
                <i className="fa-solid fa-chevron-down"></i>
              )}
            </div>

            <div
              className={
                dropdownMobileOpen
                  ? classNames(
                    styles.mobileViewdropdownDesign,
                    styles.mobileViewdropdownDesignOpen
                  )
                  : classNames(
                    styles.mobileViewdropdownDesign,
                    styles.mobileViewdropdownDesignClose
                  )
              }
            >
           

            
              <div
                className={styles.mobileViewallMenuAlignment}
                onClick={() => router.push("/#audio-tools")}
              >
                <div>
                  <i className="fa-solid fa-music"></i>
                </div>
                <div>
                  <span>Audio</span>
                </div>
              </div>

             
              <div
                className={styles.mobileViewallMenuAlignment}
                onClick={() => router.push("/#file-tools")}
              >
                <div>
                  <i className="fa-solid fa-folder"></i>
                </div>
                <div>
                  <span>File</span>
                </div>
              </div>

             
              <div
                className={styles.mobileViewallMenuAlignment}
                onClick={() => router.push("/#text-tools")}
              >
                <div>
                  <i className="fa-solid fa-font"></i>
                </div>
                <div>
                  <span>Text</span>
                </div>
              </div>

             
              <div
                className={styles.mobileViewallMenuAlignment}
                onClick={() => router.push("/#number-tools")}
              >
                <div>
                  <i className="fa-solid fa-1"></i>
                </div>
                <div>
                  <span>Number</span>
                </div>
              </div>

             
              <div
                className={styles.mobileViewallMenuAlignment}
                onClick={() => router.push("/#calculator-tools")}
              >
                <div>
                  <i className="fa-solid fa-calculator"></i>
                </div>
                <div>
                  <span>Calculator</span>
                </div>
              </div>

             
              <div
                className={styles.mobileViewallMenuAlignment}
                onClick={() => router.push("/#unit-tools")}
              >
                <div>
                  <i className="fa-brands fa-unity"></i>
                </div>
                <div>
                  <span>Unit</span>
                </div>
              </div>

             
              <div
                className={styles.mobileViewallMenuAlignment}
                onClick={() => router.push("/#binary-tools")}
              >
                <div>
                  <i className="fa-solid fa-file"></i>
                </div>
                <div>
                  <span>Binary</span>
                </div>
              </div>

             
              <div
                className={styles.mobileViewallMenuAlignment}
                onClick={() => router.push("/#development-tools")}
              >
                <div>
                  <i className="fa-brands fa-dev"></i>
                </div>
                <div>
                  <span>Development</span>
                </div>
              </div>

             
              <div
                className={styles.mobileViewallMenuAlignment}
                onClick={() => router.push("/#proxy-tools")}
              >
                <div>
                  <i className="fa fa-server"></i>
                </div>
                <div>
                  <span>Proxy</span>
                </div>
              </div>

             
              <div
                className={styles.mobileViewallMenuAlignment}
                onClick={() => router.push("/#other-tools")}
              >
                <div>
                  <i className="far fa-address-card"></i>
                </div>
                <div>
                  <span>Other</span>
                </div>
              </div>

             
              <div
                className={styles.mobileViewallMenuAlignment}
                onClick={() => router.push("/#time-convert")}
              >
                <div>
                  <i className="fa-solid fa-clock"></i>
                </div>
                <div>
                  <span>Time Convert</span>
                </div>
              </div>

             
              <div
                className={styles.mobileViewallMenuAlignment}
                onClick={() => router.push("/#currency-convert")}
              >
                <div>
                  <i className="fa-solid fa-dollar-sign"></i>
                </div>
                <div>
                  <span>Currency Convert</span>
                </div>
              </div>

             
              <div
                className={styles.mobileViewallMenuAlignment}
                onClick={() => router.push("/#country-tools")}
              >
                <div>
                  <i className="fas fa-globe-americas"></i>
                </div>
                <div>
                  <span>Country</span>
                </div>
              </div>

             
              <div
                className={styles.mobileViewallMenuAlignment}
                onClick={() => router.push("/#social-media-tools")}
              >
                <div>
                  <i className="far fa-envelope"></i>
                </div>
                <div>
                  <span>Social Media</span>
                </div>
              </div>

             
              <div
                className={styles.mobileViewallMenuAlignment}
                onClick={() => router.push("/#crypto-tools")}
              >
                <div>
                  <i className="fa-brands fa-bitcoin"></i>
                </div>
                <div>
                  <span>Crypto Tools</span>
                </div>
              </div>

             
              <div
                className={styles.mobileViewallMenuAlignment}
                onClick={() => router.push("/#language-tools")}
              >
                <div>
                  <i className="fa-solid fa-language"></i>
                </div>
                <div>
                  <span>Language</span>
                </div>
              </div>

             
              <div
                className={styles.mobileViewallMenuAlignment}
                onClick={() => router.push("/#videodownload-tools")}
              >
                <div>
                  <i className="fa fa-download" aria-hidden="true"></i>
                </div>
                <div>
                  <span>Video Downloader</span>
                </div>
              </div>

             
              <div
                className={styles.mobileViewallMenuAlignment}
                onClick={() => router.push("/#coder-tools")}
              >
                <div>
                  <i className="fa fa-file-code-o"></i>
                </div>
                <div>
                  <span>Coder Tools</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.mobileViewrelativMainDiv}>
            <div
              className={styles.mobileViewcategoriseRelativeDiv}
              onClick={() => {
                setExtensionDropdownMobileOpen(!ExtensiondropdownMobileOpen);
                setDropdownMobileOpen(false);
              }}
            >
              <a>Extension</a>
              {ExtensiondropdownMobileOpen ? (
                <i class="fa-solid fa-chevron-up"></i>
              ) : (
                <i className="fa-solid fa-chevron-down"></i>
              )}
            </div>

            <div
             
              className={
                ExtensiondropdownMobileOpen
                  ? classNames(
                    styles.mobileViewdropdownDesign,
                    styles.mobileViewdropdownDesignOpen
                  )
                  : classNames(
                    styles.mobileViewdropdownDesign,
                    styles.mobileViewdropdownDesignClose
                  )
              }
            >
          
              <a
                href="https://chrome.google.com/webstore/detail/convertor-tools/fnnlkhdneloidlmjjbllncdlpndlogpm?hl=en"
                target="_blank"
                style={{ padding: "0px" }}
              >
                <div className={styles.mobileViewallMenuAlignment}>
                  <div>
                    <i className="fa-brands fa-chrome"></i>
                  </div>
                  <div>
                    <span>Chrome</span>
                  </div>
                </div>
              </a>

           
              <a
                href="https://addons.mozilla.org/en-US/firefox/addon/convertor-tools-easy-convert"
                target="_blank"
                style={{ padding: "0px" }}
              >
                <div
                  className={styles.mobileViewallMenuAlignment}
               
                >
                  <div>
                    <i className="fa-brands fa-firefox"></i>
                  </div>
                  <div>
                    <span>Mozilla</span>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div className={styles.mobileViewrelativMainDiv}>
            <div className={styles.mobileViewcategoriseRelativeDiv}>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

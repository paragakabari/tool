import React from "react";
import Header from "../auth/header";
import Footer from "../auth/footer";
// import { images } from "../common/CommonArray/FileArray";

import { images } from "../common/CommonArray/FileArray";
export default function index(props) {
  const { children } = props;
  return (
    <div>
      <Header Data={images} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

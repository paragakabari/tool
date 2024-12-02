import App from "../../components/App";
import React from "react";
import About from "../../components/routes/about";

export default function index() {
  return (
    <div>
      <App>
        <About />
      </App>
    </div>
  );
}

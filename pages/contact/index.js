import React from "react";
import Contact from "../../components/routes/contact";
import App from "../../components/App";
import ContactForm from "../../components/common/ContactForm";

export default function index() {
  return (
    <div>
      <App>
        <ContactForm />
      </App>
    </div>
  );
}

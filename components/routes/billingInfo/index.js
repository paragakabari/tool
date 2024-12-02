import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import BillingInfo from "./pay";
const stripePromise = loadStripe(
  "pk_test_51IQ6SLLNDkmReOs8OIBFoPtogbFxyTY4x46F8SQVw5WBBlOwW1jQtKxUrc1hIkJUaQ5H0HU4liBsNvX98j4yogHj00JV9L99ZH"
);

export default function Payment() {
  return (
    <Elements stripe={stripePromise}>
      <BillingInfo />
    </Elements>
  );
}

import React from "react";
import BillingInfo from "../../components/routes/billingInfo/pay";
import App from "../../components/App";
import Payment from "../../components/routes/billingInfo";

export default function index() {
  return (
    <div>
      <App>
        <Payment />
      </App>
    </div>
  );
}

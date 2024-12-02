const createPaymentIntent = async (options) => {
  if (typeof window !== "undefined") {
    await window
      .fetch(`/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((data) => {
        if (!data || data.error) {
          throw new Error("PaymentIntent API Error");
        } else {
          return data.client_secret;
        }
      });
  }
};

const getProductDetails = (options) => {
  if (typeof window !== "undefined") {
    return window
      .fetch(`/product-details`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((data) => {
        if (!data || data.error) {
          throw Error("API Error");
        } else {
          return data;
        }
      });
  }
};

const getPublicStripeKey = (options) => {
  if (typeof window !== "undefined") {
    return window
      .fetch(`/public-key`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((data) => {
        if (!data || data.error) {
          throw Error("API Error");
        } else {
          return data.publishableKey;
        }
      });
  }
  return;
};

const api = {
  createPaymentIntent,
  getPublicStripeKey: getPublicStripeKey,
  getProductDetails: getProductDetails,
};

export default api;

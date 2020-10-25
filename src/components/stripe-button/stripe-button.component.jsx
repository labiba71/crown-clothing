import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const onToken = (token) => {
    alert("Payment Successful");
  };
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51Hg7eXH4XdNfqqXmgu1IvTRO8J0UYhAndTq3zOOIaKGvQ6EvedDbVfP34K83jVPxNu5EM6gmtscpAL2bqos6LZUO00zhpVfUeS";
  return (
    <StripeCheckout
      label="Pay Now"
      name="CROWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;

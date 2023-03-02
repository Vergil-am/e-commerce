
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/CheckoutForm";
import { useSelector } from "react-redux";


// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.


// delete StripeApi key before uplding to github
const StripeAPIKey = ""
const stripePromise = loadStripe(StripeAPIKey);

export default function Payment() {
  const [clientSecret, setClientSecret] = useState("");
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/payment/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart.Products, total: cart.total }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .then((res) => console.log(res))
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

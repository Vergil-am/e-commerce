import React, { useEffect, useState } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import styled from "styled-components"
import { useSelector } from "react-redux";
import axios from "axios";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";


const Container = styled.div`
    display: flex;
    align-items: center;
`
const Wrapper = styled.div`
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    display: flex;
    justify-content: center;
    align-content: center;
    height: 100vh;
    width: 100vw;
`
const Form = styled.form`
    width: 30vw;
    min-width: 500px;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
`
export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const User = useSelector(state => state.user.currentUser);
  const cart = useSelector(state => state.cart);
  //TODO I need to pass these values to payment page to create Order
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Adress, setAdress] = useState('');
  const [Phone, setPhone] = useState('');


  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!")
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/paymentsuccess",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };
  // elements.create('payment', {
  //   paymentMethodOrder: ['apple_pay', 'google_pay', 'card', 'klarna']
  // });
  const paymentElementOptions = {
    layout: "tabs",
    // paymentMethodOrder: ['Cards', 'SEPA debit']

  }
  return (
    <Container>
      <Wrapper>
        <Form id="payment-form" onSubmit={handleSubmit}>
          <LinkAuthenticationElement
            id="link-authentication-element"
            onChange={(e) => setEmail(e.target.value)}
          />

          <OutlinedInput placeholder="First name" onChange={e => setFirstName(e.target.value)} />
          <OutlinedInput placeholder="Last name" onChange={e => setLastName(e.target.value)} />
          <OutlinedInput fullWidth={true} placeholder="Adress" onChange={e => setAdress(e.target.value)} />
          <OutlinedInput fullWidth={true} placeholder="Phone number" onChange={e => setPhone(e.target.value)} />
          <PaymentElement id="payment-element" options={paymentElementOptions} />
          <button disabled={isLoading || !stripe || !elements} id="submit">
            <span id="button-text">
              {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
            </span>
          </button>
          {/* Show any error or success messages */}
          {message && <div id="payment-message">{message}</div>}
        </Form>
      </Wrapper>
    </Container>
  );
}

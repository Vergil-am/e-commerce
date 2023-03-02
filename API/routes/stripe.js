// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const Stripe = require('stripe');
const router = require("express").Router();
const dotenv = require("dotenv");


dotenv.config();
const stripe = Stripe(process.env.Stripe_Api_Key)

const YOUR_DOMAIN = 'http://localhost:3000';


// const calculateOrderAmount = () => {
//   //calculate price here to avoide fraud
//   return 1400;
// };

router.post("/create-payment-intent", async (req, res) => {
  const  {items}  = req.body.items;
  const total = req.body.total;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    // amount: calculateOrderAmount(total),
    amount: total,
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


module.exports = router

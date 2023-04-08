const router = require("express").Router();
const Order = require("../models/order");
const dotenv = require("dotenv");
const verifyAuth0 = require('./auth0.js')

dotenv.config();
const stripe = require("stripe")(process.env.Stripe_Api_Key);

// Payment
router.post("/payment", async (req, res) => {
  const Products = req.body.products

  const lineItems = await Promise.all(
    Products.map(product => {
      return {
        price: product.fields.priceId,
        quantity: product.quantity
      }
    })
  )
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.My_Domain}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.My_Domain}?canceled=true`,
    });
    res.status(200).json(session.url);
  } catch (err) {
  }

})

// payment success and create Order
router.post('/success/:session_id', async (req, res) => {
  const Products = req.body.products
  const PayementId = req.params.session_id
  const session = await stripe.checkout.sessions.retrieve(PayementId);
  const Items = await Promise.all(
    Products.map(product => {
      return {
        Title: product.fields.title,
        Image: product.fields.thumbnail.fields.file.url,
        id: product.sys.id,
        qunatity: product.quantity,
      }
    })
  )
  const newOrder = new Order({
    UserId: req.body.user.sub,
    Products: Items,
    PaymentId: PayementId
  });
  if (session.payment_status == 'paid') {
    try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  }


  res.status(200);
});

// Get user Order
router.get("/find/:userId",verifyAuth0 ,async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
},
);


module.exports = router;

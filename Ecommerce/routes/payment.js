const express = require('express');
const router = express.Router();
const userModel  = require("../models/User.js")
const stripe = require('stripe')('sk_test_51PayPCRwY22Zp31aR0k7yhUQCa4Xm2vVLk6z7VAQEzXGH84t6QOzShRGwIZnDizzie1iZOtSwHEBsyy5ArJyLVeZ00IvVc9Cx0');


router.post('/checkout/payment', async (req, res) => {
  const amount = req.body.amount;
  
  const phone = req.body.phone;
//   const user = req.body.user._id;
  const serviceProvider = req.body.service_provider;
  const productInfo = req.body.productinfo;
  
//   console.log(amount);
//   await userModel.findByIdAndUpdate(user, { cart: [] });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "INR",
          product_data: {
            name: "all items",
          },
          unit_amount: amount * 100,
        },
        quantity: "1",
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    mode: "payment",
    success_url: "http://localhost:8080/products",
    cancel_url: "http://localhost:8080/products",
  });
  res.redirect(303, session.url);
});

module.exports = router;
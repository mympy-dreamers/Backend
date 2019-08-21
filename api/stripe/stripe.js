const express = require('express');
const stripe = require("stripe")(process.env.STRIPE_SK);
const multipart = require("connect-multiparty")();
const server = express.Router();

server.post("/charge", async (req, res) => {
	console.log(req.body);
  try {
    let {status} = await stripe.charges.create({
      amount: req.body.amount,
      currency: "USD",
      description: "An example charge",
      source: req.body.token
    });

    res.json({status});
  } catch (err) {
    res.status(500).json({err});
  }
});

module.exports = server;
const express = require('express');
const stripe = require("stripe")(process.env.STRIPE_SK);
const multipart = require("connect-multiparty")();
const server = express.Router();

//Makes charges to stripe account

server.post("/charge", async (req, res) => {
	const { token, amount } = req.body;
  try {
    let {status} = await stripe.charges.create({
      amount: amount*100,
      currency: "usd",
      description: "An example charge",
      source: token
    });
    res.json({status});
  } catch (err) {
    res.status(500).json({err}).end();
  }
});

module.exports = server;
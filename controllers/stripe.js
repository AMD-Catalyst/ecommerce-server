const stripe = require("stripe")(process.env.STRIPE_KEY);

const stripePayment = (req, res) => {
  const { tokenId, amount } = req.body;

  stripe.charges.create(
    {
      source: tokenId,
      amount: amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        return res.status(500).json(stripeErr);
      }
      res.status(200).json(stripeRes);
    }
  );
};

module.exports = {
  stripePayment,
};

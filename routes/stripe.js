const router = require("express").Router();
const { stripePayment } = require("../controllers/stripe");

router.post("/payment", stripePayment);

module.exports = router;

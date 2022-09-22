const express = require("express")
const { processPayment, sendStripeApiKey } = require("../Controllers/PaymentController")
const router = express.Router()
const {isAuthenticatedUser} = require("../middleware/auth")

router.route("/process").post(isAuthenticatedUser, processPayment)

router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = router
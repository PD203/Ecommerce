const catchAsyncErrors = require("../middleware/catchAsyncErrors")

const Stripe = require("stripe")
const stripe = Stripe('sk_test_51LF052SE5qRAAmYGMZUuq8IRNMeHT0cu8Po9aJ4JhbHmsySpnqPY7O3vYBDFW74tiGr4eHZ2WdLMwNLBoRq3qdtA00nOUD1GGT')

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata: {
            company: "cosmetics",
        },
    })

    res.status(200).json({success: true, client_secret: myPayment.client_secret})
})

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
  });
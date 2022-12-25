require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

exports.handler = async (event, context) => {
  const data = JSON.parse(event.body);
  if (!data.amount) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: "Amount to purchase is missing.",
      }),
    };
  }

  try {
    const { amount, currency ,itemName} = data;
    const paymentIntent = await stripe.paymentIntents.create({
      currency: currency || "eur",
      amount,
      description: itemName || "Order from store",
    });
    return {
      statusCode: 200,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
      }),
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: err,
      }),
    };
  }
};
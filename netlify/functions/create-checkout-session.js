require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  const data = JSON.parse(event.body);
  if (data.line_items.length < 1) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: "Need ate least one line item to purchase.",
      }),
    };
  }

  try {
    const session = await stripe.checkout.sessions.create(data);
    return {
      statusCode: 200,
      body: JSON.stringify({
        session,
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

const axios = require('axios');
const https = require('https');


// RESPONSE FROM STRIPE
// allowed_source_types: ["card"] (1)
// amount: 4000
// amount_details: {tip: {}}
// automatic_payment_methods: null
// canceled_at: null
// cancellation_reason: null
// capture_method: "automatic"
// client_secret: "pi_3MJgaeHwot3YTHMG1xbJySNl_secret_o6SzNHeO2kgHf6qrwrQWfRmmb"
// confirmation_method: "automatic"
// created: 1672160724
// currency: "gbp"
// description: "MarGin – 50cl"
// id: "pi_3MJgaeHwot3YTHMG1xbJySNl"
// last_payment_error: null
// livemode: false
// next_action: null
// next_source_action: null
// object: "payment_intent"
// payment_method: "pm_1MJgb4Hwot3YTHMGtDocuHSX"
// payment_method_types: ["card"] (1)
// processing: null
// receipt_email: "hello@simonproudfoot.com"
// setup_future_usage: null
// shipping: null
// source: null
// status: "succeeded"


exports.handler = async (event, context) => {
  const data = JSON.parse(event.body);
  // const data = {
  //   payment_method: "",
  //   payment_method_title: "Direct Bank Transfer",
  //   set_paid: true,
  //   billing: {
  //     first_name: "",
  //     last_name: "",
  //     address_1: "",
  //     address_2: "",
  //     city: "",
  //     state: "",
  //     postcode: "",
  //     country: "UK",
  //     email: "",
  //     phone: ""
  //   },
  //   shipping: {
  //     first_name: "",
  //     last_name: "",
  //     address_1: "",
  //     address_2: "",
  //     city: "",
  //     state: "",
  //     postcode: "",
  //     country: ""
  //   },
  //   line_items: [
  //     {
  //       product_id: 93,
  //       quantity: 2
  //     },
  //   ],
   
  // };
  console.log(data)
  // Extract the query string parameters
  const params = event.queryStringParameters;
  // Extract the consumer key and consumer secret
  const consumerKey = process.env.WOO_USER
  const consumerSecret = process.env.WOO_SECRET;
  // Extract the store URL
  const storeUrl = process.env.BASE_URL
  try {
    // Use axios to make a request to the WooCommerce API
    const response = await axios({
      data: '',
      method: 'POST',
      url: `${storeUrl}/wp-json/wc/v3/order`,
      auth: {
        username: consumerKey,
        password: consumerSecret
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    });
    // Return the response as a JSON object
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    // Return an error if something went wrong
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

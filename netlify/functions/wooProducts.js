

const axios = require('axios');
const https = require('https');

exports.handler = async (event, context) => {
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
      method: 'get',
      url: `${storeUrl}/wp-json/wc/v2/products`,
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

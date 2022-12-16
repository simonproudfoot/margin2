var WooCommerceAPI = require('woocommerce-api');
 
var WooCommerce = new WooCommerceAPI({
  url: process.env.BASE_URL,
  consumerKey: process.env.WOO_USER,
  consumerSecret: process.env.WOO_SECRET,
  wpAPI: true,
  version: 'v3'
});


WooCommerce.getAsync('products').then(function(result) {
    return JSON.parse(result.toJSON().body);
});
const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
  productId: String,
  title: String,
  bodyHtml: String,
  imageUrl: String,
});

module.exports = mongoose.model('Products', productsSchema);
// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    name: String,
    price: Number,
    quantity: Number,
    image: String,
  }],
  shippingInfo: {
    name: String,
    address: String,
    city: String,
    postalCode: String,
  },
  totalPrice: Number,
  status: { type: String, default: 'Pending' },
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);

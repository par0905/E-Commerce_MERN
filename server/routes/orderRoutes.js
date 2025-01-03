// routes/orderRoutes.js
const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const Order = require('../models/Order');
const router = express.Router();

// POST request to create an order
router.post('/', protect, async (req, res) => {
  const { items, shippingInfo, totalPrice } = req.body;

  const newOrder = new Order({
    user: req.user.id, // Get the user ID from the JWT token
    items,
    shippingInfo,
    totalPrice,
    status: 'Pending', // Initial order status
  });

  try {
    const order = await newOrder.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order' });
  }
});

module.exports = router;

const express = require('express');
const Product = require('../models/Product');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// GET all products (public)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new product (protected)
router.post('/', protect, async (req, res) => {
  const { name, price, description, image, category, stock } = req.body;

  const newProduct = new Product({
    name,
    price,
    description,
    image,
    category,
    stock
  });

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

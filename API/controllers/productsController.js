const { Product } = require('../models');

exports.getUnbought = async (req, res) => {
  try {
    const pendingProducts = await Product.findAll({ 
      where: { bought: false, userId: req.user.id }
    });
    res.json(pendingProducts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

exports.getBought = async (req, res) => {
  try {
    const boughtProducts = await Product.findAll({ 
      where: { bought: true, userId: req.user.id }
    });
    res.json(boughtProducts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ 
      where: { id: req.params.id, userId: req.user.id }
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ where: { userId: req.user.id } });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    const newProduct = await Product.create({ 
      name, 
      price, 
      category, 
      description,
      userId: req.user.id
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ 
      where: { id: req.params.id, userId: req.user.id }
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });

    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    const product = await Product.findOne({ 
      where: { id: req.params.id, userId: req.user.id }
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });

    await product.update({ name, price, category, description });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

exports.toggleBoughtStatus = async (req, res) => {
  try {
    const product = await Product.findOne({ 
      where: { id: req.params.id, userId: req.user.id }
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });

    product.bought = !product.bought;
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update mark' });
  }
};
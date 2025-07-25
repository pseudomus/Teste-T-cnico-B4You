const { Product } = require('../models');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    const newProduct = await Product.create({ name, price, category, description });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    await product.update({ name, price, category, description });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    await product.destroy();
    res.json({ message: 'Product deleted with success' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete products' });
  }
};

exports.toggleBoughtStatus = async (req, res) => {
    try {
      const { id } = req.params;
  
      const product = await Product.findByPk(id);
      if (!product) return res.status(404).json({ error: 'Product not found' });
  
      product.bought = !product.bought;
      await product.save();
  
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update mark' });
    }
  };

exports.getUnbought = async (req, res) => {
  try {
    const pendingProducts = await Product.findAll({ where: { bought: false } });
    res.json(pendingProducts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

exports.getBought = async (req, res) => {
    try {
      const pendingProducts = await Product.findAll({ where: { bought: true } });
      res.json(pendingProducts);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
};

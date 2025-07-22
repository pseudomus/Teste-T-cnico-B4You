const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'API is running'});
});

const productRoutes = require('./routes/productRoutes');
const loginRoutes = require('./routes/authRoutes');

app.use('/api/products',productRoutes);
app.use('/auth', loginRoutes);

app.use((req,res) => {
    res.status(404).json({error: "Route not found"});
});

module.exports = app;
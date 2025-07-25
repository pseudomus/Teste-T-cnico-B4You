const express = require('express');
const app = express();
const db = require('./models/index');

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'API is running'});
});

app.get('/db', async (req, res) => {
    try {
      await db.sequelize.authenticate();
      res.send('Connection has been established successfully.');
    } catch (error) {
      res.status(500).send(`Unable to connect to the database: ${error.message}`);
    }
});

const productRoutes = require('./routes/productRoutes');
const loginRoutes = require('./routes/authRoutes');

app.use('/api/products',productRoutes);
app.use('/auth', loginRoutes);

module.exports = app;
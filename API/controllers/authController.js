const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const yup = require('yup');
const { use } = require('../app');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '1h';

const user = {
    email: 'admin@b4you.dev',
    password: bcrypt.hashSync('123456',10),
};

const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

exports.login = (req, res) => {
    const { email, password } = req.body;

    if (email !== user.email || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  
    res.json({ token });
};
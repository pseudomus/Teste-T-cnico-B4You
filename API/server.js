require('dotenv').config();
const app = require('./app');

const PORT = process.env.port || 3000;

app.listen(PORT, ()=> {
    console.log('API running in port ' + PORT)
});
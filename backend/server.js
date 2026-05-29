const dns = require('dns');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const rateLimiter = require('./middleware/rateLimiter');

dns.setDefaultResultOrder('ipv4first');

dotenv.config();

const app = express();
app.use(helmet());
app.use(rateLimiter);
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

connectDB();

app.use('/api/auth', require('./routes/auth'));
app.use('/api/income', require('./routes/income'));
app.use('/api/expense', require('./routes/expense'));
app.use('/api/dashboard', require('./routes/dashboard'));

app.get('/', (req, res) => res.send({ status: 'ok' }));

app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

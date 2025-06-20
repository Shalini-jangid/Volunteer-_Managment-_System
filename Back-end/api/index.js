const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const connectDB = require('../DB');
const authRoute = require('../routes/authRoutes');
const feedbackRoute = require('../routes/feedbackRoute');
const eventRoute = require('../routes/eventRoute');
const registrationRoute = require('../routes/registrationRoute');
const queryRoute = require('../routes/queryRoutes');

const app = express();
connectDB();

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/feedback', feedbackRoute);
app.use('/api/event', eventRoute);
app.use('/api/registration', registrationRoute);
app.use('/api/query', queryRoute);

app.get('/hi', (req, res) => {
  res.send('Hello from Vercel!');
});

module.exports = app;
module.exports.handler = serverless(app);

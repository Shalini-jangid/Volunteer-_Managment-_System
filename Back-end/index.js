const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const connectDB = require('../DB'); // Updated path

const cookieParser = require('cookie-parser');
const authRoute = require('../routes/authRoutes');
const feedbackRoute = require('../routes/feedbackRoute');
const eventRoute = require('../routes/eventRoute');
const registrationRoute = require('../routes/registrationRoute');
const queryRoute = require('../routes/queryRoutes');

// Connect to DB
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
  res.send('Hello from serverless Express!');
});

// ✅ For Vercel: export the app
module.exports = app;

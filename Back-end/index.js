const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const connectDB = require('./DB');

const authRoute = require('./routes/authRoutes');
const feedbackRoute = require('./routes/feedbackRoute');
const eventRoute = require('./routes/eventRoutes');
const registrationRoute = require('./routes/registrationRoute');
const queryRoute = require('./routes/queryRoutes');

// Connect to DB
connectDB();

// ✅ Manual CORS setup for Vercel
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://vm-frontend-three.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // ✅ Respond to preflight
  }

  next();
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/feedback', feedbackRoute);
app.use('/api/event', eventRoute);
app.use('/api/registration', registrationRoute);
app.use('/api/query', queryRoute);

app.get('/', (req, res) => {
  res.send('Hello World from Vercel Backend!');
});

// Start server only if not serverless (useful for local dev)
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

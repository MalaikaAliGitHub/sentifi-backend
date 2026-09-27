const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Full CORS support including OPTIONS preflight
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

app.use(express.json());

// Handle preflight requests explicitly if needed
app.options('*', cors());

// Root route
app.get('/', (req, res) => {
  res.send('Backend is running successfully');
});

// Routes
app.use('/api/sentiment', require('./routes/sentimentRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
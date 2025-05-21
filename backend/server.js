// server.js 
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import foodRoutes from './routes/foodRoutes.js';

// Load environment variables
dotenv.config();
const MONGO_URI = process.env.MONGODB_URI || "";
const PORT = process.env.PORT || 8000;

// Initialize Express app
const app = express();

// Middleware


app.use(cors({
  origin: "http://localhost:5174", 
  credentials: true                
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/foods', foodRoutes);

app.get('/api/test', (req, res) => {
  res.json({ message: 'chalo ye toh kaam kr rha' });
});

app.get('/hehe', (req, res) => {
  res.send('🌱 namashkaar hehe');
});

app.get('/', (req, res) => {
  res.send('🌱 namashkaar to the Food Donation API! fffft');
});

// Database connection and server start
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ ho gaya connect mubarak!");
    app.listen(PORT, () =>
      console.log(`🚀 yaha run ho rha h-> http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB  connection ke lode lag gaye-> failed:", err);
    process.exit(1);
  });

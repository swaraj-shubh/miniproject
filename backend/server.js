// server.js 
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import foodRoutes from './routes/foodRoutes.js';

dotenv.config();
const MONGO_URI = process.env.MONGODB_URI || "";
const PORT = process.env.PORT || 8000;


const app = express();
//app.use(cors());
app.use(cors({
  origin: ['https://secondserve-swaraj.vercel.app',
    'https://secondserve.shubhh.xyz',
    'https://miniproject-swaraj-shubhs-projects.vercel.app/',
    'https://miniproject-git-main-swaraj-shubhs-projects.vercel.app/',
    'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:5177', 'http://localhost:5178', 'http://localhost:5179', 'http://localhost:5180'], // Replace with your frontend URL
  credentials: true, // Allow cookies to be sent with requests
}));
app.use(express.json());

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

mongoose
  .connect(MONGO_URI)
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

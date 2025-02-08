import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes';
import { connectDB } from './lib/database.lib';
import redisClient from './lib/redis.lib';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server listen: http://localhost:${PORT}`);
  connectDB();
  redisClient.connect();
});
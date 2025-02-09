import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { connectDB } from './lib/database.lib';
import redisClient from './lib/redis.lib';

import authRouter from './routes/auth.routes';
import todosRouter from './routes/todos.routes';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use(async (req: Request, res: Response, next: NextFunction): Promise<any> => {

  if (req.headers['api-key'] && req.headers['api-key'] === process.env.API_KEY) {
    return next();
  }

  return res.status(401).json({ content: 'Access Denied' });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/todos', todosRouter);

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server listen: http://localhost:${PORT}`);
  connectDB();
  redisClient.connect();
});
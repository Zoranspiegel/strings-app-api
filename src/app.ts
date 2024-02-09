import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();

console.log(`🧞 CORS_ORIGIN: ${process.env.FRONT_ORIGIN}`);

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.FRONT_ORIGIN,
  credentials: true
}));
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api', routes);

export default app;

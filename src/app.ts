import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(cookieParser());
app.use(morgan('dev'));

export default app;

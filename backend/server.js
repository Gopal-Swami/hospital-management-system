import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './configurations/db.js';
import path from 'path';
import { errorHandler } from './middlewares/errorMiddleware.js';
import hospitalRoutes from './routes/hospitalRoutes.js';

dotenv.config();

connectDB();
const app = express();
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use('/api/hospital', hospitalRoutes);
app.use(errorHandler);
const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on Port ${PORT}`.yellow.bold
  )
);

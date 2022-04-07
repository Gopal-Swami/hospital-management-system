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

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('frontend/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on Port ${PORT}`.yellow.bold
  )
);

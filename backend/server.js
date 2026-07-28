import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import publicationRoutes from './routes/publicationRoutes.js';
dotenv.config();

const port = process.env.PORT || 5050;

connectDB(); // Connect to mongoDB

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/publications', publicationRoutes);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

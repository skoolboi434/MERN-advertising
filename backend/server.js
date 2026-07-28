import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import publications from './data/publications.js';
const port = process.env.PORT || 5050;

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

app.get('/api/publications', (req, res) => {
  res.json(publications);
});

app.get('/api/publications/:id', (req, res) => {
  const publication = publications.find(p => p._id === req.params.id);
  res.json(publication);
});

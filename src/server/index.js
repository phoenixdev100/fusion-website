const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./db');
const createDefaultAdmin = require('./createDefaultAdmin.js');
const authRoutes = require('./auth.js');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await createDefaultAdmin();
  console.log(`Server running on port ${PORT}`);
}); 
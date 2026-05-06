const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('DB Connection Error:', err));

app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'up' : 'down';
  res
    .status(dbStatus === 'up' ? 200 : 500)
    .json({ status: 'OK', database: dbStatus });
});

app.use('/tasks', require('./routes/taskRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${  PORT}`));

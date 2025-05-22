const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const accessoireRoutes = require('./routes/accessoire.routes');
app.use('/api/accessoires', accessoireRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(3000, () => {
      console.log('✅ Backend running on http://localhost:3000');
    });
  })
  .catch(err => {
    console.error('❌ MongoDB Error:', err.message);
  });

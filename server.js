// Import required packages
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const PORT = 3000;

// Get connection to Mongo db
const mongoURI = 'mongodb://localhost:27017/favoriteLinks';
const db = mongoose.connection;

mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('the connection with mongod is established');
  }
);

// MIDDLEWARE

// Import controllers
app.use('/webs', require('./controllers/webController'));

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
})
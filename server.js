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
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// static files: tells express to try to match requests with files in the directory called 'public'
app.use(express.static('public'));

// Import controllers
app.use('/web', require('./controllers/webController'));

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
})
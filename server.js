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
app.use(expressLayouts);
/**
 * express.urlencoded([options]) 
 * extended:  This option allows to choose between parsing the URL-encoded data 
 * with the querystring library (when false) or the qs library (when true). 
 * The “extended” syntax allows for rich objects and arrays to be encoded into 
 * the URL-encoded format, allowing for a JSON-like experience with URL-encoded. 
 * For more information, please see the qs library.     
 */
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// static files: tells express to try to match requests with files in the directory called 'public'
app.use(express.static('public'));

// Import controllers
app.use('/web', require('./controllers/webController'));

// Hide Form
function addLink() {
  var x = document.getElementById("newlinkForm");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
})
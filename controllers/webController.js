// Include the express router
const router = require('express').Router();
// Include the schemas models
// const Web = require('../models/web').Web;
// const Url = require('../models/web').Url;
// You can replace above two line with below line
const { Web, Url } = require('../models/web')

// Index
router.get('/', (req, res) => {
    Web.find({}, (error, data) => {
      res.render('web/index.ejs', {
        data,
      })
    })
  })

// New Form to enter a web component - html, css, js, etc.
router.get('/new', (req, res) => {
    res.render('web/new.ejs');
})

// Create a new web component
router.post('/', (req, res) => {
    console.log(req.body);
    Web.create(req.body, (error, data) => {
        res.send(data);
    })
})




module.exports = router;

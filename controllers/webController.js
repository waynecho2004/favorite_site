// Include the express router
const router = require('express').Router();
// Include the schemas models
// const Web = require('../models/web').Web;
// const Url = require('../models/web').Url;
// You can replace above two line with below line
const { Web, Url } = require('../models/web')

// Seed data if needed
const seed = require('../models/web-seed');

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

// Get all record in json format
router.get('/getData', (req, res) => {
    Web.find({}, (error, allRecords) => {
        res.send(allRecords);
    });
});

// Backup with seed data
router.get('/seed', (req, res)=>{
    Web.create(seed, (err, data)=>{
        res.redirect('/web');
    });
  });


// Add Empty Form to show page to add new url
router.get('/:id', (req, res) => {
    // Find web component in db by id and add new url
    Web.findById(req.params.id, (error, record) => {
        res.render('web/show.ejs', {
            data: record,
        });
    });
});

// Create a new web component
router.post('/', (req, res) => {
    console.log(req.body);
    Web.create(req.body, (error, data) => {
        // res.send(data);
        res.redirect(`/web/${data.id}`);
    })
})

// Create URL embedded in web
router.post('/:id/urls', (req, res) => {
    console.log(req.body);
    // store new url in memory with data from request body
    const newUrl = new Url({ 
        title: req.body.title,
        url: req.body.url,
    });

    // find web in db by id and add new category
    Web.findById(req.params.id, (error, record) => {
        record.urls.push(newUrl);
        record.save((error, usdataer) => {
            if (error) res.send(error);
            res.redirect(`/web/${record.id}`);
        });
    }); 
});



module.exports = router;

const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    title: String,
    url: String
});

const webSchema = new mongoose.Schema({
    name: String,
    // embedded urls in web component
    urls: [urlSchema],
});

const Web = mongoose.model('Web', webSchema);
const Url = mongoose.model('Url', urlSchema);

module.exports = { Web, Url};
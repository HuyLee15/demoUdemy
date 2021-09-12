const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017')
    .then(() => console.log('Connected to MongoDB!!!'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const schema = new mongoose.Schema({
    name: String,
    author: String,
    tags: { String },
    date: { type: Date, default: Date.now },
    isPublished: Boolean
})
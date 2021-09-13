const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017')
    .then(() => console.log('Connected to MongoDB!!!'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const productSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
})

const Product = mongoose.model('Product', productSchema);

createProduct = async() => {
    const product = new Product({
        name: 'Node.js Product',
        author: 'Felix',
        tags: ['node', 'backend'],
        isPublished: true
    });

    const result = await product.save();
    console.log(result);
}

getProducts = async() => {

    const pageNumber = 2;
    const pageSize = 10;



    const products = await Product
        .find({ author: 'Felix', isPublished: true })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })
        .count();
    console.log(products);
}

getProducts()
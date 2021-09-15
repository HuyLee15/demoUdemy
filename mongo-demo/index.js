const mongoose = require('mongoose');
console.log("start index")

mongoose.connect('mongodb://localhost:27017')
    .then(() => console.log('Connected to MongoDB!!!'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        trim: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(v, callback) {
                return v && v.length > 0;
            },
            message: 'some text'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished; },
        min: 10,
        max: 200,
        getter: v => Math.round(v),
        set: v => Math.round(v)
    }
});

const Product = mongoose.model('Product', productSchema);

createProduct = async() => {
    const product = new Product({
        name: 'Node.js Product',
        category: 'Web',
        author: 'Felix',
        tags: ['frontend'],
        isPublished: true,
        price: 15.6
    });
    try {

        const result = await product.save();
        console.log(result);
    } catch (error) {
        for (field in error.errors)
            console.log(error.errors[field].message);
    }
}

getProducts = async() => {

    const pageNumber = 2;
    const pageSize = 10;

    const products = await Product
        .find({ _id: '6140ab20fd589c965769e179' })
        // .skip((pageNumber - 1) * pageSize)
        // .limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1, price: 1 });
    console.log(products[0].price);
}

updateProduct = async(id) => {

    const product = await Product.findByIdAndUpdate(id, {
        $set: {
            author: "Felix lixlix",
            isPublished: false
        }
    }, { new: true });
    console.log(product);
}

removeProduct = async(id) => {

    //const result = await Product.deleteMany({ _id: id });
    const product = await Product.findByIdAndRemove(id);
    console.log(product);
}

getProducts();
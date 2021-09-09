const Joi = require('joi');
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const products = [
    { id: 1, name: 'product1' },
    { id: 2, name: 'product2' },
    { id: 3, name: 'product3' },
]

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.get('/api/products', (req, res) => {
    res.send(products);
})

app.post('/api/products', (req, res) => {
    if (!req.body.name || req.body.name.length < 3) {
        //400 bad request
        res.status(400).send("name is required and should be minimum 3 character.")
        return;
    }
    const product = {
        id: products.length + 1,
        name: req.body.name
    }
    products.push(product);
    res.send(product);

})

app.put('/api/products/:id', (req, res) => {
    const product = products.find(c => c.id === parseInt(req.params.id));
    if (!product) {
        res.status(404).send("the product with thi given id was not found")
    }


    product.name = req.body.name;
    res.send(product);
});


app.delete('/api/products/:id', (req, res) => {
    const product = products.find(c => c.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).send("the product with thi given id was not found")
    }
    const index = products.indexOf(product);
    products.splice(index, 1);
    res.send(products)
})



app.get('/api/products/:id', (req, res) => {
    const product = products.find(c => c.id === parseInt(req.params.id));
    if (!product) return res.status(404).send("the product with thi given id was not found")
    res.send(product)
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
})
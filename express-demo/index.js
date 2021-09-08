const express = require('express');

const app = express();

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

app.get('/api/products/:id', (req, res) => {
    const product = products.find(c => c.id === parseInt(req.params.id));
    if (!product) res.status(404).send("the product with thi given id was not found")
    res.send(product)
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
})
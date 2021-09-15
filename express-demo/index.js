const config = require('config')
const helmet = require('helmet');
const Joi = require('joi');
const express = require('express');
const logger = require('./middleware/logger');
const home = require('./routers/home');
const productRouter = require('./routers/productRouter');
const { urlencoded } = require('express');
const morgan = require('morgan');
const debug = require('debug')('app:startup');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');


app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/products', productRouter);
app.use('/', home);

//config
console.log("Application Name: " + config.get('name'));
console.log("Mail server: " + config.get('mail.host'));
console.log("Mail password: " + config.get('mail.password'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
}


app.use(logger);


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
})
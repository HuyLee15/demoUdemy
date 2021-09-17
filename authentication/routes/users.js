const { User, validate } = require('../models/users');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('exists user');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    user = await user.save();



    res.send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;
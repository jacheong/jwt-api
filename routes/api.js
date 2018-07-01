const express = require('express');
const User = require('../models/user-model');
const Contact = require('../models/contact-model');
const router = express.Router();
const jwt = require('jsonwebtoken');
const checkJwt = require('express-jwt');

require('dotenv').config();

router.use(checkJwt({ secret: process.env.JWT_SECRET })).unless({ path: '/api/authenticate' });

router.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({ error: err.message });
    }
});

router.get('/contacts', (req, res) => {
    Contact.find({})
        .then(contacts => {
            res.send(contacts);
        })
        .catch(error => {
            res.status(404).send({ error: error });
        });
});

router.post('/contacts', (req, res) => {
    Contact.create(req.body)
        .then(contact => {
            res.send(contact);
        })
        .catch(error => {
            res.status(422).send({ error: error });
        });
});

router.post('/authenticate', (req, res) => {
    const user = req.body;
    console.log(user);

    User.findOne({ username: user.username })
        .then(result => {
            if (!result) {
                res.status(404).send({ error: 'User not found.' });
            }
            else if (user.password !== result.password) {
                res.status(401).send({ error: 'Incorrect password' });
            }

            const payload = {
                username: result.username,
                admin: result.admin
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });

            res.send({
                message: 'Successfully authenticated',
                token: token
            });
        });
});

module.exports = router;
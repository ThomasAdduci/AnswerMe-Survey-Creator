const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        res.status(201).send('Usuario registrado');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            throw new Error('Credenciales inválidas');
        }
        const token = jwt.sign({ userId: user._id }, 'SECRET_KEY');
        res.send({ token });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;

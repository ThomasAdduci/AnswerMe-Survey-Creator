// routes/quiz.js

const express = require('express');
const Quiz = require('../models/quiz');
const jwt = require('jsonwebtoken');
const router = express.Router();

const authenticate = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, 'SECRET_KEY');
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).send('No autorizado');
    }
};

router.post('/', authenticate, async (req, res) => {
    try {
        const { title, questions } = req.body;
        const quiz = new Quiz({ userId: req.userId, title, questions });
        await quiz.save();
        res.status(201).send('Cuestionario creado');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get('/', authenticate, async (req, res) => {
    try {
        const quizzes = await Quiz.find({ userId: req.userId });
        res.send(quizzes);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;

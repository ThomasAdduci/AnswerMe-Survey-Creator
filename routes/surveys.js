// routes/surveys.js

const express = require('express');
const Survey = require('../models/survey');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Crear nueva encuesta
router.post('/', authenticateToken, async (req, res) => {
    const { title, questions } = req.body;
    const newSurvey = new Survey({ title, questions, userId: req.user._id });

    try {
        await newSurvey.save();
        res.status(201).json(newSurvey);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la encuesta' });
    }
});

// Obtener todas las encuestas del usuario
router.get('/', authenticateToken, async (req, res) => {
    try {
        const surveys = await Survey.find({ userId: req.user._id });
        res.status(200).json(surveys);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las encuestas' });
    }
});

// Eliminar una encuesta por ID
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const survey = await Survey.findById(req.params.id);
        if (!survey) {
            return res.status(404).json({ error: 'Encuesta no encontrada' });
        }
        if (survey.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'No tienes permiso para eliminar esta encuesta' });
        }
        await survey.remove();
        res.status(200).json({ message: 'Encuesta eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la encuesta' });
    }
});

module.exports = router;

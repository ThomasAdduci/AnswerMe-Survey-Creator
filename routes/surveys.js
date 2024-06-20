// routes/surveys.js
const express = require('express');
const router = express.Router();
const Survey = require('../models/survey');
const auth = require('../middleware/auth');

// Obtener todas las encuestas del usuario autenticado
router.get('/', auth, async (req, res) => {
    try {
        const surveys = await Survey.find({ user: req.user._id });
        res.json(surveys);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Eliminar una encuesta por ID
router.delete('/:id', auth, async (req, res) => {
    try {
        const survey = await Survey.findById(req.params.id);
        if (!survey) {
            return res.status(404).json({ message: 'Encuesta no encontrada' });
        }
        if (survey.user.toString() !== req.user._id) {
            return res.status(403).json({ message: 'No tienes permiso para eliminar esta encuesta' });
        }
        await survey.remove();
        res.json({ message: 'Encuesta eliminada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

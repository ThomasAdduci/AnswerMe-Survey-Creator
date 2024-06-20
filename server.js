const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const quizRoutes = require('./routes/quiz');

const app = express();

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/quizapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(express.json());

// Rutas
app.use('/api/user', userRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/surveys', surveyRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


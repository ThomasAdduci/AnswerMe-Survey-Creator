const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    question: String,
    choices: [String],
    answer: String,
});

const QuizSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    questions: [QuestionSchema],
});

module.exports = mongoose.model('Quiz', QuizSchema);

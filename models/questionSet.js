const mg = require('mongoose');
const Schema = mg.Schema;

const QuestionSetSchema = new mg.Schema({
    setId: Number,
    questions: [
        {
            id: Number,
            text: String,
            type: { type: String, enum: ['true-false', 'multiple-choice'] },
            options: [String], 
            answer: String,
        }
    ]
});



const QuestionSetModel = mg.model('QuestionSet', QuestionSetSchema);

module.exports = {
    QuestionSetModel
};

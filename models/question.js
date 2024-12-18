const mg = require('mongoose');
const Schema = mg.Schema;

//model for each specific question
//will be used when posting questions to db as well as getting questions

const QuestionSchema = new mg.Schema({
    setName: {
        type: String
    },

    type: {
        type: String,
        enum: ['Multiple Choice', 'True/False'],
        required: true,
    },

    optionA: {
        type: String
    },
    optionB: {
        type: String
    },
    optionC: {
        type: String
    },
    optionD: {
        type: String
    },

    questionText: {
        type: String,
        required: true,
    },

    correctAnswer: {
        type: String,
        required: true,
    },
    submittedAnswer: {
        type: String,
       
    },

    explanation: {
        type: String
    }

  
});

//use Math.random to randomly select one question from each set

const QuestionModel = mg.model('Question', QuestionSchema);

module.exports = {
    QuestionModel,
};

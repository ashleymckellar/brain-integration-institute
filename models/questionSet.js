const mg = require('mongoose');
const Schema = mg.Schema;
const { QuestionSchema } = require('./question'); 

//I'm not sure I need this actually

//model for each question set, aka each quiz.  
//Math.random will be called on the arrays from here
//will be 206 in total

const QuestionSetSchema = new mg.Schema({
    setId: Number,
    setName: String
});

//use Math.random to randomly select one question from each set

const QuestionSetModel = mg.model('QuestionSet', QuestionSetSchema);

module.exports = {
    QuestionSetModel,
};

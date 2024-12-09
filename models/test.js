const mg = require('mongoose');
const Schema = mg.Schema;

const TestSchema = new mg.Schema({
    userId: String,
    questions: [questionSchema],
    startTime: Date,
    endTime: Date,
});



const TestModel = mg.model('Test', TestSchema);

module.exports = {
    TestModel
};

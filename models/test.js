const mg = require('mongoose');
const Schema = mg.Schema;

const TestSchema = new mg.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    questions: [String],
    startTime: Date,
    endTime: Date,
    score: Number,
    testCompleted: Boolean
});



const TestModel = mg.model('Test', TestSchema);

module.exports = {
    TestModel
};
